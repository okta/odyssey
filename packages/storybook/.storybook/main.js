const { resolve } = require('path');

module.exports = {
  "stories": [
    '../../**/*.stories.mdx',
    '../../**/*.stories*.@(js|jsx|ts|tsx)',
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],

  webpack(webpackConfig) {
    return {
      ...webpackConfig,
      module: {
        ...webpackConfig.module,
        rules: [
          ...webpackConfig.module.rules,
          {
            test: [/\.stories\.js$/, /index\.js$/],
            loaders: [require.resolve('@storybook/source-loader')],
            include: [resolve('.storybook/stories')],
            enforce: 'pre',
          },
        ],
      },
      resolve: {
        ...webpackConfig.resolve,
        modules: [
          ...webpackConfig.resolve.modules,
          resolve(__dirname, '../node_modules')
        ],
      }
    };
  },

}
