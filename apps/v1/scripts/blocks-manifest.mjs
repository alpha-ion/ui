import { promises as fs } from "fs"
import path from "path"

const UI_DIR = path.join(process.cwd(), "registry", "view")
const OUTPUT = path.join(process.cwd(), "registry", "registry-blocks.json")

function extractDeps(src) { }

function extractInternal(src) { }

async function getAllTSXFiles(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        const files = await Promise.all(
            entries.map((entry) => {
                const fullPath = path.join(dir, entry.name)
                if (entry.isDirectory()) {
                    return getAllTSXFiles(fullPath)
                } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".jsx"))) {
                    return [fullPath]
                } else {
                    return []
                }
            }),
        )
        return files.flat()
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.log(`Error reading directory ${dir}: ${error.message}`)
        }
        return []
    }
}

async function main() {
    const files = await getAllTSXFiles(UI_DIR)
    const result = {}

    for (const fullPath of files) {
        const file = path.basename(fullPath)
        const name = path.basename(file, ".tsx")
        const src = await fs.readFile(fullPath, "utf8")
        const deps = extractDeps(src)
        const internal = extractInternal(src)

        const ancillary = []
        if (name === "pre") {
            ancillary.push({ type: "style", path: "styles/prism-theme.css" })
        }

        result[name] = {
            dependencies: deps,
            internalImports: internal,
            ancillary,
        }
    }

    await fs.mkdir(path.dirname(OUTPUT), { recursive: true })
    await fs.writeFile(OUTPUT, JSON.stringify(result, null, 2))
    console.log(`Wrote ${OUTPUT}`)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
