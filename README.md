# hlavi-docs

Official documentation for Hlavi kanban task management system.

## Table of Contents

- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Development](#development)
- [Contributing](#contributing)
- [Contact](#contact)

## Getting Started

A quick guide on how you can get started running and working on the documentation site on your local machine.

### Requirements

- Node.js 18 or higher
- npm or yarn

### Clone

```bash
git clone https://github.com/mmuhlariholdings/hlavi-docs.git
cd hlavi-docs
```

### Install Dependencies

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Documentation

This repository uses Docusaurus to build and deploy the Hlavi documentation.

### Documentation Structure

```
docs/
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── configuration.md
├── cli/
│   ├── commands.md
│   ├── tickets.md
│   └── board.md
├── agent/
│   ├── overview.md
│   ├── configuration.md
│   └── execution-modes.md
├── api/
│   ├── overview.md
│   ├── endpoints.md
│   └── authentication.md
└── core/
    ├── architecture.md
    ├── storage.md
    └── domain-models.md
```

## Development

### Adding New Documentation

1. Create a new Markdown file in the appropriate `docs/` subdirectory
2. Add frontmatter with title and sidebar position
3. Run `npm start` to preview changes
4. Submit a pull request

### Updating Existing Documentation

1. Edit the relevant Markdown file
2. Preview changes locally
3. Submit a pull request

## Contributing

Take a moment to review our [contribution guide](CONTRIBUTING.md) before submitting your first pull request.

Make sure that you check for open issues and pull requests to see if someone else is working on something similar.

## Contact

For feedback, requests or enquiries:

🌐 [http://www.mmuhlariholdings.co.za](http://www.mmuhlariholdings.co.za)
