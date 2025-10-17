<!-- bde4ea35-b657-4025-be1e-9368b8da7ef6 e12a0e00-6b22-401a-8b9f-00b054394feb -->
# Stage CLI – Full Test Plan

## Goals

- Validate build quality (lint, typecheck, build)
- Run unit tests
- Perform CLI smoke/E2E tests including auto-scaffold when outside Next.js projects

## Pre-requisites

- pnpm installed
- Node 18.18+ available

## Steps

### 1) Install dependencies (monorepo root)

```bash
pnpm install
```

### 2) Lint and typecheck

```bash
# Lint whole repo or the package only
pnpm -w lint || pnpm --filter @alphabyte-labs/stage-cli lint

# Typecheck
pnpm --filter @alphabyte-labs/stage-cli typecheck || pnpm --filter @alphabyte-labs/stage-cli tsc -p tsconfig.json --noEmit
```

### 3) Build the CLI package

```bash
pnpm --filter @alphabyte-labs/stage-cli build
```

### 4) Unit tests

```bash
pnpm --filter @alphabyte-labs/stage-cli test
```

### 5) CLI smoke tests (local)

- Verify help and version:
```bash
node packages/stage-cli/dist/index.js --help
node packages/stage-cli/dist/index.js --version
```

- List registry:
```bash
node packages/stage-cli/dist/index.js list
node packages/stage-cli/dist/index.js list --type components
node packages/stage-cli/dist/index.js list --type blocks
```

- View/search:
```bash
node packages/stage-cli/dist/index.js view button
node packages/stage-cli/dist/index.js search button
```


### 6) E2E – inside a Next.js project

```bash
set TESTDIR=.tmp/inside-next && rmdir /s /q %TESTDIR% 2>nul & mkdir %TESTDIR% & cd %TESTDIR%
# Create Next.js app
npx --yes create-next-app@latest next-app --ts --eslint --tailwind --use-npm --app
cd next-app
# Init CLI config
node ../../packages/stage-cli/dist/index.js init -y
# Add component and block
node ../../packages/stage-cli/dist/index.js add button
node ../../packages/stage-cli/dist/index.js add hero-section
# Custom path
node ../../packages/stage-cli/dist/index.js add button --path src/components
```

### 7) E2E – outside a Next.js project (auto-scaffold)

```bash
set OUTDIR=.tmp/outside && rmdir /s /q %OUTDIR% 2>nul & mkdir %OUTDIR% & cd %OUTDIR%
# Run add directly – should scaffold Next.js app and then add
node ../../packages/stage-cli/dist/index.js add hero-section --silent
# Validate scaffolded project structure exists (app/, package.json, etc.)
```

### 8) Flags and options

```bash
# Overwrite
node ../../packages/stage-cli/dist/index.js add button --overwrite
# Add all
node ../../packages/stage-cli/dist/index.js add --all --silent
```

### 9) Artifacts and logging

- Capture stdout/stderr logs for each step
- Record generated files in temp dirs

## Success Criteria

- No lint/type errors; build succeeds
- Unit tests pass
- CLI commands run without crashing
- Auto-scaffold confirmed when adding outside a Next.js project
- Components/blocks copied into expected paths

### To-dos

- [ ] Install repo dependencies via pnpm at root
- [ ] Run lint and typecheck for stage-cli
- [ ] Build packages/stage-cli
- [ ] Run unit tests for stage-cli
- [ ] Run basic CLI smoke tests (help/version/list/view/search)
- [ ] E2E inside Next.js project: init, add component/block, custom path
- [ ] E2E outside project: confirm auto-scaffold then add
- [ ] Test overwrite, all, silent flags
- [ ] Collect logs and verify generated files