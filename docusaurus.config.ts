import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MP3 Docs',
  tagline: 'Documentation du serveur MP3',
  favicon: 'img/favicon.ico',
  clientModules: [
    './modules/route-based-background.js' // Executed on each loaded page
  ],
  // Set the production url of your site here
  url: 'https://mp3.pixelfucker.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Atrimilan', // Usually your GitHub org/user name.
  projectName: 'MP3-Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'doc_minecraft',
          routeBasePath: 'Minecraft',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lethal_company',
        path: 'doc_lethal_company',
        routeBasePath: 'Lethal_Company',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'repo',
        path: 'doc_repo',
        routeBasePath: 'REPO',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'games',
        path: 'doc_games',
        routeBasePath: 'games',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ],
    /********** ARCHIVES **********/
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'minecraft_archives',
        path: 'archives/doc_minecraft',
        routeBasePath: 'archives/Minecraft',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true
    },
    navbar: {
      title: 'Multi Player 3',
      hideOnScroll: false,
      logo: {
        alt: 'MP3',
        src: 'img/mp3-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'sidebarId', // This should match the sidebarId in sidebars.ts
          position: 'left',
          label: 'Minecraft ⛏️'
        },
        {
          to: '/Lethal_Company',
          label: 'Lethal Company ☢️',
          position: 'left'
        },
        {
          to: '/REPO',
          label: 'R.E.P.O. 👻',
          position: 'left'
        },
        {
          to: '/games',
          label: 'Bibliothèque de jeux 🎮',
          position: 'left'
        },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/Atrimilan/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Serveur Minecraft',
          items: [
            {
              label: 'mp3.pixelfucker.com',
              href: 'https://mp3.pixelfucker.com',
            },
          ],
        },
        {
          title: 'Services utilisés',
          items: [
            {
              label: 'Oracle Cloud',
              href: 'https://www.oracle.com/fr/cloud/free/',
            },
            {
              label: 'Free DNS',
              href: 'https://freedns.afraid.org/subdomain/',
            },
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/',
            },
          ],
        },
        {
          title: 'Atrimilan',
          items: [
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/@Atrimilan',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Atrimilan/',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/milan-nicolas/',
              className: 'linkedin-link',
            },
          ],
        },
      ],
      copyright: `© 2025 Milan NICOLAS - Licence MIT`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
