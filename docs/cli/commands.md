---
sidebar_position: 1
---

# Commands

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
│ HLA1  │ Implement authentication │ In Progress │ 2/3 │
│ HLA2  │ Add user dashboard       │ New         │ 0/0 │
╰─────────┴──────────────────────────┴─────────────┴─────╯
```

#### create

Create a new ticket with a title.

```bash
hlavi tickets create <title>
```

**Arguments:**
- `<title>` - Title of the ticket (required)

**Example:**

```bash
$ hlavi tickets create "Add dark mode support"
✓ Created ticket HLA3
```

After creating a ticket, use `hlavi tickets edit` to add description, dates, and acceptance criteria.

#### show

Display detailed information about a ticket.

```bash
hlavi tickets show <id>
```

**Arguments:**
- `<id>` - Ticket ID (e.g., HLA1, hla1, or Hla1 - case insensitive)

**Example:**

```bash
$ hlavi tickets show HLA1

Ticket HLA1
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
  Start Date: 2024-01-15
  End Date: 2024-01-22
```

:::tip Case-Insensitive Ticket IDs
Ticket IDs are case-insensitive. You can use `HLA1`, `hla1`, or `Hla1` - they all refer to the same ticket.
:::

#### search

Search for tickets by title, description, or acceptance criteria.

```bash
hlavi tickets search <query>
```

**Arguments:**
- `<query>` - Search query (case-insensitive)

**What it searches:**
- Ticket titles
- Ticket descriptions
- Acceptance criteria descriptions

**Examples:**

Search for tickets about authentication:
```bash
$ hlavi tickets search authentication

✓ 2 ticket(s) matching "authentication"

╭──────┬─────────────────────────┬─────────────┬─────╮
│ ID   │ Title                   │ Status      │ ACs │
├──────┼─────────────────────────┼─────────────┼─────┤
│ HLA1 │ Implement authentication│ In Progress │ 2/3 │
│ HLA5 │ Add OAuth authentication│ New         │ 0/2 │
╰──────┴─────────────────────────┴─────────────┴─────╯
```

Case-insensitive search:
```bash
# These all return the same results
hlavi tickets search LOGIN
hlavi tickets search login
hlavi tickets search Login
```

Search in descriptions:
```bash
hlavi tickets search "JWT token"
```

Search in acceptance criteria:
```bash
hlavi tickets search "password reset"
```

:::info Search Tips
- The search is case-insensitive
- Searches across title, description, and all acceptance criteria
- Use quotes for multi-word queries
- Empty results will display a helpful message
:::

#### edit

Edit a ticket's properties.

```bash
hlavi tickets edit <id> [OPTIONS]
```

**Arguments:**
- `<id>` - Ticket ID (required, case-insensitive)

**Options:**

*Basic Properties:*
- `-t, --title <text>` - Update ticket title
- `-d, --description <text>` - Set ticket description

*Date Management:*
- `--start-date <date>` - Set start date (YYYY-MM-DD or RFC 3339 format)
- `--end-date <date>` - Set end date (YYYY-MM-DD or RFC 3339 format)
- `--clear-start-date` - Clear the start date
- `--clear-end-date` - Clear the end date

*Acceptance Criteria:*
- `--ac <text>` - Add acceptance criterion
- `--remove-ac <text|number>` - Remove acceptance criterion by description or ID
- `--complete-ac <number>` - Mark acceptance criterion as complete
- `--incomplete-ac <number>` - Mark acceptance criterion as incomplete
- `--toggle-ac <number>` - Toggle acceptance criterion completion status

**Examples:**

Update title:
```bash
hlavi tickets edit HLA1 --title "New ticket title"
# or with short flag
hlavi tickets edit hla1 -t "New ticket title"
```

Set description:
```bash
hlavi tickets edit HLA1 -d "Implement JWT-based auth"
```

Set start and end dates:
```bash
# Using simple date format (YYYY-MM-DD)
hlavi tickets edit HLA1 --start-date 2024-01-15 --end-date 2024-01-22

# Using RFC 3339 format for specific times
hlavi tickets edit HLA1 --start-date 2024-01-15T09:00:00Z --end-date 2024-01-22T17:00:00Z
```

Clear dates:
```bash
hlavi tickets edit HLA1 --clear-start-date
hlavi tickets edit HLA1 --clear-end-date
```

Manage acceptance criteria:
```bash
# Add a new acceptance criterion
hlavi tickets edit HLA1 --ac "User can reset password"

# Mark AC #2 as complete
hlavi tickets edit HLA1 --complete-ac 2

# Mark AC #1 as incomplete
hlavi tickets edit HLA1 --incomplete-ac 1

# Toggle AC #3 status
hlavi tickets edit HLA1 --toggle-ac 3

# Remove acceptance criterion by ID
hlavi tickets edit HLA1 --remove-ac 2

# Remove acceptance criterion by text
hlavi tickets edit HLA1 --remove-ac "User can reset password"
```

Combine multiple operations:
```bash
hlavi tickets edit HLA1 \
  --title "Updated Authentication" \
  --start-date 2024-01-15 \
  --end-date 2024-01-22 \
  --ac "Add password strength meter"
```

#### delete

Delete a ticket.

```bash
hlavi tickets delete <id> [OPTIONS]
```

**Arguments:**
- `<id>` - Ticket ID (required, case-insensitive)

**Options:**
- `-f, --force` - Skip confirmation prompt

**Example:**

```bash
$ hlavi tickets delete HLA3
Delete ticket HLA3? [y/N] y
✓ Deleted ticket HLA3
```

With force flag:
```bash
hlavi tickets delete HLA3 --force
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

## hlavi timeline

View tickets in a timeline/Gantt chart view showing start and end dates.

```bash
hlavi timeline
```

**What it shows:**
- Visual timeline of all tickets with dates
- Horizontal bars representing ticket duration
- Date scale showing the overall range
- Tickets sorted by start date
- List of tickets without dates

**Example:**

```bash
$ hlavi timeline

Timeline View
────────────────────────────────────────────────────────────────────────────────
Range: 2024-02-01 to 2024-02-20

             02/01                                               02/20
             ────────────────────────────────────────────────────────────
HLA1     ┣━━━━━━━━━━┫                                                 Design authentication system
HLA2           ┣━━━━━━━━━━━━━━━━━━━━┫                                 Implement user login
HLA3                           ┣━━━━━━━━━━━━━━━━━━━━┫                 Add password reset
HLA4                                              ┣━━━━━━━━━━━━━━━━┫  Deploy to production
             ────────────────────────────────────────────────────────────

Legend:
  ┣ Start date
  ━ Duration
  ┫ End date

Tickets without dates:
  HLA5 - Future task without dates
```

**Key features:**
- Tickets with both start and end dates show full bars
- Tickets with only start date show a point marker
- Tickets with only end date show a point marker
- Timeline automatically scales to fit all dated tickets
- Tickets without any dates are listed separately

:::tip Project Planning
Use `hlavi timeline` to visualize your project schedule and identify overlapping work or gaps in your timeline.
:::
