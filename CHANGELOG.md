# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.5.0](https://github.com/okta/odyssey/compare/v1.4.0...v1.5.0) (2023-10-27)

### Features

- update secondary Button style ([#2011](https://github.com/okta/odyssey/issues/2011)) ([0d02217](https://github.com/okta/odyssey/commit/0d02217c3c4de1788a4e5a786b041ae749f96c2d))

### Bug Fixes

- remove ":" from ScreenReaderText ([37393e5](https://github.com/okta/odyssey/commit/37393e5025a3b8694074554de8c74e33feebc5a7))

## [1.4.0](https://github.com/okta/odyssey/compare/v1.3.0...v1.4.0) (2023-10-23)

### Features

- add onclick prop to link component ([#2003](https://github.com/okta/odyssey/issues/2003)) ([7ae351e](https://github.com/okta/odyssey/commit/7ae351edb3001de752ffc292133a05a9b64c57be))

## [1.3.0](https://github.com/okta/odyssey/compare/v1.2.0...v1.3.0) (2023-10-18)

### Features

- group picker ([71171e0](https://github.com/okta/odyssey/commit/71171e009460f6f6606cd4b87647d36c8d5b119a))
- upgrades to Node v20 ([#1996](https://github.com/okta/odyssey/issues/1996)) ([110c0d4](https://github.com/okta/odyssey/commit/110c0d4e47563cb73087c49d52185c1e5c03ebd9))

### Bug Fixes

- concurrency in Applitools being too high ([#1997](https://github.com/okta/odyssey/issues/1997)) ([34a3299](https://github.com/okta/odyssey/commit/34a3299b031dd93be1b13ba3c9b69fa929311d04))
- gray color in default Status lamp variant ([1dd74df](https://github.com/okta/odyssey/commit/1dd74df9cb86147ed4cb02e3deb04c0be7f6fe6c))
- inclusive language adjustments ([#1995](https://github.com/okta/odyssey/issues/1995)) ([82f4cb5](https://github.com/okta/odyssey/commit/82f4cb5290d418623c35fdb2504da37ab05a2d89))
- menu button not allowing falsey children ([#1999](https://github.com/okta/odyssey/issues/1999)) ([b63b117](https://github.com/okta/odyssey/commit/b63b117beb7d86671a91d76256092400d0c7e204))
- **odyssey-react-mui:** added more stories ([29fa4fa](https://github.com/okta/odyssey/commit/29fa4fa258b05a40de5cee4a59d19ab6a64d01da))
- **odyssey-react-mui:** improve PasswordField docs ([6c1cd05](https://github.com/okta/odyssey/commit/6c1cd052ae11d870d2ad7f1413d719ebfc9c1c60))
- remove border from default status lamp ([5bacb73](https://github.com/okta/odyssey/commit/5bacb73d76662e6d4c4a5423fdf6cb96ac677913))
- update displayName for Autocomplete ([#1983](https://github.com/okta/odyssey/issues/1983)) ([65abc8e](https://github.com/okta/odyssey/commit/65abc8e99949d9bafacace4a5591dec93ca3cc1f))

## [1.2.0](https://github.com/okta/odyssey/compare/v1.1.1...v1.2.0) (2023-09-29)

### Features

- adds ability to use Shadow DOM with Odyssey ([#1966](https://github.com/okta/odyssey/issues/1966)) ([6b52246](https://github.com/okta/odyssey/commit/6b5224662982d7e214457292d0ab168719dc8c29))
- hide selected Autocomplete items ([#1984](https://github.com/okta/odyssey/issues/1984)) ([11aa9ee](https://github.com/okta/odyssey/commit/11aa9ee0211e7f5b2c2512d77ee7efd8b4c7426e))
- **odyssey-react-mui:** add new storyObj with hasShowPassowrd=false ([1e55998](https://github.com/okta/odyssey/commit/1e559983fb6ef323535965569315e148d625452a))
- **odyssey-react-mui:** adding new prop for PasswordField to control show password button ([58ad6c8](https://github.com/okta/odyssey/commit/58ad6c8027d963a557fc501acba7ebc5724e2410))
- **odyssey-react-mui:** renamed prop to hasShowPassword and changed default to true ([6c3b8d2](https://github.com/okta/odyssey/commit/6c3b8d2d8486afbee6869a12c5320f2ea152dc5a))

### Bug Fixes

- id and name not changing in Storybook ([#1987](https://github.com/okta/odyssey/issues/1987)) ([2f57e15](https://github.com/okta/odyssey/commit/2f57e156f27c64954e8aa39662198d9c04ff9518))
- **odyssey-react-mui:** add id and name tests ([027f8f8](https://github.com/okta/odyssey/commit/027f8f8588f7665c9e9b0cb3f08840625995d348))
- **odyssey-react-mui:** add mising prop errorMessage to autocomplete ([1c1360c](https://github.com/okta/odyssey/commit/1c1360cd33f74b5d91f961ed859ab0972633995d))
- **odyssey-react-mui:** add props onBlur, onFocus, id, name ([66ad838](https://github.com/okta/odyssey/commit/66ad838821ba18c3ee4c24f729b89c76eb62df3e))
- **odyssey-react-mui:** adding isOptional to stories ([6fd080c](https://github.com/okta/odyssey/commit/6fd080c993e66f4abd0fb20c32bd8a381d376937))
- **odyssey-react-mui:** address PR comments ([f10a903](https://github.com/okta/odyssey/commit/f10a903cece4f873f91a588b3b603d96b6055eb1))
- **odyssey-react-mui:** fix test ([2be6755](https://github.com/okta/odyssey/commit/2be675516ba1e1218a4bce34ed61fa8a25048f45))
- **odyssey-react-mui:** fixing issue with t function type by upgrading package ([c0b8343](https://github.com/okta/odyssey/commit/c0b834326afda7e42aacb64af174def159c31e90))
- **odyssey-react-mui:** fixing test to use queryByRole to expect null ([aa85df0](https://github.com/okta/odyssey/commit/aa85df050c0e7fd67d5e9b0332e37b812f508c80))
- **odyssey-react-mui:** fixing tests to use getByRole and canvas ([cd7feed](https://github.com/okta/odyssey/commit/cd7feed17147397e5f79eed31e31d59ee17f562d))
- **odyssey-react-mui:** localizing the aria-label for the PasswordField component ([e9d332a](https://github.com/okta/odyssey/commit/e9d332a5f691742609533e679bb58d7f910c9a1b))
- **odyssey-react-mui:** toggle aria label based on password ([405fd71](https://github.com/okta/odyssey/commit/405fd7155d8ac9bb5b697bbb8b4dad3c021a0e63))
- **odyssey-react-mui:** updating descriptions for props ([12b9587](https://github.com/okta/odyssey/commit/12b9587cda9058ff00180e0cc7b2bcb4debeb27f))
- removed classes prop from Typography components ([#1989](https://github.com/okta/odyssey/issues/1989)) ([889f369](https://github.com/okta/odyssey/commit/889f3697582da68f71f2db801c1e7702a29fd9f5))
- some TS errors went through the cracks ([#1986](https://github.com/okta/odyssey/issues/1986)) ([49f891f](https://github.com/okta/odyssey/commit/49f891f80ed3419c04ef1eec5dfee8a860811e5e))

## [1.1.1](https://github.com/okta/odyssey/compare/v1.1.0...v1.1.1) (2023-09-15)

**Note:** Version bump only for package odyssey

## [1.1.0](https://github.com/okta/odyssey/compare/v1.0.5...v1.1.0) (2023-09-14)

### Features

- enable name in all form fields ([#1969](https://github.com/okta/odyssey/issues/1969)) ([45ae220](https://github.com/okta/odyssey/commit/45ae220ca8a2bce0af484a52001e5477cf253147))

### Bug Fixes

- add @mui/system as dependency ([8294649](https://github.com/okta/odyssey/commit/8294649debb136a2c92733b8427aedf838200a07))
- flip ordering of state to allow consumer to override ([4c48230](https://github.com/okta/odyssey/commit/4c482302d8ca74fa8566afcf66989064dd397d8a))
- html `required` attribute removed when adding `isOptional` prop ([#1965](https://github.com/okta/odyssey/issues/1965)) ([793210d](https://github.com/okta/odyssey/commit/793210d8c3f3aa4aea3df815e30cb1029c71d511))
- make global + column filtering work ([5df3006](https://github.com/okta/odyssey/commit/5df30067887a456fc3ad373ef8e548e4386590b1))
- onGlobalFilterChange should fire when string removed ([#1970](https://github.com/okta/odyssey/issues/1970)) ([1c424b9](https://github.com/okta/odyssey/commit/1c424b9ac86547f4fb55b955f240f24fac83cb2b))
- prettier adjustments ([cd7111c](https://github.com/okta/odyssey/commit/cd7111c9c510591db866831c58db3ed6f8e6466f))
- static tables to always have virtualization enabled ([#1967](https://github.com/okta/odyssey/issues/1967)) ([f4362ce](https://github.com/okta/odyssey/commit/f4362ce45e7f70aa3667b361f4696af063a78612))

## [1.0.5](https://github.com/okta/odyssey/compare/v1.0.4...v1.0.5) (2023-09-11)

### Bug Fixes

- adds missing TypeScript patch files from Yarn ([#1959](https://github.com/okta/odyssey/issues/1959)) ([1bd5a97](https://github.com/okta/odyssey/commit/1bd5a9711723ab77a4bb74d186d6d578d83b0281))

## [1.0.4](https://github.com/okta/odyssey/compare/v1.0.3...v1.0.4) (2023-08-29)

### Bug Fixes

- update github workflows to point to `main` ([8e8abe5](https://github.com/okta/odyssey/commit/8e8abe5347fa4eb13f2a832466bf1516d9a3ab52))
- upgrades Lerna version ([#1951](https://github.com/okta/odyssey/issues/1951)) ([303cc31](https://github.com/okta/odyssey/commit/303cc317b36731ff17e2e95754ca74260a1d216b))
- upgrades Yarn version ([3da71f5](https://github.com/okta/odyssey/commit/3da71f501b6bab322122fdd35b12374243af383a))

## [1.0.3](https://github.com/okta/odyssey/compare/v1.0.2...v1.0.3) (2023-08-28)

**Note:** Version bump only for package odyssey

## [1.0.2](https://github.com/okta/odyssey/compare/v1.0.1...v1.0.2) (2023-08-04)

### Features

- add `isDisabled` in context from Fieldset to Field ([#1911](https://github.com/okta/odyssey/issues/1911)) ([135dbbb](https://github.com/okta/odyssey/commit/135dbbb6bf98514deb164713b84ea23b5a4296d1))
- add Button types ([#1903](https://github.com/okta/odyssey/issues/1903)) ([5b78259](https://github.com/okta/odyssey/commit/5b78259045eb36e50a2a24f387c6b213471bbcac))
- adds ScopedCssBaseline to OdysseyThemeProvider ([#1904](https://github.com/okta/odyssey/issues/1904)) ([bbb734d](https://github.com/okta/odyssey/commit/bbb734d6c17a9831502cd6d4fd620d5cf1066a34))
- **odyssey-design-tokens:** add 'disabled' type color ([6810a9c](https://github.com/okta/odyssey/commit/6810a9ca0c5ea945aebe7f457e22a5c2599cf150))
- **odyssey-design-tokens:** add "darker" to primary palette ([775ffcb](https://github.com/okta/odyssey/commit/775ffcb925e0bf9b0c829daecd57a8ea1fe7d18f))
- **odyssey-design-tokens:** add alpha tokens ([a861769](https://github.com/okta/odyssey/commit/a861769bba77c5a6b12681c801bd6bb5807a102e))
- **odyssey-design-tokens:** add border.outer and palette.x.heading ([553d3bc](https://github.com/okta/odyssey/commit/553d3bca6232a363205a35d56e63d643d47101fa))
- **odyssey-design-tokens:** add border.radius.round ([be1a4f2](https://github.com/okta/odyssey/commit/be1a4f25f42de89e50744af05f46cee8ac9bb74a))
- **odyssey-design-tokens:** add border.width.heavy ([b825c03](https://github.com/okta/odyssey/commit/b825c03555044eedacb240fb0d8322f873bdaf98))
- **odyssey-design-tokens:** add token for border.radius.tight ([a3978ae](https://github.com/okta/odyssey/commit/a3978ae662769b5603aee9bcf0cd75d96436a0b4))
- **odyssey-design-tokens:** add tokens for colorized text ([6f89fc8](https://github.com/okta/odyssey/commit/6f89fc8cf20313f99915797c9b764990be020ef2))
- **odyssey-icons:** update all icon source SVGs ([06cf17a](https://github.com/okta/odyssey/commit/06cf17aaeb0255e6d8c3eb5d20650af30ae0fe95))
- **odyssey-react-mui:** add icon support to Tag ([6d1adc4](https://github.com/okta/odyssey/commit/6d1adc4422609b9623a320fa6bb4dcafa088f13d))
- **odyssey-react-mui:** add sub2 type style ([0d7b2a0](https://github.com/okta/odyssey/commit/0d7b2a082c6a89c3395c84708b2e9de2796817f5))
- **odyssey-react-mui:** add transparency and blur to Toast ([497ed8c](https://github.com/okta/odyssey/commit/497ed8c00dc45214a0455623aed89610b40562d2))
- **odyssey-react-mui:** generate new and updated icon components ([a5aa7ab](https://github.com/okta/odyssey/commit/a5aa7ab62b0ac3b50163b98730b5eb9fe23ac791))
- **odyssey-react-mui:** include color properties in type styles ([a817ffb](https://github.com/okta/odyssey/commit/a817ffb56f8c960840b342cde701247a1f2fcbc4))
- **odyssey-react-mui:** manually update icon index, update references in styling ([6ed2aab](https://github.com/okta/odyssey/commit/6ed2aabf9635f0c5dd31b626bdf55bf6e6c46fd9))
- **odyssey-react-mui:** update Button to match Rebrand ([d017b46](https://github.com/okta/odyssey/commit/d017b467b56999d62c35c9681c6829faa96eb487))
- **odyssey-react-mui:** update Dialog to match Rebrand ([2894c1d](https://github.com/okta/odyssey/commit/2894c1d6854be19721a9830062f27c73e93242b2))
- **odyssey-react-mui:** update Link to match new brand standards ([5afc6ed](https://github.com/okta/odyssey/commit/5afc6ed73e81c13d1feeede8e686eee42dee37c8))
- **odyssey-react-mui:** update Status styles and variants to match brand ([2da6aa6](https://github.com/okta/odyssey/commit/2da6aa69c65f79f84c19a6a360a31ad17666749d))
- **odyssey-react-mui:** updated ScopedCSSBaseline for rebrand ([e9e2514](https://github.com/okta/odyssey/commit/e9e2514cf8cefeaefe0afe9cbfc0d65f8f09e947))
- **odyssey-svgr:** update template to support 24x24 sources ([104a998](https://github.com/okta/odyssey/commit/104a9986685437947f570ce20a588c34156a40af))
- remove Icon component ([#1864](https://github.com/okta/odyssey/issues/1864)) ([b897485](https://github.com/okta/odyssey/commit/b897485c5e7bfedae2770b0329b9ce6d7c974e69))

### Bug Fixes

- add incremental to root tsconfig ([#1810](https://github.com/okta/odyssey/issues/1810)) ([9632839](https://github.com/okta/odyssey/commit/96328391b717ef60deeaf3c6a22250ae6c71b5a4))
- add play test for dialog, menubutton, select, tag, passwordfield ([#1861](https://github.com/okta/odyssey/issues/1861)) ([2957e6a](https://github.com/okta/odyssey/commit/2957e6ab7685301dd0713556129c3fd7a44451ae))
- add tooltip play test ([#1854](https://github.com/okta/odyssey/issues/1854)) ([1306cbd](https://github.com/okta/odyssey/commit/1306cbd7ae27fde29a8f5ce9ae4cd7a33f6f9dbd))
- allow major version bumps ([#1913](https://github.com/okta/odyssey/issues/1913)) ([ad4205a](https://github.com/okta/odyssey/commit/ad4205ae21c904c043b2593ff34829089961ee27))
- Applitools VRT ([#1827](https://github.com/okta/odyssey/issues/1827)) ([ab9a391](https://github.com/okta/odyssey/commit/ab9a39105f217592cda5ae55480239988e041a8e))
- broken styles in MuiInputBase ([#1921](https://github.com/okta/odyssey/issues/1921)) ([42fc2c4](https://github.com/okta/odyssey/commit/42fc2c4d0503f8e1bfbb8ae83c4da6f35760d720))
- Button's `tooltipText` needs to show on hover ([#1817](https://github.com/okta/odyssey/issues/1817)) ([0ca21ff](https://github.com/okta/odyssey/commit/0ca21ff190a35ecaf05e1f1c9e71bd0757edee4d))
- change to DesignTokens type rather than the overrides in theme ([#1816](https://github.com/okta/odyssey/issues/1816)) ([47c106b](https://github.com/okta/odyssey/commit/47c106bdeb2cdec597c58ba3b7ca9040091a10e4))
- clicking MenuItem closes MenuButton ([#1820](https://github.com/okta/odyssey/issues/1820)) ([bde9d88](https://github.com/okta/odyssey/commit/bde9d880a87038949e2df22cf02e6380168bd3eb))
- enable a11y tests in CI ([#1826](https://github.com/okta/odyssey/issues/1826)) ([cd98022](https://github.com/okta/odyssey/commit/cd9802265de5fc10a96a8ed28ce3f2e762c530cc))
- memoize the Link component ([#1813](https://github.com/okta/odyssey/issues/1813)) ([a98dd87](https://github.com/okta/odyssey/commit/a98dd873a2a92a558202901e4aa456f9be4d0cae))
- **odyssey-react-mui:** add aria-disabled to Tag ([f798e48](https://github.com/okta/odyssey/commit/f798e481b4f03eeb8834bb8e413b85f3aef18f03))
- **odyssey-react-mui:** autocomplete is now RTL friendly ([e14265e](https://github.com/okta/odyssey/commit/e14265ea4eeee6cd4f108f032a8158272402f3b2))
- **odyssey-react-mui:** lengthy field labels are no longer cut off ([6231951](https://github.com/okta/odyssey/commit/6231951d9d98a5815c48820b73505beeb6319659))
- **odyssey-react-mui:** make Form, Infobox spacing constent across uses ([752461c](https://github.com/okta/odyssey/commit/752461c711235310e63cb96ff18c09ff3a1f7640))
- **odyssey-storybook:** match storybook ui to new tokens ([46d5e7d](https://github.com/okta/odyssey/commit/46d5e7d7d40377589e53653df2c6b2374262b7d3))
- orrectly import zh-CN and zh-TW files ([659d140](https://github.com/okta/odyssey/commit/659d14091476e3b4b3785f39254e80f4842453d7))
- revert Odyssey bundle exports ([#1920](https://github.com/okta/odyssey/issues/1920)) ([dfc32ab](https://github.com/okta/odyssey/commit/dfc32ab8034658e0a1925beafab94feaf37118c0))
- specfy accessibility tags section508, wcag21aa ([#1839](https://github.com/okta/odyssey/issues/1839)) ([0da693e](https://github.com/okta/odyssey/commit/0da693ef8c917775035191e0dc319201be98fccd))
- Upgrade many packages to fix vulns ([#1880](https://github.com/okta/odyssey/issues/1880)) ([6f617e2](https://github.com/okta/odyssey/commit/6f617e2efb5fc23be5ec47af7b88f3519ac59261))
- use odyssey tokens inside mui components style override ([6863535](https://github.com/okta/odyssey/commit/68635351df8f17eb6401b94f43b9b7672eb9684e))

## [1.0.1](https://github.com/okta/odyssey/compare/v1.0.0...v1.0.1) (2023-08-02)

### ⚠ BREAKING CHANGES

- allow major version bumps (#1913)

### Features

- add `isDisabled` in context from Fieldset to Field ([#1911](https://github.com/okta/odyssey/issues/1911)) ([135dbbb](https://github.com/okta/odyssey/commit/135dbbb6bf98514deb164713b84ea23b5a4296d1))
- add Button types ([#1903](https://github.com/okta/odyssey/issues/1903)) ([5b78259](https://github.com/okta/odyssey/commit/5b78259045eb36e50a2a24f387c6b213471bbcac))
- adds ScopedCssBaseline to OdysseyThemeProvider ([#1904](https://github.com/okta/odyssey/issues/1904)) ([bbb734d](https://github.com/okta/odyssey/commit/bbb734d6c17a9831502cd6d4fd620d5cf1066a34))
- **odyssey-design-tokens:** add 'disabled' type color ([6810a9c](https://github.com/okta/odyssey/commit/6810a9ca0c5ea945aebe7f457e22a5c2599cf150))
- **odyssey-design-tokens:** add "darker" to primary palette ([775ffcb](https://github.com/okta/odyssey/commit/775ffcb925e0bf9b0c829daecd57a8ea1fe7d18f))
- **odyssey-design-tokens:** add alpha tokens ([a861769](https://github.com/okta/odyssey/commit/a861769bba77c5a6b12681c801bd6bb5807a102e))
- **odyssey-design-tokens:** add border.outer and palette.x.heading ([553d3bc](https://github.com/okta/odyssey/commit/553d3bca6232a363205a35d56e63d643d47101fa))
- **odyssey-design-tokens:** add border.radius.round ([be1a4f2](https://github.com/okta/odyssey/commit/be1a4f25f42de89e50744af05f46cee8ac9bb74a))
- **odyssey-design-tokens:** add border.width.heavy ([b825c03](https://github.com/okta/odyssey/commit/b825c03555044eedacb240fb0d8322f873bdaf98))
- **odyssey-design-tokens:** add token for border.radius.tight ([a3978ae](https://github.com/okta/odyssey/commit/a3978ae662769b5603aee9bcf0cd75d96436a0b4))
- **odyssey-design-tokens:** add tokens for colorized text ([6f89fc8](https://github.com/okta/odyssey/commit/6f89fc8cf20313f99915797c9b764990be020ef2))
- **odyssey-icons:** update all icon source SVGs ([06cf17a](https://github.com/okta/odyssey/commit/06cf17aaeb0255e6d8c3eb5d20650af30ae0fe95))
- **odyssey-react-mui:** add icon support to Tag ([6d1adc4](https://github.com/okta/odyssey/commit/6d1adc4422609b9623a320fa6bb4dcafa088f13d))
- **odyssey-react-mui:** add sub2 type style ([0d7b2a0](https://github.com/okta/odyssey/commit/0d7b2a082c6a89c3395c84708b2e9de2796817f5))
- **odyssey-react-mui:** add transparency and blur to Toast ([497ed8c](https://github.com/okta/odyssey/commit/497ed8c00dc45214a0455623aed89610b40562d2))
- **odyssey-react-mui:** generate new and updated icon components ([a5aa7ab](https://github.com/okta/odyssey/commit/a5aa7ab62b0ac3b50163b98730b5eb9fe23ac791))
- **odyssey-react-mui:** include color properties in type styles ([a817ffb](https://github.com/okta/odyssey/commit/a817ffb56f8c960840b342cde701247a1f2fcbc4))
- **odyssey-react-mui:** manually update icon index, update references in styling ([6ed2aab](https://github.com/okta/odyssey/commit/6ed2aabf9635f0c5dd31b626bdf55bf6e6c46fd9))
- **odyssey-react-mui:** update Button to match Rebrand ([d017b46](https://github.com/okta/odyssey/commit/d017b467b56999d62c35c9681c6829faa96eb487))
- **odyssey-react-mui:** update Dialog to match Rebrand ([2894c1d](https://github.com/okta/odyssey/commit/2894c1d6854be19721a9830062f27c73e93242b2))
- **odyssey-react-mui:** update Link to match new brand standards ([5afc6ed](https://github.com/okta/odyssey/commit/5afc6ed73e81c13d1feeede8e686eee42dee37c8))
- **odyssey-react-mui:** update Status styles and variants to match brand ([2da6aa6](https://github.com/okta/odyssey/commit/2da6aa69c65f79f84c19a6a360a31ad17666749d))
- **odyssey-react-mui:** updated ScopedCSSBaseline for rebrand ([e9e2514](https://github.com/okta/odyssey/commit/e9e2514cf8cefeaefe0afe9cbfc0d65f8f09e947))
- **odyssey-svgr:** update template to support 24x24 sources ([104a998](https://github.com/okta/odyssey/commit/104a9986685437947f570ce20a588c34156a40af))
- remove Icon component ([#1864](https://github.com/okta/odyssey/issues/1864)) ([b897485](https://github.com/okta/odyssey/commit/b897485c5e7bfedae2770b0329b9ce6d7c974e69))

### Bug Fixes

- add incremental to root tsconfig ([#1810](https://github.com/okta/odyssey/issues/1810)) ([9632839](https://github.com/okta/odyssey/commit/96328391b717ef60deeaf3c6a22250ae6c71b5a4))
- add play test for dialog, menubutton, select, tag, passwordfield ([#1861](https://github.com/okta/odyssey/issues/1861)) ([2957e6a](https://github.com/okta/odyssey/commit/2957e6ab7685301dd0713556129c3fd7a44451ae))
- add tooltip play test ([#1854](https://github.com/okta/odyssey/issues/1854)) ([1306cbd](https://github.com/okta/odyssey/commit/1306cbd7ae27fde29a8f5ce9ae4cd7a33f6f9dbd))
- allow major version bumps ([#1913](https://github.com/okta/odyssey/issues/1913)) ([ad4205a](https://github.com/okta/odyssey/commit/ad4205ae21c904c043b2593ff34829089961ee27))
- Applitools VRT ([#1827](https://github.com/okta/odyssey/issues/1827)) ([ab9a391](https://github.com/okta/odyssey/commit/ab9a39105f217592cda5ae55480239988e041a8e))
- Button's `tooltipText` needs to show on hover ([#1817](https://github.com/okta/odyssey/issues/1817)) ([0ca21ff](https://github.com/okta/odyssey/commit/0ca21ff190a35ecaf05e1f1c9e71bd0757edee4d))
- change to DesignTokens type rather than the overrides in theme ([#1816](https://github.com/okta/odyssey/issues/1816)) ([47c106b](https://github.com/okta/odyssey/commit/47c106bdeb2cdec597c58ba3b7ca9040091a10e4))
- clicking MenuItem closes MenuButton ([#1820](https://github.com/okta/odyssey/issues/1820)) ([bde9d88](https://github.com/okta/odyssey/commit/bde9d880a87038949e2df22cf02e6380168bd3eb))
- enable a11y tests in CI ([#1826](https://github.com/okta/odyssey/issues/1826)) ([cd98022](https://github.com/okta/odyssey/commit/cd9802265de5fc10a96a8ed28ce3f2e762c530cc))
- memoize the Link component ([#1813](https://github.com/okta/odyssey/issues/1813)) ([a98dd87](https://github.com/okta/odyssey/commit/a98dd873a2a92a558202901e4aa456f9be4d0cae))
- **odyssey-react-mui:** add aria-disabled to Tag ([f798e48](https://github.com/okta/odyssey/commit/f798e481b4f03eeb8834bb8e413b85f3aef18f03))
- **odyssey-react-mui:** autocomplete is now RTL friendly ([e14265e](https://github.com/okta/odyssey/commit/e14265ea4eeee6cd4f108f032a8158272402f3b2))
- **odyssey-react-mui:** lengthy field labels are no longer cut off ([6231951](https://github.com/okta/odyssey/commit/6231951d9d98a5815c48820b73505beeb6319659))
- **odyssey-react-mui:** make Form, Infobox spacing constent across uses ([752461c](https://github.com/okta/odyssey/commit/752461c711235310e63cb96ff18c09ff3a1f7640))
- **odyssey-storybook:** match storybook ui to new tokens ([46d5e7d](https://github.com/okta/odyssey/commit/46d5e7d7d40377589e53653df2c6b2374262b7d3))
- orrectly import zh-CN and zh-TW files ([659d140](https://github.com/okta/odyssey/commit/659d14091476e3b4b3785f39254e80f4842453d7))
- specfy accessibility tags section508, wcag21aa ([#1839](https://github.com/okta/odyssey/issues/1839)) ([0da693e](https://github.com/okta/odyssey/commit/0da693ef8c917775035191e0dc319201be98fccd))
- Upgrade many packages to fix vulns ([#1880](https://github.com/okta/odyssey/issues/1880)) ([6f617e2](https://github.com/okta/odyssey/commit/6f617e2efb5fc23be5ec47af7b88f3519ac59261))
- use odyssey tokens inside mui components style override ([6863535](https://github.com/okta/odyssey/commit/68635351df8f17eb6401b94f43b9b7672eb9684e))

## [1.0.0](https://github.com/okta/odyssey/compare/v0.24.0...v1.0.0) (2023-07-31)

### ⚠ BREAKING CHANGES

- allow major version bumps (#1913)

### Features

- add `isDisabled` in context from Fieldset to Field ([#1911](https://github.com/okta/odyssey/issues/1911)) ([135dbbb](https://github.com/okta/odyssey/commit/135dbbb6bf98514deb164713b84ea23b5a4296d1))
- add Button types ([#1903](https://github.com/okta/odyssey/issues/1903)) ([5b78259](https://github.com/okta/odyssey/commit/5b78259045eb36e50a2a24f387c6b213471bbcac))
- adds ScopedCssBaseline to OdysseyThemeProvider ([#1904](https://github.com/okta/odyssey/issues/1904)) ([bbb734d](https://github.com/okta/odyssey/commit/bbb734d6c17a9831502cd6d4fd620d5cf1066a34))
- **odyssey-design-tokens:** add 'disabled' type color ([6810a9c](https://github.com/okta/odyssey/commit/6810a9ca0c5ea945aebe7f457e22a5c2599cf150))
- **odyssey-design-tokens:** add "darker" to primary palette ([775ffcb](https://github.com/okta/odyssey/commit/775ffcb925e0bf9b0c829daecd57a8ea1fe7d18f))
- **odyssey-design-tokens:** add alpha tokens ([a861769](https://github.com/okta/odyssey/commit/a861769bba77c5a6b12681c801bd6bb5807a102e))
- **odyssey-design-tokens:** add border.outer and palette.x.heading ([553d3bc](https://github.com/okta/odyssey/commit/553d3bca6232a363205a35d56e63d643d47101fa))
- **odyssey-design-tokens:** add border.radius.round ([be1a4f2](https://github.com/okta/odyssey/commit/be1a4f25f42de89e50744af05f46cee8ac9bb74a))
- **odyssey-design-tokens:** add border.width.heavy ([b825c03](https://github.com/okta/odyssey/commit/b825c03555044eedacb240fb0d8322f873bdaf98))
- **odyssey-design-tokens:** add token for border.radius.tight ([a3978ae](https://github.com/okta/odyssey/commit/a3978ae662769b5603aee9bcf0cd75d96436a0b4))
- **odyssey-design-tokens:** add tokens for colorized text ([6f89fc8](https://github.com/okta/odyssey/commit/6f89fc8cf20313f99915797c9b764990be020ef2))
- **odyssey-icons:** update all icon source SVGs ([06cf17a](https://github.com/okta/odyssey/commit/06cf17aaeb0255e6d8c3eb5d20650af30ae0fe95))
- **odyssey-react-mui:** add icon support to Tag ([6d1adc4](https://github.com/okta/odyssey/commit/6d1adc4422609b9623a320fa6bb4dcafa088f13d))
- **odyssey-react-mui:** add sub2 type style ([0d7b2a0](https://github.com/okta/odyssey/commit/0d7b2a082c6a89c3395c84708b2e9de2796817f5))
- **odyssey-react-mui:** add transparency and blur to Toast ([497ed8c](https://github.com/okta/odyssey/commit/497ed8c00dc45214a0455623aed89610b40562d2))
- **odyssey-react-mui:** generate new and updated icon components ([a5aa7ab](https://github.com/okta/odyssey/commit/a5aa7ab62b0ac3b50163b98730b5eb9fe23ac791))
- **odyssey-react-mui:** include color properties in type styles ([a817ffb](https://github.com/okta/odyssey/commit/a817ffb56f8c960840b342cde701247a1f2fcbc4))
- **odyssey-react-mui:** manually update icon index, update references in styling ([6ed2aab](https://github.com/okta/odyssey/commit/6ed2aabf9635f0c5dd31b626bdf55bf6e6c46fd9))
- **odyssey-react-mui:** update Button to match Rebrand ([d017b46](https://github.com/okta/odyssey/commit/d017b467b56999d62c35c9681c6829faa96eb487))
- **odyssey-react-mui:** update Dialog to match Rebrand ([2894c1d](https://github.com/okta/odyssey/commit/2894c1d6854be19721a9830062f27c73e93242b2))
- **odyssey-react-mui:** update Link to match new brand standards ([5afc6ed](https://github.com/okta/odyssey/commit/5afc6ed73e81c13d1feeede8e686eee42dee37c8))
- **odyssey-react-mui:** update Status styles and variants to match brand ([2da6aa6](https://github.com/okta/odyssey/commit/2da6aa69c65f79f84c19a6a360a31ad17666749d))
- **odyssey-react-mui:** updated ScopedCSSBaseline for rebrand ([e9e2514](https://github.com/okta/odyssey/commit/e9e2514cf8cefeaefe0afe9cbfc0d65f8f09e947))
- **odyssey-svgr:** update template to support 24x24 sources ([104a998](https://github.com/okta/odyssey/commit/104a9986685437947f570ce20a588c34156a40af))
- remove Icon component ([#1864](https://github.com/okta/odyssey/issues/1864)) ([b897485](https://github.com/okta/odyssey/commit/b897485c5e7bfedae2770b0329b9ce6d7c974e69))

### Bug Fixes

- add incremental to root tsconfig ([#1810](https://github.com/okta/odyssey/issues/1810)) ([9632839](https://github.com/okta/odyssey/commit/96328391b717ef60deeaf3c6a22250ae6c71b5a4))
- add play test for dialog, menubutton, select, tag, passwordfield ([#1861](https://github.com/okta/odyssey/issues/1861)) ([2957e6a](https://github.com/okta/odyssey/commit/2957e6ab7685301dd0713556129c3fd7a44451ae))
- add tooltip play test ([#1854](https://github.com/okta/odyssey/issues/1854)) ([1306cbd](https://github.com/okta/odyssey/commit/1306cbd7ae27fde29a8f5ce9ae4cd7a33f6f9dbd))
- allow major version bumps ([#1913](https://github.com/okta/odyssey/issues/1913)) ([ad4205a](https://github.com/okta/odyssey/commit/ad4205ae21c904c043b2593ff34829089961ee27))
- Applitools VRT ([#1827](https://github.com/okta/odyssey/issues/1827)) ([ab9a391](https://github.com/okta/odyssey/commit/ab9a39105f217592cda5ae55480239988e041a8e))
- Button's `tooltipText` needs to show on hover ([#1817](https://github.com/okta/odyssey/issues/1817)) ([0ca21ff](https://github.com/okta/odyssey/commit/0ca21ff190a35ecaf05e1f1c9e71bd0757edee4d))
- change to DesignTokens type rather than the overrides in theme ([#1816](https://github.com/okta/odyssey/issues/1816)) ([47c106b](https://github.com/okta/odyssey/commit/47c106bdeb2cdec597c58ba3b7ca9040091a10e4))
- clicking MenuItem closes MenuButton ([#1820](https://github.com/okta/odyssey/issues/1820)) ([bde9d88](https://github.com/okta/odyssey/commit/bde9d880a87038949e2df22cf02e6380168bd3eb))
- enable a11y tests in CI ([#1826](https://github.com/okta/odyssey/issues/1826)) ([cd98022](https://github.com/okta/odyssey/commit/cd9802265de5fc10a96a8ed28ce3f2e762c530cc))
- memoize the Link component ([#1813](https://github.com/okta/odyssey/issues/1813)) ([a98dd87](https://github.com/okta/odyssey/commit/a98dd873a2a92a558202901e4aa456f9be4d0cae))
- **odyssey-react-mui:** add aria-disabled to Tag ([f798e48](https://github.com/okta/odyssey/commit/f798e481b4f03eeb8834bb8e413b85f3aef18f03))
- **odyssey-react-mui:** autocomplete is now RTL friendly ([e14265e](https://github.com/okta/odyssey/commit/e14265ea4eeee6cd4f108f032a8158272402f3b2))
- **odyssey-react-mui:** lengthy field labels are no longer cut off ([6231951](https://github.com/okta/odyssey/commit/6231951d9d98a5815c48820b73505beeb6319659))
- **odyssey-react-mui:** make Form, Infobox spacing constent across uses ([752461c](https://github.com/okta/odyssey/commit/752461c711235310e63cb96ff18c09ff3a1f7640))
- **odyssey-storybook:** match storybook ui to new tokens ([46d5e7d](https://github.com/okta/odyssey/commit/46d5e7d7d40377589e53653df2c6b2374262b7d3))
- orrectly import zh-CN and zh-TW files ([659d140](https://github.com/okta/odyssey/commit/659d14091476e3b4b3785f39254e80f4842453d7))
- specfy accessibility tags section508, wcag21aa ([#1839](https://github.com/okta/odyssey/issues/1839)) ([0da693e](https://github.com/okta/odyssey/commit/0da693ef8c917775035191e0dc319201be98fccd))
- Upgrade many packages to fix vulns ([#1880](https://github.com/okta/odyssey/issues/1880)) ([6f617e2](https://github.com/okta/odyssey/commit/6f617e2efb5fc23be5ec47af7b88f3519ac59261))
- use odyssey tokens inside mui components style override ([6863535](https://github.com/okta/odyssey/commit/68635351df8f17eb6401b94f43b9b7672eb9684e))

## [0.24.0](https://github.com/okta/odyssey/compare/v0.23.0...v0.24.0) (2023-05-25)

### Features

- add odyssey token override support ([#1797](https://github.com/okta/odyssey/issues/1797)) ([52543cc](https://github.com/okta/odyssey/commit/52543cc5bc37ab5ad639434d80faa4683a1e8061))
- make tranlationOverrides available via pass-through prop ([cb6fbe4](https://github.com/okta/odyssey/commit/cb6fbe45c14c05d639d147618f4279c538b034e2))
- **odyssey-react-mui:** add Form and Fieldset components ([bc4cfe6](https://github.com/okta/odyssey/commit/bc4cfe690dd4d95cc60d6410b47800cfcc0f1bc2))
- **odyssey-react-mui:** implement translation system via OdysseyTranslationProvider ([3c3fe2d](https://github.com/okta/odyssey/commit/3c3fe2dba78b21a8bc859ba33b5cd15e03c0c590))
- wrap the Select ([26452d9](https://github.com/okta/odyssey/commit/26452d9712c69531d5e3637f84f6e4b8c187a526))

### Bug Fixes

- add href to Link ([93009b7](https://github.com/okta/odyssey/commit/93009b78e849476f99a56381f82771e3768e2e80))
- correct type error ([0a2d09e](https://github.com/okta/odyssey/commit/0a2d09e676ee24c803516a953be6cd5033936480))
- exported DatePicker from Labs instead of MUI ([#1793](https://github.com/okta/odyssey/issues/1793)) ([c63244b](https://github.com/okta/odyssey/commit/c63244b75a708580ac71c9cb706bb0026290b18d))
- fix broken docs page ([6730a0e](https://github.com/okta/odyssey/commit/6730a0eee98806ccfb5be7c717353be0fe54bfff))
- fix type errors ([30275bc](https://github.com/okta/odyssey/commit/30275bc70653f1ab2e07ee0e3f07faad2d8d7216))
- **odyssey-react-mui:** add proper displayName for TextField ([cd0eff0](https://github.com/okta/odyssey/commit/cd0eff05b0c35ea158cf19e6e2585eb9c83038fa))
- **odyssey-react-mui:** fix RTL placement of Select chevron ([9d99d9d](https://github.com/okta/odyssey/commit/9d99d9dcf5d166c46f1ea72d2bce2affe7ee0b6c))
- remove unused forwardRef from Icon and Toast ([bdfd1b1](https://github.com/okta/odyssey/commit/bdfd1b1a523579c3c6699915957197f5dc67776a))
- remove vestigial Box import ([b12a589](https://github.com/okta/odyssey/commit/b12a589e68682c620e47bffda7eac6b367ac7b4e))
- renderValue was missing a useCallback wrapper ([#1800](https://github.com/okta/odyssey/issues/1800)) ([40d9566](https://github.com/okta/odyssey/commit/40d95669bf9d1f394aeb163fc41d46823f312d7f))

## [0.23.0](https://github.com/okta/odyssey/compare/v0.22.0...v0.23.0) (2023-05-08)

### Features

- add Migrations and Code Styling docs to Storybook ([#1750](https://github.com/okta/odyssey/issues/1750)) ([09412ae](https://github.com/okta/odyssey/commit/09412aed12b0eb25202f34bfbb384062eec36300))
- add uniqueId to MenuButton button ([a06377b](https://github.com/okta/odyssey/commit/a06377b1c10c49b5e68722b0bb775b8277cac781))
- wrap the Dialog ([1f8b331](https://github.com/okta/odyssey/commit/1f8b3314a135333369f44efc21de097cd0d42712))
- wrapped Toast ([bf6d5c7](https://github.com/okta/odyssey/commit/bf6d5c779d0b57a0bd74f537ada7be763df1080e))

### Bug Fixes

- add Field wrapper to CheckboxGroup and RadioGroup ([#1762](https://github.com/okta/odyssey/issues/1762)) ([6f8c14d](https://github.com/okta/odyssey/commit/6f8c14d9d7ebcf0c5f9bbcb0e867820b5631b7a3))
- add missing onInput to Autocomplete ([#1757](https://github.com/okta/odyssey/issues/1757)) ([9d6c628](https://github.com/okta/odyssey/commit/9d6c628e3cc8675a6752f5a617d55f580d475c04))
- add name to fields ([a891438](https://github.com/okta/odyssey/commit/a89143845ddd72ecfa218233cdd3ab0c51e94aca))
- Fix broken Toast stories ([b5651f6](https://github.com/okta/odyssey/commit/b5651f6eb8d6578305fecd3d92be7c9d18eea27d))
- fix disabled selection radios ([50be355](https://github.com/okta/odyssey/commit/50be3557e46d23bc9e99bfdcbf668fe097b58fb4))
- Icon generation now using newest version of SVGR and SVGO ([#1755](https://github.com/okta/odyssey/issues/1755)) ([89a30a3](https://github.com/okta/odyssey/commit/89a30a3685d1bd1600abf3876d910a19ff236f9b))
- **odyssey-react-mui:** allow pointer-events on :disabled buttons but not :active:disabled ([30bb4bf](https://github.com/okta/odyssey/commit/30bb4bf93edeffe7558204c2cce46ffe7b2b85bf))
- **odyssey-react-mui:** ensure pointer events are disabled when Button is ([bfd162f](https://github.com/okta/odyssey/commit/bfd162f2ec86d866f8e77b94d0f828440a4c78e2))
- **odyssey-react-mui:** fix Icon sizing for Checkbox ([96c5acd](https://github.com/okta/odyssey/commit/96c5acdf9916c8db9edbf744f774eb17695b25ef))
- **odyssey-react-mui:** fixed TextField always showing input adronment ([#1785](https://github.com/okta/odyssey/issues/1785)) ([9170df0](https://github.com/okta/odyssey/commit/9170df0f8c771fdad398e5460766da77f27c0b3e))
- **odyssey-react-mui:** pass variant and target props to Link ([6594fcd](https://github.com/okta/odyssey/commit/6594fcd801689518da4ec7df13fd33c8726bd44b))
- **odyssey-react-mui:** the Tooltip not working on Button ([7935b94](https://github.com/okta/odyssey/commit/7935b940dda9969aedaf16b7d9ef776352f7ec28))
- **odyssey-storybook:** include static toast stories for docs ([6d8fa58](https://github.com/okta/odyssey/commit/6d8fa581e4aa96fd9316cf5641dd869ec449af15))
- **odyssey-storybook:** restore defaultValues for RadioGroup ([4ba8ebd](https://github.com/okta/odyssey/commit/4ba8ebd6d633c3502284dab573414766bb3493d7))
- **odyssey-storybook:** stories were broken because templates don't have .args ([7f7343a](https://github.com/okta/odyssey/commit/7f7343ac8e03130f322b427d612937963d781f1e))
- updated Migration doc ([87c37ca](https://github.com/okta/odyssey/commit/87c37caa7ae39733ddd378a45f8a275af3ac670d))

## [0.22.0](https://github.com/okta/odyssey/compare/v0.21.4...v0.22.0) (2023-04-21)

### Features

- **odyssey-react-mui:** add styling for Autocomplete ([b03516b](https://github.com/okta/odyssey/commit/b03516ba469ef1045c17326590a97e39f0235aa8))
- wrap the Button ([507cf60](https://github.com/okta/odyssey/commit/507cf60c045a445e09c039dc1f35574271114697))
- wrapped Tag and TagList ([43ab012](https://github.com/okta/odyssey/commit/43ab012d17934503bd827624ad17c6d00531a978))

### Bug Fixes

- added extra props to Autocomplete to fix MUI types ([d7aff4a](https://github.com/okta/odyssey/commit/d7aff4ab510cbb512bee043b4056e1085ce0d059))
- created Autocomplete wrapper component ([dbb1210](https://github.com/okta/odyssey/commit/dbb12100e656e9db3deb2a0d76bdcf5fb715e93d))
- export types for Autocomplete ([28be391](https://github.com/okta/odyssey/commit/28be391f49bbce4882b68334a1d5805e50d47a4e))
- minor type improvement in Autocomplete stories ([79d42e1](https://github.com/okta/odyssey/commit/79d42e16ac304a3856697b8711a1b38fe8cfe28f))
- pulled out TextField into separate components ([#1744](https://github.com/okta/odyssey/issues/1744)) ([0b7a412](https://github.com/okta/odyssey/commit/0b7a41290eb1a60693ee827f45e240531e7fbbcb))
- removed explicit displayName from MenuItem ([ab84734](https://github.com/okta/odyssey/commit/ab84734a4f8dc11aba42f56818bce59dbd469ddf))
- separated InputProps and params in Autocomplete ([a93542c](https://github.com/okta/odyssey/commit/a93542c6238ab56a0a06075aceb5cf0997ceb7f1))
- types for Autocomplete in stories ([8d28a8c](https://github.com/okta/odyssey/commit/8d28a8c640dfccac92fdcad5af9bdc33759c9de3))

## [0.21.4](https://github.com/okta/odyssey/compare/v0.21.3...v0.21.4) (2023-04-13)

### Features

- **odyssey-react-mui:** add ScreenReaderText component ([b0c98ad](https://github.com/okta/odyssey/commit/b0c98ad72924c5a510590f5e584dc99e1465ae1c))
- wrapped CircularProgress ([fda8978](https://github.com/okta/odyssey/commit/fda89787c3bc13830d2d4e09290d261e490c0902))

## [0.21.3](https://github.com/okta/odyssey/compare/v0.21.2...v0.21.3) (2023-04-06)

### Features

- add Odyssey styles to Radio and Checkbox ([39ebde0](https://github.com/okta/odyssey/commit/39ebde08d4cb83f933a98d79000ac23ad15c12c9))
- **odyssey-react-mui:** add transitions to form controls, update state ui ([7388c00](https://github.com/okta/odyssey/commit/7388c00e5ca112ff12d429e45996ab5aa557a36a))

### Bug Fixes

- **odyssey-react-mui:** make text disabled color more a11y-friendly ([372a010](https://github.com/okta/odyssey/commit/372a010b934efc8421c42c8fa7d3a9323af8182f))
- upgraded loader-utils and fastify for security ([#1734](https://github.com/okta/odyssey/issues/1734)) ([d6f3d27](https://github.com/okta/odyssey/commit/d6f3d27daefd1994059463ad33f9adceb35e36a0))

## [0.21.2](https://github.com/okta/odyssey/compare/v0.21.1...v0.21.2) (2023-03-30)

### Features

- add context to Banner and Infobox ([18b277c](https://github.com/okta/odyssey/commit/18b277c949065ad659508a75e04125637bc5308c))
- add missing autoFocus from TextField ([d01dcd4](https://github.com/okta/odyssey/commit/d01dcd4120017d16677ae870c3d1e0f7d1b13b47))

### Bug Fixes

- **odyssey-react-mui:** fix Button, Floating, Disabled bg color ([a9c332a](https://github.com/okta/odyssey/commit/a9c332a85e3b4162bf68837978028081ef2133f7))
- **odyssey-react-mui:** fixes spacing for Hint/Error field helpers ([846134e](https://github.com/okta/odyssey/commit/846134efcdf9cd8c62932e5f849ee64b0b81e468))

## [0.21.1](https://github.com/okta/odyssey/compare/v0.21.0...v0.21.1) (2023-03-16)

### Features

- **odyssey-react-mui:** add ability to have custom props on theme ([#1701](https://github.com/okta/odyssey/issues/1701)) ([52dd8f8](https://github.com/okta/odyssey/commit/52dd8f87411214ec5e3850a7372105460e2fd959))

### Bug Fixes

- added TypeScript project references for VSCode ([#1708](https://github.com/okta/odyssey/issues/1708)) ([44e2783](https://github.com/okta/odyssey/commit/44e2783b6a87bca49fb1d5bcffa45b22adc77bbc))

## [0.21.0](https://github.com/okta/odyssey/compare/v0.20.0...v0.21.0) (2023-03-09)

### Bug Fixes

- **odyssey-react-labs:** DatePicker styles with updated spec ([#1697](https://github.com/okta/odyssey/issues/1697)) ([cba0894](https://github.com/okta/odyssey/commit/cba0894bc1def44ea48bf74ffd4dbf487fdd3a8c))
- **odyssey-react-mui:** don't require children prop for Icon buttons ([a333527](https://github.com/okta/odyssey/commit/a3335273c07cf479ff764d2c797fc1d10d66806b))

## [0.20.0](https://github.com/okta/odyssey/compare/v0.19.0...v0.20.0) (2023-02-23)

### Features

- **odyssey-react-mui:** add MenuButton and MenuItem components ([f29c136](https://github.com/okta/odyssey/commit/f29c136b25d7df5899f55d3be6206004778fb284))

### Bug Fixes

- remove unnecessary Lerna ignore for publishing ([#1694](https://github.com/okta/odyssey/issues/1694)) ([1660b82](https://github.com/okta/odyssey/commit/1660b826508ab60b993cae44508bed5be8e86598))

## [0.19.0](https://github.com/okta/odyssey/compare/v0.18.0...v0.19.0) (2023-02-09)

### Features

- **odyssey-react-mui:** add 'alert' to available Banner roles ([bf6f645](https://github.com/okta/odyssey/commit/bf6f6455e9271c070daa84d9668851906aa16ef4))
- **odyssey-react-mui:** wrap and export Infobox ([4b0f283](https://github.com/okta/odyssey/commit/4b0f283e47fa553c2d72e3b85ee76102aa327709))

## [0.18.0](https://github.com/okta/odyssey/compare/v0.17.2...v0.18.0) (2023-02-02)

### ⚠ BREAKING CHANGES

- **odyssey-react-mui:** remove `kbd` variant from Typography component

### Features

- abstract Radio and RadioGroup ([6b34afa](https://github.com/okta/odyssey/commit/6b34afaa83ce0043731ff8d111d3114fabd9ecf7))
- add DatePicker styles to Labs ([#1672](https://github.com/okta/odyssey/issues/1672)) ([f8d8b5e](https://github.com/okta/odyssey/commit/f8d8b5e4f8d30f8bce346e4dca47f88c8350a26b))
- add name and defaultValue attributes ([1eb7608](https://github.com/okta/odyssey/commit/1eb76081f528ebf3d529d667593d105f2c4d266d))
- **odyssey-react-mui:** add element styles to ScopedCssBaseline ([d2831b0](https://github.com/okta/odyssey/commit/d2831b0a8ad0a9063aea85ceaff69dcfea16314b))
- **odyssey-react-mui:** export ScopedCssBaseline for use ([5a98aaa](https://github.com/okta/odyssey/commit/5a98aaacf4142f84b2e03dc13b03d4435790e014))
- **odyssey-react-mui:** make rem-base themeable, add element styles to ScopedCssBaseline ([ebafd5c](https://github.com/okta/odyssey/commit/ebafd5cb13afae7c8bf365782264c248b8345960))
- **odyssey-react-mui:** wrap and export Status component ([55ac9c9](https://github.com/okta/odyssey/commit/55ac9c9e9b204e4262c8a7a39b60b48627baae30))
- re-exported MUI List components as Odyssey MUI components ([9a78122](https://github.com/okta/odyssey/commit/9a781222830fb3003ce935cbacedf5a0b62a1cec))
- updated a bunch of packages to the latest version ([36ce1d0](https://github.com/okta/odyssey/commit/36ce1d09a621f273878345c20cfc782059c04cd2))
- updated Radio and fixed types on TextField and Banner ([9cfa050](https://github.com/okta/odyssey/commit/9cfa05093fa59923085bcac18908065457a018f4))
- wrap banner and add stories ([0ccfbd0](https://github.com/okta/odyssey/commit/0ccfbd0ef845c1f598c5409d37e5fb9a83d94f47))

### Bug Fixes

- add Status import to index ([d16b6df](https://github.com/okta/odyssey/commit/d16b6df831dd22accbc58450595a642b2330c42d))
- adjusted boolean prop names in Radio ([25eb5d1](https://github.com/okta/odyssey/commit/25eb5d1686526355c2b1ae4b83f23c80c5c72951))
- adjusted boolean prop names in RadioGroup ([135a8ec](https://github.com/okta/odyssey/commit/135a8ec09a25b849eb413b93548dca1683480b1e))
- another potential Lerna build order fix ([b4eb393](https://github.com/okta/odyssey/commit/b4eb39322204682e0b33dd76a7901370de754020))
- another potential nx Lerna fix ([38f2dd6](https://github.com/okta/odyssey/commit/38f2dd6685d22b8caaa62819db348c7f09686d30))
- banner having string function defined ([a21fca9](https://github.com/okta/odyssey/commit/a21fca9f6aa15d68024fd06e70f625676674fb7b))
- converted types to new Storybook component versions ([a47bc16](https://github.com/okta/odyssey/commit/a47bc16f424fac29e1a69022c80c709ef2e0711a))
- ensure aria-describedby only show when needed ([a75a290](https://github.com/okta/odyssey/commit/a75a29038164875c1a56329669ac95159ba689f2))
- fix story component ([73b83f2](https://github.com/okta/odyssey/commit/73b83f2b5af610928553eca5cd46062a66b6a257))
- minor update to Radio template name ([132a588](https://github.com/okta/odyssey/commit/132a58829f21d12101a47cb0798b796b87a37371))
- moved typecheck command back to Lerna ([eff20bb](https://github.com/okta/odyssey/commit/eff20bbf568bce5a6addbb2a3f61738345def2a3))
- **odyssey-react-mui:** make figcaption styles a fallback ([a4a232a](https://github.com/okta/odyssey/commit/a4a232a99964f683df9a913ec003b8c81219eed3))
- **odyssey-react-mui:** make Link a11y-compliant in all cases ([baf01c0](https://github.com/okta/odyssey/commit/baf01c0d6650b83a4b5db3e5bf7fad863d4a25f6))
- **odyssey-react-mui:** provide safety dec for input box-shadow ([9562e74](https://github.com/okta/odyssey/commit/9562e7482b69b005b7d48f2694890a3b5277693c))
- onClose prop type ([4c2052f](https://github.com/okta/odyssey/commit/4c2052f7d3f449dafdac892b2e1bbeb8cb7ceacc))
- remove unneeded import ([209574c](https://github.com/okta/odyssey/commit/209574cadba0139b08ccd37110647cb8c946dd8a))
- remove unused flags ([548432b](https://github.com/okta/odyssey/commit/548432beee6cd4f3b84debd9622bec68c61543f7))
- remove vestigial AlertProps import ([af7883b](https://github.com/okta/odyssey/commit/af7883b3c54257e5deeeca6db6ff9e62580c9694))
- removed Nx caching from Lerna ([16ad137](https://github.com/okta/odyssey/commit/16ad1376f1bdc795a68ab0fa2774f58785822dee))
- removed nx.json ([82c2966](https://github.com/okta/odyssey/commit/82c29667dd9b8b7f8ee27cccafc93c010ac31a38))
- removed potentially problematic nx.json ([d9f9b1d](https://github.com/okta/odyssey/commit/d9f9b1da6d4142363890ea5442e780d9fbb96006))
- removed unnecessary useNx in lerna.json ([b63d92e](https://github.com/okta/odyssey/commit/b63d92e1a16059552b5af4b79e986cef6770e440))
- run build a second time before doing a typecheck ([56d85cd](https://github.com/okta/odyssey/commit/56d85cda5812b0e27bec630c7b160a3b71eaf212))
- textAlign logical value in FormHelperText for RTL support ([19208d5](https://github.com/okta/odyssey/commit/19208d5aed4677d9198f56cd2da0598913e4b5e1))
- update physical CSS properties (_-left, _-right) to use logical CSS counterpart for RTL support ([08ac38c](https://github.com/okta/odyssey/commit/08ac38c303d01de7a8c5b9ea2600a0bfec3acb5e))
- update RadioGroup params in other stories ([378dbea](https://github.com/okta/odyssey/commit/378dbea71a959986dd20132a76a0018bc254d01e))
- update type of onClose for lintert ([6983d7d](https://github.com/okta/odyssey/commit/6983d7d5aad1864593579a3e9d9df6c2c5f1b137))
- upgraded Yarn version in script ([f7d4bcb](https://github.com/okta/odyssey/commit/f7d4bcb847005fa4641fff2ef3cffcf46b5e61a7))

### [0.17.2](https://github.com/okta/odyssey/compare/v0.17.1...v0.17.2) (2023-01-12)

### Features

- add custom theming to Odyssey labs ([8c954cc](https://github.com/okta/odyssey/commit/8c954cc3e232d21cbf9f72c61c548766bb75614a))
- add labs theme ([8f45e5d](https://github.com/okta/odyssey/commit/8f45e5d4d74eb664b4f7ce73e08fdafd1e8da2cb))
- add TextInput ([fa5a033](https://github.com/okta/odyssey/commit/fa5a03309263a1239c1902c86eef04d5ba4c4774))
- added customTheme property to OdysseyThemeProvider ([4207c4b](https://github.com/okta/odyssey/commit/4207c4b0079bd19f637d5ad83c8c8d188598cdf1))
- added forwardRef to Link ([5598ff8](https://github.com/okta/odyssey/commit/5598ff872a2bd9cf2e3e3a9898ddbbbe9c05ce38))
- added styles for DatePicker theming ([db967ba](https://github.com/okta/odyssey/commit/db967bad7fe836d8f5877f6ffe5a601f78ff47ec))
- **odyssey-react-mui:** add check icon to selected list items ([dbe5777](https://github.com/okta/odyssey/commit/dbe577783a3506d6ebb46047437936c242b69303))
- **odyssey-react-mui:** add status theme to Chip ([82c9c28](https://github.com/okta/odyssey/commit/82c9c284c016b63e96ddbe3b3c82822b9c7f5857))
- **odyssey-react-mui:** add theme for ListSubheader ([b27c79a](https://github.com/okta/odyssey/commit/b27c79a91eda15a802520bc07ba0a9025b30d63c))
- **odyssey-storybook:** remove title prop, add isDismissible variant to Toast ([214d1ce](https://github.com/okta/odyssey/commit/214d1ce68f80daced611cc10e93a79caa9b0d8f8))
- remove custom theme for DatePicker ([f7dcd4c](https://github.com/okta/odyssey/commit/f7dcd4c0c70270542f181e18498b7af05de607b4))
- replace the previous TextField ([e01ce2a](https://github.com/okta/odyssey/commit/e01ce2ae315bafce886179135e05c0cd11b52430))
- use \* for odyssey packages in labs ([1c00733](https://github.com/okta/odyssey/commit/1c007335df90bd5ea7d05333a7d8f503d66caf89))
- use \* for odyssey packages in storybook ([b7e5146](https://github.com/okta/odyssey/commit/b7e514621726c802fedfa4527b6b9dfcf036a143))

### Bug Fixes

- adjusted DatePicker story with correct theme ([ddfc00b](https://github.com/okta/odyssey/commit/ddfc00ba4621ddb56a599675dd31c64a88b7276c))
- changed to workspace:_ instead of _ imports ([407875b](https://github.com/okta/odyssey/commit/407875bea5f6e2265a7144d2443f69d2fd844c92))
- fixed a number of logistical issues ([48a95e1](https://github.com/okta/odyssey/commit/48a95e1bf963632186b083eaa461a1ec3b2ac7c8))
- lerna not recognizing workspace:\* ([355bb1a](https://github.com/okta/odyssey/commit/355bb1aa75ed05df02c6bbd1fb134924ce1b0e84))
- **odyssey-react-mui:** fix floating and small Button properties, fix Toast layout ([e98d36b](https://github.com/okta/odyssey/commit/e98d36b57509a99ccd0f2290aee56322a0d155b8))
- **odyssey-react-mui:** override MuiBackdrop colors correctly ([972a2c3](https://github.com/okta/odyssey/commit/972a2c3090fd6f4827adfc14390d5798dec2ab50))
- renamed inType to inputType ([dd67213](https://github.com/okta/odyssey/commit/dd67213a3ed6ce81dc322402b14886ecf5e53f88))
- storybook not loading new themed versions ([2a321f6](https://github.com/okta/odyssey/commit/2a321f6673f9f40efb93cffb35ebbc04d4986429))
- theme type issues ([16f2b4d](https://github.com/okta/odyssey/commit/16f2b4da129901f63bc21c8dec89385604128d98))
- updated Odyssey Labs exports and theme ([080ac14](https://github.com/okta/odyssey/commit/080ac1409c5e2eb8705dbc11bf499fd53eb6197b))
- workspace:\* versions ([4540e7a](https://github.com/okta/odyssey/commit/4540e7a5570c67a1478a6f8afbb8dea8f69aea13))
- yarn.lock ([7b6254c](https://github.com/okta/odyssey/commit/7b6254c6f5aa159ae4a0d793670b434a37c4e494))
- yarn.lock ([4e2270a](https://github.com/okta/odyssey/commit/4e2270a259f81381354e62e1caf6ef707ae74831))

### [0.17.1](https://github.com/okta/odyssey/compare/v0.17.0...v0.17.1) (2022-12-09)

### Features

- **odyssey-react-mui:** add theme for multiselect ([ce8fbdb](https://github.com/okta/odyssey/commit/ce8fbdb33218b6064556800ad0a9a60a06c617b1))
- **odyssey-react-mui:** increase default icon size to 16px; add ui type variant ([6577c33](https://github.com/okta/odyssey/commit/6577c331c29a5bfc53b41ebd269cf69366e2825c))
- **odyssey-react-mui:** theme Select and refactor InputBase styles to support Select ([0538fb1](https://github.com/okta/odyssey/commit/0538fb1f77f79f2fca1635001163c11d6dfbd7f7))

### [0.17.0](https://github.com/okta/odyssey/compare/v0.16.1...v0.17.0) (2022-11-10)

### Features

- added Emotion CacheProvider as part of ThemeProvider ([4c00a59](https://github.com/okta/odyssey/commit/4c00a591f8e1c237eec74758d4d8a13fd7a5499a))
- added optional nonce prop to OdysseyCacheProvider ([f264b50](https://github.com/okta/odyssey/commit/f264b50d5c737fcaa672eadb4d3302acfd136582))
- **odyssey-react-mui:** add theme for Tag/Chip ([8539c6d](https://github.com/okta/odyssey/commit/8539c6d3aa3a29fcef0984bc611ccab9a4b524af))

### Bug Fixes

- added missing export for OdysseyThemeProvider and OdysseyCacheProvider ([3273f35](https://github.com/okta/odyssey/commit/3273f3537856a2b71161888ab291c5663bc2dbcb))
- forwardRef in Link ([d1429af](https://github.com/okta/odyssey/commit/d1429afe1dde8608e2587abc2be99e7601650dc5))
- minor type updates in unique ID hooks ([01df5b2](https://github.com/okta/odyssey/commit/01df5b2d7a19ed9862d27e1ca423d2ea29ad17c6))
- **odyssey-react-mui:** size and align icons correctly within Button ([7787bf0](https://github.com/okta/odyssey/commit/7787bf0d03da093dc4a94955e57240c9b11e7762))
- split OdysseyThemeProvider and OdysseyCacheProvider ([16a6ce3](https://github.com/okta/odyssey/commit/16a6ce3672a634e3450545ffe8c41a70db1b7fb3))
- upgraded MUI icons ([c978ab6](https://github.com/okta/odyssey/commit/c978ab66375f649a9b66544dbc490cc0442cff2c))

### [0.16.1](https://github.com/okta/odyssey/compare/v0.16.0...v0.16.1) (2022-10-31)

### Bug Fixes

- fix browserslist vuln ([6942fef](https://github.com/okta/odyssey/commit/6942fef31a712bf637ae4c7566f33042d349b010))
- **odyssey-icons:** remove svgo yml ([35f26ed](https://github.com/okta/odyssey/commit/35f26eda4da9850834898a42c5e79ca479bffa2a))
- upgrade node-fetch version ([70fded7](https://github.com/okta/odyssey/commit/70fded79b43d15a950a2e5bfce8a453743a05ce2))
- upgrade tar version ([17b30cb](https://github.com/okta/odyssey/commit/17b30cb3c86840272ca6e99ae31f0fe1c7351655))

## [0.16.0](https://github.com/okta/odyssey/compare/v0.15.3...v0.16.0) (2022-10-27)

### Bug Fixes

- added odyssey-react-labs ([aca12b2](https://github.com/okta/odyssey/commit/aca12b2dc421b411d5e87278dd37dd1cd6b39bc2))
- broken types in DatePicker story ([37f33c6](https://github.com/okta/odyssey/commit/37f33c606954e84e59a18055d59348546fe91370))
- missing unit test in odyssey-react-labs ([66233e3](https://github.com/okta/odyssey/commit/66233e30680b65cb7f5a514c285956c5dbf8d8c2))

### [0.15.3](https://github.com/okta/odyssey/compare/v0.15.2...v0.15.3) (2022-10-20)

### Features

- **odyssey-react-mui:** add styles and exports for Dialog ([f8b392b](https://github.com/okta/odyssey/commit/f8b392b66e95c905a72542fc128929f08ae4abf9))

### Bug Fixes

- added missing `theme` export ([59ecdbf](https://github.com/okta/odyssey/commit/59ecdbf749057f33814c6742ebb9506a67dfa792))
- broken imports in odyssey-react-mui after flattening ([1fbdfb9](https://github.com/okta/odyssey/commit/1fbdfb9aeeb33d7e45ec9b2e62d0d85d04d848fa))
- flattened odyssey-react-mui for better DX ([305eeab](https://github.com/okta/odyssey/commit/305eeab37a7ba47fe1a9866ccab71e5e7a918a30))

### [0.15.2](https://github.com/okta/odyssey/compare/v0.15.1...v0.15.2) (2022-10-13)

### Features

- added @mui/lab ([379a077](https://github.com/okta/odyssey/commit/379a077c82ed4c020d75b07a5d0d66b60b7c319e))
- exported useUniqueId and createUniqueId ([79448f4](https://github.com/okta/odyssey/commit/79448f4281cb0594c789ce9ab86c67704f82afe8))
- **odyssey-react-mui:** add per-corner borderRadius support for Tooltip ([069fa02](https://github.com/okta/odyssey/commit/069fa02d06560656071306a18427400bb3b2a1e4))
- **odyssey-react-mui:** add theme for Tooltip ([96092ec](https://github.com/okta/odyssey/commit/96092ecb46981ab750a87184c8aa0133151de7f3))
- **odyssey-react-mui:** import Labs types, add styling for TabPanel ([992bf14](https://github.com/okta/odyssey/commit/992bf1475fa34e5b93547738f76e7dda4d1a20bc))
- re-exported MUI components as Odyssey MUI components ([3d97a5b](https://github.com/okta/odyssey/commit/3d97a5b72d3bff474a1e1a1e3f7545b53bd0c247))
- updated exports and stories to use new Tabs API from @mui/lab ([18b9739](https://github.com/okta/odyssey/commit/18b9739fcd5691dbd89a9d17df19cb53cb083343))

### Bug Fixes

- added missing component props from MUI, utils, and one icon ([e105118](https://github.com/okta/odyssey/commit/e1051181c4d737d4761a521452c9208db8246794))
- added missing exports from @mui/material ([31e7348](https://github.com/okta/odyssey/commit/31e7348de0f5f6e6dd40ff3951cf796ad7bb2e4d))
- added missing Tooltip import ([6229d7f](https://github.com/okta/odyssey/commit/6229d7f2a5bd750d05e969789eb4dc8006d8640f))
- added missing useTheme export ([ae28864](https://github.com/okta/odyssey/commit/ae288641e714063bfb11bd743a15bcf5b168007a))
- added MuiThemeProvider as an out from Odyssey ([bbcc4ae](https://github.com/okta/odyssey/commit/bbcc4aede21c59707e9ba07e2e2ddcac9c54eddd))
- exported more MUI components ([8f09257](https://github.com/okta/odyssey/commit/8f092571c7654adad830fe974e283f02d12b8f71))
- link icon wasn't optional ([567da0c](https://github.com/okta/odyssey/commit/567da0c0bfffe45623e12d7ae37635bd04d86de0))
- **odyssey-react-mui:** ensure font weights are typed as numbers ([ee7c9a8](https://github.com/okta/odyssey/commit/ee7c9a88881f96c169f4f4ab203ab2148deead77))
- **odyssey-react-mui:** fix bg color on table row hover ([b8371c2](https://github.com/okta/odyssey/commit/b8371c272ec013630a1cf8fbd96d9ff004cc51c2))
- **odyssey-react-mui:** strip units from borderRadiusBase ([267d82a](https://github.com/okta/odyssey/commit/267d82a3d183ddbfda11e3774fca687bfbf1adaa))
- password input wasn't using useUniqueId ([cf9435c](https://github.com/okta/odyssey/commit/cf9435c7f1402595bd5bb53571726f210445c723))
- removed unused Checkmark from docs ([d305bd1](https://github.com/okta/odyssey/commit/d305bd123159f248b2af67196e01d7f30eb5e84e))
- tabs story using number, not string ([81dcd74](https://github.com/okta/odyssey/commit/81dcd7408df74aa8e2168962e85d421974571068))
- updated Tabs stories to remove more unused boilerplate ([0a60f36](https://github.com/okta/odyssey/commit/0a60f36878a98413ce5695e1d1d9143ba5de5713))

### [0.15.1](https://github.com/okta/odyssey/compare/v0.15.0...v0.15.1) (2022-10-06)

### Features

- added direnv compatibility ([04d0a45](https://github.com/okta/odyssey/commit/04d0a459779882a7c5c4ae6130d17fe2516bc0b6))
- added Husky compatibility with nvm ([9d5be9f](https://github.com/okta/odyssey/commit/9d5be9f3de925ce7256642faa5021206de13f211))
- added missing `"sideEffects": false` to all packages ([61ee25b](https://github.com/okta/odyssey/commit/61ee25b461f27a473f1a82dcc1647e044fed8a3d))
- **odyssey-icons:** add arrow-up-down asset ([b6a3872](https://github.com/okta/odyssey/commit/b6a38729d03378596ed92b55727a834596c6360d))
- **odyssey-react-mui:** add ArrowUpDown icon ([a2f99b8](https://github.com/okta/odyssey/commit/a2f99b8eaa3172bab0f799796f08db539c0f49fa))
- **odyssey-react-mui:** add theme for IconButton ([1b121fa](https://github.com/okta/odyssey/commit/1b121fa791f4032773459519b730028edfef11d5))
- **odyssey-react-mui:** add themes for Table component API ([dcae5e8](https://github.com/okta/odyssey/commit/dcae5e81f0ed4364ae9ed62877c57c2a0c8cd165))
- **odyssey-react-mui:** update to MUI 5.10.5 ([6908971](https://github.com/okta/odyssey/commit/69089713a795cef0aaa2b3eb2bfea61379e9edd0))
- upgraded Node.js ([cdb0aad](https://github.com/okta/odyssey/commit/cdb0aad73fc76c6ce0e536951e049aaa1e92dab2))

### Bug Fixes

- added yarn cache as part of the repo to speed up CI dependency installs ([0ced2fe](https://github.com/okta/odyssey/commit/0ced2fe6abd548ebd422f82850945faa9dc9b2e9))
- corrected TypeScript issues with odyssey-babel-plugin ([96a51a5](https://github.com/okta/odyssey/commit/96a51a5b81e6996e9e5ee41e02e5db64a0a7bbe9))
- fixed broken yarn.lock ([5e9651e](https://github.com/okta/odyssey/commit/5e9651e74e0ccc9e7a7e1b6ea1696f51e2531312))
- force-updated qs as the vulnerability is in Applitools and Storybook ([b3f8536](https://github.com/okta/odyssey/commit/b3f8536daa1738f14dc3358397bb3a00251fea42))
- force-upgraded vulnerable ramda and qs ([bcd84aa](https://github.com/okta/odyssey/commit/bcd84aaffc970cd7fd0e168e9c884ecfdf4a0495))
- hotfixed TypeScript compatibility issues with custom Babel plugins ([78d1a7b](https://github.com/okta/odyssey/commit/78d1a7b9390d67215e2a4042ecd364743f54d8c3))
- issue with Babel worker not completing ([cd900a9](https://github.com/okta/odyssey/commit/cd900a9b38f26b78870fd037f4a7e4a3de7fb842))
- **odyssey-react-mui:** apply appropriate styles to readonly and disabled text inputs ([ccea01b](https://github.com/okta/odyssey/commit/ccea01b18a6c4d20591c43ef199ed64e392e773a))
- **odyssey-react-mui:** fixes focus outline on Infobox links ([6536cba](https://github.com/okta/odyssey/commit/6536cba41cbccdc5389061fef42ca6d4fccb186e))
- **odyssey-react-mui:** remove `body` from Typography type mods ([bb83940](https://github.com/okta/odyssey/commit/bb83940d4e1ff8e99dc0524ae17d76d1c67d1dad))
- **odyssey-storybook:** fix eslint error, remove unnec IE11 compat ([443dbeb](https://github.com/okta/odyssey/commit/443dbebd502edf0242333452038e10d5e51e3a21))
- removed @react-aria/focus ([573a9af](https://github.com/okta/odyssey/commit/573a9afccb3cfb7102333070cb2a28e8c6eab2ed))
- skipped another snapshot test only failing in GitHub Actions ([c56de33](https://github.com/okta/odyssey/commit/c56de335cbc94fe62239519613b0b975440be534))
- skipped snapshot test that only breaks in GitHub Actions ([0c0c315](https://github.com/okta/odyssey/commit/0c0c315f8425034bd5fa3c7c008b86057cf5cb83))
- updated @svgr/cli ([41dff60](https://github.com/okta/odyssey/commit/41dff6061b237a1937b02f0786e7daaf1e6465cb))
- updated Babel and Postcss dependencies ([fc5a214](https://github.com/okta/odyssey/commit/fc5a214171866fdc1c883e7f1e03c622aa580ef1))
- updated Babel to latest to fix yarn install issues ([5eccaf0](https://github.com/okta/odyssey/commit/5eccaf0470eb6b6d36c36ce11301dbd7f7748652))
- updated Node.js versions in Bacon scripts ([7a7b133](https://github.com/okta/odyssey/commit/7a7b133bca924dbf0cbe5949c998bc5aaeb23e1b))
- updated Stylelint rules and linting issues ([8fe0791](https://github.com/okta/odyssey/commit/8fe0791f303013484b17f99e8f60a789dbbbb3c0))
- upgrade caniuse-lite ([c6dd13e](https://github.com/okta/odyssey/commit/c6dd13e91abff7eb5dd914f681d29a5816b407d9))
- upgrade Lerna to 5.5.4 ([4d2607e](https://github.com/okta/odyssey/commit/4d2607e0467259cf95932eb993a5b36d7ffcc6e5))
- upgraded @typescript-eslint/\* packages to remove ESLint plugin warning about estree ([bd9a3af](https://github.com/okta/odyssey/commit/bd9a3af5f316c3b9b5f368a146c967c77bab7a2d))
- upgraded eslint-plugin-import ([c37a96e](https://github.com/okta/odyssey/commit/c37a96eade7804acb8424ad24da2be52228ca373))
- upgraded Jest to v29 ([3872c7e](https://github.com/okta/odyssey/commit/3872c7e75ea017781dc8e53526055f232efcbf0b))
- upgraded libraries depending on minimist ([29dfd9b](https://github.com/okta/odyssey/commit/29dfd9bd1503277bde0217beb33c15ef4f541736))
- upgraded node-sass ([4dae8c2](https://github.com/okta/odyssey/commit/4dae8c23018e30731e87045802da61e4d312237e))
- upgraded webpack-dev-server and Storybook ([de2e43e](https://github.com/okta/odyssey/commit/de2e43ed3c14d0b7f0e5a257796fdcedd27b8c76))

## [0.15.0](https://github.com/okta/odyssey/compare/v0.14.6...v0.15.0) (2022-09-01)

### ⚠ BREAKING CHANGES

- **odyssey-react-mui:** removes `body` and `caption` variants in favor of MUI's `body1` and `subtitle`

### Features

- added nonce capabilities for Okta apps ([c89a488](https://github.com/okta/odyssey/commit/c89a48848d6daf8aed1c0f0f865130a8b3f3c96a))
- **odyssey-icons:** add UserGroup assets ([b205264](https://github.com/okta/odyssey/commit/b205264b1bab5f7f9a2278024ef647436248e54d))
- **odyssey-react-mui:** add styles for kbd to Typography ([69b3ecc](https://github.com/okta/odyssey/commit/69b3eccd8bf40dc634754c3fb19518574e88c9db))
- **odyssey-react-mui:** add UserGroupIcon ([532a2d2](https://github.com/okta/odyssey/commit/532a2d2d6351d93c99c2af3b0e92d7041de331b8))
- **odyssey-react-mui:** apply ODS Icons to MuiAlert ([4260b7a](https://github.com/okta/odyssey/commit/4260b7aeccf0534707687dfc3c8c5f94dbb20901))
- **odyssey-react-mui:** set defaultProps for SvgIcon ([52b2e7d](https://github.com/okta/odyssey/commit/52b2e7d15f16f899523e396b53fcfcb7056a958b))
- **odyssey-react-mui:** themes spacing for Form layout and Typography ([263d248](https://github.com/okta/odyssey/commit/263d2482643e600041edaa34073b164eb1cf8873))
- **odyssey-storybook:** add user-group icon example ([3715357](https://github.com/okta/odyssey/commit/3715357edfba73ed92bff2525df007ad9f6ba93b))

### Bug Fixes

- fixed incorrect Nonce global on window ([5a21b7d](https://github.com/okta/odyssey/commit/5a21b7d3041161a6b14520ca540f78673a2521f8))
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
- removed unused imports in Storybook main.js ([4bcac94](https://github.com/okta/odyssey/commit/4bcac94d2054b16aa3f95971da477c2bd6e6ecd6))
- storybook pages now show correct code examples ([d3f1100](https://github.com/okta/odyssey/commit/d3f110009b273183305650142b4a3ea5e653b9a4))

### [0.14.4](https://github.com/okta/odyssey/compare/v0.14.3...v0.14.4) (2022-08-04)

### Features

- **odyssey-react-mui:** add Icon components ([9ba7b4b](https://github.com/okta/odyssey/commit/9ba7b4bdbc17fed37d54e68406dc3527bfc7d703))
- **odyssey-react-mui:** add MUI themes ([63bd3a3](https://github.com/okta/odyssey/commit/63bd3a3ff1799858f69196abe5f860670e2ac624))
- **odyssey-react-mui:** add support for InputAdornments ([98f4e39](https://github.com/okta/odyssey/commit/98f4e3968b733bda09756047abc1d07beec8ad57))
- **odyssey-react-mui:** enable palette theming for components ([f6d4979](https://github.com/okta/odyssey/commit/f6d4979b1b48b0903c677149185d233fb0a62e6b))
- **odyssey-react-mui:** enable spacing theming for components ([ee3aed5](https://github.com/okta/odyssey/commit/ee3aed58a3632a557109365a503512cb29b50746))
- **odyssey-react-mui:** storybook updates with MUI theme changes in development ([2563a95](https://github.com/okta/odyssey/commit/2563a95a4b10e0c1ab80050aff3bbb018500cbc7))

### Bug Fixes

- updated Lerna to v5 ([eb314dc](https://github.com/okta/odyssey/commit/eb314dc26bf8386418496ae963186cabda0ac9e3))
- updated peerDependencies for odyssey-react-mui to restrict the Material UI version ([d599952](https://github.com/okta/odyssey/commit/d599952cd923a46c78096333e47db801524a9922))
- upgraded Material UI to fix custom theme values ([a39077a](https://github.com/okta/odyssey/commit/a39077aad95227d8af5285ff6fdee24462f49b20))
- upgraded Material UI version in odyssey-storybook ([7afc5cf](https://github.com/okta/odyssey/commit/7afc5cffec9eb4099e2caa1c589ae9d9193a7a54))

### [0.14.3](https://github.com/okta/odyssey/compare/v0.14.2...v0.14.3) (2022-07-14)

### Features

- **odyssey-react-mui:** add Icon components ([9ba7b4b](https://github.com/okta/odyssey/commit/9ba7b4bdbc17fed37d54e68406dc3527bfc7d703))
- **odyssey-react-mui:** add MUI themes ([63bd3a3](https://github.com/okta/odyssey/commit/63bd3a3ff1799858f69196abe5f860670e2ac624))
- **odyssey-react-mui:** storybook updates with MUI theme changes in development ([2563a95](https://github.com/okta/odyssey/commit/2563a95a4b10e0c1ab80050aff3bbb018500cbc7))

### Bug Fixes

- updated Lerna to v5 ([eb314dc](https://github.com/okta/odyssey/commit/eb314dc26bf8386418496ae963186cabda0ac9e3))

### [0.14.2](https://github.com/okta/odyssey/compare/v0.14.1...v0.14.2) (2022-06-30)

### Features

- **odyssey-icons:** add eye and eye off icons ([d44a241](https://github.com/okta/odyssey/commit/d44a241537fa84fcf7679b7e96e52655d83d846f))
- **odyssey-react-mui:** add Infobox theme for Alert ([d92c896](https://github.com/okta/odyssey/commit/d92c89623451fb947cb0786367aeec9c02966cbc))
- **odyssey-react-mui:** add theme for Checkbox, Radio, Labels, Hints ([a7ed02a](https://github.com/okta/odyssey/commit/a7ed02a79340c32920da92da4947a068ac44c2fd))
- **odyssey-react-mui:** utilize color tokens for Palette, add lighter ([639549c](https://github.com/okta/odyssey/commit/639549c92f0b2644d347004f4ec801684cba13bf))

### Bug Fixes

- **odyssey-react-mui:** button danger disabled style ([dd2d344](https://github.com/okta/odyssey/commit/dd2d344e724d79fbc9e915390c7406cafee7279a))
- **odyssey-react-mui:** button prop serialization ([8092a2c](https://github.com/okta/odyssey/commit/8092a2c5c044b98613555805dd9e89581f7174bd))
- **odyssey-storybook:** fix font-family display in MUI components ([91a80c1](https://github.com/okta/odyssey/commit/91a80c1fbc1c94875bf83fde33296f22a81dedf1))

### [0.14.1](https://github.com/okta/odyssey/compare/v0.14.0...v0.14.1) (2022-06-21)

### Features

- **odyssey-react-mui:** add component themes, update palette + type ([c4fd294](https://github.com/okta/odyssey/commit/c4fd29488ba333236ce2ea478b2b407337ea08cc))

## [0.14.0](https://github.com/okta/odyssey/compare/v0.13.0...v0.14.0) (2022-05-26)

### ⚠ BREAKING CHANGES

- **odyssey-react:** removes heading prop, ability to add headings to banner
- **odyssey-react:** removes ability to theme Infobox width

### Features

- **odyssey-react:** add :hover to Link, Monochrome ([48f8d3b](https://github.com/okta/odyssey/commit/48f8d3bfb8c9d3f4a81ac0e3ed57b9fc5f747a74))
- **odyssey-react:** utilize :focus-visible for less intrusive ux ([87cd7ca](https://github.com/okta/odyssey/commit/87cd7ca0982b2b34fb32273879e18254a66320f0))

### Bug Fixes

- **odyssey-react:** fix Infobox icon alignment ([9ed9e8e](https://github.com/okta/odyssey/commit/9ed9e8ecf19d2c420132863310fc48817aaf8314))
- **odyssey-react:** modal overflow is now visible (ex: dropdowns) ([f97d399](https://github.com/okta/odyssey/commit/f97d3997e44e53e5baf3f93e7d732fb8041f53bd))
- **odyssey-react:** multiselect height no longer changes on selection ([1a86b1c](https://github.com/okta/odyssey/commit/1a86b1c1557182c6fc5bd866d7088708cc429ad6))
- **odyssey-storybook:** fix nested story references ([f0b26a1](https://github.com/okta/odyssey/commit/f0b26a1e9c97cd8db99eba577494ed84f9cc9cce))
- yarn 3 husky local install ([7ad0f04](https://github.com/okta/odyssey/commit/7ad0f040870181123f80074f30e9700d8d87d11a))

### Code Refactoring

- **odyssey-react:** remove heading from Banner ([a9d3c56](https://github.com/okta/odyssey/commit/a9d3c56903d00d03d8486f018c5ce2719ce7aa2b))
- **odyssey-react:** set Infobox max-width to 100% ([2405dad](https://github.com/okta/odyssey/commit/2405dada0023adf8fe4d09204262ae601babbbc5))

## [0.13.0](https://github.com/okta/odyssey/compare/v0.12.3...v0.13.0) (2022-05-05)

### ⚠ BREAKING CHANGES

- **odyssey-react:** Deprecates "Clear" Button style in favor of "Floating"
- **odyssey-react:** removes `FloatingLineHeight` and `FloatingPadding`
  tokens

### Features

- **odyssey-react:** Update Button variant styling ([7f3ef6c](https://github.com/okta/odyssey/commit/7f3ef6c48c0d16c9d49a1f8bc70f8a405ba99dd9))
- **odyssey-react:** update Button size styles ([251fdab](https://github.com/okta/odyssey/commit/251fdab88e624ea5c7ed50e521ce9a13d417b783))
- **odyssey-react:** update Modal display, add tokens for Padding ([670cb50](https://github.com/okta/odyssey/commit/670cb50ac458d054b636a133e9f69096c3d22d42))
- **odyssey-react:** update Select/NativeSelect padding ([2a68c70](https://github.com/okta/odyssey/commit/2a68c70642d0a12d128d04b2049829e35fd0b25f))
- **odyssey-react:** update TextArea padding ([8b5ce78](https://github.com/okta/odyssey/commit/8b5ce78f788609070f1461e8663cdd5a076e2acb))
- **odyssey-react:** update TextInput padding, add AffixPaddingInline ([fb33562](https://github.com/okta/odyssey/commit/fb33562a50167470b983c67bcc0f6e21a72c10a1))

### Bug Fixes

- explicitly call yarn in prepack lifecycle script for lerna ([613d00a](https://github.com/okta/odyssey/commit/613d00a5912d51221d92d977d423ce0aa22b5a06))
- **odyssey-storybook:** correct spelling of 'dismissible' in props, styles, and docs ([55c8ecb](https://github.com/okta/odyssey/commit/55c8ecb3a8cfb1b02a2d4a3c148a778138736602))

### Code Refactoring

- **odyssey-react:** Floating Button height is now consistent ([8263e99](https://github.com/okta/odyssey/commit/8263e99b3eaaf636d8f5f07ec44ce58d0f91b5d0))

## [0.12.3](https://github.com/okta/odyssey/compare/v0.12.2...v0.12.3) (2022-05-04)

### Bug Fixes

- use yarn override env variable in ci setup script ([a7d4d08](https://github.com/okta/odyssey/commit/a7d4d083749b75f8ddf9d1845d11930b6acd60b1))

## [0.12.2](https://github.com/okta/odyssey/compare/v0.12.1...v0.12.2) (2022-05-03)

### Bug Fixes

- do not use yarn prefix for okta registry ([d8a0de1](https://github.com/okta/odyssey/commit/d8a0de1dff9c2733584ef1ba43761917a3ad2782))
- provide fallback for env variable ([b438a51](https://github.com/okta/odyssey/commit/b438a510b3495c0bc83b7de001d2d75d084de890))

## [0.12.1](https://github.com/okta/odyssey/compare/v0.12.0...v0.12.1) (2022-05-02)

### Bug Fixes

- build: use fixed node version instead of alias

## [0.12.0](https://github.com/okta/odyssey/compare/v0.11.3...v0.12.0) (2022-04-29)

### ⚠ BREAKING CHANGES

- **odyssey-react:** Button - "dismiss" variant renamed to "floating"

### Features

- **odyssey-storybook:** add styles for Do and Don't examples ([e65463f](https://github.com/okta/odyssey/commit/e65463f4b3f96416abbd7f20a027d608f5da594c))

### Bug Fixes

- **odyssey-babel-loader:** support loader options passthrough ([b8da108](https://github.com/okta/odyssey/commit/b8da108555e56d909fbb2dc0a175d77e49acb5a2))
- **odyssey-babel-loader:** support webpack 4 API ([5725162](https://github.com/okta/odyssey/commit/572516258a1439f06e9b9baf134bb186dbc15d01))
- **odyssey-react:** [a11y] Infobox is now a div rather than aside ([19acd20](https://github.com/okta/odyssey/commit/19acd20cf6a67dc3ad1d85c396f36f9f912cb24f))
- **odyssey-react:** make invalid border behavior consistent ([67398cf](https://github.com/okta/odyssey/commit/67398cf8d33cf52aaedd9d1a2aceacb24c54a8f6))
- **odyssey-react:** MultiSelect dismissal is visible again ([c7a9573](https://github.com/okta/odyssey/commit/c7a9573beb0e9766fcd3b2961803ef926ab3821f))
- resolve missing peer dependencies ([36a85d6](https://github.com/okta/odyssey/commit/36a85d6543b53216edab1a61ffec2d883bdaed89))
- update bacon setup script ([35db26e](https://github.com/okta/odyssey/commit/35db26e86176006f2ab3bba2e2faaef09e5f149b))

### Code Refactoring

- **odyssey-react:** Button - "dismiss" variant renamed to "floating" ([a5306a0](https://github.com/okta/odyssey/commit/a5306a08576cd14a02a7662fd282b0f89fad210a))

### [0.11.3](https://github.com/okta/odyssey/compare/v0.11.2...v0.11.3) (2022-04-14)

### Features

- **odyssey-storybook:** enable hiding stories from sidebar ([1a1b5c5](https://github.com/okta/odyssey/commit/1a1b5c5e0f9b8a8057b68519e3aa25ea844b702a))

### Bug Fixes

- **odyssey-react:** accessible focus states for Dismiss Button ([fc7546d](https://github.com/okta/odyssey/commit/fc7546d54599631125e53ca936bad54b4c987108))
- **odyssey-react:** fix mobile Banner margins ([36dcc91](https://github.com/okta/odyssey/commit/36dcc91059a83e951ea06692e704404c30fcd577))

### [0.11.2](https://github.com/okta/odyssey/compare/v0.11.1...v0.11.2) (2022-04-07)

### Features

- add odyssey-babel-loader package ([baa6128](https://github.com/okta/odyssey/commit/baa6128d82c33e6eca5c12b02d23eb4ffcccc785))
- **odyssey-react:** add prefix and suffix text props to TextInput component ([da7b2d9](https://github.com/okta/odyssey/commit/da7b2d99e9a494600f4c1587f9763cb15cbc880b))

### Bug Fixes

- **odyssey-react:** consolidate common css ([d8b18b3](https://github.com/okta/odyssey/commit/d8b18b3ddf0cefb7d6c28a16fc03b0c942f56a17))
- **odyssey-react:** Link Icons now match text height ([6deee76](https://github.com/okta/odyssey/commit/6deee765b215893991c034beaac63dfe7159d7d1))
- **odyssey-react:** missing error border ([fbbfbc1](https://github.com/okta/odyssey/commit/fbbfbc146c00cc4bfe8d9cc6a945dd8ad49253da))
- **odyssey-react:** show invalid border ([fe3e025](https://github.com/okta/odyssey/commit/fe3e0251cf8b13d92d0a3a669f03098e542458ad))
- **odyssey-react:** TableSortButton padding now accounts for two Icons ([368d509](https://github.com/okta/odyssey/commit/368d50998c9afae168166f993be6c388348a4673))
- **odyssey-react:** update css so that the icon is sized correctly ([f6987fa](https://github.com/okta/odyssey/commit/f6987fa786f9822765485619583e2caaca384d81))
- **odyssey-react:** update input borders when value is invalid ([635ca4c](https://github.com/okta/odyssey/commit/635ca4c2cba182abe574ff525432f781c6b82ab8))
- **odyssey-react:** update Tab states to be more accessible ([fd0508f](https://github.com/okta/odyssey/commit/fd0508f44096172da4ad46623150bc3e79e56d63))

### [0.11.1](https://github.com/okta/odyssey/compare/v0.11.0...v0.11.1) (2022-03-24)

### Features

- **browserslist-config-odyssey:** expose development and test configs ([5deb33a](https://github.com/okta/odyssey/commit/5deb33aa0715b0cffad427ba364af350d675282e))

### Bug Fixes

- **odyssey-react:** improve keyboard focus behavior for Modal component ([c5d8481](https://github.com/okta/odyssey/commit/c5d84816242122a05038289d4ce828aed650e222))
- **odyssey-storybook:** controls for Button theme story ([7301868](https://github.com/okta/odyssey/commit/7301868c0d07990af37f74dd97b3bccdb48b7e6b))
- **odyssey-storybook:** improve Button doc stories ([2f7fdf0](https://github.com/okta/odyssey/commit/2f7fdf0dc3d7cd51a604d71d7920fc5155897ed4))
- **odyssey-storybook:** improve NativeSelect doc stories ([d2e4044](https://github.com/okta/odyssey/commit/d2e404412a90fe07ec78c947097643b408f0f5a1))

## [0.11.0](https://github.com/okta/odyssey/compare/v0.10.0...v0.11.0) (2022-03-17)

### ⚠ BREAKING CHANGES

- **odyssey-design-tokens:** Shadow tokens now utilize a scale palette, matching
  color, spacing, and type.
- **odyssey-react:** Link variant "primary" renamed "default"; "secondary"
  renamed "monochrome"
- **odyssey-react:** Toast "Caution" variant now utilizes the same style
  API; theme tokens unique to Caution have been removed. HeadingPadding is
  no longer themeable.
- **odyssey-react** Infobox theme variable IconLineHeight removed

### Features

- **odyssey-design-tokens:** add token for Caution Dark ([217dc74](https://github.com/okta/odyssey/commit/217dc743bfd6f431d8965ee9c6ddf94877d7ca23))
- **odyssey-ie-11-sandbox:** set `font-size` to Odyssey baseline ([e25176e](https://github.com/okta/odyssey/commit/e25176e1ade645b5279a6ba76ee9b62e5948a99e))
- **odyssey-react:** add :focus state to Link ([28cf97f](https://github.com/okta/odyssey/commit/28cf97f01cf9725b8279e82cff0e4df48781b6a2))
- **odyssey-react:** add NativeSelect component ([c2f0cd2](https://github.com/okta/odyssey/commit/c2f0cd2854e5b6b3f7fde83e69fb9ae64041b797))
- **odyssey-react:** make Toast IE11-friendly, update styles ([d4d98d6](https://github.com/okta/odyssey/commit/d4d98d6c2d214f67acd9276d8a893023ca855fdb))
- **odyssey-react:** restore native ui functions for TextInput, Search ([fff58c1](https://github.com/okta/odyssey/commit/fff58c12cc171c4f05886179d603622224fe013d))
- **odyssey-react:** update Banner styles and make Banner IE11-friendly ([f470462](https://github.com/okta/odyssey/commit/f47046243a59bd9961de0c7df37345320f546c06))
- **odyssey-react:** update Infobox style+component to match new UI ([40b77d3](https://github.com/okta/odyssey/commit/40b77d3668c510c08570b5118dc9203c9a825ca8))
- **odyssey-storybook:** add NativeSelect ([5ba420a](https://github.com/okta/odyssey/commit/5ba420abb9a9347408fccd1a7f42310014742c66))

### Bug Fixes

- **odyssey-react-theme:** build fully qualified module specifiers ([a6a0abf](https://github.com/okta/odyssey/commit/a6a0abf98834b2022b987392ec6f30ef1f89196e))
- **odyssey-react:** build fully qualified module specifiers ([60db4c6](https://github.com/okta/odyssey/commit/60db4c697dcec4f9eccae6a272e8c0bc82e0da03))
- **odyssey-react:** conditionally display aria-describedby attribute in TextInput component ([54a3863](https://github.com/okta/odyssey/commit/54a38632d6e40a28a754272c8c0d411b68c334a3))
- **odyssey-react:** conditionally display aria-describedby attribute to avoid a11y warnings ([fa83fd7](https://github.com/okta/odyssey/commit/fa83fd797e2cd650df0b3ba89cd67c1b108f0c43))
- **odyssey-react:** make Description List IE11-friendly ([0c1e040](https://github.com/okta/odyssey/commit/0c1e0406d429b008eb2c4265df9796bfc22c5f99))

### Code Refactoring

- **odyssey-design-tokens:** update Shadow names and styles ([78d0fc7](https://github.com/okta/odyssey/commit/78d0fc75a24cfda4239379bf27b39893b02cbe7d))
- **odyssey-react:** update Link variant names ([f65d9f2](https://github.com/okta/odyssey/commit/f65d9f23170036cec6d70763aadf6d7c2d0638d2))

## [0.10.0](https://github.com/okta/odyssey/compare/v0.9.3...v0.10.0) (2022-03-03)

### ⚠ BREAKING CHANGES

- **odyssey-react:** Heading now applies standard line-heights for each
  semantic and visual heading level. If custom line-heights are desired
  for these headings, they can now be themed. Alternately, Text may be
  used to generate custom font-size/line-height combinations.
- **odyssey-react:** removes "normal" and "heading" line height props in
  favor of "body" and "heading"s 1-6; (e.g. "heading3")
- **odyssey-design-tokens:** set space scale under "scale"
- **odyssey-design-tokens:** removes prior space tokens from dict
- **odyssey-react:** utilizes new type tokens
- **odyssey-design-tokens:** updates type tokens to match new scale
- **odyssey-react:** icons deleted and renamed
- **odyssey-icons:** icons deleted and renamed
- **odyssey-design-tokens:** migrates all focus tokens under Focus; renames outlines
  tokens
- **odyssey-design-tokens:** define explicit exports and module type
- **odyssey-react:** define explicit exports and module type
- **odyssey-react-theme:** define explicit exports and module type

### Features

- **browserslist-config-odyssey:** make package public ([d0341bf](https://github.com/okta/odyssey/commit/d0341bfba4d9f1c55c80d663763abfef38e8c636))
- **odyssey-design-tokens:** add new spacing scale ([faf6f19](https://github.com/okta/odyssey/commit/faf6f19ff1f6a46d925724507ae37c7960685bb3))
- **odyssey-design-tokens:** make Neutral Dark color available ([a718368](https://github.com/okta/odyssey/commit/a7183684e885016c20ace0d8b3d23a5ad20b48d3))
- **odyssey-design-tokens:** standardize focus styles for outline ([c6556a0](https://github.com/okta/odyssey/commit/c6556a0bf37011da8ab30082e748c22edf022283))
- **odyssey-design-tokens:** updates type tokens to match new scale ([b763705](https://github.com/okta/odyssey/commit/b76370513ad7ea74c215de0f732698bc33b52436))
- **odyssey-icons:** update icons with new designs ([c46a433](https://github.com/okta/odyssey/commit/c46a4338e85ae5d48339fe7c1c0b5902adacb6f1))
- **odyssey-react-theme:** useTheme hook ([fce5848](https://github.com/okta/odyssey/commit/fce584841b43c3c9dac796f64b240e9085cc7a42))
- **odyssey-react:** add SvgIcon to exported components ([bbe1ff3](https://github.com/okta/odyssey/commit/bbe1ff36344bbc184838c3e7e9a57a8ed3a820e2))
- **odyssey-react:** update focus styles to be a11y-friendly ([a9dc7c4](https://github.com/okta/odyssey/commit/a9dc7c41773fddb86ccb37f17f2e93bf6960cb0e))
- **odyssey-react:** update icons with new designs, update components with icons ([a5430b9](https://github.com/okta/odyssey/commit/a5430b9c9d6921f629884c1a99a081a37e161b7a))
- **odyssey-storybook:** force 14px font-size on preview html ([9eb4fdc](https://github.com/okta/odyssey/commit/9eb4fdc2b1cf2fabe379ce7154303bfae33328de))
- **odyssey-storybook:** update Icon and Link stories with new icons ([67d9d3f](https://github.com/okta/odyssey/commit/67d9d3f482d600d321cc0475bce3615690bdf483))
- **odyssey:** add package for IE 11 testing sandbox ([e30b754](https://github.com/okta/odyssey/commit/e30b754d610addb7746145e973b24427a181e5db))

### Code Refactoring

- **odyssey-design-tokens:** define explicit exports and module type ([fdb56c5](https://github.com/okta/odyssey/commit/fdb56c552b8f7e876969ccdcf583522a727c776b))
- **odyssey-design-tokens:** removes prior space tokens from dict ([f35b3f5](https://github.com/okta/odyssey/commit/f35b3f5878df7dd94864bfdb4f5143ae724cb244))
- **odyssey-design-tokens:** set space scale under "scale" ([5ddbe65](https://github.com/okta/odyssey/commit/5ddbe65ea5844365389aef98599444734c47bda3))
- **odyssey-react-theme:** define explicit exports and module type ([f71a20b](https://github.com/okta/odyssey/commit/f71a20b32182eb0befa58be2e5f996b41bb2e87f))
- **odyssey-react:** define explicit exports and module type ([6a194a5](https://github.com/okta/odyssey/commit/6a194a5fa035b8526b163735626d28e09c5df4ae))
- **odyssey-react:** remove lineheight props from Heading ([d0538d0](https://github.com/okta/odyssey/commit/d0538d0d8b8d21b16d4244241e64c0af5875f87d))
- **odyssey-react:** update Text props to reflect new line-heights ([f0ef803](https://github.com/okta/odyssey/commit/f0ef803f4e6415c1f23d9e3254e32f99fa482bf3))
- **odyssey-react:** utilizes new type tokens ([3650b7c](https://github.com/okta/odyssey/commit/3650b7c0df01dc0d66416193a31d9889888e0cd6))

### [0.9.3](https://github.com/okta/odyssey/compare/v0.9.2...v0.9.3) (2022-02-24)

### Features

- **odyssey-babel-plugin:** make package public ([072c628](https://github.com/okta/odyssey/commit/072c628bac9b88f3f5952914038302847c64a65a))
- **odyssey-babel-preset:** make package public ([082b214](https://github.com/okta/odyssey/commit/082b2147205718abd9d585bd4840af2ccd96c360))
- **odyssey-lifecycle:** add new package to reduce duplication for lifecycle scripts ([aff7760](https://github.com/okta/odyssey/commit/aff776066345b8942a7f94c2b1c47ccd8f6357b0))
- **odyssey-postcss-preset:** make package public ([e06adcc](https://github.com/okta/odyssey/commit/e06adcc0b8b93b4bfa7cd106a659901fc1f7c9a0))
- **odyssey-postcss-scss:** make package public ([a215fab](https://github.com/okta/odyssey/commit/a215fabb94439325c1bd073f127af50fb918bab7))
- **odyssey-postcss-theme:** make package public ([00a7555](https://github.com/okta/odyssey/commit/00a75557159d67639859e4d775c15bfe8d3e359d))

### [0.9.2](https://github.com/okta/odyssey/compare/v0.9.1...v0.9.2) (2022-02-17)

### Features

- **odyssey-react:** add resize prop to TextArea ([9e71ba0](https://github.com/okta/odyssey/commit/9e71ba0f42ad6bc43f886cccf4bead45e6ae1fd0))

### Bug Fixes

- improve class name hashing ([a22e295](https://github.com/okta/odyssey/commit/a22e295a254100c0fefdd48ac21d00caf2b36c2b))

### [0.9.1](https://github.com/okta/odyssey/compare/v0.9.0...v0.9.1) (2022-02-10)

### Features

- **odyssey-storybook:** add autogenerated theme tokens tables and component theme table ([705057b](https://github.com/okta/odyssey/commit/705057b340d12507658d3713163ec32d6580cc12))
- **odyssey-storybook:** add build to prepublishOnly ([0ebf5a6](https://github.com/okta/odyssey/commit/0ebf5a616105bed0869f0da07d4e3737eff72e2b))
- **odyssey-storybook:** add theme variable tables to all component doc pages ([b6a8a1f](https://github.com/okta/odyssey/commit/b6a8a1f62b8b19fbab185141e94f2e1441c1ac79))
- **odyssey-storybook:** move component location and update props based on feedback ([3edfdbe](https://github.com/okta/odyssey/commit/3edfdbe8c0857172ef41e3dfabeb587beca940b2))

### Bug Fixes

- **odyssey-react:** add relatively positioned containers to Checkbox and Radio ([1e48b51](https://github.com/okta/odyssey/commit/1e48b5180ce1ebfaadf2e72af4066881adf0ce70))
- **odyssey-react:** allow Infobox to have content without extra space for heading ([93a67dd](https://github.com/okta/odyssey/commit/93a67ddbcfe0fde395f137fa67d318dbda51ce92))
- **odyssey-storybook:** add Infobox stories with only heading and content ([3e3e401](https://github.com/okta/odyssey/commit/3e3e4018fb7a5fba66b854d0fdeec0ac8d58f309))

## [0.9.0](https://github.com/okta/odyssey/compare/v0.8.4...v0.9.0) (2022-02-02)

### ⚠ BREAKING CHANGES

- **odyssey-react:** rename TextInput "inputRef" prop to "ref"
- **odyssey-react:** rename TextArea "textareaRef" prop to "ref"
- **odyssey-react:** renames "title" props to "heading"
- **odyssey-react:** renames FieldGroup "title" prop to "legend"
- **odyssey-react:** renames Table "title" prop to "caption"
- **odyssey-react:** rename Tag component to TagList
- **odyssey-react:** rename Table prop "title" to "heading"
- **odyssey-react:** remove odyssey-deprecated-global.css stylesheet. Odyssey consumers should now use component composition.
- **odyssey-react:** remove data-testid="ods-toast-pen" from Toast
- **odyssey-react:** remove data-testid="ods-tabs" from Tabs
- **odyssey-react:** Text prop fontWeight "regular" renamed to "normal"
- **odyssey-react:** Text props color "heading" "danger-disabled" and "code" removed
- **odyssey-react:** Text prop fontSize "lede" removed
- **odyssey-react:** Text props textTransform "full-width" and "full-size-kana" removed
- **odyssey-react:** Text prop lineHeight "font" removed
- **odyssey-react:** Text prop overflowWrap "anywhere" removed
- **odyssey-react:** required form input components must now declare true prop for `required`
- **odyssey-react:** non-required form input components must now declare translated string prop for `optionalLabel`
- **odyssey-react:** rename Text props and values to match standard css, remove text interaction props
- **odyssey-react:** Text prop hoverBorderColor prop "interactive" renamed to "ui"

### Features

- expose hidden choices reference ([a64597a](https://github.com/okta/odyssey/commit/a64597a57f41bbbb1053d9e1a7254148d9318875))
- no invalid theme properties eslint rule ([847d506](https://github.com/okta/odyssey/commit/847d5061f18e1ad6372cb538b559e136535bca33))
- **odyssey-design-tokens:** add heading color token ([2e55f7b](https://github.com/okta/odyssey/commit/2e55f7bf3ba1e1512df2cbd0afd13f59bd61a6d2))
- **odyssey-design-tokens:** add new functional colors ([a7890f8](https://github.com/okta/odyssey/commit/a7890f8f69c5d3608254879bfb0c4853b1a0445e))
- **odyssey-design-tokens:** add space tokens ([e8ff2de](https://github.com/okta/odyssey/commit/e8ff2de7ed80e8ca6f51914e63873e006de721c3))
- **odyssey-design-tokens:** add tokens for sizing, addl colors ([6b8d9a0](https://github.com/okta/odyssey/commit/6b8d9a0978f002e208dad9ee2c85b4309aeb0b30))
- **odyssey-design-tokens:** add transition and line height tokens ([b8a1d9f](https://github.com/okta/odyssey/commit/b8a1d9f5f2ade6ea8c9e8a90759f70827b680946))
- **odyssey-react-theme:** add new react-theme package ([d2197f2](https://github.com/okta/odyssey/commit/d2197f20b820d31613482653cb2f83821560fd96))
- **odyssey-react:** add base styles and theme variables to TextInput ([3216e72](https://github.com/okta/odyssey/commit/3216e7286dd3c42ebe693267669915158f2b120c))
- **odyssey-react:** add Box as Button root ([c0971de](https://github.com/okta/odyssey/commit/c0971de468c15605efb1dde68c79ccb73a558c91))
- **odyssey-react:** add Box as root of Banner ([3321802](https://github.com/okta/odyssey/commit/33218020597000e28580e82d02062c9978fec911))
- **odyssey-react:** add Box as root of Checkbox ([ce14011](https://github.com/okta/odyssey/commit/ce14011fc1f3cef7b878d95fe91c486e5ded83e5))
- **odyssey-react:** add Box as root of FieldGroup ([e325f50](https://github.com/okta/odyssey/commit/e325f505f434d31512425fc345656d985a054999))
- **odyssey-react:** add Box as root of Link ([35d74f9](https://github.com/okta/odyssey/commit/35d74f9428bb13822622caec4fbec110da2c3ed1))
- **odyssey-react:** add Box in Heading ([564d674](https://github.com/okta/odyssey/commit/564d674d5ab4c04340ee89c8c8f9d1e3684f6194))
- **odyssey-react:** add Box to Tag ([ab87e11](https://github.com/okta/odyssey/commit/ab87e11b294f76285a8975f9964fabcecbdebabf))
- **odyssey-react:** add Box to Modal and sub-components ([0b8f85a](https://github.com/okta/odyssey/commit/0b8f85a0d2eb653054b3646c98bd9ac352869b82))
- **odyssey-react:** add Box to Select option and optiongroup ([a48a5d4](https://github.com/okta/odyssey/commit/a48a5d4da32d1db539c3e0465c9df2c28acf6941))
- **odyssey-react:** add Box to Table ([f7aed53](https://github.com/okta/odyssey/commit/f7aed53048dc2964dfc99bc8319af04b690dd0d9))
- **odyssey-react:** add Box to Tabs components ([d4bfae9](https://github.com/okta/odyssey/commit/d4bfae9c94c4906d4b67f085cb808939f9014126))
- **odyssey-react:** add Box to Toast ([581a8eb](https://github.com/okta/odyssey/commit/581a8ebb29c62ddefaeb3767d7d7d77f7beedd92))
- **odyssey-react:** add Box to Tooltip ([f157469](https://github.com/okta/odyssey/commit/f157469f76c03f94bb28a84f5d8bd4be56aee196))
- **odyssey-react:** add Box wrapper to RadioButton ([31938c6](https://github.com/okta/odyssey/commit/31938c6379e47891be62363cd43a2d2d1dee383d))
- **odyssey-react:** add full Box component implementation ([35c47af](https://github.com/okta/odyssey/commit/35c47af5e7589a85e73399952856f64570ef3e11))
- **odyssey-react:** add inherit to Box text prop values ([4ba9794](https://github.com/okta/odyssey/commit/4ba979443d387a68a27d98c4455d82c09afd41a3))
- **odyssey-react:** add reset styles to box, expose as prop ([ab539a8](https://github.com/okta/odyssey/commit/ab539a8f0bc1c9d82f60fbff32e8f9b7d794551f))
- **odyssey-react:** add support for className prop in Box ([117e0bb](https://github.com/okta/odyssey/commit/117e0bb32d9dde87fe22264006385c4c112f65b9))
- **odyssey-react:** add text classes to Box withStyles ([264218f](https://github.com/okta/odyssey/commit/264218fe95fa2800147a17622934576850d208bb))
- **odyssey-react:** add Text component to Button to remove dependence on global styles ([16e7b3e](https://github.com/okta/odyssey/commit/16e7b3e5fd0008b3577ef9837b29b52131913b49))
- **odyssey-react:** add text styles to Box root ([a653b3d](https://github.com/okta/odyssey/commit/a653b3de2445c3a8ea5267d982558444e4179579))
- **odyssey-react:** add theme variables to List ([2364006](https://github.com/okta/odyssey/commit/23640063aa9290d82234d7bf58fd9d4767259282))
- **odyssey-react:** add theme variables to RadioButton. Consistency pass for variable naming ([be14acc](https://github.com/okta/odyssey/commit/be14acc88bc4f794bedbc643d52844e5377386ee))
- **odyssey-react:** add themeing variables to Checkbox ([fbf79e5](https://github.com/okta/odyssey/commit/fbf79e5e158efb88b4c62b4776459caf147f8952))
- **odyssey-react:** add themeing variables to Toast ([752d1ea](https://github.com/okta/odyssey/commit/752d1ea25dc0d3c8fa4b1e13ab26736546268ea8))
- **odyssey-react:** add ThemeProvider ([41a5516](https://github.com/okta/odyssey/commit/41a5516e19dcd06cb004b3c0ba6a09845a717551))
- **odyssey-react:** add theming to CircularLoadIndicator ([d58604f](https://github.com/okta/odyssey/commit/d58604f81f3a5d4c571ed0c815120d6325e16306))
- **odyssey-react:** add theming to Table ([e059ac3](https://github.com/okta/odyssey/commit/e059ac30dc816dd808a4ea4fa7a3d2cd7a44a0b4))
- **odyssey-react:** add theming to Tooltip ([2ec9e86](https://github.com/okta/odyssey/commit/2ec9e8636c30218e8d0c6ce90a7ffe38dccb5c1d))
- **odyssey-react:** add WithTheme HOC ([325155e](https://github.com/okta/odyssey/commit/325155ef9c1af0e2de1f809d88381a8c87b48f45))
- **odyssey-react:** add withTheme to Infobox ([015256d](https://github.com/okta/odyssey/commit/015256d218867ba8cff20b9f22ca6cad4c7bdc8e))
- **odyssey-react:** additional theme vars in Checkbox ([27cafca](https://github.com/okta/odyssey/commit/27cafcaf9bddd4d4af64cba7aca6db9715bcf86d))
- **odyssey-react:** additional theme vars in Checkbox ([54e3f38](https://github.com/okta/odyssey/commit/54e3f38faeda856278e37139632b398a98e06343))
- **odyssey-react:** align theme variables between components ([97ee069](https://github.com/okta/odyssey/commit/97ee069cd6d0780ad01a1f75ce79aaaed1d50865))
- **odyssey-react:** align types related to Box ([0c4d4d9](https://github.com/okta/odyssey/commit/0c4d4d97617c9d8d0a5ac1a5a54d3518461f39e4))
- **odyssey-react:** allow Button to control font-family ([8eb6d05](https://github.com/okta/odyssey/commit/8eb6d057a55ae67d6cebc8ac7ab21539b8d52ad5))
- **odyssey-react:** allow default text properties to be overriden in Box ([da68956](https://github.com/okta/odyssey/commit/da68956c9613a5c4610d5b9082f54d7f300580c3))
- **odyssey-react:** allow font-style to be set by Link with Box ([0cfe6d0](https://github.com/okta/odyssey/commit/0cfe6d0068e17434b8b483a73d97253e8d95e9cb))
- **odyssey-react:** cleanup Box api docs and css rules ([014b867](https://github.com/okta/odyssey/commit/014b8672da898985f8f31bfc04fe2343c2ea8a15))
- **odyssey-react:** consistent margin and padding theme varible names in Checkbox ([899789f](https://github.com/okta/odyssey/commit/899789fbbeeabecdc129c8e4c353d6250eca4e02))
- **odyssey-react:** convert Status to tokens ([be5b1f2](https://github.com/okta/odyssey/commit/be5b1f20a95f96ae1b343c029146e4032ff0c4cf))
- **odyssey-react:** correct order of stylesheets withStyles in Box ([4a627e7](https://github.com/okta/odyssey/commit/4a627e71d07df9bd8b3aea56bcbece04d02ae249))
- **odyssey-react:** enable theming for Link ([81a7b1b](https://github.com/okta/odyssey/commit/81a7b1b4271f151f2469f9eb7fae0e228c2edb70))
- **odyssey-react:** eternalize string case conversion utils, remove duplicate root Text styles ([75178c1](https://github.com/okta/odyssey/commit/75178c199bc42f2fb4c8ab00085c971dcdc0a35b))
- **odyssey-react:** exclude lineHeight from Table Box wrapper ([e2588a1](https://github.com/okta/odyssey/commit/e2588a1e2f85ec4c2a9612a707b3530ec64bfb9f))
- **odyssey-react:** fix TS error in Box story ([a86e98f](https://github.com/okta/odyssey/commit/a86e98fea656a6c7d0cdeeea45aee0e5b8c8c3d0))
- **odyssey-react:** heading withTheme ([d8cbae5](https://github.com/okta/odyssey/commit/d8cbae50a3d1f82ee998ab072a0916272b9fa4ad))
- **odyssey-react:** initial theme setup for TextInput ([1e0ac34](https://github.com/okta/odyssey/commit/1e0ac3441f38f9eaf724ea7cdb3e8f6340ba7b3c))
- **odyssey-react:** omit fontSize from Heading's Box root ([916011f](https://github.com/okta/odyssey/commit/916011fd270319951c60efc04097fe4723bb2164))
- **odyssey-react:** omit lineHeight from Heading's Box root ([7f16d75](https://github.com/okta/odyssey/commit/7f16d7523354c78829da05d3244e9cbbea02b9a1))
- **odyssey-react:** only style unclassed HTML 5 elements under box ([759681a](https://github.com/okta/odyssey/commit/759681a1eba836a8de2160c07e6b9d2724408ecd))
- **odyssey-react:** refactor CircularLoadIndicator to use Box ([d0d4666](https://github.com/okta/odyssey/commit/d0d46666a3ed7ac02d2fcbad91ab1e358ace1f9d))
- **odyssey-react:** refactor Infobox to use Box ([1508d2e](https://github.com/okta/odyssey/commit/1508d2e17fca6fc684e5c5b7a5537e53bbc48988))
- **odyssey-react:** remove defaults for Box margin and padding ([df07d90](https://github.com/okta/odyssey/commit/df07d9025a28b8d770a5d615ace1ffe3662c8b02))
- **odyssey-react:** remove lineheight from TableSortButton Box wrapper ([8262093](https://github.com/okta/odyssey/commit/8262093e1307ef7772753d443e20ecbbb2d376a6))
- **odyssey-react:** remove Text styles form Box ([505c7a4](https://github.com/okta/odyssey/commit/505c7a44cc83763292258a9ad03cd89092b11885))
- **odyssey-react:** remove unused style declaration and add missing variables to TextInput ([2d72b10](https://github.com/okta/odyssey/commit/2d72b10839741514f2244747711882d3348bf067))
- **odyssey-react:** remove use of ReactDOMServer in Select ([6f484a4](https://github.com/okta/odyssey/commit/6f484a4bbcdbf658467cd38755711b6de7d973f6))
- **odyssey-react:** rename theme properties in List ([e9bb90c](https://github.com/okta/odyssey/commit/e9bb90c97ae77c76ba6cb90557392ce4b686097b))
- **odyssey-react:** set overrides for Tooltip font styles ([575112c](https://github.com/okta/odyssey/commit/575112c5ba5f5737a9693ed344d1b03d1de5dcfe))
- **odyssey-react:** spread omitted rest props for TextInput ([e86aaaf](https://github.com/okta/odyssey/commit/e86aaaf46cbe3e97e7856aabc60fe4ae24a8c94b))
- **odyssey-react:** spread omitted rest props through for Modal ([aeed8f0](https://github.com/okta/odyssey/commit/aeed8f0d8c33f28cc652b023a8b8798df6678b9a))
- **odyssey-react:** Text component refactor in Banner ([#1160](https://github.com/okta/odyssey/issues/1160)) ([8795f01](https://github.com/okta/odyssey/commit/8795f0172e34fd1ebdf86f3f854ef8539a7ada70))
- **odyssey-react:** trim Box css reset ([7daac55](https://github.com/okta/odyssey/commit/7daac55a1ada44c8897d510c073b2cd91cd53d6c))
- **odyssey-react:** unset default text properties in Box using false value for props ([d0ba167](https://github.com/okta/odyssey/commit/d0ba167b94f7b64468c617400f89bf6b98181c0f))
- **odyssey-react:** update Box docs to match implementation ([fd09115](https://github.com/okta/odyssey/commit/fd091150da7a687043f5bcfd3e436e48fa7e1f6e))
- **odyssey-react:** update Button with Text to overcome regressions ([235863b](https://github.com/okta/odyssey/commit/235863b3dcfc5111fdda147e5cb3070bad3f830e))
- **odyssey-react:** update indicator size in TextInput ([254398d](https://github.com/okta/odyssey/commit/254398d53255a6db26ce985247ace77de494bcea))
- **odyssey-react:** update max width variable ([f4d039b](https://github.com/okta/odyssey/commit/f4d039bc0c66ae69ef2ea7fda65061f6ad16162f))
- **odyssey-react:** update overflow story for Box ([6fc2261](https://github.com/okta/odyssey/commit/6fc226183ccef7a2b3916c59ab092d5bdcddf9a9))
- **odyssey-react:** update spacing css for RadioButton ([4b7834d](https://github.com/okta/odyssey/commit/4b7834d21c4bd6592e72fb9a86ac6d871d6353e4))
- **odyssey-react:** update Text api to simplify and align with standard css ([54b2538](https://github.com/okta/odyssey/commit/54b2538d03befd775c363df994404a44773b0051))
- **odyssey-react:** update text import ([d48393a](https://github.com/okta/odyssey/commit/d48393a0d23f7b8b4f073be138f32a8bcbf3b160))
- **odyssey-react:** update to correct FontSize theme variable name in Checkbox ([a09cb4c](https://github.com/okta/odyssey/commit/a09cb4c0df4c31b2d4d3770de22ff1f093d0c012))
- **odyssey-react:** update variable naming ([bbea0f5](https://github.com/okta/odyssey/commit/bbea0f5776337944ae7a5abdedcc566ab72279f2))
- **odyssey-react:** updated Box to use polymorphic `as` prop ([32a3cf2](https://github.com/okta/odyssey/commit/32a3cf262f38ecc933828d7d4b7bc1899fd1a73e))
- **odyssey-react:** use root class name from styles object in RadioButton ([de032a0](https://github.com/okta/odyssey/commit/de032a0d3ec30821b29c3d11957fa82cdd2b40d4))
- **odyssey-react:** use Text component in Field ([c0b5735](https://github.com/okta/odyssey/commit/c0b57353c8b8f1372ab1060e71cc15cb97fa516b))
- **odyssey-react:** utilize Space tokens in Status ([e8f052e](https://github.com/okta/odyssey/commit/e8f052e52e0afe85a92438082556af944e9074dc))
- **odyssey-react:** withTheme for Banner ([e56d09e](https://github.com/okta/odyssey/commit/e56d09ef3dd14e501e90df7e778819fb63b3430e))
- **odyssey-react:** withTheme for Box ([6916b7a](https://github.com/okta/odyssey/commit/6916b7abb73ef3e3501ba30e649168c2ac24eb35))
- **odyssey-react:** withTheme for Button ([fe466a7](https://github.com/okta/odyssey/commit/fe466a7099c201704de1452052e02e61f65dadf0))
- **odyssey-react:** withTheme for Field ([a6b9cfa](https://github.com/okta/odyssey/commit/a6b9cfa32bcc4ae6ea4925fc44d454a79b9de3a8))
- **odyssey-react:** withTheme for Form ([fa77ce3](https://github.com/okta/odyssey/commit/fa77ce3b74f01d690f67e47f11382a26cb014dbc))
- **odyssey-react:** withTheme for Modal ([75ad6f2](https://github.com/okta/odyssey/commit/75ad6f258c757ea6ea62a12c3ec658f04d68f505))
- **odyssey-react:** withTheme for ScreenReaderText ([b21e4f3](https://github.com/okta/odyssey/commit/b21e4f3cdbbd803dd919605eb196862c79ce321d))
- **odyssey-react:** withTheme for Select ([95008bf](https://github.com/okta/odyssey/commit/95008bf45569a1e515ab6dfc3f6c365e957ea332))
- **odyssey-react:** withTheme for SvgIcon ([a1d66d3](https://github.com/okta/odyssey/commit/a1d66d3231f6b9412d675cc28dd0b74cce69b790))
- **odyssey-react:** withTheme for Tabs ([b037e68](https://github.com/okta/odyssey/commit/b037e687b106c360e409fa2358b4b6d08ba6fc15))
- **odyssey-react:** withTheme for tag ([970ccdd](https://github.com/okta/odyssey/commit/970ccddcd83275c8aeef4dd501304fa7bb8ee66b))
- **odyssey-react:** withTheme for Text ([83ddd3f](https://github.com/okta/odyssey/commit/83ddd3f534156e545d8e37725d88c0e778361d2f))
- **odyssey-react:** withTheme for TextArea ([1a52082](https://github.com/okta/odyssey/commit/1a52082f5498b8a7de43b30207037956ed7d0a16))
- **odyssey-storybook:** add stories to document Box ([eb4bf3d](https://github.com/okta/odyssey/commit/eb4bf3d8ce57ff2755bcc0499ef2e115a6eb96fe))
- **odyssey-storybook:** update stories to use new Text api ([a269860](https://github.com/okta/odyssey/commit/a2698608b2857d402fbbea2194bc64e63ad87f80))
- support async select options ([0bc1986](https://github.com/okta/odyssey/commit/0bc1986e01d6f843cd589c56d4cdda27b629750f))

### Bug Fixes

- controlled select case by using to ref.current ([b61b2bd](https://github.com/okta/odyssey/commit/b61b2bd0c448a3b01fc85a7c6233a9b69a4409a4))
- lint ([617b736](https://github.com/okta/odyssey/commit/617b736038b508b8747c78099cca2b7202cc0846))
- **odyssey-design-tokens:** fix em to rem ([4774ae5](https://github.com/okta/odyssey/commit/4774ae58616d90d6db3715aeb3c49eb351efe1cf))
- **odyssey-react:** disabled text color for Select ([38445f2](https://github.com/okta/odyssey/commit/38445f214c9218f88aa2d9c3315e9272b33b884a))
- **odyssey-react:** fix failing Field related tests ([0fd1fe0](https://github.com/okta/odyssey/commit/0fd1fe0230bc48ab89f3955f865d988c52c3aabd))
- **odyssey-react:** fix Search Icon layer height ([b597d73](https://github.com/okta/odyssey/commit/b597d739cc95792476043eb2a96cefcb34de8537))
- **odyssey-react:** fix types path ([674ba20](https://github.com/okta/odyssey/commit/674ba2011ea81b7a8e15d1125b0a35fdca536c29))
- **odyssey-react:** fixes visual blemishes in Select styling ([d52d054](https://github.com/okta/odyssey/commit/d52d05479d1b592f372f233c9da50b0c9ae20527))
- **odyssey-react:** improve List children type annotation ([1676b58](https://github.com/okta/odyssey/commit/1676b58ca7f0f1f680eb78bf72f3acd612ff6c39))
- **odyssey-react:** input height for multiple Select ([5cf6a79](https://github.com/okta/odyssey/commit/5cf6a79d27324369fb6c87608eb6e7a617424681))
- **odyssey-react:** remove inherited color from props for StatusProps ([704b226](https://github.com/okta/odyssey/commit/704b22652d8cb3182677d8eacb554b1606d0f512))
- **odyssey-react:** remove stray console log ([48cde40](https://github.com/okta/odyssey/commit/48cde40b3e60ba76d65e0c80d88ec1e01b09a2ea))
- **odyssey-react:** required prop default to true ([0ad6b7a](https://github.com/okta/odyssey/commit/0ad6b7aaa4c95b82b8108976394e77b830d52e69))
- **odyssey-storybook:** add Field.docgen to fix props table ([f2672bc](https://github.com/okta/odyssey/commit/f2672bc85926a6cdf1ac01730cb7de4b94fd2f70))
- **odyssey-storybook:** updated deprecated prop in box ([5658844](https://github.com/okta/odyssey/commit/5658844100d0f427ff4ff7685ccc63a2e4211a97))
- remove added dep / prop ([a349727](https://github.com/okta/odyssey/commit/a3497270d0369fa3bd0b1d8571fef698d28c27c4))
- type issue need cast to force union start type when using callback ([2f8f482](https://github.com/okta/odyssey/commit/2f8f482bb42737dca5f32e97384fe2c83f6f7cbb))
- updates per review feedback ([10cf21e](https://github.com/okta/odyssey/commit/10cf21ef22c13e3affb1cec57ba3bb8e8b218256))

### Code Refactoring

- **odyssey-design-tokens:** renames "title" tokens to "heading" ([fd650fd](https://github.com/okta/odyssey/commit/fd650fdd4c5d57ebdba83445877db833076c7098))
- **odyssey-react:** remove data-testid="ods-tabs" from Tabs ([641a332](https://github.com/okta/odyssey/commit/641a332580aa74d7e66c313094cdb677b1ab9550))
- **odyssey-react:** remove data-testid="ods-toast-pen" from Toast ([8689746](https://github.com/okta/odyssey/commit/868974665efaa0f0218ff96f70d800a2b5364854))
- **odyssey-react:** remove global typography styles ([01f0b0e](https://github.com/okta/odyssey/commit/01f0b0e31d704516b48b634c343b4cf132f9275a))
- **odyssey-react:** rename Table prop "title" to "heading" ([1aa9bd1](https://github.com/okta/odyssey/commit/1aa9bd19629aecd0a9c4a632b700a35da5935086))
- **odyssey-react:** rename Tag to TagList ([6bdbfa6](https://github.com/okta/odyssey/commit/6bdbfa66b93dc83d34913aea9e526446edb4938b))
- **odyssey-react:** rename TextArea textareaRef prop to ref, forward spread rest props ([354bd84](https://github.com/okta/odyssey/commit/354bd840005618856c2b1573031595539ad414e0))
- **odyssey-react:** rename TextInput inputRef prop to ref ([a795c66](https://github.com/okta/odyssey/commit/a795c66e9a52429e77a397fe2ff68c93b246e2d4))
- **odyssey-react:** renames "title" props to "heading" ([0be3fb7](https://github.com/okta/odyssey/commit/0be3fb7779e1e74c1c5015ca041d136d5d673d7e))
- **odyssey-react:** renames FieldGroup "title" prop to "legend" ([44dc958](https://github.com/okta/odyssey/commit/44dc958ba8c432aa5623e705736c9a6945faea8a))
- **odyssey-react:** renames Table "heading" and "caption" props ([a515cee](https://github.com/okta/odyssey/commit/a515cee7d8a0e8b7c4d7de6acd61263be697bd24))
- **odyssey:** renames "title" variables to "heading" ([622d4ec](https://github.com/okta/odyssey/commit/622d4ec8c3f17f524ae44635c141ead54093d4dc))

### [0.8.4](https://github.com/okta/odyssey/compare/v0.8.3...v0.8.4) (2021-11-18)

### Features

- **odyssey-react:** expose hidden choices reference ([a64597a](https://github.com/okta/odyssey/commit/a64597a57f41bbbb1053d9e1a7254148d9318875))

## [0.8.3](https://github.com/okta/odyssey/compare/v0.8.2...v0.8.3) (2021-11-10)

### Bug Fixes

- **odyssey-commitlint:** use angular lint preset ([71ad365](https://github.com/okta/odyssey/commit/71ad3650df7ab6c0f6874ff91470dc36485b89cf))

### Features

- **odyssey-storybook:** add Page Background inverse color option to storybook ([#1162](https://github.com/okta/odyssey/issues/1162)) ([b5cd642](https://github.com/okta/odyssey/commit/b5cd642386004ba8e3f3b5c0ae1abb38a0f782e8))
- **odyssey-tokens:** adds odyssey-tokens package ([#1124](https://github.com/okta/odyssey/issues/1124)) ([a7ecd65](https://github.com/okta/odyssey/commit/a7ecd6519464ebbf9ccd84a15cdc21c138adc969))
