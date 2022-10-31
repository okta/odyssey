# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.16.0](https://github.com/okta/odyssey/compare/v0.15.3...v0.16.0) (2022-10-27)

### Bug Fixes

- added odyssey-react-labs ([aca12b2](https://github.com/okta/odyssey/commit/aca12b2dc421b411d5e87278dd37dd1cd6b39bc2))
- missing unit test in odyssey-react-labs ([66233e3](https://github.com/okta/odyssey/commit/66233e30680b65cb7f5a514c285956c5dbf8d8c2))

### [0.15.1](https://github.com/okta/odyssey/compare/v0.15.0...v0.15.1) (2022-10-06)

### Features

- added missing `"sideEffects": false` to all packages ([61ee25b](https://github.com/okta/odyssey/commit/61ee25b461f27a473f1a82dcc1647e044fed8a3d))
- **odyssey-react-mui:** add ArrowUpDown icon ([a2f99b8](https://github.com/okta/odyssey/commit/a2f99b8eaa3172bab0f799796f08db539c0f49fa))
- **odyssey-react-mui:** add theme for IconButton ([1b121fa](https://github.com/okta/odyssey/commit/1b121fa791f4032773459519b730028edfef11d5))
- **odyssey-react-mui:** add themes for Table component API ([dcae5e8](https://github.com/okta/odyssey/commit/dcae5e81f0ed4364ae9ed62877c57c2a0c8cd165))
- **odyssey-react-mui:** update to MUI 5.10.5 ([6908971](https://github.com/okta/odyssey/commit/69089713a795cef0aaa2b3eb2bfea61379e9edd0))

### Bug Fixes

- hotfixed TypeScript compatibility issues with custom Babel plugins ([78d1a7b](https://github.com/okta/odyssey/commit/78d1a7b9390d67215e2a4042ecd364743f54d8c3))
- **odyssey-react-mui:** apply appropriate styles to readonly and disabled text inputs ([ccea01b](https://github.com/okta/odyssey/commit/ccea01b18a6c4d20591c43ef199ed64e392e773a))
- **odyssey-react-mui:** fixes focus outline on Infobox links ([6536cba](https://github.com/okta/odyssey/commit/6536cba41cbccdc5389061fef42ca6d4fccb186e))
- **odyssey-react-mui:** remove `body` from Typography type mods ([bb83940](https://github.com/okta/odyssey/commit/bb83940d4e1ff8e99dc0524ae17d76d1c67d1dad))
- updated @svgr/cli ([41dff60](https://github.com/okta/odyssey/commit/41dff6061b237a1937b02f0786e7daaf1e6465cb))
- updated Babel and Postcss dependencies ([fc5a214](https://github.com/okta/odyssey/commit/fc5a214171866fdc1c883e7f1e03c622aa580ef1))
- updated Babel to latest to fix yarn install issues ([5eccaf0](https://github.com/okta/odyssey/commit/5eccaf0470eb6b6d36c36ce11301dbd7f7748652))
- upgraded Jest to v29 ([3872c7e](https://github.com/okta/odyssey/commit/3872c7e75ea017781dc8e53526055f232efcbf0b))
- upgraded libraries depending on minimist ([29dfd9b](https://github.com/okta/odyssey/commit/29dfd9bd1503277bde0217beb33c15ef4f541736))

## [0.15.0](https://github.com/okta/odyssey/compare/v0.14.6...v0.15.0) (2022-09-01)

### ⚠ BREAKING CHANGES

- **odyssey-react-mui:** removes `body` and `caption` variants in favor of MUI's `body1` and `subtitle`

### Features

- **odyssey-react-mui:** add styles for kbd to Typography ([69b3ecc](https://github.com/okta/odyssey/commit/69b3eccd8bf40dc634754c3fb19518574e88c9db))
- **odyssey-react-mui:** add UserGroupIcon ([532a2d2](https://github.com/okta/odyssey/commit/532a2d2d6351d93c99c2af3b0e92d7041de331b8))
- **odyssey-react-mui:** apply ODS Icons to MuiAlert ([4260b7a](https://github.com/okta/odyssey/commit/4260b7aeccf0534707687dfc3c8c5f94dbb20901))
- **odyssey-react-mui:** set defaultProps for SvgIcon ([52b2e7d](https://github.com/okta/odyssey/commit/52b2e7d15f16f899523e396b53fcfcb7056a958b))
- **odyssey-react-mui:** themes spacing for Form layout and Typography ([263d248](https://github.com/okta/odyssey/commit/263d2482643e600041edaa34073b164eb1cf8873))

### Bug Fixes

- **odyssey-react-mui:** fix adjacent Button spacing ([44941d5](https://github.com/okta/odyssey/commit/44941d55d83249069cd6a545104a106b624e7387))
- temporarily remove `type: "module"` from odyssey-react-mui ([5fde17a](https://github.com/okta/odyssey/commit/5fde17a72970174a69a27080763e66b91e9d1cfb))

### [0.14.6](https://github.com/okta/odyssey/compare/v0.14.5...v0.14.6) (2022-08-18)

### Features

- **odyssey-react-mui:** add borderRadius and borderStyle variables ([b144cf6](https://github.com/okta/odyssey/commit/b144cf6ea2930d6a3ac5fbbe85610931f8debd1e))
- **odyssey-react-mui:** add theme for Tabs, Tab ([b4c9fc6](https://github.com/okta/odyssey/commit/b4c9fc6d7f0395e900aa842f9dfeb2ea7366b11c))
- **odyssey-react-mui:** set theme.palette.action.disabled ([b3ce58a](https://github.com/okta/odyssey/commit/b3ce58a60fb5df7be895d54bc45b81fb5da4f719))
- **odyssey-react-mui:** update palette.text.disabled ([c9cb834](https://github.com/okta/odyssey/commit/c9cb8344a707f788c47819a008c8dcb32937fbda))

### [0.14.5](https://github.com/okta/odyssey/compare/v0.14.4...v0.14.5) (2022-08-11)

### Features

- added information about ThemeProvider and useTheme to README ([2b2490e](https://github.com/okta/odyssey/commit/2b2490e402bbfb492752a030333871f9a5f8b561))
- **odyssey-react-mui:** add borderWidth and maxWidth theme variables ([05a2fef](https://github.com/okta/odyssey/commit/05a2fef7eb676262e293c80c5de9d24c70c6892d))
- **odyssey-react-mui:** add themes for Banner and Toast ([236c2bd](https://github.com/okta/odyssey/commit/236c2bdab1f7e03b0d431730d240de1f1c0ead2b))
- upgraded Storybook and Material-UI ([ab495f9](https://github.com/okta/odyssey/commit/ab495f9eef6769a2d2e46f488b1a98dc29bc772d))

### Bug Fixes

- **odyssey-react-mui:** fix Button :focus-visible styles ([91aaa06](https://github.com/okta/odyssey/commit/91aaa06290433126815c065d382b4261fb7b1c7d))

### [0.14.4](https://github.com/okta/odyssey/compare/v0.14.3...v0.14.4) (2022-08-04)

### Features

- **odyssey-react-mui:** add Icon components ([9ba7b4b](https://github.com/okta/odyssey/commit/9ba7b4bdbc17fed37d54e68406dc3527bfc7d703))
- **odyssey-react-mui:** add MUI themes ([63bd3a3](https://github.com/okta/odyssey/commit/63bd3a3ff1799858f69196abe5f860670e2ac624))
- **odyssey-react-mui:** add support for InputAdornments ([98f4e39](https://github.com/okta/odyssey/commit/98f4e3968b733bda09756047abc1d07beec8ad57))
- **odyssey-react-mui:** enable palette theming for components ([f6d4979](https://github.com/okta/odyssey/commit/f6d4979b1b48b0903c677149185d233fb0a62e6b))
- **odyssey-react-mui:** enable spacing theming for components ([ee3aed5](https://github.com/okta/odyssey/commit/ee3aed58a3632a557109365a503512cb29b50746))
- **odyssey-react-mui:** storybook updates with MUI theme changes in development ([2563a95](https://github.com/okta/odyssey/commit/2563a95a4b10e0c1ab80050aff3bbb018500cbc7))

### Bug Fixes

- updated peerDependencies for odyssey-react-mui to restrict the Material UI version ([d599952](https://github.com/okta/odyssey/commit/d599952cd923a46c78096333e47db801524a9922))
- upgraded Material UI to fix custom theme values ([a39077a](https://github.com/okta/odyssey/commit/a39077aad95227d8af5285ff6fdee24462f49b20))

### [0.14.3](https://github.com/okta/odyssey/compare/v0.14.2...v0.14.3) (2022-07-14)

### Features

- **odyssey-react-mui:** add Icon components ([9ba7b4b](https://github.com/okta/odyssey/commit/9ba7b4bdbc17fed37d54e68406dc3527bfc7d703))
- **odyssey-react-mui:** add MUI themes ([63bd3a3](https://github.com/okta/odyssey/commit/63bd3a3ff1799858f69196abe5f860670e2ac624))
- **odyssey-react-mui:** storybook updates with MUI theme changes in development ([2563a95](https://github.com/okta/odyssey/commit/2563a95a4b10e0c1ab80050aff3bbb018500cbc7))

### [0.14.2](https://github.com/okta/odyssey/compare/v0.14.1...v0.14.2) (2022-06-30)

### Features

- **odyssey-react-mui:** add Infobox theme for Alert ([d92c896](https://github.com/okta/odyssey/commit/d92c89623451fb947cb0786367aeec9c02966cbc))
- **odyssey-react-mui:** add theme for Checkbox, Radio, Labels, Hints ([a7ed02a](https://github.com/okta/odyssey/commit/a7ed02a79340c32920da92da4947a068ac44c2fd))
- **odyssey-react-mui:** utilize color tokens for Palette, add lighter ([639549c](https://github.com/okta/odyssey/commit/639549c92f0b2644d347004f4ec801684cba13bf))

### Bug Fixes

- **odyssey-react-mui:** button danger disabled style ([dd2d344](https://github.com/okta/odyssey/commit/dd2d344e724d79fbc9e915390c7406cafee7279a))
- **odyssey-react-mui:** button prop serialization ([8092a2c](https://github.com/okta/odyssey/commit/8092a2c5c044b98613555805dd9e89581f7174bd))

### [0.14.1](https://github.com/okta/odyssey/compare/v0.14.0...v0.14.1) (2022-06-21)

### Features

- **odyssey-react-mui:** add component themes, update palette + type ([c4fd294](https://github.com/okta/odyssey/commit/c4fd29488ba333236ce2ea478b2b407337ea08cc))
