# `odyssey-utilities`

This package includes a Tailwind theme and plugin for creating Odyssey utilities and classes.

## Usage

```
// tailwind.config.js
const { theme, plugin } = require('odyssey-utilities');

module.exports = {
  theme: {
    extend: theme,
  },
  plugins: [
    plugin(),
  ]
}
```
