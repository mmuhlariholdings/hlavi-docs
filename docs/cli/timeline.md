---
sidebar_position: 5
---

# Timeline

Visualize your project schedule with Hlavi's timeline view - a Gantt chart-like visualization that shows when tasks start, how long they take, and how they relate to each other in time.

## Overview

The timeline command provides a visual representation of your tickets over time, making it easy to:

- See the overall project duration
- Identify overlapping tasks
- Spot gaps in your schedule
- Understand task dependencies
- Plan resource allocation

## Basic Usage

Display the timeline for all tickets with dates:

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

Tickets without dates:
  HLA5 - Future task without dates
```

## Understanding the Timeline

### Timeline Components

**Header:**
- Shows the overall date range (earliest start to latest end)
- Displays a date scale with reference points

**Ticket Bars:**
- Each row represents one ticket
- Bars are color-coded (green by default)
- Position indicates when the task occurs
- Length represents duration

**Legend:**
- `┣` marks the start date
- `━` represents the duration
- `┫` marks the end date

### How Tickets are Displayed

**Tickets with both dates:**
```
HLA1     ┣━━━━━━━━━━┫     Design authentication system
```
Shows full duration from start to end.

**Tickets with only start date:**
```
HLA2     ┣               Implement user login
```
Displays as a point marker at the start date.

**Tickets with only end date:**
```
HLA3                ┫    Add password reset
```
Displays as a point marker at the end date.

**Tickets without dates:**
Listed separately below the timeline.

## Adding Dates to Tickets

To see tickets in the timeline, they need start and/or end dates:

### Set Both Dates

```bash
hlavi tickets edit HLA1 --start-date 2024-02-01 --end-date 2024-02-15
```

### Set Only Start Date

```bash
hlavi tickets edit HLA2 --start-date 2024-02-03
```

### Set Only End Date

```bash
hlavi tickets edit HLA3 --end-date 2024-02-20
```

### Date Formats

Two formats are supported:

**Simple format (recommended for daily planning):**
```bash
hlavi tickets edit HLA1 --start-date 2024-02-15
```

**RFC 3339 format (for specific times):**
```bash
hlavi tickets edit HLA1 --start-date 2024-02-15T09:00:00Z
```

## Use Cases

### Project Planning

Use the timeline to plan out a new project:

```bash
# Create tickets
hlavi tickets create "Requirements gathering"
hlavi tickets create "System design"
hlavi tickets create "Implementation"
hlavi tickets create "Testing"
hlavi tickets create "Deployment"

# Add dates
hlavi tickets edit HLA1 --start-date 2024-03-01 --end-date 2024-03-07
hlavi tickets edit HLA2 --start-date 2024-03-08 --end-date 2024-03-14
hlavi tickets edit HLA3 --start-date 2024-03-15 --end-date 2024-03-28
hlavi tickets edit HLA4 --start-date 2024-03-29 --end-date 2024-04-04
hlavi tickets edit HLA5 --start-date 2024-04-05 --end-date 2024-04-05

# View the timeline
hlavi timeline
```

### Sprint Planning

Visualize work for a 2-week sprint:

```bash
# Set sprint dates for tickets
hlavi tickets edit HLA10 --start-date 2024-02-12 --end-date 2024-02-16
hlavi tickets edit HLA11 --start-date 2024-02-12 --end-date 2024-02-20
hlavi tickets edit HLA12 --start-date 2024-02-15 --end-date 2024-02-22

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
hlavi tickets edit HLA20 --start-date 2024-03-01 --end-date 2024-03-10
hlavi tickets edit HLA21 --start-date 2024-03-11 --end-date 2024-03-15

# Frontend work (depends on backend)
hlavi tickets edit HLA22 --start-date 2024-03-16 --end-date 2024-03-22

# Integration (depends on both)
hlavi tickets edit HLA23 --start-date 2024-03-23 --end-date 2024-03-25

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

The timeline automatically scales to fit all tickets:

- **Short projects** (few days): Each character represents hours
- **Medium projects** (weeks): Each character represents days
- **Long projects** (months): Each character represents multiple days

### Sorting

Tickets are automatically sorted by start date (earliest first). This provides a natural chronological view of the project.

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

Find specific tickets before viewing timeline:

```bash
# Find authentication tickets
hlavi tickets search auth

# View timeline
hlavi timeline
```

### With Edit

Update dates directly from timeline findings:

```bash
# View current timeline
hlavi timeline

# Adjust overlapping tickets
hlavi tickets edit HLA3 --start-date 2024-02-15
hlavi tickets edit HLA4 --end-date 2024-02-25

# Verify changes
hlavi timeline
```

### With List

Compare table view with timeline view:

```bash
# See all tickets in table
hlavi tickets list

# See dated tickets in timeline
hlavi timeline
```

## Tips and Tricks

### Milestone Tickets

Use single-day tickets for milestones:

```bash
hlavi tickets create "Sprint 1 Demo"
hlavi tickets edit HLA99 --start-date 2024-02-20 --end-date 2024-02-20
```

### Task Sequences

Create sequential tasks for phased work:

```bash
hlavi tickets edit HLA10 --start-date 2024-03-01 --end-date 2024-03-05
hlavi tickets edit HLA11 --start-date 2024-03-06 --end-date 2024-03-10
hlavi tickets edit HLA12 --start-date 2024-03-11 --end-date 2024-03-15
```

### Parallel Work

Schedule concurrent tasks for different team members:

```bash
# Alice's work
hlavi tickets edit HLA20 --start-date 2024-03-01 --end-date 2024-03-10

# Bob's work (parallel)
hlavi tickets edit HLA21 --start-date 2024-03-01 --end-date 2024-03-08
```

## See Also

- [Ticket Management](./tickets.md) - Creating and managing tickets
- [CLI Commands](./commands.md) - Complete command reference
- [Date Management](./tickets.md#managing-dates) - Setting and clearing dates
