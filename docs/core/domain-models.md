---
sidebar_position: 3
---

# Domain

Core domain models that represent the business logic and data structures in Hlavi.

## Task

The central entity representing a unit of work.

### Structure

```rust
pub struct Task {
    pub id: TaskId,
    pub title: String,
    pub description: Option<String>,
    pub status: TaskStatus,
    pub acceptance_criteria: Vec<AcceptanceCriteria>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub agent_assigned: bool,
    pub rejection_reason: Option<String>,
    pub start_date: Option<DateTime<Utc>>,
    pub end_date: Option<DateTime<Utc>>,
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `TaskId` | Yes | Unique identifier (e.g., HLA1) |
| `title` | `String` | Yes | Short, descriptive title |
| `description` | `Option<String>` | No | Detailed explanation of the work |
| `status` | `TaskStatus` | Yes | Current state (New, Open, InProgress, Done, Rejected) |
| `acceptance_criteria` | `Vec<AcceptanceCriteria>` | No | List of completion conditions |
| `created_at` | `DateTime<Utc>` | Yes | Creation timestamp (UTC) |
| `updated_at` | `DateTime<Utc>` | Yes | Last modification timestamp (UTC) |
| `agent_assigned` | `bool` | Yes | Whether an AI agent is working on this task |
| `rejection_reason` | `Option<String>` | No | Reason for rejection if status is Rejected |
| `start_date` | `Option<DateTime<Utc>>` | No | When work begins |
| `end_date` | `Option<DateTime<Utc>>` | No | Target completion date |

### Methods

#### Core Methods

```rust
// Create a new task
pub fn new(id: TaskId, title: String) -> Self

// Update the title
pub fn set_title(&mut self, title: String)

// Set the description
pub fn set_description(&mut self, description: String)
```

#### Date Management

```rust
// Set start date with validation
pub fn set_start_date(&mut self, date: DateTime<Utc>) -> Result<(), HlaviError>

// Set end date with validation
pub fn set_end_date(&mut self, date: DateTime<Utc>) -> Result<(), HlaviError>

// Set both dates atomically
pub fn set_date_range(&mut self, start: DateTime<Utc>, end: DateTime<Utc>)
    -> Result<(), HlaviError>

// Clear dates
pub fn clear_start_date(&mut self)
pub fn clear_end_date(&mut self)
```

**Date Validation Rules:**
- `start_date` must be ≤ `end_date`
- `end_date` must be ≥ `start_date`
- Same date for both is valid (single-day tasks)
- Returns `HlaviError::InvalidDateRange` if validation fails

#### Acceptance Criteria Management

```rust
// Add a new acceptance criterion
pub fn add_acceptance_criterion(&mut self, description: String)

// Remove by description or index
pub fn remove_acceptance_criterion(&mut self, identifier: &str)
    -> Result<(), HlaviError>

// Check if all criteria are complete
pub fn all_acceptance_criteria_completed(&self) -> bool
```

### Serialization

Tickets serialize to JSON with the following properties:
- `start_date` and `end_date` are omitted if `None` (`skip_serializing_if`)
- Dates use RFC 3339 format when present
- Backwards compatible with old JSON files (missing date fields default to `None`)

**Example JSON:**

```json
{
  "id": "HLA1",
  "title": "Implement authentication",
  "description": "Add JWT-based auth system",
  "status": "in_progress",
  "acceptance_criteria": [
    {
      "id": 1,
      "description": "User can log in",
      "completed": true
    },
    {
      "id": 2,
      "description": "Session expires after 24h",
      "completed": false
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T14:20:00Z",
  "agent_assigned": false,
  "rejection_reason": null,
  "start_date": "2024-01-15T00:00:00Z",
  "end_date": "2024-01-22T00:00:00Z"
}
```

## TaskId

Unique identifier for tasks with case-insensitive parsing.

### Structure

```rust
pub struct TaskId(String);
```

### Features

- **Format**: Prefix (default: "HLA") + numeric counter (e.g., HLA1, HLA42, HLA100)
- **Case-Insensitive**: Accepts `HLA1`, `hla1`, `Hla1` - all normalize to uppercase
- **Future-Proof**: Prefix is configurable for potential customization

### Methods

```rust
// Create from counter
pub fn new(counter: u32) -> Self

// Get string representation
pub fn as_str(&self) -> &str

// Parse from string (case-insensitive)
impl FromStr for TaskId
```

### Examples

```rust
// Creating IDs
let id = TaskId::new(1);  // Creates "HLA1"

// Parsing (case-insensitive)
let id1 = TaskId::from_str("HLA1")?;   // OK
let id2 = TaskId::from_str("hla1")?;   // OK, normalizes to "HLA1"
let id3 = TaskId::from_str("Hla1")?;   // OK, normalizes to "HLA1"

assert_eq!(id1, id2);  // true
assert_eq!(id2, id3);  // true
```

## TaskStatus

Enumeration of possible task states.

### Variants

```rust
pub enum TaskStatus {
    New,         // Newly created, not yet started
    Open,        // Ready to be worked on
    InProgress,  // Currently being worked on
    Done,        // Completed successfully
    Rejected,    // Rejected, will not be completed
}
```

### Status Transitions

Valid transitions follow this flow:

```
New → Open → InProgress → Done
              ↓
            Rejected
```

### Methods

```rust
// Check if transition is valid
pub fn can_transition_to(&self, target: &TaskStatus) -> bool
```

### Examples

```rust
let status = TaskStatus::New;

// Valid transitions
assert!(status.can_transition_to(&TaskStatus::Open));

// Invalid transitions
assert!(!status.can_transition_to(&TaskStatus::Done));
```

## AcceptanceCriteria

Represents a specific condition that must be met for task completion.

### Structure

```rust
pub struct AcceptanceCriteria {
    pub id: usize,
    pub description: String,
    pub completed: bool,
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `usize` | Unique ID within the task (1, 2, 3, ...) |
| `description` | `String` | What needs to be achieved |
| `completed` | `bool` | Whether this criterion is met |

### Methods

```rust
// Create new acceptance criterion
pub fn new(id: usize, description: String) -> Self

// Mark as complete
pub fn mark_completed(&mut self)

// Mark as incomplete
pub fn mark_incomplete(&mut self)

// Toggle completion status
pub fn toggle(&mut self)
```

### Example

```json
{
  "id": 1,
  "description": "User can log in with email and password",
  "completed": true
}
```

## Board

Represents the kanban board and its configuration.

### Structure

```rust
pub struct Board {
    pub next_task_id: u32,
    pub agent_config: Option<AgentConfig>,
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `next_task_id` | `u32` | Counter for generating new task IDs |
| `agent_config` | `Option<AgentConfig>` | AI agent configuration (if enabled) |

### Methods

```rust
// Get the next task ID to be created
pub fn next_task_id(&self) -> TaskId

// Add a task to the board (increments counter)
pub fn add_task(&mut self, id: TaskId)

// Set agent configuration
pub fn set_agent_config(&mut self, config: AgentConfig)
```

## Error Types

### HlaviError

Main error type for domain operations.

```rust
pub enum HlaviError {
    // Task not found by ID
    TaskNotFound(String),

    // Board not initialized
    BoardNotInitialized,

    // Invalid status transition
    InvalidStatusTransition { from: String, to: String },

    // Invalid task ID format
    InvalidTaskId(String),

    // Date validation error
    InvalidDateRange { start: String, end: String },

    // Acceptance criteria not found
    AcceptanceCriteriaNotFound,

    // Storage errors
    StorageError(String),
    IoError(std::io::Error),
    SerializationError(serde_json::Error),

    // Configuration errors
    ConfigError(String),

    // Project not initialized
    ProjectNotInitialized,

    // Generic error
    Other(String),
}
```

### Error Examples

```rust
// Date range validation
let result = task.set_date_range(end_date, start_date);
// Returns: Err(HlaviError::InvalidDateRange { ... })

// Invalid task ID
let result = TaskId::from_str("INVALID123");
// Returns: Err(HlaviError::InvalidTaskId("INVALID123"))

// Task not found
let result = storage.load_task(&ticket_id).await;
// Returns: Err(HlaviError::TaskNotFound("HLA999"))
```

## Best Practices

### Working with Dates

- Always validate dates when setting them together
- Use `set_date_range()` for atomic updates
- Clear dates explicitly when they're no longer relevant
- Store dates in UTC, convert for display

### Managing Acceptance Criteria

- Keep criteria atomic and specific
- Use descriptive text
- Track completion granularly
- Remove obsolete criteria rather than leaving incomplete

### Status Management

- Follow valid transition paths
- Set rejection_reason when rejecting tasks
- Update status based on AC completion
- Use agent_assigned flag to track automation

## See Also

- [Storage Layer](./storage.md) - Persistence and data access
- [Architecture](./architecture.md) - System design and structure
- [API Endpoints](../api/endpoints.md) - REST API for domain models
