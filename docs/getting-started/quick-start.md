---
sidebar_position: 2
---

# Quick Start

Get up and running with Hlavi in just a few minutes.

## Initialize a Project

Navigate to your project directory and initialize Hlavi:

```bash
cd my-project
hlavi init
```

This creates a `.hlavi/` directory with the following structure:

```
.hlavi/
├── board.json          # Board configuration
├── tasks/              # Task storage
└── .gitignore         # Git ignore rules
```

## Create Your First Task

Create a task with a title:

```bash
hlavi tasks create "Implement user authentication"
```

You'll see output like:

```
✓ Created task HLA1
```

## Add Details to Your Task

Add a description:

```bash
hlavi tasks edit HLA1 -d "Add JWT-based authentication with login and logout"
```

Add acceptance criteria:

```bash
hlavi tasks edit HLA1 --ac "User can log in with email and password"
hlavi tasks edit HLA1 --ac "User can log out"
hlavi tasks edit HLA1 --ac "JWT token expires after 24 hours"
```

## View Your Tasks

List all tasks:

```bash
hlavi tasks list
```

View detailed information about a task:

```bash
hlavi tasks show HLA1
```

## What's Next?

- Learn more about [CLI commands](../cli/commands.md)
- Configure [AI agent automation](../agent/overview.md)
- Explore [board customization](../cli/board.md)
