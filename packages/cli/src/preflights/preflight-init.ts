import path from "path"
import fs from "fs-extra"
import { z } from "zod"
import * as ERRORS from "../utils/errors"
import { getConfig } from "../utils/config"

export const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  default: z.boolean(),
  baseColor: z.string().optional(),
  css: z.string().optional(),
  tailwindConfig: z.string().optional(),
  tailwindCss: z.string().optional(),
  components: z.string().optional(),
  utils: z.string().optional(),
  ui: z.string().optional(),
  lib: z.string().optional(),
  hooks: z.string().optional(),
  iconLibrary: z.enum(["lucide", "radix", "heroicons"]).optional(),
  packageManager: z.enum(["npm", "yarn", "pnpm", "bun"]).optional(),
})

// Helper function to get project info
async function getProjectInfo(cwd: string) {
  // This is a simplified version - you can expand this based on your needs
  const packageJsonPath = path.resolve(cwd, "package.json")
  
  if (!fs.existsSync(packageJsonPath)) {
    return null
  }

  try {
    const packageJson = await fs.readJson(packageJsonPath)
    return {
      framework: {
        name: packageJson.dependencies?.next ? "next" : "unknown",
      },
      tailwindVersion: "v3", // You can detect this from tailwind.config
    }
  } catch {
    return null
  }
}

export async function preFlightInit(
  options: z.infer<typeof initOptionsSchema>
) {
  const errors: Record<string, boolean> = {}
  let projectInfo = null

  // Ensure target directory exists.
  // Check for empty project. We assume if no package.json exists, the project is empty.
  if (
    !fs.existsSync(options.cwd) ||
    !fs.existsSync(path.resolve(options.cwd, "package.json"))
  ) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    return {
      errors,
      config: null,
      projectInfo: null,
    }
  }

  // Check for existing components.json file.
  if (fs.existsSync(path.resolve(options.cwd, "components.json"))) {
    errors[ERRORS.EXISTING_CONFIG] = true
    try {
      const config = await getConfig(options.cwd)
      return {
        errors,
        config,
        projectInfo: await getProjectInfo(options.cwd),
      }
    } catch {
      // Invalid config, will be handled by init command
    }
  }

  try {
    projectInfo = await getProjectInfo(options.cwd)
  } catch {
    // Project info not critical for init
  }

  return {
    errors,
    config: null,
    projectInfo,
  }
}
