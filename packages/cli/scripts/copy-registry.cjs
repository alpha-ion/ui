const fs = require("fs-extra")
const path = require("path")

// __dirname = packages/stage-cli/scripts
// We need monorepo root/apps/v1/registry → go up three levels to packages/, then up one to repo root
const src = path.resolve(__dirname, "..", "..", "..", "apps", "v1", "registry")
const dest = path.join(__dirname, "..", "dist", "registry")

;(async () => {
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


