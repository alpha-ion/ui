import * as p from "@clack/prompts"
import { execa } from "execa"
import fs from "fs-extra"
import path from "path"
import { logger } from "./logger.js"
import {
    getAvailablePackageManagers,
    type PackageManager
} from "./package-manager.js"

interface ScaffoldOptions {
    projectName?: string
    packageManager?: PackageManager
    interactive?: boolean
    typescript?: boolean
    eslint?: boolean
    tailwind?: boolean
    srcDir?: boolean
    importAlias?: string
}

/**
 * Check if directory is empty or safe to scaffold
 */
async function isDirectorySafeToScaffold(dir: string): Promise<{
    safe: boolean
    reason?: string
    conflictingFiles?: string[]
}> {
    try {
        const exists = await fs.pathExists(dir)

        if (!exists) {
            return { safe: true }
        }

        const files = await fs.readdir(dir)

        // Allow certain files that are typically in project roots
        const allowedFiles = new Set([
            '.git',
            '.gitignore',
            'README.md',
            'LICENSE',
            '.env',
            '.env.local',
            '.vscode',
            '.idea',
            'node_modules'
        ])

        const conflictingFiles = files.filter(file => !allowedFiles.has(file))

        if (conflictingFiles.length === 0) {
            return { safe: true }
        }

        return {
            safe: false,
            reason: "Directory contains files that could conflict",
            conflictingFiles: conflictingFiles.slice(0, 10)
        }
    } catch (error) {
        return {
            safe: false,
            reason: `Unable to check directory: ${error}`
        }
    }
}

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
 * Prompt user to select package manager
 */
async function selectPackageManager(): Promise<PackageManager> {
    const available = await getAvailablePackageManagers()

    if (available.length === 0) {
        logger.error("No package managers found on your system!")
        logger.info("Please install Node.js, pnpm, bun, or deno first")
        process.exit(1)
    }

    if (available.length === 1) {
        logger.info(`Using ${available[0]} (only available package manager)`)
        return available[0]
    }

    const pmLabels: Record<PackageManager, string> = {
        pnpm: "pnpm - Fast, disk space efficient",
        bun: "bun - All-in-one toolkit with speed",
        npm: "npm - Node.js default package manager",
        yarn: "yarn - Reliable dependency manager",
        deno: "deno - Secure runtime with built-in tools"
    }

    const options = available.map(pm => ({
        value: pm,
        label: pmLabels[pm]
    }))

    const preferenceOrder: PackageManager[] = ["pnpm", "bun", "npm", "yarn", "deno"]
    const defaultPM = preferenceOrder.find(pm => available.includes(pm)) || available[0]

    const selected = await p.select({
        message: "Which package manager would you like to use?",
        options,
        initialValue: defaultPM
    })

    if (p.isCancel(selected)) {
        p.cancel("Operation cancelled.")
        process.exit(0)
    }

    return selected as PackageManager
}

/**
 * Prompt for project configuration
 */
async function promptProjectConfig(
    currentDir: string,
    suggestedName?: string
): Promise<{
    projectName: string
    targetDir: string
    packageManager: PackageManager
    typescript: boolean
    eslint: boolean
    tailwind: boolean
    srcDir: boolean
    importAlias: string
}> {
    p.intro("Alphabyte CLI - Project Setup")

    const defaultName = suggestedName || "my-alphabyte-app"

    const name = await p.text({
        message: "What is your project name?",
        placeholder: defaultName,
        defaultValue: defaultName,
        validate: (value) => {
            if (!value) return "Project name is required"
            if (!/^[a-z0-9-_]+$/.test(value)) {
                return "Use lowercase letters, numbers, hyphens, and underscores only"
            }
        }
    })

    if (p.isCancel(name)) {
        p.cancel("Operation cancelled.")
        process.exit(0)
    }

    const projectName = name as string
    const targetDir = path.join(currentDir, projectName)

    // Check if target directory is safe
    const safety = await isDirectorySafeToScaffold(targetDir)

    if (!safety.safe) {
        logger.error(`\n${safety.reason}`)

        if (safety.conflictingFiles && safety.conflictingFiles.length > 0) {
            logger.info("\nConflicting files/directories:")
            safety.conflictingFiles.forEach(file => logger.info(`  - ${file}`))

            if (safety.conflictingFiles.length > 10) {
                logger.info(`  ... and ${safety.conflictingFiles.length - 10} more`)
            }
        }

        const options = [
            { value: 'rename', label: 'Choose a different project name' },
            { value: 'delete', label: 'Delete existing files and continue (dangerous)' },
            { value: 'cancel', label: 'Cancel operation' }
        ]

        const action = await p.select({
            message: 'What would you like to do?',
            options
        })

        if (p.isCancel(action) || action === 'cancel') {
            p.cancel("Operation cancelled.")
            process.exit(0)
        }

        if (action === 'delete') {
            const confirm = await p.confirm({
                message: `Are you SURE you want to delete everything in ${targetDir}?`,
                initialValue: false
            })

            if (p.isCancel(confirm) || !confirm) {
                p.cancel("Operation cancelled for safety.")
                process.exit(0)
            }

            await fs.remove(targetDir)
            logger.success(`Cleaned ${targetDir}`)
        } else {
            // Recursive call to choose new name
            return promptProjectConfig(currentDir, undefined)
        }
    }

    // Package manager selection
    const packageManager = await selectPackageManager()

    // Configuration prompts
    const typescript = await p.confirm({
        message: "Would you like to use TypeScript?",
        initialValue: true
    })

    if (p.isCancel(typescript)) {
        p.cancel("Operation cancelled.")
        process.exit(0)
    }

    const eslint = await p.confirm({
        message: "Would you like to use ESLint?",
        initialValue: true
    })

    if (p.isCancel(eslint)) {
        p.cancel("Operation cancelled.")
        process.exit(0)
    }

    const tailwind = await p.confirm({
        message: "Would you like to use Tailwind CSS?",
        initialValue: true
    })

    if (p.isCancel(tailwind)) {
        p.cancel("Operation cancelled.")
        process.exit(0)
    }

    const srcDir = await p.confirm({
        message: "Would you like to use `src/` directory?",
        initialValue: false
    })

    if (p.isCancel(srcDir)) {
        p.cancel("Operation cancelled.")
        process.exit(0)
    }

    const useCustomAlias = await p.confirm({
        message: "Would you like to customize the import alias?",
        initialValue: false
    })

    if (p.isCancel(useCustomAlias)) {
        p.cancel("Operation cancelled.")
        process.exit(0)
    }

    let importAlias = "@/*"

    if (useCustomAlias) {
        const customAlias = await p.text({
            message: "What import alias would you like?",
            placeholder: "@/*",
            defaultValue: "@/*",
            validate: (value) => {
                if (!value) return "Import alias is required"
                if (!value.includes("/")) return "Alias must contain a path (e.g., @/*)"
            }
        })

        if (p.isCancel(customAlias)) {
            p.cancel("Operation cancelled.")
            process.exit(0)
        }

        importAlias = customAlias as string
    }

    return {
        projectName,
        targetDir,
        packageManager,
        typescript: typescript as boolean,
        eslint: eslint as boolean,
        tailwind: tailwind as boolean,
        srcDir: srcDir as boolean,
        importAlias
    }
}

/**
 * Enhanced scaffold function with proper directory handling
 */
export async function scaffoldNextApp(
    cwd: string,
    options: ScaffoldOptions = {}
): Promise<string> {
    let config: Awaited<ReturnType<typeof promptProjectConfig>>

    if (options.interactive !== false) {
        config = await promptProjectConfig(cwd, options.projectName)
    } else {
        if (!options.projectName) {
            throw new Error("Project name is required in non-interactive mode")
        }

        const availablePMs = await getAvailablePackageManagers()
        const targetDir = path.join(cwd, options.projectName)

        const safety = await isDirectorySafeToScaffold(targetDir)
        if (!safety.safe) {
            throw new Error(`Target directory is not safe: ${safety.reason}`)
        }

        config = {
            projectName: options.projectName,
            targetDir,
            packageManager: options.packageManager || availablePMs[0] || "npm",
            typescript: options.typescript ?? true,
            eslint: options.eslint ?? true,
            tailwind: options.tailwind ?? true,
            srcDir: options.srcDir ?? false,
            importAlias: options.importAlias || "@/*"
        }
    }

    const spinner = p.spinner()
    spinner.start(`Creating ${config.projectName}...`)

    try {
        // Create target directory
        await fs.ensureDir(config.targetDir)

        // Build create-next-app arguments
        const args = [
            "create-next-app@latest",
            ".",
            "--yes",
        ]

        if (config.typescript) {
            args.push("--ts")
        } else {
            args.push("--js")
        }

        if (config.eslint) {
            args.push("--eslint")
        } else {
            args.push("--no-eslint")
        }

        if (config.tailwind) {
            args.push("--tailwind")
        } else {
            args.push("--no-tailwind")
        }

        args.push("--app")

        if (config.srcDir) {
            args.push("--src-dir")
        } else {
            args.push("--no-src-dir")
        }

        args.push("--import-alias", config.importAlias)

        // Package manager specific flag
        switch (config.packageManager) {
            case "pnpm":
                args.push("--use-pnpm")
                break
            case "yarn":
                args.push("--use-yarn")
                break
            case "bun":
                args.push("--use-bun")
                break
            case "npm":
                args.push("--use-npm")
                break
        }

        // Execute based on package manager
        if (config.packageManager === "bun") {
            await execa("bunx", args, { cwd: config.targetDir, stdio: "pipe" })
        } else if (config.packageManager === "deno") {
            await execa("deno", ["run", "-A", "npm:create-next-app@latest", ...args.slice(1)], {
                cwd: config.targetDir,
                stdio: "pipe"
            })
        } else {
            const dlxCommand = config.packageManager === "pnpm" ? "pnpm" : "npx"
            const dlxArgs = config.packageManager === "pnpm" ? ["dlx", ...args] : args

            await execa(dlxCommand, dlxArgs, { cwd: config.targetDir, stdio: "pipe" })
        }

        spinner.stop(`${config.projectName} created successfully`)

        p.outro(`
Project ready!

Location: ${config.targetDir}
Package Manager: ${config.packageManager}
TypeScript: ${config.typescript ? "Yes" : "No"}
Tailwind CSS: ${config.tailwind ? "Yes" : "No"}
ESLint: ${config.eslint ? "Yes" : "No"}

Next steps:
  cd ${config.projectName}
  ${config.packageManager} dev
    `)

        return config.targetDir

    } catch (error) {
        spinner.stop("Project creation failed")
        logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`)

        p.note(`
Try manually:
  mkdir ${config.projectName}
  cd ${config.projectName}
  npx create-next-app@latest . --yes ${config.typescript ? '--ts' : '--js'}
    `, "Manual fallback")

        throw error
    }
}

/**
 * Smart scaffold orchestrator for add command
 */
export async function ensureNextApp(
    cwd: string,
    options: ScaffoldOptions = {}
): Promise<string> {
    const hasNext = await isNextAppPresent(cwd)

    if (hasNext) {
        logger.info("Next.js app detected")
        return cwd
    }

    // No Next.js app found - check if directory is safe to scaffold IN PLACE
    const safety = await isDirectorySafeToScaffold(cwd)

    if (!safety.safe) {
        // Directory has conflicts - must create in subdirectory
        if (options.interactive !== false) {
            p.note(`
Current directory contains existing files.
We'll create a new Next.js project in a subdirectory.
      `, "Directory not empty")

            const shouldContinue = await p.confirm({
                message: "Would you like to create a new Next.js project?",
                initialValue: true
            })

            if (p.isCancel(shouldContinue) || !shouldContinue) {
                p.cancel("Operation cancelled. Please run this in an empty directory or existing Next.js project.")
                process.exit(0)
            }

            // Will prompt for project name and create subdirectory
            const targetDir = await scaffoldNextApp(cwd, options)
            return targetDir
        } else {
            throw new Error("Cannot scaffold in non-empty directory without interactive mode")
        }
    }

    // Directory is empty/safe - we can scaffold here
    if (options.interactive !== false) {
        const shouldScaffold = await p.confirm({
            message: "No Next.js app found. Would you like to create one here?",
            initialValue: true
        })

        if (p.isCancel(shouldScaffold) || !shouldScaffold) {
            p.cancel("Operation cancelled.")
            process.exit(0)
        }
    }

    // Scaffold in current directory by creating temp name
    const tempName = path.basename(cwd) || "my-app"
    const parentDir = path.dirname(cwd)

    options.projectName = tempName
    await scaffoldNextApp(parentDir, { ...options, interactive: false })

    return cwd
}