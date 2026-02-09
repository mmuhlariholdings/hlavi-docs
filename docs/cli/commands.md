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
- Creates `tasks/` subdirectory

**Example:**

```bash
$ hlavi init
✓ Initialized Hlavi project in /home/user/my-project
```

## hlavi tasks

Manage tasks in your project.

### Subcommands

#### list

List all tasks in the project.

```bash
hlavi tasks list [OPTIONS]
```

**Options:**

*Sorting:*
- `--sort-by <field>` - Sort tasks by field (default: `id`)
  - Valid fields: `id`, `title`, `status`, `created`, `updated`, `start`, `end`, `ac-progress`, `ac-count`
- `--sort-order <order>` - Sort order: `asc` or `desc` (default: `asc`)

**Output:**

```
╭─────────┬──────────────────────────┬─────────────┬─────╮
│ ID      │ Title                    │ Status      │ ACs │
├─────────┼──────────────────────────┼─────────────┼─────┤
│ HLA1  │ Implement authentication │ In Progress │ 2/3 │
│ HLA2  │ Add user dashboard       │ New         │ 0/0 │
╰─────────┴──────────────────────────┴─────────────┴─────╯
```

**Sorting Examples:**

```bash
# Default: sort by ID ascending
hlavi tasks list

# Sort by status (New → Open → InProgress → Pending → Review → Done → Closed)
hlavi tasks list --sort-by status

# Sort by creation date, newest first
hlavi tasks list --sort-by created --sort-order desc

# Sort by title alphabetically
hlavi tasks list --sort-by title --sort-order asc

# Sort by acceptance criteria completion percentage
hlavi tasks list --sort-by ac-progress --sort-order desc

# Sort by start date (tasks without dates appear at end)
hlavi tasks list --sort-by start
```

**Sort Fields Explained:**

| Field | Description | Notes |
|-------|-------------|-------|
| `id` | Task ID (HLA1, HLA2, etc.) | Default sort |
| `title` | Ticket title (alphabetically) | Case-insensitive |
| `status` | Status by workflow progression | New → Open → InProgress → Pending → Review → Done → Closed |
| `created` | Creation timestamp | Older first (asc) or newer first (desc) |
| `updated` | Last update timestamp | Older first (asc) or newer first (desc) |
| `start` | Start date | Tickets without dates appear at end |
| `end` | End date | Tickets without dates appear at end |
| `ac-progress` | Acceptance criteria completion % | Based on completed/total ratio |
| `ac-count` | Total acceptance criteria count | Number of ACs regardless of completion |

#### create

Create a new task with a title.

```bash
hlavi tasks create <title>
```

**Arguments:**
- `<title>` - Title of the task (required)

**Example:**

```bash
$ hlavi tasks create "Add dark mode support"
✓ Created task HLA3
```

After creating a task, use `hlavi tasks edit` to add description, dates, and acceptance criteria.

#### show

Display detailed information about a task.

```bash
hlavi tasks show <id>
```

**Arguments:**
- `<id>` - Task ID (e.g., HLA1, hla1, or Hla1 - case insensitive)

**Example:**

```bash
$ hlavi tasks show HLA1

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

:::tip Case-Insensitive Task IDs
Task IDs are case-insensitive. You can use `HLA1`, `hla1`, or `Hla1` - they all refer to the same task.
:::

#### search

Search for tasks by title, description, or acceptance criteria.

```bash
hlavi tasks search <query> [OPTIONS]
```

**Arguments:**
- `<query>` - Search query (case-insensitive)

**Options:**

*Sorting:*
- `--sort-by <field>` - Sort tasks by field (default: `id`)
  - Valid fields: `id`, `title`, `status`, `created`, `updated`, `start`, `end`, `ac-progress`, `ac-count`
- `--sort-order <order>` - Sort order: `asc` or `desc` (default: `asc`)

**What it searches:**
- Ticket titles
- Ticket descriptions
- Acceptance criteria descriptions

**Examples:**

Search for tasks about authentication:
```bash
$ hlavi tasks search authentication

✓ 2 task(s) matching "authentication"

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
hlavi tasks search LOGIN
hlavi tasks search login
hlavi tasks search Login
```

Search in descriptions:
```bash
hlavi tasks search "JWT token"
```

Search in acceptance criteria:
```bash
hlavi tasks search "password reset"
```

Search with sorting:
```bash
# Search and sort by most recently updated
hlavi tasks search "auth" --sort-by updated --sort-order desc

# Search and sort by title
hlavi tasks search "api" --sort-by title

# Search and sort by completion progress
hlavi tasks search "feature" --sort-by ac-progress --sort-order desc
```

:::info Search Tips
- The search is case-insensitive
- Searches across title, description, and all acceptance criteria
- Use quotes for multi-word queries
- Results can be sorted using the same fields as `list` command
- Empty results will display a helpful message
:::

#### edit

Edit a task's properties.

```bash
hlavi tasks edit <id> [OPTIONS]
```

**Arguments:**
- `<id>` - Task ID (required, case-insensitive)

**Options:**

*Basic Properties:*
- `-t, --title <text>` - Update task title
- `-d, --description <text>` - Set task description

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
hlavi tasks edit HLA1 --title "New task title"
# or with short flag
hlavi tasks edit hla1 -t "New task title"
```

Set description:
```bash
hlavi tasks edit HLA1 -d "Implement JWT-based auth"
```

Set start and end dates:
```bash
# Using simple date format (YYYY-MM-DD)
hlavi tasks edit HLA1 --start-date 2024-01-15 --end-date 2024-01-22

# Using RFC 3339 format for specific times
hlavi tasks edit HLA1 --start-date 2024-01-15T09:00:00Z --end-date 2024-01-22T17:00:00Z
```

Clear dates:
```bash
hlavi tasks edit HLA1 --clear-start-date
hlavi tasks edit HLA1 --clear-end-date
```

Manage acceptance criteria:
```bash
# Add a new acceptance criterion
hlavi tasks edit HLA1 --ac "User can reset password"

# Mark AC #2 as complete
hlavi tasks edit HLA1 --complete-ac 2

# Mark AC #1 as incomplete
hlavi tasks edit HLA1 --incomplete-ac 1

# Toggle AC #3 status
hlavi tasks edit HLA1 --toggle-ac 3

# Remove acceptance criterion by ID
hlavi tasks edit HLA1 --remove-ac 2

# Remove acceptance criterion by text
hlavi tasks edit HLA1 --remove-ac "User can reset password"
```

Combine multiple operations:
```bash
hlavi tasks edit HLA1 \
  --title "Updated Authentication" \
  --start-date 2024-01-15 \
  --end-date 2024-01-22 \
  --ac "Add password strength meter"
```

#### delete

Delete a task.

```bash
hlavi tasks delete <id> [OPTIONS]
```

**Arguments:**
- `<id>` - Task ID (required, case-insensitive)

**Options:**
- `-f, --force` - Skip confirmation prompt

**Example:**

```bash
$ hlavi tasks delete HLA3
Delete task HLA3? [y/N] y
✓ Deleted task HLA3
```

With force flag:
```bash
hlavi tasks delete HLA3 --force
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

Start agent execution for a task (Coming soon).

```bash
hlavi agent start <task-id>
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

View tasks in a timeline/Gantt chart view showing start and end dates.

```bash
hlavi timeline [OPTIONS]
```

**Options:**

*Sorting:*
- `--sort-by <field>` - Override default sort (default: by start date)
  - Valid fields: `id`, `title`, `status`, `created`, `updated`, `start`, `end`, `ac-progress`, `ac-count`
- `--sort-order <order>` - Sort order: `asc` or `desc` (default: `asc`)

**What it shows:**
- Visual timeline of all tasks with dates
- Horizontal bars representing task duration
- Date scale showing the overall range
- Tickets sorted by start date (unless overridden)
- List of tasks without dates

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

**Sorting Examples:**

```bash
# Default: sort by start date chronologically
hlavi timeline

# Sort by status to group by workflow stage
hlavi timeline --sort-by status

# Sort by title alphabetically
hlavi timeline --sort-by title

# Sort by end date to see deadlines first
hlavi timeline --sort-by end --sort-order desc
```

**Key features:**
- Tickets with both start and end dates show full bars
- Tickets with only start date show a point marker
- Tickets with only end date show a point marker
- Timeline automatically scales to fit all dated tasks
- Tickets without any dates are listed separately
- Default chronological sort can be overridden for different views

:::tip Project Planning
Use `hlavi timeline` to visualize your project schedule and identify overlapping work or gaps in your timeline. Use `--sort-by status` to group tasks by their workflow stage instead of chronological order.
:::
