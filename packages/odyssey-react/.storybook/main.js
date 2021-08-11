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
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: 'ods-[folder]-[local]-[hash:base64:5]',
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              additionalData: `
                // Abstracts
                @import '@okta/odyssey/src/scss/abstracts/functions';
                @import '@okta/odyssey/src/scss/abstracts/colors';
                @import '@okta/odyssey/src/scss/abstracts/mixins';
                @import '@okta/odyssey/src/scss/abstracts/tokens';

                // Base
                @import '@okta/odyssey/src/scss/base/reset';
                @import '@okta/odyssey/src/scss/base/accessibility';
                @import '@okta/odyssey/src/scss/base/iconography';
                @import '@okta/odyssey/src/scss/base/typography-global';
                @import '@okta/odyssey/src/scss/base/typography-text';
                @import '@okta/odyssey/src/scss/base/typography-list';
                @import '@okta/odyssey/src/scss/base/typography-header';

                // Components
                @import '@okta/odyssey/src/scss/components/banner';
                @import '@okta/odyssey/src/scss/components/forms';
                @import '@okta/odyssey/src/scss/components/input-field';
                @import '@okta/odyssey/src/scss/components/input-field-layout';
                @import '@okta/odyssey/src/scss/components/label';
                @import '@okta/odyssey/src/scss/components/number-input';
                @import '@okta/odyssey/src/scss/components/radio-button';
                @import '@okta/odyssey/src/scss/components/radio-button-layout';
                @import '@okta/odyssey/src/scss/components/select';
                @import '@okta/odyssey/src/scss/components/table';
                @import '@okta/odyssey/src/scss/components/toast';
                @import '@okta/odyssey/src/scss/components/toast-pen';
                @import '@okta/odyssey/src/scss/components/tooltip';

                // Vendor Extensions
                @import '@okta/odyssey/src/scss/vendors-ext/choices-ext';
              `
            }
          }
        ],
      }
    );

    return config;
  }
};
