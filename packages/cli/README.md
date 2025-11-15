# Alpha CLI

A CLI tool for adding Alpha UI components and blocks to your project.

## Installation

```bash
# Install globally
npm install -g @alpha

# Or use with npx
npx @alpha
```

## Usage

### Initialize a project

```bash
alpha init
```

This will:
- Create a `components.json` configuration file
- Install required dependencies
- Set up your project for using Alpha UI components

### Add components or blocks

```bash
# Add a specific component
alpha add button

# Add a specific block
alpha add hero-section

# Add multiple items
alpha add button card hero-section

# Add all available components and blocks
alpha add --all

# Add with custom path
alpha add button --path src/components
```

### List available components and blocks

```bash
# List all items
alpha list

# List only components
alpha list --type components

# List only blocks
alpha list --type blocks

# Search for specific items
alpha list --search button
```

### View component details

```bash
# View component details
alpha view button

# View block details
alpha view hero-section

# Specify type
alpha view button --type components
```

### Search components and blocks

```bash
# Search for items
alpha search button

# Search with type filter
alpha search form --type components
```

## Configuration

The CLI uses a `components.json` file to configure your project:

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Available Commands

- `init` - Initialize your project
- `add` - Add components or blocks
- `list` - List available components and blocks
- `view` - View component or block details
- `search` - Search for components and blocks

## Options

- `-y, --yes` - Skip confirmation prompts
- `-o, --overwrite` - Overwrite existing files
- `-c, --cwd <cwd>` - Working directory
- `-a, --all` - Add all available items
- `-p, --path <path>` - Custom path for components
- `-s, --silent` - Mute output
- `-t, --type <type>` - Filter by type (components, blocks, all)
- `-s, --search <search>` - Search term

## License

MIT
