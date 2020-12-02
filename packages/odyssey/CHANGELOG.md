# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.0] - 2020-11-18

### Added
- ESLint has been added to our test suite
- Turquoise 400 has been added to the color map
- Links: added support for Links with Icons
- dfn: styling and minor guidance for the HTML element
- figure/figcaption: styling and minor guidance for the HTML element
- output: styling and minor guidance for the HTML element
- q: styling and minor guidance for the HTML element
- samp: styling and minor guidance for the HTML element
- `vuepress-theme-odyssey` is a new private package containing our brand new docs theme
- adds `prism-theme-odyssey` package for styling code blocks
- [Docs] Field Labels: replaces Form documentation and guidelines

### Changed
- Incosolata is now the default monospace font for Odyssey
- External link indicator updated
- [Breaking Change] Modal: `z-index` has been updated from `1` to `10`
- Tabs: now uses 16px base font instead of 14px
- Tabs: Border now lives on the tablist, rather than the tabpanel
- Tabs: `tabpanel` padding updated to match the design
- Tabs: removed unnecessary `z-index` declaration
- Tag: `tag--list` now inline-block by default
- Tag: Background color updated to Gray 100
- Toast/Modal: Close UI indicator updated to use variant from odyssey-icons
- [Docs] Content and examples for all components have been rewritten

### Removed
- Tabs: unused CSS custom properties that were used for moving tab indicator implementation have been removed
- `vuepress-theme-nimatron` has been removed in favor of `vuepress-theme-odyssey`
- [Docs] Form docs have been removed in favor of Field Labels

### Fixed
- Tables and Table wrappers now correctly remove margin if they are the last or only child

## [0.6.0] - 2020-10-02

### Added
- Toast: a transient messaging component
- Icons: Caution, Copy, Filter, and Error icons are now available
- Standalone Search: added a new Text Input variant for search UI
- Green-600: added as an a11y-compliant background color
- details/summary: styling and minor guidance for the HTML elements
- dl/dt/dd: styling and minor guidance for the HTML elements
- pre: styling and minor guidance for the HTML element

### Changed
- Gray-900 updated to #1d1d21; all relevant variables/tokens updated
- Links no longer require an underline; new Gray-900 contrast allows for this
- Icons: the Complete icon has been updated to differentiate it from a plain check

### Removed
- [Docs] Extraneous doc styles for deprecated samples have been removed

## [0.5.1] - 2020-09-18

### Added
- [Docs] Added missing guidance for accessible SVG icon use in Buttons

### Changed
- [Docs] Field warnings no longer display an "alert" icon as part of invalid messaging guidance

### Fixed
- [Docs] Type token examples now display correctly
- [Docs] `title` displays correctly once more ("Odyssey Design System")
- [Docs] VuePress no longer modifies outbound links automatically

## [0.5.0] - 2020-09-03

### Added
- [Docs] Iconography documentation, available at /base/iconography
- Basic styles for inline Icon display
- Multi-Select variant for Select (both Choices.js and HTML-only)
- Button w/ Icon variant has been added to Button
- Blue, 400 is now available for use via Sass maps (no Token)
- Gray, 500 is now available for use via Sass maps (no Token)

### Changed
- [Docs] Type documentation is now titled "Typography" and located at /base/typography
- [Docs] Documentation now references this CHANGELOG on GH directly rather than copying over
- [Docs] Color documentation has been revamped entirely
- [Docs] Documentation sorts now utilizes Vuepress slots for future-friendliness
- Recommended Choices.js configuration updated (non-breaking)
- SVGO configuration no longer sorts attributes, now adds `.ods-icon`
- [Breaking Change] "info", "back", and "forward" icons have been renamed to "get-info", "go-backward", and "go-forward"
- `$border-color-ui` is now a11y-compliant, utilizes Gray, 500
- `blockquote`, Form, Table, and Tab borders now use `$border-color-display` as they are not a11y-constrained

### Removed
- [Docs] Type test page has been removed from docs
- [Breaking Change] Grays 300 and 400 have been removed from available use

### Fixed
- [Docs] Modal examples now work as intended
- [Docs] `address` example now renders correctly
- All Icons now use a 14px grid instead of 24px for optimal display

## [0.4.0] - 2020-08-05

### Added

- `@okta/odyssey-icons` package: includes an initial set of SVGs and process for batch optimizing via `svgo`

### Changed

- Changed the Odyssey documentation platform from `hexo` to `vuepress`
- The documentation theme is now sourced via the private `@okta/vuepress-theme-nimatron` package
- `.gitignore` now includes the auto-generated `CHANGELOG` to avoid creating duplicate files
- `:disabled` and `:read-only` labels now share text and border styling
- Tab indicators no longer animate via CSS vars

### Removed

- [Breaking Change] `$border-default` token has been removed
- `:visited` link styling has been removed for user privacy

### Fixed

- Buttons labels no longer wrap (`white-spacing: nowrap`)

## [0.3.0] - 2020-06-25

### Added
- Design Tokens

### Changed
- Color, type and spacing to reflect rebrand
- [Breaking Change] `_variables.scss` has been renamed to `_tokens.scss`, this introduces design tokens into Odyssey
- [Breaking Change] Renamed "warning" to "orange"
- [Breaking Change] Changed spacing variables (tokens) to use t-shirt sizing as well as new values
- [Breaking Change] Changed typography, font family. Now refers to "headings" as titles throughout
- [Breaking Change] Change semantic `cv` arguments (lightest, base, dark) in favor of 000-900

### Removed
- [Breaking Change] Removed colors: magenta, grays 100, 300, 500, 700, 900
- [Breaking Change] Removed `fauxpacity` function, preferring "light" color variants
- [Breaking Change] Removed documentation and Sass styles for unapproved components: Banner, Callout, Card, Dropdown, Meter, Navigation, Switch, Toast, Top Bar
- Removed all other unused/unapproved documentation

## [0.2.0] - 2020-04-30

### Added
- Status: New component and documentation
- Tab: New component and documentation
- Tag: New component and documentation

### Changed
- [Breaking Change] Rename `yellow` color variable to `caution`
- All focus outline instances now use new outline mixin
- Adds Status content type to Table component
- [Docs] Fix misspelling in Form documentation
- [Docs] Rename "Foundation" to "Base" in nav

## [0.1.3] - 2020-04-20

### Added

- Styled HTML Elements `abbr`, `address`, `code`, `kbd`, `hr` and `var`
- Update all HTML element examples

### Changed

### Added

- Styled HTML Elements `abbr`, `address`, `code`, `kbd`, `hr` and `var`
- Update all HTML element examples

### Changed

- bugfix/ee-463 - fixes table cell overflow by wrapping long strings
- [Docs] Rename "Building Blocks" section to "Foundations"

## [0.1.2] - 2020-04-06

### Added

- [Docs] Changelog

### Changed

- [Docs] Heading casing changed to sentence throughout docs

## [0.1.1] - 2020-04-01

### Added

- Table: styling and documentation for default table behavior, sorting, and various content types
- Select: support for default select input behavior via plain HTML and Choices.js
- Styled Element Glossary: `blockquote`, `cite`, `del`, `em`, `ins`, `mark`, `s`, `small`, `sub`, `sup`, `strong`
- [Docs] Component Status Page
- [Docs] Code of Conduct

### Changed

- [Breaking Change] All classes are now prefixed with `.ods-`
- Standard borders are now set to 1px (from 2px)
- Input and Button now share the same height math

### Removed

- [Docs] Removed documentation for multiple items not yet ready for public use: Banner, Callout, Card, Dropdown, Iconography, Meter, Navigation, Switch, Toast, Top Bar, Layouts

## [0.0.1] - 2019-10-10

### Added/Changed/Removed
- Migrated former "Nim" repo into Odyssey
