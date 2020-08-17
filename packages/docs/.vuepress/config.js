// .vuepress/config.js
module.exports = {
  theme: '@okta/vuepress-theme-nimatron',
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
          { title: 'Elements', link: '/base/elements', isVisible: true },
          { title: 'Design Tokens', link: '/base/Tokens', isVisible: true },
          { title: 'Type', link: '/base/type', isVisible: true },
          { title: 'Grid', link: '/base/grid', isVisible: false },
        ]
      },
      {
        title: 'Components',
        children: [
          { title: 'Banner', link: '/components/banner', isVisible: false },
          { title: 'Button', link: '/components/button', isVisible: true },
          { title: 'Callout', link: '/components/callout', isVisible: false },
          { title: 'Card', link: '/components/card', isVisible: false },
          { title: 'Checkbox', link: '/components/checkbox', isVisible: true },
          { title: 'Dropdown', link: '/components/dropdown', isVisible: false },
          { title: 'Form', link: '/components/form', isVisible: true },
          { title: 'Link', link: '/components/link', isVisible: true },
          { title: 'Meter', link: '/components/meter', isVisible: false },
          { title: 'Modal', link: '/components/modal', isVisible: true },
          { title: 'Navigation', link: '/components/navigation', isVisible: false },
          { title: 'Number Input', link: '/components/number-input', isVisible: false },
          { title: 'Radio Button', link: '/components/radio-button', isVisible: true },
          { title: 'Select', link: '/components/select', isVisible: true },
          { title: 'Status', link: '/components/status/', isVisible: true  },
          { title: 'Switch', link: '/components/switch/', isVisible: false },
          { title: 'Tab', link: '/components/tab/', isVisible: true},
          { title: 'Tag', link: '/components/tag/', isVisible: true },
          { title: 'Table', link: '/components/table', isVisible: true },
          { title: 'Text Input', link: '/components/text-input', isVisible: true },
          { title: 'Toast', link: '/components/toast', isVisible: false },
          { title: 'Tooltip', link: '/components/tooltip', isVisible: true },
          { title: 'Top Bar', link: '/components/top-bar', isVisible: false },
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
