import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MP3 Docs',
  tagline: 'Documentation du serveur MP3',
  favicon: 'img/favicon.ico',

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
        id: 'doc_tech',
        path: 'doc_tech',
        routeBasePath: 'tech',
        sidebarPath: require.resolve('./sidebars.ts'),
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'doc_creative',
        path: 'doc_creative',
        routeBasePath: 'creatif',
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
          sidebarId: 'sidebarId',
          position: 'left',
          label: 'Survie'
        },
        {
          to: '/creatif/intro',
          label: 'Créatif',
          position: 'left'
        },
        {
          to: '/tech/intro',
          label: 'Tech',
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
