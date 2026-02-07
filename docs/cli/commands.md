---
sidebar_position: 1
---

# CLI Commands

Complete reference for all Hlavi CLI commands.

## Global Options

All commands support these global options:

```bash
-h, --help       Print help information
-V, --version    Print version information
```

## hlavi init

Initialize a Hlavi project in the current directory.

```bash
hlavi init
```

**What it does:**
- Creates `.hlavi/` directory
- Generates default board configuration
- Creates `tickets/` subdirectory

**Example:**

```bash
$ hlavi init
✓ Initialized Hlavi project in /home/user/my-project
```

## hlavi tickets

Manage tickets in your project.

### Subcommands

#### list

List all tickets in the project.

```bash
hlavi tickets list
```

**Output:**

```
╭─────────┬──────────────────────────┬─────────────┬─────╮
│ ID      │ Title                    │ Status      │ ACs │
├─────────┼──────────────────────────┼─────────────┼─────┤
│ TIK001  │ Implement authentication │ In Progress │ 2/3 │
│ TIK002  │ Add user dashboard       │ New         │ 0/0 │
╰─────────┴──────────────────────────┴─────────────┴─────╯
```

#### create

Create a new ticket.

```bash
hlavi tickets create <title>
```

**Arguments:**
- `<title>` - Title of the ticket (required)

**Example:**

```bash
$ hlavi tickets create "Add dark mode support"
✓ Created ticket TIK003
```

#### show

Display detailed information about a ticket.

```bash
hlavi tickets show <id>
```

**Arguments:**
- `<id>` - Ticket ID (e.g., TIK001)

**Example:**

```bash
$ hlavi tickets show TIK001

Ticket TIK001
──────────────────────────────────────────────────
Title: Implement authentication
Status: In Progress

Description:
Add JWT-based authentication system

Acceptance Criteria:
  ✓ [1] User can log in
  ✓ [2] User can log out
  ○ [3] Token expires after 24h

Metadata:
  Created: 2024-01-15 10:30:00
  Updated: 2024-01-15 14:20:00
```

#### edit

Edit a ticket's properties.

```bash
hlavi tickets edit <id> [OPTIONS]
```

**Arguments:**
- `<id>` - Ticket ID (required)

**Options:**
- `-d, --description <text>` - Set ticket description
- `--ac <text>` - Add acceptance criterion
- `--remove-ac <text|number>` - Remove acceptance criterion

**Examples:**

Set description:
```bash
hlavi tickets edit TIK001 -d "Implement JWT-based auth"
```

Add acceptance criteria:
```bash
hlavi tickets edit TIK001 --ac "User can reset password"
```

Remove acceptance criterion by index:
```bash
hlavi tickets edit TIK001 --remove-ac 2
```

Remove acceptance criterion by text:
```bash
hlavi tickets edit TIK001 --remove-ac "User can reset password"
```

#### delete

Delete a ticket.

```bash
hlavi tickets delete <id> [OPTIONS]
```

**Arguments:**
- `<id>` - Ticket ID (required)

**Options:**
- `-f, --force` - Skip confirmation prompt

**Example:**

```bash
$ hlavi tickets delete TIK003
Delete ticket TIK003? [y/N] y
✓ Deleted ticket TIK003
```

With force flag:
```bash
hlavi tickets delete TIK003 --force
```

## hlavi board

Manage and view the kanban board.

### Subcommands

#### show

Display the kanban board (Coming soon).

```bash
hlavi board show
```

#### configure

Configure board columns and settings (Coming soon).

```bash
hlavi board configure
```

## hlavi agent

Manage AI agent execution.

### Subcommands

#### configure

Configure agent settings (Coming soon).

```bash
hlavi agent configure
```

#### start

Start agent execution for a ticket (Coming soon).

```bash
hlavi agent start <ticket-id>
```

#### stop

Stop the currently running agent (Coming soon).

```bash
hlavi agent stop
```

#### history

View agent execution history (Coming soon).

```bash
hlavi agent history
```
