module.exports = {
  overrides: [
    {
      files: ["*.js", "*.vue"],
      extends: ["vuepress"],
      rules: {
        "prettier/prettier": 0
      }
    }
  ]
};
