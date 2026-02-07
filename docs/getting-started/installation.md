---
sidebar_position: 1
---

# Installation

Learn how to install Hlavi on your system.

## Prerequisites

Before installing Hlavi, ensure you have:

- **Rust 1.75 or higher** - [Install Rust](https://rustup.rs/)
- **Git** - For cloning the repository

## Installing from Source

Currently, Hlavi can be installed from source. We're working on providing pre-built binaries and package manager support.

### Clone the Repository

```bash
git clone https://github.com/mmuhlariholdings/hlavi-cli.git
cd hlavi-cli
```

### Build and Install

```bash
cargo install --path .
```

This will compile Hlavi and install it to your Cargo bin directory (usually `~/.cargo/bin`).

### Verify Installation

```bash
hlavi --version
```

You should see the version number printed to the console.

## Next Steps

Now that Hlavi is installed, you can:

1. [Quick Start Guide](./quick-start.md) - Create your first project
2. [Configuration](./configuration.md) - Learn about configuration options
