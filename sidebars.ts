import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'CLI Reference',
      items: [
        'cli/commands',
        'cli/tickets',
        'cli/board',
        'cli/agent',
      ],
    },
    {
      type: 'category',
      label: 'AI Agent',
      items: [
        'agent/overview',
        'agent/configuration',
        'agent/execution-modes',
        'agent/providers',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/endpoints',
        'api/authentication',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core/architecture',
        'core/storage',
        'core/domain-models',
      ],
    },
  ],
};

export default sidebars;
