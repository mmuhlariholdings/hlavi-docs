---
sidebar_position: 3
---

# Configuration

Learn how to configure Hlavi for your workflow.

## Project Configuration

After running `hlavi init`, your project's configuration is stored in `.hlavi/board.json`.

### Board Structure

The default board configuration includes these columns:

| Column | Status | Description |
|--------|--------|-------------|
| New | `new` | Newly created tickets |
| Open | `open` | Ready to be worked on |
| In Progress | `in_progress` | Currently being worked on |
| Pending | `pending` | Waiting for something |
| Review | `review` | Ready for review |
| Done | `done` | Completed work |
| Closed | `closed` | Archived tickets |

### Customizing Columns

You can customize your board columns by editing `.hlavi/board.json`:

```json
{
  "name": "My Project Board",
  "columns": [
    {
      "name": "Backlog",
      "status": "new",
      "agent_enabled": false,
      "agent_mode": null
    },
    {
      "name": "In Progress",
      "status": "in_progress",
      "agent_enabled": true,
      "agent_mode": "unattended"
    }
  ]
}
```

## Agent Configuration

To enable AI agent automation, you need to configure your AI provider.

### Supported Providers

- **Anthropic Claude** (recommended)
- **OpenAI GPT**
- **Local models**

### Configuration File

Create a `.hlavi/agent-config.json` file:

```json
{
  "provider": {
    "provider": "anthropic",
    "api_key": "your-api-key-here",
    "model": "claude-3-5-sonnet-20241022"
  },
  "max_retries": 3,
  "temperature": 0.7
}
```

:::tip
Store your API key in an environment variable instead of the config file:

```bash
export HLAVI_API_KEY="your-api-key"
```
:::

## Git Integration

Hlavi stores all data as JSON files, making it Git-friendly.

### Recommended .gitignore

Add to your project's `.gitignore`:

```gitignore
# Hlavi - commit everything except local caches
.hlavi/*.db
.hlavi/*.db-*
```

This allows you to version control your tickets while ignoring local cache files.

## Next Steps

- Learn about [CLI commands](../cli/commands.md)
- Set up [AI agent automation](../agent/configuration.md)
