import { getRegistry } from "@/registry/get-registry.js"
import { createConfig, getConfig, resolveConfigPaths } from "@/utils/config.js"
import { Command } from "commander"
import { promises as fs } from "fs"
import path from "path"
import prompts from 'prompts'
import {
  Config,
  detectFileType,
  getTargetDirForFileType,
  RawConfig,
  RegistryItem,
  RegistryItemFile
} from "../schema/index.js"
import { logger } from "../utils/logger.js"
import { handleError } from "../utils/handle-error.js"
import { installDependencies } from "../utils/package-manager.js"
import { isNextAppPresent, scaffoldNextApp } from "../utils/scaffold.js"
import { preFlightAdd } from "../preflights/preflight-add.js"
import * as ERRORS from "../utils/errors.js"
import { highlighter } from "../utils/highlighter.js"

/**
 * Process file content to replace placeholders and apply config
 */
function processFileContent(
  content: string,
  config: Config,
  component: RegistryItem
): string {
  let processedContent = content

  // Replace import aliases based on config
  const aliases = config.aliases

  // Replace @/ aliases
  Object.entries(aliases).forEach(([alias, aliasPath]) => {
    if (aliasPath) {
      const pattern = new RegExp(`from ["']@/${alias}`, "g")
      processedContent = processedContent.replace(pattern, `from "${aliasPath}`)

      const importPattern = new RegExp(`import\\s+.*\\s+from\\s+["']@/${alias}`, "g")
      processedContent = processedContent.replace(importPattern, match =>
        match.replace(`@/${alias}`, aliasPath)
      )
    }
  })

  // Replace Tailwind prefix if configured
  if (config.tailwind?.prefix) {
    const prefix = config.tailwind.prefix
    processedContent = processedContent.replace(
      /className={`([^`]*)`}/g,
      (match, classes) => {
        const prefixedClasses = classes
          .split(' ')
          .map((cls: string) => cls.trim() ? `${prefix}${cls}` : cls)
          .join(' ')
        return `className={\`${prefixedClasses}\`}`
      }
    )

    processedContent = processedContent.replace(
      /className="([^"]*)"/g,
      (match, classes) => {
        const prefixedClasses = classes
          .split(' ')
          .map((cls: string) => cls.trim() ? `${prefix}${cls}` : cls)
          .join(' ')
        return `className="${prefixedClasses}"`
      }
    )
  }

  // Replace color scheme based on config
  if (config.tailwind?.baseColor && config.tailwind.baseColor !== "slate") {
    processedContent = processedContent.replace(
      /slate-(\d+)/g,
      `${config.tailwind.baseColor}-$1`
    )
  }

  // Replace icon imports based on icon library
  if (config.iconLibrary) {
    switch (config.iconLibrary) {
      case "lucide":
        processedContent = processedContent.replace(
          /from ["']@radix-ui\/react-icons["']/g,
          'from "lucide-react"'
        )
        processedContent = processedContent.replace(
          /from ["']@heroicons\/react\/[\w\/]+["']/g,
          'from "lucide-react"'
        )
        break
      case "radix":
        processedContent = processedContent.replace(
          /from ["']lucide-react["']/g,
          'from "@radix-ui/react-icons"'
        )
        processedContent = processedContent.replace(
          /from ["']@heroicons\/react\/[\w\/]+["']/g,
          'from "@radix-ui/react-icons"'
        )
        break
      case "heroicons":
        processedContent = processedContent.replace(
          /from ["']lucide-react["']/g,
          'from "@heroicons/react/24/outline"'
        )
        processedContent = processedContent.replace(
          /from ["']@radix-ui\/react-icons["']/g,
          'from "@heroicons/react/24/outline"'
        )
        break
    }
  }

  // Component-specific replacements
  if (component.name) {
    processedContent = processedContent.replace(
      /\{\{COMPONENT_NAME\}\}/g,
      component.name
    )
  }

  // Add CSS variables support if enabled
  if (config.tailwind?.cssVariables) {
    processedContent = processedContent.replace(
      /bg-primary/g,
      'bg-primary'
    )
  }

  return processedContent
}

/**
 * Resolve registry dependencies recursively
 * Returns all components needed in dependency order
 */
async function resolveRegistryDependencies(
  componentNames: string[],
  registry: { items: RegistryItem[] },
  options: {
    silent?: boolean
  } = {}
): Promise<{
  resolved: RegistryItem[]
  missing: string[]
}> {
  const { silent = false } = options
  const resolved = new Map<string, RegistryItem>()
  const missing: string[] = []
  const visited = new Set<string>()

  async function resolve(name: string) {
    // Already processed
    if (visited.has(name)) {
      return
    }
    visited.add(name)

    // Find component in registry
    const component = registry.items.find(item => item.name === name)

    if (!component) {
      if (!missing.includes(name)) {
        missing.push(name)
      }
      return
    }

    // Resolve dependencies first (depth-first)
    if (component.registryDependencies && component.registryDependencies.length > 0) {
      for (const depName of component.registryDependencies) {
        await resolve(depName)
      }
    }

    // Add this component after its dependencies
    resolved.set(name, component)
  }

  // Resolve all requested components
  for (const name of componentNames) {
    await resolve(name)
  }

  return {
    resolved: Array.from(resolved.values()),
    missing
  }
}

/**
 * Check if component files already exist
 */
async function checkComponentFilesExist(
  component: RegistryItem,
  config: Config,
  cwd: string
): Promise<boolean> {
  if (!component.files || component.files.length === 0) {
    return false
  }

  for (const file of component.files) {
    const targetDir = determineTargetDirectory(component, file, config)
    const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
    const fileName = path.basename(file.path)
    const filePath = path.join(fullTargetDir, fileName)

    try {
      await fs.access(filePath)
      return true // At least one file exists
    } catch {
      continue
    }
  }

  return false
}

/**
 * Add a component with batch confirmation for existing files
 */
export async function addComponent(
  component: RegistryItem,
  config: Config,
  cwd: string,
  options: {
    overwrite?: boolean
    silent?: boolean
    targetPath?: string
  } = {}
) {
  const { overwrite = false, silent = false, targetPath } = options

  try {
    const filesToAdd: string[] = []
    const filesToUpdate: string[] = []
    const fileOperations: Array<{
      file: string
      targetDir: string
      action: 'add' | 'update'
    }> = []

    if (!component.files?.length) {
      return
    }

    const existingFiles: Array<{
      fileName: string
      filePath: string
      fullTargetDir: string
      targetDir: string
      file: RegistryItemFile
    }> = []
    const newFiles: Array<{
      fileName: string
      filePath: string
      fullTargetDir: string
      targetDir: string
      file: RegistryItemFile
    }> = []

    // First pass: categorize files as existing or new
    for (const file of component.files) {
      let targetDir: string

      if (file.target) {
        targetDir = file.target
      } else if (targetPath) {
        targetDir = targetPath
      } else {
        targetDir = determineTargetDirectory(component, file, config)
      }

      const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
      const fileName = path.basename(file.path)
      const filePath = path.join(fullTargetDir, fileName)

      try {
        await fs.access(filePath)
        existingFiles.push({ fileName, filePath, fullTargetDir, targetDir, file })
      } catch {
        newFiles.push({ fileName, filePath, fullTargetDir, targetDir, file })
      }
    }

    // Add new files
    for (const { fileName, filePath, fullTargetDir, targetDir, file } of newFiles) {
      await fs.mkdir(fullTargetDir, { recursive: true })

      const fileContent = file.content || ""
      const processedContent = processFileContent(fileContent, config, component)
      await fs.writeFile(filePath, processedContent, "utf8")

      filesToAdd.push(fileName)
      fileOperations.push({ file: fileName, targetDir, action: 'add' })

      if (!silent) {
        logger.success(`Added: ${fileName} → ${targetDir}`)
      }
    }

    // Handle existing files with batch confirmation
    if (existingFiles.length > 0) {
      let shouldOverwriteAll = overwrite

      if (!overwrite && !silent) {
        logger.warn(`Found ${existingFiles.length} existing file(s):`)
        existingFiles.forEach(f => logger.info(`   • ${f.fileName}`))
        console.log()

        const response = await prompts({
          type: 'confirm',
          name: 'overwriteAll',
          message: `Overwrite ${existingFiles.length > 1 ? 'all existing files' : 'this file'}?`,
          initial: false
        })

        if (response.overwriteAll === undefined) {
          logger.info(`Skipped ${existingFiles.length} existing file(s)`)
          shouldOverwriteAll = false
        } else {
          shouldOverwriteAll = response.overwriteAll
        }
      }

      if (shouldOverwriteAll) {
        for (const { fileName, filePath, fullTargetDir, targetDir, file } of existingFiles) {
          await fs.mkdir(fullTargetDir, { recursive: true })

          const fileContent = file.content || ""
          const processedContent = processFileContent(fileContent, config, component)
          await fs.writeFile(filePath, processedContent, "utf8")

          filesToUpdate.push(fileName)
          fileOperations.push({ file: fileName, targetDir, action: 'update' })

          if (!silent) {
            logger.success(`Updated: ${fileName} → ${targetDir}`)
          }
        }
      } else {
        if (!silent && existingFiles.length > 0) {
          logger.info(`Skipped ${existingFiles.length} existing file(s)`)
        }
      }
    }

    await ensureRequiredDirectories(component, config, cwd, { silent })

    // Install dependencies
    let dependenciesResult = { success: true, installed: [], failed: [] }
    if (component.dependencies && component.dependencies.length > 0) {
      const res = await installDependenciesForComponent(
        component.dependencies,
        cwd,
        { silent }
      )
      dependenciesResult = res
        ? { success: (res as any).success, installed: (res as any).installed || [], failed: (res as any).failed || [] }
        : { success: true, installed: [], failed: [] }
    }

    let devDependenciesResult = { success: true, installed: [], failed: [] }
    if (component.devDependencies && component.devDependencies.length > 0) {
      const res = await installDependenciesForComponent(
        component.devDependencies,
        cwd,
        { silent, dev: true }
      )
      devDependenciesResult = res
        ? { success: (res as any).success, installed: (res as any).installed || [], failed: (res as any).failed || [] }
        : { success: true, installed: [], failed: [] }
    }

    const result = {
      success: true,
      component: component.name,
      filesAdded: filesToAdd,
      filesUpdated: filesToUpdate,
      fileOperations,
      dependenciesInstalled: [...dependenciesResult.installed, ...devDependenciesResult.installed],
      dependenciesFailed: [...dependenciesResult.failed, ...devDependenciesResult.failed],
      totalFiles: filesToAdd.length + filesToUpdate.length,
      totalDependencies: (component.dependencies?.length || 0) + (component.devDependencies?.length || 0)
    }

    if (!silent && result.totalFiles > 0) {
      logger.success(`✓ ${component.name} (${result.totalFiles} file${result.totalFiles > 1 ? 's' : ''})`)
    }

    return result

  } catch (error) {
    if (!silent) {
      logger.error(`Failed to add ${component.name}:`, error)
    }
    throw error
  }
}

/**
 * Determine the appropriate target directory for a file
 */
function determineTargetDirectory(
  component: RegistryItem,
  file: RegistryItemFile,
  config: Config
): string {
  const fileType = (file as any).type || detectFileType((file as any).path)

  if (component.type === "blocks") {
    if (file.path.includes('/')) {
      const dir = path.dirname(file.path)
      return path.join("app", component.name, dir)
    }
    return `app/${component.name}`
  }

  switch (fileType) {
    case 'registry:hook':
      return config.aliases.hooks || "@/hooks"
    case 'registry:util':
      return config.aliases.lib || "@/lib"
    case 'registry:icon':
      return config.aliases.icons || path.join(config.aliases.components, "icons")
    case 'registry:type':
      return config.aliases.types || path.join(config.aliases.lib || "@/lib", "types")
    case 'registry:style':
      return 'styles'
    case 'registry:config':
      return '.'
    case 'registry:page':
      return 'app'
    case 'registry:layout':
      return 'app'
    case 'registry:api':
      return 'app/api'
    case 'registry:component':
    default:
      if (component.type === "components") {
        return config.aliases.ui || "@/components/ui"
      }
      return config.aliases.components || "@/components"
  }
}

/**
 * Ensure required directories exist for component
 */
async function ensureRequiredDirectories(
  component: RegistryItem,
  config: Config,
  cwd: string,
  options: { silent?: boolean } = {}
): Promise<void> {
  if (!component.files || component.files.length === 0) {
    return
  }

  const dirsToCreate = new Set<string>()

  for (const file of component.files) {
    const filePath = file.path || (file as any).name
    const fileType = file.type || detectFileType(filePath)
    const targetDir = getTargetDirForFileType(fileType, config)
    dirsToCreate.add(targetDir)
  }

  for (const dir of dirsToCreate) {
    const fullPath = path.resolve(cwd, dir.replace("@/", ""))
    try {
      await fs.mkdir(fullPath, { recursive: true })
    } catch (error) {
      if (!options.silent) {
        logger.warn(`Failed to create directory ${dir}:`, error)
      }
    }
  }
}

/**
 * Install dependencies for a component
 */
async function installDependenciesForComponent(
  dependencies: string[],
  cwd: string,
  options: {
    silent?: boolean
    dev?: boolean
    exact?: boolean
  } = {}
) {
  const { silent = false, dev = false, exact = false } = options

  if (dependencies.length === 0) {
    return
  }

  try {
    if (!silent) {
      const depType = dev ? "dev dependencies" : "dependencies"
      logger.info(`Installing ${depType}: ${dependencies.join(", ")}`)
    }

    await installDependencies(dependencies, cwd, {
      dev,
      exact,
      silent
    })

    if (!silent) {
      logger.success(`Installed ${dependencies.length} ${dev ? "dev " : ""}package${dependencies.length > 1 ? 's' : ''}`)
    }

    return { success: true, installed: dependencies }

  } catch (error) {
    const depType = dev ? "dev dependencies" : "dependencies"
    if (!silent) {
      logger.warn(`Failed to install ${depType}`)
      logger.info(`Please install manually: npm install ${dev ? '--save-dev ' : ''}${dependencies.join(" ")}`)
    }

    return {
      success: false,
      installed: [],
      failed: dependencies,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Setup default configuration in a new project
 */
async function setupDefaultConfig(workingDir: string): Promise<Config> {
  const defaultRawConfig: RawConfig = {
    rsc: true,
    tsx: true,
    tailwind: {
      config: "tailwind.config.js",
      css: "app/globals.css",
      baseColor: "slate",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
    iconLibrary: "lucide",
    style: ""
  }

  // Create the config file
  await createConfig(defaultRawConfig, workingDir)

  // Create necessary directories
  await fs.mkdir(path.join(workingDir, "components", "ui"), { recursive: true })
  await fs.mkdir(path.join(workingDir, "lib"), { recursive: true })

  // Create utils.ts if it doesn't exist
  const utilsPath = path.join(workingDir, "lib", "utils.ts")
  try {
    await fs.access(utilsPath)
  } catch {
    const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    await fs.writeFile(utilsPath, utilsContent, "utf8")
  }

  // Install core dependencies
  try {
    logger.info("Installing core dependencies...")
    await installDependencies(
      ["clsx", "tailwind-merge", "class-variance-authority"],
      workingDir,
      { silent: true }
    )
  } catch (e) {
    logger.warn("Please install manually: npm i clsx tailwind-merge class-variance-authority")
  }

  // Now resolve and return the config with proper paths
  const resolvedConfig = await resolveConfigPaths(workingDir, defaultRawConfig)
  return resolvedConfig as Config
}

/**
 * Main add command
 */
export const add = new Command()
  .name("add")
  .description("Add components or blocks to your project")
  .argument("[components...]", "component names (e.g., button card)")
  .option("-o, --overwrite", "overwrite existing files", false)
  .option("-c, --cwd <cwd>", "working directory (defaults to current)", process.cwd())
  .option("-a, --all", "add all available components", false)
  .option("-p, --path <path>", "custom installation path")
  .option("-s, --silent", "suppress output", false)
  .option("--no-deps", "skip installing registry dependencies", false)
  .action(async (componentsArg: string[] | undefined, options) => {
    const cwd = options.cwd || process.cwd()
    const overwrite: boolean = !!options.overwrite
    const all: boolean = !!options.all
    const targetPath: string | undefined = options.path
    const silent: boolean = !!options.silent
    const installDeps: boolean = options.deps !== false

    try {
      // ========================================
      // STEP 1: Preflight checks
      // ========================================
      const preflightOptions = {
        components: componentsArg,
        yes: false,
        overwrite,
        cwd: path.resolve(cwd),
        all,
        path: targetPath,
        silent,
        cssVariables: true,
      }

      let { errors, config } = await preFlightAdd(preflightOptions)

      // No components.json file. Prompt the user to run init.
      let initHasRun = false
      if (errors[ERRORS.MISSING_CONFIG]) {
        if (!silent) {
          const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: `You need to create a ${highlighter.info(
              "components.json"
            )} file to add components. Proceed?`,
            initial: true,
          })

          if (!proceed) {
            logger.break()
            process.exit(1)
          }
        }

        // Run init automatically
        const { runInit } = await import("./init.js")
        config = await runInit({
          cwd,
          yes: true,
          default: false,
          baseColor: "slate",
          css: "app/globals.css",
          tailwindConfig: "tailwind.config.js",
          tailwindCss: "app/globals.css",
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
          iconLibrary: "lucide",
        })
        initHasRun = true
      }

      let workingDir = cwd
      if (errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
        const hasNext = await isNextAppPresent(cwd)

        if (!hasNext) {
          if (!silent) {
            logger.info("\nNo Next.js app detected.")
            logger.info("Launching create-next-app CLI...\n")
          }

          workingDir = await scaffoldNextApp(cwd)

          if (workingDir !== cwd && !silent) {
            logger.info(`\nProject: ${path.basename(workingDir)}`)
            logger.info("Installing components...\n")
          }
        }

        if (!config) {
          if (!silent) {
            logger.info("Setting up Alpha...\n")
          }

          config = await setupDefaultConfig(workingDir)

          if (!silent) {
            logger.success("Core setup complete\n")
          }
        }
      }

      if (!config) {
        throw new Error(
          `Failed to read config at ${highlighter.info(workingDir)}.`
        )
      }

      // ========================================
      // STEP 3: Resolve components
      // ========================================
      let toAdd: string[] = []
      const registry = await getRegistry()

      if (all) {
        toAdd = registry.items.map(i => i.name)
      } else if (Array.isArray(componentsArg) && componentsArg.length > 0) {
        toAdd = componentsArg
      } else {
        if (!silent) {
          logger.info("\nUsage:")
          logger.info("   npx alpha-kit add button card")
          logger.info("   npx alpha-kit add --all\n")
        }
        return
      }

      // ========================================
      // STEP 4: Resolve dependencies
      // ========================================
      const { resolved, missing } = await resolveRegistryDependencies(
        toAdd,
        registry,
        { silent }
      )

      // Report missing components
      if (missing.length > 0) {
        logger.warn(`\nComponents not found: ${missing.join(", ")}`)
      }

      if (resolved.length === 0) {
        if (!silent) {
          logger.error("No components to install")
        }
        return
      }

      // Show dependency tree if there are dependencies
      const hasDependencies = resolved.some(item =>
        item.registryDependencies && item.registryDependencies.length > 0
      )

      if (hasDependencies && installDeps && !silent) {
        logger.info("\nDependency tree:")

        for (const item of resolved) {
          if (toAdd.includes(item.name)) {
            logger.info(`   ${item.name}`)

            if (item.registryDependencies && item.registryDependencies.length > 0) {
              for (const dep of item.registryDependencies) {
                logger.info(`├─ ${dep}`)
              }
            }
          }
        }
        console.log()
      }

      // Filter out already installed components (unless overwrite is true)
      let componentsToInstall = resolved

      if (!overwrite) {
        const existingComponents: string[] = []
        const newComponentsList: RegistryItem[] = []

        for (const component of resolved) {
          const exists = await checkComponentFilesExist(component, config, workingDir)
          if (exists) {
            existingComponents.push(component.name)
          } else {
            newComponentsList.push(component)
          }
        }

        if (existingComponents.length > 0 && !silent) {
          logger.info(`Already installed: ${existingComponents.join(", ")}`)
        }

        componentsToInstall = newComponentsList
      }

      // ========================================
      // STEP 5: Install components
      // ========================================
      if (componentsToInstall.length === 0) {
        if (!silent) {
          logger.success("\nAll components already installed!")
          logger.info("Use --overwrite to reinstall\n")
        }
        return
      }

      if (!silent) {
        logger.info(`Installing ${componentsToInstall.length} component${componentsToInstall.length > 1 ? 's' : ''}...\n`)
      }

      let successCount = 0
      let failCount = 0

      for (const item of componentsToInstall) {
        try {
          await addComponent(item, config, workingDir, {
            overwrite,
            silent,
            targetPath
          })
          successCount++
        } catch (error) {
          if (!silent) {
            logger.error(`✗ ${item.name}`, error instanceof Error ? error.message : String(error))
          }
          failCount++
        }
      }

      // ========================================
      // STEP 6: Summary
      // ========================================
      if (!silent) {
        console.log()

        if (successCount > 0) {
          logger.success(`Installed: ${successCount}`)
        }

        if (failCount > 0) {
          logger.warn(`Failed: ${failCount}`)
        }

        if (workingDir !== cwd) {
          console.log()
          logger.info("Next steps:")
          logger.info(`cd ${path.basename(workingDir)}`)
          logger.info("npm run dev")
        } else {
          console.log()
          logger.info("Ready! Run: npm run dev")
        }
        console.log()
      }

    } catch (error) {
      logger.break()
      handleError(error)
    }
  })