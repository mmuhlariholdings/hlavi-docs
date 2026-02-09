---
sidebar_position: 1
---

# Architecture

Understanding Hlavi's architecture and design principles.

## Component Overview

Hlavi is built with a modular architecture:

```
┌─────────────────────────────────────┐
│         Applications                │
│  (CLI, Web, Mobile, API Server)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         hlavi-core                  │
│  (Domain Models & Business Logic)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Storage Layer                 │
│  (File-based, SQLite, Future DBs)   │
└─────────────────────────────────────┘
```

## Core Components

### hlavi-core

The heart of Hlavi. A Rust library containing:

- **Domain Models**: Task, Board, AcceptanceCriteria
- **Business Logic**: Status transitions, validation
- **Storage Abstraction**: Pluggable storage backends

### hlavi-cli

Command-line interface built with Clap:

- Noun-based command structure
- Colored terminal output
- Interactive prompts

### hlavi-agent

AI agent orchestration:

- Task planning
- Execution management
- Multiple AI provider support

### hlavi-api

HTTP API server built with Axum:

- RESTful endpoints
- WebSocket support (planned)
- CORS enabled

## Design Principles

### 1. Cross-Platform

Works on Windows, macOS, and Linux without dependencies.

### 2. Self-Contained

All data stored locally in `.hlavi/` directory. No external databases required.

### 3. Git-Friendly

JSON-based storage allows version control of your project's task history.

### 4. Modular

Each component can be used independently or together.

## Data Flow

```
User Action → CLI Command → Core Logic → Storage → Filesystem
                                 ↓
                              Validation
                                 ↓
                           Domain Rules
```

## Next Steps

- [Storage Implementation](./storage.md)
- [Domain Models](./domain-models.md)
