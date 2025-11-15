import { getRegistryItem } from "@/registry/registry-item.js"
import { Command } from "commander"
import { z } from "zod"
import { logger } from "../utils/logger.js"

const viewOptionsSchema = z.object({
  cwd: z.string(),
  component: z.string(),
  type: z.enum(["components", "blocks"]).optional(),
})

export const view = new Command()
  .name("view")
  .description("View details of a specific component or block")
  .argument("<component>", "name of the component or block to view")
  .option("-c, --cwd <cwd>", "The working directory. defaults to the current directory.", process.cwd())
  .option("-t, --type <type>", "Type of item (components, blocks)")
  .action(async (component, options) => {
    const opts = viewOptionsSchema.parse({ component, ...options })

    try {
      await runView(opts)
    } catch (error) {
      logger.error("Failed to view component:", error)
      process.exit(1)
    }
  })

async function runView(options: z.infer<typeof viewOptionsSchema>) {
  const { component, type } = options

  // Try to find the component
  let item = null

  if (type) {
    item = await getRegistryItem(component, type)
  } else {
    // Try both types
    item = await getRegistryItem(component, "components") ||
      await getRegistryItem(component, "blocks")
  }

  if (!item) {
    logger.error(`Component "${component}" not found in registry`)
    logger.info("\nUse 'alpha-kit list' to see available components and blocks\n")
    return
  }

  // Display component details
  console.log()
  logger.info(item.name)
  console.log()
  logger.info(`Type: ${item.type}`)

  if (item.description) {
    logger.info(`Description: ${item.description}`)
  }

  if (item.tags && item.tags.length > 0) {
    logger.info(`Tags: ${item.tags.join(", ")}`)
  }

  // Display registry dependencies (other components this depends on)
  if (item.registryDependencies && item.registryDependencies.length > 0) {
    console.log()
    logger.info("Required components:")
    item.registryDependencies.forEach(dep => {
      logger.info(dep)
    })
    logger.info("\nThese will be installed automatically")
  }

  // Display npm dependencies
  if (item.dependencies && item.dependencies.length > 0) {
    console.log()
    logger.info(`NPM dependencies:`)
    item.dependencies.forEach(dep => {
      logger.info(dep)
    })
  }

  if (item.devDependencies && item.devDependencies.length > 0) {
    console.log()
    logger.info(`Dev dependencies:`)
    item.devDependencies.forEach(dep => {
      logger.info(`${dep}`)
    })
  }

  // Display files
  console.log()
  logger.info(`Files (${item.files?.length || 0}):`)
  item.files?.forEach(file => {
    const fileType = (file as any).type || 'unknown'
    const target = (file as any).target ? ` → ${(file as any).target}` : ''
    logger.info(`${file.path} (${fileType})${target}`)
  })

  // Usage example
  console.log()
  logger.info(`Usage:`)
  logger.info(`   npx alpha-kit add ${item.name}`)

  if (item.registryDependencies && item.registryDependencies.length > 0) {
    logger.info(`\nThis will also install: ${item.registryDependencies.join(", ")}`)
  }

  console.log()
}