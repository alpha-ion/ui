import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.resolve(__dirname, "..", "..", "..", "apps", "v1", "registry")
const dest = path.join(__dirname, "..", "dist", "registry")

    ; (async () => {
        try {
            const exists = await fs.pathExists(src)
            if (!exists) {
                console.log("Registry source not found at", src)
                process.exit(0)
            }
            await fs.ensureDir(dest)
            await fs.copy(src, dest, { overwrite: true, errorOnExist: false })
            console.log("Copied registry to dist/registry")
        } catch (err) {
            console.error("Failed to copy registry:", err)
            process.exit(1)
        }
    })()


