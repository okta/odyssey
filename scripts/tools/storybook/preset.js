const { resolve } = require('path');

module.exports = {
  stories: [
    './stories/index.stories.js'
  ],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
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
        ]
      }
    };
  },

};
