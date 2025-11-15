import { RegistryItem } from "@/schema"
import fastGlob from "fast-glob"
import fsExtra from "fs-extra"
import path from "path"
import { extractDependencies, extractInternalImports } from "./extra-dependencies"
import { COMPONENTS_PATH } from "./get-registry"

/**
 * Extract registry dependencies from internal imports
 */
function extractRegistryDependencies(
    content: string,
    allAvailableComponents: string[],
    currentComponentName: string
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

            // Don't include self-reference
            if (componentName === currentComponentName) {
                continue
            }

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

export async function getComponents(): Promise<RegistryItem[]> {
    const components: RegistryItem[] = []

    try {
        const componentFiles = await fastGlob("**/*.tsx", { cwd: COMPONENTS_PATH })

        // Get all component names first for dependency detection
        const allComponentNames = componentFiles.map(file => path.basename(file, ".tsx"))

        for (const file of componentFiles) {
            const filePath = path.join(COMPONENTS_PATH, file)
            const content = fsExtra.readFileSync(filePath, "utf8")
            const name = path.basename(file, ".tsx")

            // Extract npm dependencies
            const dependencies = extractDependencies(content)

            // Extract internal imports
            const internalImports = extractInternalImports(content)

            // Extract registry dependencies (other components this component uses)
            const registryDeps = extractRegistryDependencies(
                content,
                allComponentNames,
                name
            )

            // Find related files based on internal imports
            const relatedFiles: { type: "registry:component"; path: string; content: string }[] = []
            for (const imp of internalImports) {
                const rel = imp.replace(/^@\//, "").replace(/^components\//, "")
                const candidateTsx = path.join(COMPONENTS_PATH, `${rel}.tsx`)
                const candidateTs = path.join(COMPONENTS_PATH, `${rel}.ts`)

                if (fsExtra.existsSync(candidateTsx)) {
                    relatedFiles.push({
                        type: "registry:component",
                        path: path.relative(COMPONENTS_PATH, candidateTsx),
                        content: fsExtra.readFileSync(candidateTsx, "utf8")
                    })
                } else if (fsExtra.existsSync(candidateTs)) {
                    relatedFiles.push({
                        type: "registry:component",
                        path: path.relative(COMPONENTS_PATH, candidateTs),
                        content: fsExtra.readFileSync(candidateTs, "utf8")
                    })
                }
            }

            components.push({
                name,
                type: "components",
                files: [{
                    type: "registry:component",
                    path: file,
                    content,
                }, ...relatedFiles],
                dependencies,
                registryDependencies: registryDeps.length > 0 ? registryDeps : undefined,
                description: `Alpha UI ${name} component`,
                tags: ["ui", "component"],
            })
        }
    } catch (error) {
        console.warn("Failed to load components:", error)
    }

    return components
}