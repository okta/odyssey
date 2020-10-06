
module.exports = {
  theme: `@okta/vuepress-theme-odyssey`,
  dest: 'dist',
  name: 'Odyssey Design System',
  title: 'Odyssey Design System',
  head: [
    [
      'meta', { 
        'og:title': 'Odyssey, the Okta design system',
        'og:type': 'article',
        'og:url': 'https://design-docs.trexcloud.com',
        'og:image': '/images/og-logo.png',
      },
    ],
  ],
  // These plugins include vendor libraries which are required by Odyssey docs. 
  plugins: [
    require('./plugins/plugin-choices/index.js'),
    require('./plugins/plugin-micromodal/index.js')
  ],
  // This theme configuration is for `vuepress-theme-odyssey` with
  // the exception of themeConfig.nav, which is shared by both
  // `vuepress-theme-odyssey` and `vuepress-theme-nimatron`
  themeConfig: {
    flags: {
      hasSearch: false
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
            { title: 'Link', link: '/components/link/' },
            { title: 'Modal', link: '/components/modal/' },
            { title: 'Radio Button', link: '/components/radio-button/' },
            { title: 'Select', link: '/components/select/' },
            { title: 'Status', link: '/components/status/' },
            { title: 'Tab', link: '/components/tab/' },
            { title: 'Tag', link: '/components/tag/' },
            { title: 'Table', link: '/components/table/' },
            { title: 'Text Input', link: '/components/text-input/' },
            { title: 'Tooltip', link: '/components/tooltip/' },
            { title: 'Form', link: '/components/form/' },
          ],
        },
        { title: 'Icons', link: '/base/iconography/' },
        { title: 'Figma Kit', link: 'https://www.figma.com/files/676870123940302956/project/2512934/Odyssey-UI' },
        { title: 'Updates', link: '/updates/' }
      ],
      secondary: [
        { title: 'Help', link: '/help/' },
      ]
    }
  }
}
