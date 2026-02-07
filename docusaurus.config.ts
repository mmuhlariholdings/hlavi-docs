import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hlavi Documentation',
  tagline: 'CLI-based kanban task management with AI agent support',
  favicon: 'img/favicon.ico',

  url: 'https://docs.hlavi.com',
  baseUrl: '/',

  organizationName: 'mmuhlariholdings',
  projectName: 'hlavi-docs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mmuhlariholdings/hlavi-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/hlavi-social-card.svg',
    navbar: {
      title: 'Hlavi',
      logo: {
        alt: 'Hlavi Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://hlavi.com',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://github.com/mmuhlariholdings/hlavi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'CLI Reference',
              to: '/docs/cli/commands',
            },
            {
              label: 'API Reference',
              to: '/docs/api/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mmuhlariholdings/hlavi',
            },
            {
              label: 'Issues',
              href: 'https://github.com/mmuhlariholdings/hlavi/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://hlavi.com',
            },
            {
              label: 'M Muhlari Holdings',
              href: 'https://www.mmuhlariholdings.co.za',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} M Muhlari Holdings. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['rust', 'toml', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
