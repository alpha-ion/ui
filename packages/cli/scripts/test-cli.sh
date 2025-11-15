#!/bin/bash

# Alpha Kit CLI Testing Script
# This script helps test the CLI in development

set -e

echo "🧪 Alpha Kit CLI Testing Script"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if we're in the CLI directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from packages/cli directory"
    exit 1
fi

# Build the CLI
print_info "Building CLI..."
pnpm build

if [ $? -eq 0 ]; then
    print_success "CLI built successfully"
else
    print_error "Failed to build CLI"
    exit 1
fi

echo ""

# Create test directory
TEST_DIR="../../test-alpha-cli"
print_info "Creating test directory: $TEST_DIR"

if [ -d "$TEST_DIR" ]; then
    print_warning "Test directory already exists. Removing..."
    rm -rf "$TEST_DIR"
fi

mkdir -p "$TEST_DIR"
print_success "Test directory created"

echo ""

# Test 1: List all components
print_info "Test 1: Listing all components"
echo "-----------------------------------"
node dist/index.js list --cwd "$TEST_DIR"
echo ""

# Test 2: View a component
print_info "Test 2: Viewing component details"
echo "-----------------------------------"
node dist/index.js view button --cwd "$TEST_DIR" || true
echo ""

# Test 3: View a block
print_info "Test 3: Viewing block details"
echo "-----------------------------------"
node dist/index.js view hero-section --cwd "$TEST_DIR" || true
echo ""

# Ask user if they want to test installation
echo ""
read -p "Do you want to test component installation? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Test 4: Install a component
    print_info "Test 4: Installing button component"
    echo "-----------------------------------"
    node dist/index.js add button --cwd "$TEST_DIR"
    echo ""
    
    # Test 5: Install a block with dependencies
    print_info "Test 5: Installing hero-section block (with dependencies)"
    echo "-----------------------------------"
    node dist/index.js add hero-section --cwd "$TEST_DIR"
    echo ""
    
    # Show installed files
    print_info "Installed files:"
    echo "-----------------------------------"
    if [ -d "$TEST_DIR/components" ]; then
        echo "Components:"
        find "$TEST_DIR/components" -type f
    fi
    if [ -d "$TEST_DIR/app" ]; then
        echo "Blocks:"
        find "$TEST_DIR/app" -type f
    fi
    echo ""
fi

# Ask if user wants to keep test directory
echo ""
read -p "Keep test directory? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "Removing test directory..."
    rm -rf "$TEST_DIR"
    print_success "Test directory removed"
else
    print_info "Test directory kept at: $TEST_DIR"
    print_info "You can test it with: cd $TEST_DIR && npm run dev"
fi

echo ""
print_success "Testing complete!"
echo ""