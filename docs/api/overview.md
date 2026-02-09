---
sidebar_position: 1
---

# Overview

Hlavi provides an HTTP API for integration with web and mobile applications.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

Authentication is planned for a future release. Currently, the API is open for local development.

## Response Format

All API responses follow this format:

**Success:**
```json
{
  "data": { ... },
  "status": "success"
}
```

**Error:**
```json
{
  "error": "error_code",
  "message": "Human readable error message",
  "status": "error"
}
```

## Rate Limiting

Rate limiting is not currently implemented but is planned for the hosted version.

## Endpoints

See the [Endpoints Reference](./endpoints.md) for complete API documentation.

## Quick Example

List all tickets:

```bash
curl http://localhost:3000/api/v1/tickets
```

Create a ticket:

```bash
curl -X POST http://localhost:3000/api/v1/tickets \
  -H "Content-Type: application/json" \
  -d '{"title": "New ticket", "description": "Description here"}'
```

## Next Steps

- [Full Endpoints Reference](./endpoints.md)
- [Authentication](./authentication.md) (coming soon)
