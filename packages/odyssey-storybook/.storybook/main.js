module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
  webnpackFinal: (config) => {
    config.plugins.push({
      test: /\.svg$/,
      loader: require.resolve('svg-inline-loader')
    });
  }
}
