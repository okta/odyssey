# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.9.0](https://github.com/okta/odyssey/compare/v0.8.4...v0.9.0) (2022-02-02)

### ⚠ BREAKING CHANGES

- **odyssey-react:** renames "title" props to "heading"
- **odyssey-react:** renames FieldGroup "title" prop to "legend"
- **odyssey-react:** renames Table "heading" and "caption" props
- **odyssey-react:** The Tag component renders a List (tags) of items (tag).
  It is being renamed from Tag to TagList to better represent what it does.
- **odyssey-react:** remove odyssey-deprecated-global.css stylesheet. Odyssey consumers should now use component composition.
- **odyssey-react:** Text prop fontWeight "regular" renamed to "normal"
- **odyssey-react:** Text props color "heading" "danger-disabled" and "code" removed
- **odyssey-react:** Text prop fontSize "lede" removed
- **odyssey-react:** Text props textTransform "full-width" and "full-size-kana" removed
- **odyssey-react:** Text prop lineHeight "font" removed
- **odyssey-react:** Text prop overflowWrap "anywhere" removed
- **odyssey-react:** required form input components must now declare
  true prop for `required`
- **odyssey-react:** non-required form input components must now declare
  translated string prop for `optionalLabel`

### Features

- **odyssey-react:** add reset styles to box, expose as prop ([ab539a8](https://github.com/okta/odyssey/commit/ab539a8f0bc1c9d82f60fbff32e8f9b7d794551f))
- **odyssey-react:** add text classes to Box withStyles ([264218f](https://github.com/okta/odyssey/commit/264218fe95fa2800147a17622934576850d208bb))
- **odyssey-react:** allow default text properties to be overriden in Box ([da68956](https://github.com/okta/odyssey/commit/da68956c9613a5c4610d5b9082f54d7f300580c3))
- **odyssey-react:** cleanup Box api docs and css rules ([014b867](https://github.com/okta/odyssey/commit/014b8672da898985f8f31bfc04fe2343c2ea8a15))
- **odyssey-react:** fix TS error in Box story ([a86e98f](https://github.com/okta/odyssey/commit/a86e98fea656a6c7d0cdeeea45aee0e5b8c8c3d0))
- **odyssey-react:** merge 'develop' to resolve conflicts ([3a21d99](https://github.com/okta/odyssey/commit/3a21d99765c1421fc509f514ee0cc23caa97e3e2))
- **odyssey-react:** merge branch 'develop' into ab/box to resolve conflicts ([b3fc8ec](https://github.com/okta/odyssey/commit/b3fc8ecb52a8aa74292aa2b19cd5cba1e240d9e5))
- **odyssey-react:** only style unclassed HTML 5 elements under box ([759681a](https://github.com/okta/odyssey/commit/759681a1eba836a8de2160c07e6b9d2724408ecd))
- **odyssey-react:** unset default text properties in Box using false value for props ([d0ba167](https://github.com/okta/odyssey/commit/d0ba167b94f7b64468c617400f89bf6b98181c0f))
- **odyssey-react:** update Box docs to match implementation ([fd09115](https://github.com/okta/odyssey/commit/fd091150da7a687043f5bcfd3e436e48fa7e1f6e))
- **odyssey-react:** update overflow story for Box ([6fc2261](https://github.com/okta/odyssey/commit/6fc226183ccef7a2b3916c59ab092d5bdcddf9a9))
- **odyssey-react:** updated Box to use polymorphic `as` prop ([32a3cf2](https://github.com/okta/odyssey/commit/32a3cf262f38ecc933828d7d4b7bc1899fd1a73e))
- **odyssey-react:** withTheme for Field ([a6b9cfa](https://github.com/okta/odyssey/commit/a6b9cfa32bcc4ae6ea4925fc44d454a79b9de3a8))
- **odyssey-react:** withTheme for Text ([83ddd3f](https://github.com/okta/odyssey/commit/83ddd3f534156e545d8e37725d88c0e778361d2f))
- **odyssey-storybook:** add stories to document Box ([eb4bf3d](https://github.com/okta/odyssey/commit/eb4bf3d8ce57ff2755bcc0499ef2e115a6eb96fe))
- **odyssey-storybook:** update stories to use new Text api ([a269860](https://github.com/okta/odyssey/commit/a2698608b2857d402fbbea2194bc64e63ad87f80))

### Bug Fixes

- **odyssey-react:** required prop default to true ([0ad6b7a](https://github.com/okta/odyssey/commit/0ad6b7aaa4c95b82b8108976394e77b830d52e69))
- **odyssey-storybook:** add Field.docgen to fix props table ([f2672bc](https://github.com/okta/odyssey/commit/f2672bc85926a6cdf1ac01730cb7de4b94fd2f70))
- **odyssey-storybook:** updated deprecated prop in box ([5658844](https://github.com/okta/odyssey/commit/5658844100d0f427ff4ff7685ccc63a2e4211a97))

### Code Refactoring

- **odyssey-react:** remove global typography styles ([01f0b0e](https://github.com/okta/odyssey/commit/01f0b0e31d704516b48b634c343b4cf132f9275a))
- **odyssey-react:** rename Tag to TagList ([6bdbfa6](https://github.com/okta/odyssey/commit/6bdbfa66b93dc83d34913aea9e526446edb4938b))
- **odyssey-react:** renames "title" props to "heading" ([0be3fb7](https://github.com/okta/odyssey/commit/0be3fb7779e1e74c1c5015ca041d136d5d673d7e))
- **odyssey-react:** renames FieldGroup "title" prop to "legend" ([44dc958](https://github.com/okta/odyssey/commit/44dc958ba8c432aa5623e705736c9a6945faea8a))
- **odyssey-react:** renames Table "heading" and "caption" props ([a515cee](https://github.com/okta/odyssey/commit/a515cee7d8a0e8b7c4d7de6acd61263be697bd24))

### [0.8.4](https://github.com/okta/odyssey/compare/v0.8.3...v0.8.4) (2021-11-18)

**Note:** Version bump only for package @okta/odyssey-storybook

## [0.8.3](https://github.com/okta/odyssey/compare/v0.8.2...v0.8.3) (2021-11-10)

### Features

- **odyssey-storybook:** add Page Background inverse color option to storybook ([#1162](https://github.com/okta/odyssey/issues/1162)) ([b5cd642](https://github.com/okta/odyssey/commit/b5cd642386004ba8e3f3b5c0ae1abb38a0f782e8))
