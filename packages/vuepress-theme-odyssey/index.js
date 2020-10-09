// Theme API.
module.exports = (options, ctx) => {
  return {
    plugins: [
      [
        "vuepress-plugin-clean-urls",
        {
          normalSuffix: "/",
          indexSuffix: "/",
          notFoundlink: "/404.html"
        }
      ]
    ]
  };
};
