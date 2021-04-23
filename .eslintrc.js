const { pattern, template, header } = require('./header');

module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  overrides: [
    {
      files: '*.js',
      excludedFiles: [".eslintrc.js", "header.js"],
      plugins: [
        'header'
      ],
      rules: {
        'header/header': [
          'error',
          'block',
          [
            '!',
            { pattern, template },
            ...header.split('\n')
          ],
          2,
        ]
      }
    }
  ]
};
