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
├── tickets/            # Ticket storage
└── .gitignore         # Git ignore rules
```

## Create Your First Ticket

Create a ticket with a title:

```bash
hlavi tickets create "Implement user authentication"
```

You'll see output like:

```
✓ Created ticket TIK001
```

## Add Details to Your Ticket

Add a description:

```bash
hlavi tickets edit TIK001 -d "Add JWT-based authentication with login and logout"
```

Add acceptance criteria:

```bash
hlavi tickets edit TIK001 --ac "User can log in with email and password"
hlavi tickets edit TIK001 --ac "User can log out"
hlavi tickets edit TIK001 --ac "JWT token expires after 24 hours"
```

## View Your Tickets

List all tickets:

```bash
hlavi tickets list
```

View detailed information about a ticket:

```bash
hlavi tickets show TIK001
```

## What's Next?

- Learn more about [CLI commands](../cli/commands.md)
- Configure [AI agent automation](../agent/overview.md)
- Explore [board customization](../cli/board.md)
