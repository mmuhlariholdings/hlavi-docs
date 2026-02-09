---
sidebar_position: 5
---

# Timeline

Visualize your project schedule with Hlavi's timeline view - a Gantt chart-like visualization that shows when tasks start, how long they take, and how they relate to each other in time.

## Overview

The timeline command provides a visual representation of your tasks over time, making it easy to:

- See the overall project duration
- Identify overlapping tasks
- Spot gaps in your schedule
- Understand task dependencies
- Plan resource allocation

## Basic Usage

Display the timeline for all tasks with dates:

```bash
hlavi timeline
```

**Example Output:**

```
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

Tasks without dates:
  HLA5 - Future task without dates
```

## Understanding the Timeline

### Timeline Components

**Header:**
- Shows the overall date range (earliest start to latest end)
- Displays a date scale with reference points

**Task Bars:**
- Each row represents one task
- Bars are color-coded (green by default)
- Position indicates when the task occurs
- Length represents duration

**Legend:**
- `┣` marks the start date
- `━` represents the duration
- `┫` marks the end date

### How Tasks are Displayed

**Tasks with both dates:**
```
HLA1     ┣━━━━━━━━━━┫     Design authentication system
```
Shows full duration from start to end.

**Tasks with only start date:**
```
HLA2     ┣               Implement user login
```
Displays as a point marker at the start date.

**Tasks with only end date:**
```
HLA3                ┫    Add password reset
```
Displays as a point marker at the end date.

**Tasks without dates:**
Listed separately below the timeline.

## Adding Dates to Tickets

To see tasks in the timeline, they need start and/or end dates:

### Set Both Dates

```bash
hlavi tasks edit HLA1 --start-date 2024-02-01 --end-date 2024-02-15
```

### Set Only Start Date

```bash
hlavi tasks edit HLA2 --start-date 2024-02-03
```

### Set Only End Date

```bash
hlavi tasks edit HLA3 --end-date 2024-02-20
```

### Date Formats

Two formats are supported:

**Simple format (recommended for daily planning):**
```bash
hlavi tasks edit HLA1 --start-date 2024-02-15
```

**RFC 3339 format (for specific times):**
```bash
hlavi tasks edit HLA1 --start-date 2024-02-15T09:00:00Z
```

## Sorting Options

By default, the timeline sorts tasks by their start date in chronological order. You can override this to view the timeline in different ways.

### Default Chronological Sort

```bash
# Default: sort by start date (earliest first)
hlavi timeline
```

Tasks appear in the order they begin, making it easy to see the natural flow of work over time.

### Custom Sorting

Override the default sort to organize the timeline differently:

```bash
# Sort by status to group by workflow stage
hlavi timeline --sort-by status

# Sort by title alphabetically
hlavi timeline --sort-by title

# Sort by end date (deadlines first)
hlavi timeline --sort-by end --sort-order desc

# Sort by ID
hlavi timeline --sort-by id
```

### Available Sort Fields

All the same sort fields from `hlavi tasks list` are available:

| Field | Description | Use Case |
|-------|-------------|----------|
| `start` | Start date (default) | Chronological project view |
| `end` | End date | Focus on deadlines |
| `status` | Workflow stage | Group by development phase |
| `title` | Alphabetically | Easy lookup |
| `id` | Task ID | Sequential view |
| `created` | Creation date | See planning order |
| `updated` | Last update | See active work |
| `ac-progress` | Completion % | Focus on nearly-done tasks |
| `ac-count` | AC count | Sort by complexity |

### Sort Examples

**Group by workflow stage:**
```bash
hlavi timeline --sort-by status
```
Shows all "New" tasks together, then "InProgress", then "Done", etc. Useful for seeing what stage each task is in regardless of dates.

**View by deadlines:**
```bash
hlavi timeline --sort-by end --sort-order asc
```
Sorts tasks by end date to focus on upcoming deadlines.

**Alphabetical organization:**
```bash
hlavi timeline --sort-by title
```
Useful when you have many tasks and want alphabetical grouping.

:::tip Sorting Tips
- Use the default chronological sort for natural project flow
- Use `--sort-by status` to see tasks grouped by development phase
- Use `--sort-by end` to focus on deadlines and deliverables
- Combine sorting with date filters for focused timeline views
:::

## Use Cases

### Project Planning

Use the timeline to plan out a new project:

```bash
# Create tasks
hlavi tasks create "Requirements gathering"
hlavi tasks create "System design"
hlavi tasks create "Implementation"
hlavi tasks create "Testing"
hlavi tasks create "Deployment"

# Add dates
hlavi tasks edit HLA1 --start-date 2024-03-01 --end-date 2024-03-07
hlavi tasks edit HLA2 --start-date 2024-03-08 --end-date 2024-03-14
hlavi tasks edit HLA3 --start-date 2024-03-15 --end-date 2024-03-28
hlavi tasks edit HLA4 --start-date 2024-03-29 --end-date 2024-04-04
hlavi tasks edit HLA5 --start-date 2024-04-05 --end-date 2024-04-05

# View the timeline
hlavi timeline
```

### Sprint Planning

Visualize work for a 2-week sprint:

```bash
# Set sprint dates for tasks
hlavi tasks edit HLA10 --start-date 2024-02-12 --end-date 2024-02-16
hlavi tasks edit HLA11 --start-date 2024-02-12 --end-date 2024-02-20
hlavi tasks edit HLA12 --start-date 2024-02-15 --end-date 2024-02-22

# Check the timeline
hlavi timeline
```

This helps identify:
- Overlapping tasks (may need coordination)
- Front-loaded vs back-loaded sprint
- Tasks extending beyond sprint boundary

### Dependency Management

Identify task sequences and dependencies:

```bash
# Backend work
hlavi tasks edit HLA20 --start-date 2024-03-01 --end-date 2024-03-10
hlavi tasks edit HLA21 --start-date 2024-03-11 --end-date 2024-03-15

# Frontend work (depends on backend)
hlavi tasks edit HLA22 --start-date 2024-03-16 --end-date 2024-03-22

# Integration (depends on both)
hlavi tasks edit HLA23 --start-date 2024-03-23 --end-date 2024-03-25

hlavi timeline
```

The timeline shows the natural flow and dependencies.

### Progress Tracking

Compare planned vs actual completion:

1. Set initial planned dates
2. View timeline throughout the project
3. Update end dates as tasks complete
4. Adjust future task dates based on progress

## Timeline Characteristics

### Automatic Scaling

The timeline automatically scales to fit all tasks:

- **Short projects** (few days): Each character represents hours
- **Medium projects** (weeks): Each character represents days
- **Long projects** (months): Each character represents multiple days

### Sorting

Tasks are automatically sorted by start date (earliest first). This provides a natural chronological view of the project.

### Fixed Width

The timeline is 60 characters wide, providing a consistent view across different terminal sizes while maintaining readability.

## Best Practices

### Date Planning

**Do:**
- Set realistic dates based on actual work estimates
- Update dates as you learn more about the work
- Use dates to communicate timelines to stakeholders
- Review the timeline regularly (daily for active projects)

**Don't:**
- Set arbitrary dates without considering actual duration
- Forget to update dates when plans change
- Over-schedule by having too many overlapping tasks

### Using the Timeline

**During Planning:**
- Start by setting dates for major milestones
- Fill in intermediate tasks
- Adjust dates to avoid conflicts
- Ensure dependencies are respected

**During Execution:**
- Check the timeline daily
- Update completion dates as tasks finish
- Adjust future dates based on actual progress
- Use it in standup meetings

**For Reporting:**
- Take screenshots of the timeline for status reports
- Use it to explain project status to stakeholders
- Identify risks by looking at compressed timelines

## Limitations

Current limitations of the timeline view:

- Cannot filter by status or other criteria
- No color coding by status or priority
- Fixed 60-character width
- No explicit dependency arrows
- No critical path highlighting

These may be addressed in future versions.

## Integration with Other Commands

### With Search

Find specific tasks before viewing timeline:

```bash
# Find authentication tasks
hlavi tasks search auth

# View timeline
hlavi timeline
```

### With Edit

Update dates directly from timeline findings:

```bash
# View current timeline
hlavi timeline

# Adjust overlapping tasks
hlavi tasks edit HLA3 --start-date 2024-02-15
hlavi tasks edit HLA4 --end-date 2024-02-25

# Verify changes
hlavi timeline
```

### With List

Compare table view with timeline view:

```bash
# See all tasks in table
hlavi tasks list

# See dated tasks in timeline
hlavi timeline
```

## Tips and Tricks

### Milestone Tickets

Use single-day tasks for milestones:

```bash
hlavi tasks create "Sprint 1 Demo"
hlavi tasks edit HLA99 --start-date 2024-02-20 --end-date 2024-02-20
```

### Task Sequences

Create sequential tasks for phased work:

```bash
hlavi tasks edit HLA10 --start-date 2024-03-01 --end-date 2024-03-05
hlavi tasks edit HLA11 --start-date 2024-03-06 --end-date 2024-03-10
hlavi tasks edit HLA12 --start-date 2024-03-11 --end-date 2024-03-15
```

### Parallel Work

Schedule concurrent tasks for different team members:

```bash
# Alice's work
hlavi tasks edit HLA20 --start-date 2024-03-01 --end-date 2024-03-10

# Bob's work (parallel)
hlavi tasks edit HLA21 --start-date 2024-03-01 --end-date 2024-03-08
```

## See Also

- [Task Management](./tasks.md) - Creating and managing tasks
- [CLI Commands](./commands.md) - Complete command reference
- [Date Management](./tasks.md#managing-dates) - Setting and clearing dates
