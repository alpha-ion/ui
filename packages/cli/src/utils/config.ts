import { cosmiconfig } from "cosmiconfig"
import fsExtra from "fs-extra"
import path from "path"
import { loadConfig } from "tsconfig-paths"
import { Config, RawConfig, rawConfigSchema } from "../schema/index.js"

export const DEFAULT_COMPONENTS = "@/components"
export const DEFAULT_UTILS = "@/lib/utils"
export const DEFAULT_TAILWIND_CSS = "app/globals.css"
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js"
export const DEFAULT_TAILWIND_BASE_COLOR = "slate"

export const explorer = cosmiconfig("components", {
  searchPlaces: ["components.json"],
  cache: false, // Disable cache to ensure fresh reads
})

export async function getConfig(cwd: string): Promise<Config | null> {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  // Ensure icon library has default
  if (!config.iconLibrary) {
    config.iconLibrary = "lucide"
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(
  cwd: string,
  config: RawConfig
): Promise<Config> {
  // Load tsconfig for path mapping (if exists)
  const tsConfig = await loadConfig(cwd)

  const resolvePath = (p: string) => {
    if (p.startsWith("@/")) return p
    return p
  }

  const resolved = {
    ...config,
    aliases: {
      components: resolvePath(config.aliases?.components || DEFAULT_COMPONENTS),
      utils: resolvePath(config.aliases?.utils || DEFAULT_UTILS),
      ui: resolvePath(config.aliases?.ui || `${DEFAULT_COMPONENTS}/ui`),
      lib: resolvePath(config.aliases?.lib || "@/lib"),
      hooks: resolvePath(config.aliases?.hooks || "@/hooks"),
    },
  } as Config

  return resolved
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    // Clear any cache before searching
    explorer.clearCaches()
    
    const configFile = path.join(cwd, "components.json")
    
    // Check if file exists first
    const exists = await fsExtra.pathExists(configFile)
    if (!exists) {
      return null
    }

    // Read and parse the file directly
    const content = await fsExtra.readFile(configFile, "utf-8")
    const parsed = JSON.parse(content)
    
    // Validate against schema
    const validated = rawConfigSchema.parse(parsed)
    
    return validated
  } catch (error) {
    // If file doesn't exist or is invalid, return null
    if (error instanceof Error && error.message.includes('ENOENT')) {
      return null
    }
    
    throw new Error(`Failed to load config: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function createConfig(
  config: Partial<RawConfig>, 
  cwd: string
): Promise<string> {
  const configPath = path.join(cwd, "components.json")
  
  // Ensure directory exists
  await fsExtra.ensureDir(cwd)
  
  // Write config file with proper formatting
  const configContent = JSON.stringify(config, null, 2)
  await fsExtra.writeFile(configPath, configContent, "utf-8")
  
  // Verify the file was written
  const exists = await fsExtra.pathExists(configPath)
  if (!exists) {
    throw new Error(`Failed to create config file at ${configPath}`)
  }
  
  // Clear any caches
  explorer.clearCaches()
  
  return configPath
}

export async function updateConfig(
  cwd: string,
  updates: Partial<RawConfig>
): Promise<RawConfig> {
  const existingConfig = await getRawConfig(cwd)
  const newConfig = { ...existingConfig, ...updates } as RawConfig

  const configPath = path.join(cwd, "components.json")
  const configContent = JSON.stringify(newConfig, null, 2)
  await fsExtra.writeFile(configPath, configContent, "utf-8")
  
  // Clear cache
  explorer.clearCaches()
  
  return newConfig
}

export function getConfigPath(cwd: string): string {
  return path.join(cwd, "components.json")
}

export async function configExists(cwd: string): Promise<boolean> {
  const configPath = getConfigPath(cwd)
  return fsExtra.pathExists(configPath)
}

/**
 * Validate and ensure config has all required fields
 */
export function ensureConfigDefaults(config: Partial<RawConfig>): RawConfig {
  return {
    rsc: config.rsc ?? false,
    tsx: config.tsx ?? true,
    tailwind: {
      config: config.tailwind?.config || DEFAULT_TAILWIND_CONFIG,
      css: config.tailwind?.css || DEFAULT_TAILWIND_CSS,
      baseColor: config.tailwind?.baseColor || DEFAULT_TAILWIND_BASE_COLOR,
      cssVariables: config.tailwind?.cssVariables ?? true,
      prefix: config.tailwind?.prefix || "",
      darkMode: config.tailwind?.darkMode || "class",
    },
    aliases: {
      components: config.aliases?.components || DEFAULT_COMPONENTS,
      utils: config.aliases?.utils || DEFAULT_UTILS,
      ui: config.aliases?.ui || `${DEFAULT_COMPONENTS}/ui`,
      lib: config.aliases?.lib || "@/lib",
      hooks: config.aliases?.hooks || "@/hooks",
    },
    iconLibrary: config.iconLibrary || "lucide",
    packageManager: config.packageManager,
  } as RawConfig
}