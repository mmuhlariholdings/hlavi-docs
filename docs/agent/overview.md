---
sidebar_position: 1
---

# Overview

Hlavi's AI agent can automatically complete tasks on your kanban board.

## What is Agent Mode?

Agent mode allows you to hand off tasks to an AI agent that will:

1. **Analyze** the task requirements
2. **Plan** acceptance criteria if not provided
3. **Execute** the required changes
4. **Verify** completion
5. **Request review** when done

## Execution Modes

### Attended Mode

In attended mode, the agent pauses for user approval before each step.

**Best for:**
- Learning how the agent works
- Critical production tasks
- When you want manual oversight

**Workflow:**
1. Agent generates a plan
2. User reviews and approves
3. Agent executes one step
4. User reviews changes
5. Repeat until complete

### Unattended Mode

In unattended mode, the agent executes the full plan automatically.

**Best for:**
- Repetitive tasks
- Well-defined requirements
- Non-critical work

**Workflow:**
1. Agent generates a plan
2. Agent executes all steps
3. Agent moves task to Review
4. User reviews final result

## Board Integration

Configure columns to trigger agent execution:

```json
{
  "name": "In Progress",
  "status": "in_progress",
  "agent_enabled": true,
  "agent_mode": "unattended"
}
```

When a task moves to this column, the agent automatically starts working on it.

## Task Rejection

If the agent's work isn't acceptable:

1. Move the task back to "In Progress"
2. Add a rejection reason
3. The agent will read the feedback and retry

```bash
hlavi tasks edit HLA1 --rejection "Tests are failing"
```

## Limitations

Current limitations (being actively worked on):

- Agent cannot interact with external services requiring authentication
- Complex multi-file refactorings may require multiple iterations
- Agent works best with clear, specific requirements

## Next Steps

- [Configure your agent](./configuration.md)
- [Learn about execution modes](./execution-modes.md)
- [Choose an AI provider](./providers.md)
