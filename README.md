# @okta/odyssey

This package provides the necessary SCSS and fonts to utilize Odyssey, Okta's design system.

For guidance on how and when to implement individual components, please see our <a href="https://design-docs.trexcloud.com/">online docs</a>.

## What's Included

`dist/odyssey.css` - A precompiled version of Odyssey for those who don't need the benefits of Sass.

`src/scss` - The SCSS source files for Odyssey, ready to be `@import`'d into your project.

`src/scss/odyssey.scss` - The main compilation sheet for Odyssey.

## Getting Started

### Install Odyssey

Using yarn:

`$ yarn add @okta/odyssey`

If you prefer npm, use the following command instead:

`$ npm install --save @okta/odyssey`

### SCSS

Usage of the Odyssey Sass files assumes the use of a SCSS pre-processor. All Sass files use the `*.scss` file extension and syntax.

#### Autoprefixer

Make sure your asset pipeline utilizes <a href="https://github.com/postcss/autoprefixer">autoprefixer</a> to ensure vendor prefixes are automatically added to your compiled CSS.

#### Importing SCSS files

To add a Odyssey to your build, import the compilation sheet directly.

```scss
@import 'node_modules/odyssey/src/scss/odyssey';
```

This will import all functions, mixins, abstracts, components, and layouts into your build.

If you are looking for a more limited selection, you can also import select components, etc individually.

## Contributing

### Linting

Odyssey utilizes <a href="https://stylelint.io/">stylelint</a> for our live linting as well as our lint tests.

You can check the current syntax rule configuration in `stylelint.json`.
