module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
  // webpackFinal: (config) => {
  //   config.plugins.push({
  //     test: /\.svg$/,
  //     loader: require.resolve('svg-inline-loader')
  //   });
  // }
}
