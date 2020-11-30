module.exports = {
  theme: '@okta/vuepress-theme-odyssey',
  dest: 'dist',
  name: 'Odyssey Design System',
  title: 'Odyssey Design System',
  head: [
    [
      'meta', {
        'og:title': 'Odyssey, the Okta design system',
        'og:type': 'article',
        'og:url': 'https://odyssey.okta.design',
        'og:image': '/images/og-logo.png',
      },
    ],
  ],
  // These plugins include vendor libraries which are required by Odyssey docs.
  plugins: [
    require('./plugins/plugin-choices/index.js'),
    require('./plugins/plugin-micromodal/index.js')
  ],
  markdown: {
    externalLinks: {
      target: '',
      rel: ''
    }
  },
  themeConfig: {
    flags: {
      hasSearch: false
    },
    links: {
      officeHours: 'https://oktawiki.atlassian.net/wiki/spaces/UX/pages/880512140/Odyssey+Office+Hours',
      slack: 'https://okta.slack.com/archives/C7T2H3KNJ',
      github: 'https://github.com/okta/odyssey'
    },
    nav: {
      primary: [
        {
          title: 'Base',
          link: '/base/',
          children: [
            { title: 'Color', link: '/base/color/' },
            { title: 'Design Tokens', link: '/base/tokens/' },
            { title: 'Elements', link: '/base/elements/' },
            { title: 'Typography', link: '/base/typography/' },
          ]
        },
        {
          title: 'Components',
          link: '/components/',
          children: [
            { title: 'Button', link: '/components/button/' },
            { title: 'Checkbox', link: '/components/checkbox/' },
            { title: 'Field Labels', link: '/components/field-labels/' },
            { title: 'Link', link: '/components/link/' },
            { title: 'Modal', link: '/components/modal/' },
            { title: 'Radio Button', link: '/components/radio-button/' },
            { title: 'Select', link: '/components/select/' },
            { title: 'Status', link: '/components/status/' },
            { title: 'Tab', link: '/components/tab/' },
            { title: 'Table', link: '/components/table/' },
            { title: 'Tag', link: '/components/tag/' },
            { title: 'Text Input', link: '/components/text-input/' },
            { title: 'Toast', link: '/components/toast/' },
            { title: 'Tooltip', link: '/components/tooltip/' }
          ],
        },
        { title: 'Icons', link: '/icons/' },
        { title: 'Figma Kit', link: 'https://www.figma.com/files/676870123940302956/project/2512934/Odyssey-UI' },
      ],
      secondary: [
        { title: 'Updates', link: '/updates/' },
        { title: 'Roadmap', link: 'https://app.zenhub.com/workspaces/odyssey-5ef0ab09504e9d002794ba2e/roadmap' },
        { title: 'Help', link: '/help/' },
      ]
    }
  }
}
