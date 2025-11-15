import { RegistryItem } from "@/schema"
import fastGlob from "fast-glob"
import { promises as fs } from "fs"
import fsExtra from "fs-extra"
import path from "path"
import { extractDependencies, extractInternalImports } from "./extra-dependencies"
import { BLOCKS_PATH, COMPONENTS_PATH } from "./get-registry"

/**
 * Extract registry dependencies from internal imports
 * Detects @/components/ui/* imports and converts them to registry dependencies
 */
function extractRegistryDependencies(
    content: string,
    allAvailableComponents: string[]
): string[] {
    const registryDeps: string[] = []
    const internalImports = extractInternalImports(content)

    for (const imp of internalImports) {
        // Match patterns like:
        // @/components/ui/button
        // @/components/ui/card
        // @/components/button
        const componentMatch = imp.match(/@\/components(?:\/ui)?\/([^\/'"]+)/)

        if (componentMatch) {
            const componentName = componentMatch[1]

            // Check if this component exists in our registry
            if (allAvailableComponents.includes(componentName)) {
                if (!registryDeps.includes(componentName)) {
                    registryDeps.push(componentName)
                }
            }
        }
    }

    return registryDeps
}

/**
 * Get all available component names from registry
 */
async function getAllComponentNames(): Promise<string[]> {
    try {
        const componentFiles = await fastGlob("**/*.tsx", { cwd: COMPONENTS_PATH })
        return componentFiles.map(file => path.basename(file, ".tsx"))
    } catch {
        return []
    }
}

export async function getBlocks(): Promise<RegistryItem[]> {
    const blocks: RegistryItem[] = []

    try {
        // Get all available components for dependency detection
        const allComponents = await getAllComponentNames()

        // Read block directories from registry/view directory
        const blockDirs = await fastGlob("*", {
            cwd: BLOCKS_PATH,
            onlyDirectories: true,
            markDirectories: true,
            deep: 1
        })

        for (const dir of blockDirs) {
            const blockPath = path.join(BLOCKS_PATH, dir)
            const normalizedDir = dir.replace(/[\\\/]+$/, "")
            const blockName = path.basename(normalizedDir)

            // Skip if it's not a directory or is empty
            if (blockName === "" || blockName === "." || blockName === "..") continue

            // Look for main component file (page.tsx)
            const mainFile = path.join(blockPath, "page.tsx")

            try {
                await fs.access(mainFile)
                const content = fsExtra.readFileSync(mainFile, "utf8")
                const dependencies = extractDependencies(content)
                const internalImports = extractInternalImports(content)

                // Extract registry dependencies from all block files
                const allRegistryDeps = new Set<string>()
                const blockFiles = await fastGlob("**/*.{tsx,ts}", { cwd: blockPath })

                for (const file of blockFiles) {
                    const fileAbs = path.join(blockPath, file)
                    const fileContent = fsExtra.readFileSync(fileAbs, "utf8")

                    // Extract registry dependencies from this file
                    const fileDeps = extractRegistryDependencies(fileContent, allComponents)
                    fileDeps.forEach(dep => allRegistryDeps.add(dep))
                }

                // Get all files in the block directory
                const files: any[] = []

                for (const file of blockFiles) {
                    const fileAbs = path.join(blockPath, file)
                    const fileContent = fsExtra.readFileSync(fileAbs, "utf8")

                    files.push({
                        type: "registry:component",
                        path: file,
                        content: fileContent,
                    })
                }

                // Attempt to include internal imports resolved to sibling files
                for (const imp of internalImports) {
                    const rel = imp.replace(/^@\//, "").replace(/^components\//, "")
                    const candidateTsx = path.join(blockPath, `${rel}.tsx`)
                    const candidateTs = path.join(blockPath, `${rel}.ts`)

                    if (fsExtra.existsSync(candidateTsx)) {
                        const alreadyIncluded = files.some(f =>
                            path.resolve(blockPath, f.path) === candidateTsx
                        )
                        if (!alreadyIncluded) {
                            files.push({
                                type: "registry:component",
                                path: path.relative(blockPath, candidateTsx),
                                content: fsExtra.readFileSync(candidateTsx, "utf8")
                            })
                        }
                    } else if (fsExtra.existsSync(candidateTs)) {
                        const alreadyIncluded = files.some(f =>
                            path.resolve(blockPath, f.path) === candidateTs
                        )
                        if (!alreadyIncluded) {
                            files.push({
                                type: "registry:component",
                                path: path.relative(blockPath, candidateTs),
                                content: fsExtra.readFileSync(candidateTs, "utf8")
                            })
                        }
                    }
                }

                const pageFile = {
                    type: "registry:page",
                    path: "page.tsx",
                    target: `app/${blockName}`,
                    content,
                }

                blocks.push({
                    name: blockName,
                    type: "blocks",
                    files: [pageFile, ...files],
                    dependencies,
                    registryDependencies: Array.from(allRegistryDeps), // Add registry dependencies!
                    description: `Alpha UI ${blockName} block`,
                    tags: ["block", "layout"],
                })
            } catch {
                // Main file doesn't exist, skip this block
                continue
            }
        }
    } catch (error) {
        console.warn("Failed to load blocks:", error)
    }

    return blocks
}