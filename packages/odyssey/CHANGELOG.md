# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2020-06-24

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

## [0.1.3] - 2020-04-10

### Added

- Styled HTML Elements `abbr`, `address`, `code`, `kbd`, `hr` and `var`
- Update all HTML element examples

### Changed

- bugfix/ee-463 - fixes table cell overflow by wrapping long strings
- [Docs] Rename "Building Blocks" section to "Foundations"

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

## [0.1.3] - 2020-04-10

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
