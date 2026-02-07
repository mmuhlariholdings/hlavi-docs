---
sidebar_position: 1
slug: /
---

# Welcome to Hlavi

Hlavi is a CLI-based kanban task management system with AI agent support.

## What is Hlavi?

Hlavi helps you manage tasks directly from your terminal with support for AI-powered automation. Track your work on a kanban board, create tickets with acceptance criteria, and let AI agents complete tasks for you.

## Key Features

- **CLI-First**: Fast, keyboard-driven workflow
- **Git-Friendly**: All data stored as JSON files
- **AI-Powered**: Optional AI agent automation
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Self-Contained**: No external database required
- **Open Source**: Transparent and community-driven

## Quick Links

- [Installation Guide](./getting-started/installation.md)
- [Quick Start Tutorial](./getting-started/quick-start.md)
- [CLI Commands Reference](./cli/commands.md)
- [AI Agent Overview](./agent/overview.md)

## Getting Help

- [GitHub Issues](https://github.com/mmuhlariholdings/hlavi/issues)
- [GitHub Discussions](https://github.com/mmuhlariholdings/hlavi/discussions)

## Example Workflow

```bash
# Initialize a project
hlavi init

# Create a ticket
hlavi tickets create "Add user authentication"

# Add acceptance criteria
hlavi tickets edit HLA1 --ac "User can log in"
hlavi tickets edit HLA1 --ac "User can log out"

# View your tickets
hlavi tickets list

# Let the AI agent work on it
hlavi agent start HLA1
```

## Architecture

Hlavi is built with Rust and follows a modular architecture:

- **hlavi-core**: Domain models and business logic
- **hlavi-cli**: Command-line interface
- **hlavi-agent**: AI agent orchestration
- **hlavi-api**: HTTP API server

Ready to get started? Head over to the [Installation Guide](./getting-started/installation.md).
