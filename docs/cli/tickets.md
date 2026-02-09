---
sidebar_position: 2
---

# Tickets

Complete guide for managing tickets with Hlavi CLI.

## Overview

Tickets are the core unit of work in Hlavi. Each ticket represents a task, feature, or bug fix that needs to be completed. Tickets can have:

- **Title**: A concise, descriptive name
- **Description**: Detailed explanation of the work
- **Status**: Current state (New, Open, In Progress, Done, Rejected)
- **Acceptance Criteria**: Specific conditions that must be met
- **Start Date**: When work begins (optional)
- **End Date**: Target completion date (optional)
- **Timestamps**: Created and updated timestamps

## Creating Tickets

Create a new ticket with a title:

```bash
hlavi tickets create "Implement user authentication"
```

This creates a ticket with:
- Auto-generated ID (e.g., HLA1)
- Status: New
- Creation timestamp

:::tip
After creating a ticket, use `hlavi tickets edit` to add more details like description, dates, and acceptance criteria.
:::

## Viewing Tickets

### List All Tickets

View all tickets in a table format:

```bash
hlavi tickets list
```

Output shows:
- Ticket ID
- Title
- Current status
- Acceptance criteria completion ratio (e.g., 2/3)

### View Ticket Details

See complete information about a specific ticket:

```bash
hlavi tickets show HLA1
```

Displays:
- Title and status
- Description (if set)
- All acceptance criteria with completion status
- Creation and update timestamps
- Start and end dates (if set)
- Rejection reason (if rejected)

:::tip Case-Insensitive IDs
Ticket IDs are case-insensitive. Use `HLA1`, `hla1`, or `Hla1` - they all work!
:::

## Editing Tickets

### Update Title

```bash
hlavi tickets edit HLA1 --title "New ticket title"
# or short form
hlavi tickets edit HLA1 -t "New ticket title"
```

### Set Description

```bash
hlavi tickets edit HLA1 --description "Implement JWT-based authentication with refresh tokens"
# or short form
hlavi tickets edit HLA1 -d "Detailed description here"
```

### Managing Dates

#### Set Start and End Dates

Use simple date format (YYYY-MM-DD):

```bash
hlavi tickets edit HLA1 --start-date 2024-01-15 --end-date 2024-01-22
```

Or RFC 3339 format for specific times:

```bash
hlavi tickets edit HLA1 --start-date 2024-01-15T09:00:00Z --end-date 2024-01-22T17:00:00Z
```

:::info Date Validation
- End date must be after or equal to start date
- Dates are validated when set
- Same date for start and end is valid (single-day tasks)
:::

#### Clear Dates

```bash
# Clear start date
hlavi tickets edit HLA1 --clear-start-date

# Clear end date
hlavi tickets edit HLA1 --clear-end-date
```

### Managing Acceptance Criteria

Acceptance criteria define the specific conditions that must be met for a ticket to be complete.

#### Add Acceptance Criteria

```bash
hlavi tickets edit HLA1 --ac "User can log in with email and password"
hlavi tickets edit HLA1 --ac "User can log out"
hlavi tickets edit HLA1 --ac "Session expires after 24 hours"
```

Each criterion gets a unique ID (1, 2, 3, etc.).

#### Mark as Complete

```bash
# Mark AC #1 as complete
hlavi tickets edit HLA1 --complete-ac 1
```

#### Mark as Incomplete

```bash
# Mark AC #2 as incomplete
hlavi tickets edit HLA1 --incomplete-ac 2
```

#### Toggle Status

```bash
# Toggle AC #3 between complete and incomplete
hlavi tickets edit HLA1 --toggle-ac 3
```

#### Remove Acceptance Criteria

By ID:
```bash
hlavi tickets edit HLA1 --remove-ac 2
```

By description:
```bash
hlavi tickets edit HLA1 --remove-ac "User can log out"
```

### Combining Multiple Updates

Update multiple properties in one command:

```bash
hlavi tickets edit HLA1 \
  --title "Enhanced Authentication" \
  --description "Add OAuth and 2FA support" \
  --start-date 2024-01-15 \
  --end-date 2024-01-30 \
  --ac "Support Google OAuth" \
  --ac "Support GitHub OAuth"
```

## Searching Tickets

Search across titles, descriptions, and acceptance criteria:

```bash
# Find tickets about authentication
hlavi tickets search authentication

# Case-insensitive search
hlavi tickets search LOGIN

# Search for specific terms
hlavi tickets search "password reset"
```

Search looks in:
- Ticket titles
- Ticket descriptions
- All acceptance criteria

:::tip Search Tips
- Search is case-insensitive
- Use quotes for multi-word queries
- Shows matches across all searchable fields
:::

## Deleting Tickets

Delete a ticket with confirmation:

```bash
hlavi tickets delete HLA3
```

Skip confirmation with `--force`:

```bash
hlavi tickets delete HLA3 --force
```

:::warning Permanent Deletion
Deleted tickets cannot be recovered. Use with caution!
:::

## Workflow Examples

### Example 1: Feature Development

```bash
# 1. Create ticket
hlavi tickets create "Add user profile page"

# 2. Add details
hlavi tickets edit HLA5 \
  -d "Create a user profile page with avatar, bio, and settings" \
  --start-date 2024-02-01 \
  --end-date 2024-02-07 \
  --ac "Display user avatar" \
  --ac "Show user bio" \
  --ac "Add settings form"

# 3. During development, mark ACs as complete
hlavi tickets edit HLA5 --complete-ac 1
hlavi tickets edit HLA5 --complete-ac 2

# 4. View progress
hlavi tickets show HLA5

# 5. Complete last AC
hlavi tickets edit HLA5 --complete-ac 3
```

### Example 2: Bug Fix

```bash
# 1. Create bug ticket
hlavi tickets create "Fix login redirect loop"

# 2. Add details
hlavi tickets edit HLA6 \
  -d "Users get stuck in redirect loop after logout" \
  --ac "Reproduce the issue" \
  --ac "Fix redirect logic" \
  --ac "Add integration test"

# 3. Set target completion date
hlavi tickets edit HLA6 --end-date 2024-02-03
```

### Example 3: Search and Filter

```bash
# Find all authentication-related tickets
hlavi tickets search auth

# View specific ticket
hlavi tickets show HLA1

# Update based on findings
hlavi tickets edit HLA1 --ac "Add rate limiting"
```

## Best Practices

### Writing Good Titles

**Good:**
- "Add JWT authentication"
- "Fix pagination on user list"
- "Refactor payment service"

**Avoid:**
- "Fix bug" (too vague)
- "Update" (no context)
- "asdjkhasd" (not descriptive)

### Writing Good Descriptions

- Provide context and motivation
- Include technical details
- Reference related tickets or issues
- Keep it concise but complete

**Example:**
```
Implement JWT-based authentication to replace session cookies. This will enable:
- Stateless authentication
- Better mobile app support
- Microservices integration

Technical approach:
- Use RS256 algorithm
- 1 hour access tokens
- 7 day refresh tokens
- Store tokens in httpOnly cookies
```

### Effective Acceptance Criteria

- Be specific and measurable
- Focus on user-facing outcomes
- Include edge cases
- Keep each criterion atomic

**Good:**
- "User can log in with valid credentials"
- "Invalid credentials show error message"
- "Session expires after 24 hours of inactivity"

**Avoid:**
- "Everything works" (too vague)
- "Refactor code and add tests and fix bugs" (not atomic)

### Using Dates Effectively

- **Start Date**: When you begin active work
- **End Date**: Target completion date (not deadline)
- Set dates when timeframes matter
- Omit dates for backlog items
- Update dates as priorities change

### Organizing Tickets

1. **Create** tickets as ideas emerge
2. **Search** to find related work
3. **Edit** to add details before starting
4. **Update** ACs as work progresses
5. **Review** completed tickets regularly

## See Also

- [CLI Commands Reference](./commands.md) - Complete command documentation
- [Timeline View](./timeline.md) - Visualize tickets on a project timeline
- [Board Management](./board.md) - Organize tickets on a kanban board
- [Agent Integration](./agent.md) - Automate ticket work with AI agents
