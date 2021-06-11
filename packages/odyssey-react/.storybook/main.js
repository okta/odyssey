module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "typescript": {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "@storybook/addon-a11y",
    "@pxblue/storybook-rtl-addon/register"
  ]
}
