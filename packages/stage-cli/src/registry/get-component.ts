import { RegistryItem } from "@/schema"
import fastGlob from "fast-glob"
import fsExtra from "fs-extra"
import path from "path"
import { extractDependencies, extractInternalImports } from "./extra-dependencies"
import { COMPONENTS_PATH } from "./get-registry"

export async function getComponents(): Promise<RegistryItem[]> {
    const components: RegistryItem[] = []

    try {
        const componentFiles = await fastGlob("**/*.tsx", { cwd: COMPONENTS_PATH })

        for (const file of componentFiles) {
            const filePath = path.join(COMPONENTS_PATH, file)
            const content = fsExtra.readFileSync(filePath, "utf8")
            const name = path.basename(file, ".tsx")
            const dependencies = extractDependencies(content)
            const internalImports = extractInternalImports(content)
            const relatedFiles: { type: "registry:component"; path: string; content: string }[] = []
            for (const imp of internalImports) {
                const rel = imp.replace(/^@\//, "").replace(/^components\//, "")
                const candidateTsx = path.join(COMPONENTS_PATH, `${rel}.tsx`)
                const candidateTs = path.join(COMPONENTS_PATH, `${rel}.ts`)
                if (fsExtra.existsSync(candidateTsx)) {
                    relatedFiles.push({ type: "registry:component", path: path.relative(COMPONENTS_PATH, candidateTsx), content: fsExtra.readFileSync(candidateTsx, "utf8") })
                } else if (fsExtra.existsSync(candidateTs)) {
                    relatedFiles.push({ type: "registry:component", path: path.relative(COMPONENTS_PATH, candidateTs), content: fsExtra.readFileSync(candidateTs, "utf8") })
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
                description: `Alphabyte Labs ${name} component`,
                tags: ["ui", "component"],
            })
        }
    } catch (error) {
        console.warn("Failed to load components:", error)
    }

    return components
}