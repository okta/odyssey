// .vuepress/config.js
const themeName = process.env.THEME || 'nimatron'

module.exports = {
  theme: `@okta/vuepress-theme-${themeName}`,
  dest: 'dist',
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
  themeConfig: {
    nav: [
      {
        title: 'Base',
        children: [
          { title: 'Color', link: '/base/color', isVisible: true },
          { title: 'Design Tokens', link: '/base/tokens', isVisible: true },
          { title: 'Elements', link: '/base/elements', isVisible: true },
          { title: 'Iconography', link: '/base/iconography', isVisible: true },
          { title: 'Typography', link: '/base/typography', isVisible: true },
        ]
      },
      {
        title: 'Components',
        children: [
          { title: 'Button', link: '/components/button', isVisible: true },
          { title: 'Checkbox', link: '/components/checkbox', isVisible: true },
          { title: 'Form', link: '/components/form', isVisible: true },
          { title: 'Link', link: '/components/link', isVisible: true },
          { title: 'Modal', link: '/components/modal', isVisible: true },
          { title: 'Radio Button', link: '/components/radio-button', isVisible: true },
          { title: 'Select', link: '/components/select', isVisible: true },
          { title: 'Status', link: '/components/status/', isVisible: true  },
          { title: 'Tab', link: '/components/tab/', isVisible: true},
          { title: 'Tag', link: '/components/tag/', isVisible: true },
          { title: 'Table', link: '/components/table', isVisible: true },
          { title: 'Text Input', link: '/components/text-input', isVisible: true },
          { title: 'Tooltip', link: '/components/tooltip', isVisible: true },
        ],
      },
      {
        children: [
          { title: 'Changelog', link: 'https://github.com/okta/odyssey/blob/master/packages/odyssey/CHANGELOG.md', isVisible: true},
        ]
      },
    ]
  }
}
