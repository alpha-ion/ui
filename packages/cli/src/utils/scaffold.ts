import { execa } from "execa"
import fs from "fs-extra"
import path from "path"
import { logger } from "./logger.js"

/**
 * Check if Next.js app exists in the current directory
 */
export async function isNextAppPresent(cwd: string): Promise<boolean> {
    const pkgPath = path.join(cwd, "package.json")
    if (!(await fs.pathExists(pkgPath))) return false

    try {
        const pkg = await fs.readJSON(pkgPath)
        const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
        const hasNext = typeof deps["next"] === "string"
        const appDir = await fs.pathExists(path.join(cwd, "app"))
        return hasNext && appDir
    } catch {
        return false
    }
}

/**
 * Find recently created directories (within last N milliseconds)
 * Useful for detecting which directory create-next-app created
 */
async function findRecentlyCreatedDirs(
    cwd: string,
    maxAgeMs: number = 5 * 60 * 1000 // 5 minutes
): Promise<string[]> {
    try {
        const entries = await fs.readdir(cwd, { withFileTypes: true })
        const now = Date.now()
        const recentDirs: string[] = []

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const dirPath = path.join(cwd, entry.name)
                const stats = await fs.stat(dirPath)
                const age = now - stats.birthtimeMs // Creation time

                if (age <= maxAgeMs) {
                    recentDirs.push(dirPath)
                }
            }
        }

        const statsList = await Promise.all(
            recentDirs.map(async (dir) => {
                const stats = await fs.stat(dir)
                return { dir, birth: stats.birthtimeMs }
            })
        )

        statsList.sort((a, b) => b.birth - a.birth)

        return statsList.map((s) => s.dir)
    } catch {
        return []
    }
}

/**
 * Scaffold Next.js app using official create-next-app
 * Returns the working directory where Next.js was created
 * 
 * This function:
 * 1. Launches create-next-app interactively
 * 2. Lets user configure everything (name, TypeScript, etc.)
 * 3. Detects where Next.js was created
 * 4. Returns the path to that directory
 */
export async function scaffoldNextApp(cwd: string): Promise<string> {
    logger.info("\nNo Next.js app detected.")
    logger.info("Launching create-next-app CLI...\n")

    try {
        // Store directory listing BEFORE create-next-app
        const dirsBefore = new Set(
            (await fs.readdir(cwd, { withFileTypes: true }))
                .filter(e => e.isDirectory())
                .map(e => e.name)
        )

        // Launch create-next-app interactively
        // User will be prompted for:
        // - Project name
        // - TypeScript (yes/no)
        // - ESLint (yes/no)
        // - Tailwind CSS (yes/no)
        // - src/ directory (yes/no)
        // - App Router (yes/no)
        // - Import alias
        await execa("npx", ["create-next-app@latest"], {
            cwd,
            stdio: "inherit", // Pass through all I/O to user
        })

        // ========================================
        // Detection: Where was Next.js created?
        // ========================================

        // Strategy 1: Check current directory
        const hasNextInCurrent = await isNextAppPresent(cwd)
        if (hasNextInCurrent) {
            logger.success("\nNext.js app created successfully!")
            return cwd
        }

        // Strategy 2: Find newly created directories
        const dirsAfter = (await fs.readdir(cwd, { withFileTypes: true }))
            .filter(e => e.isDirectory())
            .map(e => e.name)

        const newDirs = dirsAfter.filter(d => !dirsBefore.has(d))

        // Check new directories for Next.js
        for (const dirName of newDirs) {
            const dirPath = path.join(cwd, dirName)
            const hasNext = await isNextAppPresent(dirPath)
            if (hasNext) {
                logger.success(`\nNext.js app created successfully in ${dirName}!`)
                return dirPath
            }
        }

        // Strategy 3: Check ALL directories (in case we missed it)
        const allDirs = dirsAfter
        for (const dirName of allDirs) {
            const dirPath = path.join(cwd, dirName)
            const hasNext = await isNextAppPresent(dirPath)
            if (hasNext) {
                logger.success(`\nNext.js app found in ${dirName}!`)
                return dirPath
            }
        }

        // Fallback: Assume current directory
        // (create-next-app might have scaffolded here but we failed to detect)
        logger.success("\nNext.js app created!")
        logger.warn("⚠️  Could not auto-detect project location. Assuming current directory.")
        return cwd

    } catch (error) {
        logger.error("\nFailed to create Next.js app")
        logger.info("\nYou can create it manually:")
        logger.info("\nnpx create-next-app@latest")
        logger.info("\nThen run your command again.")
        throw error
    }
}