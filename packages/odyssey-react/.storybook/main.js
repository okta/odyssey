module.exports = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  webpackFinal(config) {
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: "[folder]__[local]__[hash:base64:5]",
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              additionalData: `
                @import '~@okta/odyssey/src/scss/abstracts/functions';
                @import '~@okta/odyssey/src/scss/abstracts/colors';
                @import '~@okta/odyssey/src/scss/abstracts/mixins';
                @import '~@okta/odyssey/src/scss/abstracts/tokens';
              `
            }
          }
        ],
      }
    );

    return config;
  }
};
