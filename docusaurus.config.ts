import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MP3 Docs',
  tagline: 'Documentation du serveur MP3',
  favicon: 'img/favicon.ico',
  clientModules: [
    './modules/archive-background.js' // Executed on each loaded page
  ],
  // Set the production url of your site here
  url: 'http://mp3.pixelfucker.com',
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
          path: 'doc_survival',
          routeBasePath: 'survie',
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
        id: 'doc_creative',
        path: 'doc_creative',
        routeBasePath: 'creatif',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc_archives',
        path: 'doc_archives',
        routeBasePath: 'archives',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ],
    /***** ARCHIVES *****/
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc_fallen_kingdom',
        path: 'doc_fallen_kingdom',
        routeBasePath: 'fallen_kingdom',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc_melodia',
        path: 'doc_melodia',
        routeBasePath: 'melodia',
        sidebarPath: require.resolve('./sidebars.ts')
      },
    ]
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
          sidebarId: 'sidebarId',
          position: 'left',
          label: 'Survie ⛏️'
        },
        {
          to: '/creatif/rejoindre',
          label: 'Créatif 🎨',
          position: 'left'
        },
        {
          to: '/archives/drehmal',
          label: 'Archives 📦',
          position: 'left'
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'sidebarId',
        //   position: 'left',
        //   label: 'Tech'
        // },
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
          title: 'Adresse du serveur',
          items: [
            {
              label: 'mp3.pixelfucker.com',
              href: 'http://mp3.pixelfucker.com',
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
              label: 'Chaîne Youtube',
              href: 'https://www.youtube.com/@Atrimilan',
            },
            {
              label: 'Profil GitHub',
              href: 'https://github.com/Atrimilan/',
            },
          ],
        },
      ],
      copyright: `<br>Multi Player 3 - Site réalisé avec Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
