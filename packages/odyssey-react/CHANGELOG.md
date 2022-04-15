# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

### [0.11.3](https://github.com/okta/odyssey/compare/v0.11.2...v0.11.3) (2022-04-14)

### Bug Fixes

- **odyssey-react:** accessible focus states for Dismiss Button ([fc7546d](https://github.com/okta/odyssey/commit/fc7546d54599631125e53ca936bad54b4c987108))
- **odyssey-react:** fix mobile Banner margins ([36dcc91](https://github.com/okta/odyssey/commit/36dcc91059a83e951ea06692e704404c30fcd577))

### [0.11.2](https://github.com/okta/odyssey/compare/v0.11.1...v0.11.2) (2022-04-07)

### Features

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

### Bug Fixes

- **odyssey-react:** improve keyboard focus behavior for Modal component ([c5d8481](https://github.com/okta/odyssey/commit/c5d84816242122a05038289d4ce828aed650e222))

## [0.11.0](https://github.com/okta/odyssey/compare/v0.10.0...v0.11.0) (2022-03-17)

### ⚠ BREAKING CHANGES

- **odyssey-react:** Link variant "primary" renamed "default"; "secondary"
  renamed "monochrome"
- **odyssey-react:** Toast "Caution" variant now utilizes the same style
  API; theme tokens unique to Caution have been removed. HeadingPadding is
  no longer themeable.
- **odyssey-react** Infobox theme variable IconLineHeight removed

### Features

- **odyssey-react:** add :focus state to Link ([28cf97f](https://github.com/okta/odyssey/commit/28cf97f01cf9725b8279e82cff0e4df48781b6a2))
- **odyssey-react:** add NativeSelect component ([c2f0cd2](https://github.com/okta/odyssey/commit/c2f0cd2854e5b6b3f7fde83e69fb9ae64041b797))
- **odyssey-react:** make Toast IE11-friendly, update styles ([d4d98d6](https://github.com/okta/odyssey/commit/d4d98d6c2d214f67acd9276d8a893023ca855fdb))
- **odyssey-react:** restore native ui functions for TextInput, Search ([fff58c1](https://github.com/okta/odyssey/commit/fff58c12cc171c4f05886179d603622224fe013d))
- **odyssey-react:** update Banner styles and make Banner IE11-friendly ([f470462](https://github.com/okta/odyssey/commit/f47046243a59bd9961de0c7df37345320f546c06))
- **odyssey-react:** update Infobox style+component to match new UI ([40b77d3](https://github.com/okta/odyssey/commit/40b77d3668c510c08570b5118dc9203c9a825ca8))

### Bug Fixes

- **odyssey-react:** build fully qualified module specifiers ([60db4c6](https://github.com/okta/odyssey/commit/60db4c697dcec4f9eccae6a272e8c0bc82e0da03))
- **odyssey-react:** conditionally display aria-describedby attribute in TextInput component ([54a3863](https://github.com/okta/odyssey/commit/54a38632d6e40a28a754272c8c0d411b68c334a3))
- **odyssey-react:** conditionally display aria-describedby attribute to avoid a11y warnings ([fa83fd7](https://github.com/okta/odyssey/commit/fa83fd797e2cd650df0b3ba89cd67c1b108f0c43))
- **odyssey-react:** make Description List IE11-friendly ([0c1e040](https://github.com/okta/odyssey/commit/0c1e0406d429b008eb2c4265df9796bfc22c5f99))

### Code Refactoring

- **odyssey-react:** update Link variant names ([f65d9f2](https://github.com/okta/odyssey/commit/f65d9f23170036cec6d70763aadf6d7c2d0638d2))

## [0.10.0](https://github.com/okta/odyssey/compare/v0.9.3...v0.10.0) (2022-03-03)

### ⚠ BREAKING CHANGES

- **odyssey-react:** Heading now applies standard line-heights for each
  semantic and visual heading level. If custom line-heights are desired
  for these headings, they can now be themed. Alternately, Text may be
  used to generate custom font-size/line-height combinations.
- **odyssey-react:** removes "normal" and "heading" line height props in
  favor of "body" and "heading"s 1-6; (e.g. "heading3")
- **odyssey-react:** utilizes new type tokens
- **odyssey-react:** icons deleted and renamed
- **odyssey-react:** define explicit exports and module type

### Features

- **odyssey-react:** add SvgIcon to exported components ([bbe1ff3](https://github.com/okta/odyssey/commit/bbe1ff36344bbc184838c3e7e9a57a8ed3a820e2))
- **odyssey-react:** update focus styles to be a11y-friendly ([a9dc7c4](https://github.com/okta/odyssey/commit/a9dc7c41773fddb86ccb37f17f2e93bf6960cb0e))
- **odyssey-react:** update icons with new designs, update components with icons ([a5430b9](https://github.com/okta/odyssey/commit/a5430b9c9d6921f629884c1a99a081a37e161b7a))

### Code Refactoring

- **odyssey-react:** define explicit exports and module type ([6a194a5](https://github.com/okta/odyssey/commit/6a194a5fa035b8526b163735626d28e09c5df4ae))
- **odyssey-react:** remove lineheight props from Heading ([d0538d0](https://github.com/okta/odyssey/commit/d0538d0d8b8d21b16d4244241e64c0af5875f87d))
- **odyssey-react:** update Text props to reflect new line-heights ([f0ef803](https://github.com/okta/odyssey/commit/f0ef803f4e6415c1f23d9e3254e32f99fa482bf3))
- **odyssey-react:** utilizes new type tokens ([3650b7c](https://github.com/okta/odyssey/commit/3650b7c0df01dc0d66416193a31d9889888e0cd6))

### [0.9.3](https://github.com/okta/odyssey/compare/v0.9.2...v0.9.3) (2022-02-24)

**Note:** Version bump only for package @okta/odyssey-react-theme

### [0.9.2](https://github.com/okta/odyssey/compare/v0.9.1...v0.9.2) (2022-02-17)

### Features

- **odyssey-react:** add resize prop to TextArea ([9e71ba0](https://github.com/okta/odyssey/commit/9e71ba0f42ad6bc43f886cccf4bead45e6ae1fd0))

### [0.9.1](https://github.com/okta/odyssey/compare/v0.9.0...v0.9.1) (2022-02-10)

### Bug Fixes

- **odyssey-react:** add relatively positioned containers to Checkbox and Radio ([1e48b51](https://github.com/okta/odyssey/commit/1e48b5180ce1ebfaadf2e72af4066881adf0ce70))
- **odyssey-react:** allow Infobox to have content without extra space for heading ([93a67dd](https://github.com/okta/odyssey/commit/93a67ddbcfe0fde395f137fa67d318dbda51ce92))

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
- **odyssey-react:** heading withTheme ([d8cbae5](https://github.com/okta/odyssey/commit/d8cbae50a3d1f82ee998ab072a0916272b9fa4ad))
- **odyssey-react:** initial theme setup for TextInput ([1e0ac34](https://github.com/okta/odyssey/commit/1e0ac3441f38f9eaf724ea7cdb3e8f6340ba7b3c))
- **odyssey-react:** merge 'develop' to resolve conflict ([c63849e](https://github.com/okta/odyssey/commit/c63849e3a0e49e160c1cf414c62fb637790a616c))
- **odyssey-react:** merge 'develop' to resolve conflicts ([3a21d99](https://github.com/okta/odyssey/commit/3a21d99765c1421fc509f514ee0cc23caa97e3e2))
- **odyssey-react:** merge branch 'develop' into ab/box to resolve conflicts ([b3fc8ec](https://github.com/okta/odyssey/commit/b3fc8ecb52a8aa74292aa2b19cd5cba1e240d9e5))
- **odyssey-react:** merge changes from 'develop' to resolve conflict ([2544eca](https://github.com/okta/odyssey/commit/2544eca8456f18ee92387e0b7db9906187ca5595))
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
- **odyssey-react:** update Button with Text to overcome regressions ([235863b](https://github.com/okta/odyssey/commit/235863b3dcfc5111fdda147e5cb3070bad3f830e))
- **odyssey-react:** update indicator size in TextInput ([254398d](https://github.com/okta/odyssey/commit/254398d53255a6db26ce985247ace77de494bcea))
- **odyssey-react:** update max width variable ([f4d039b](https://github.com/okta/odyssey/commit/f4d039bc0c66ae69ef2ea7fda65061f6ad16162f))
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
- support async select options ([0bc1986](https://github.com/okta/odyssey/commit/0bc1986e01d6f843cd589c56d4cdda27b629750f))

### Bug Fixes

- controlled select case by using to ref.current ([b61b2bd](https://github.com/okta/odyssey/commit/b61b2bd0c448a3b01fc85a7c6233a9b69a4409a4))
- lint ([617b736](https://github.com/okta/odyssey/commit/617b736038b508b8747c78099cca2b7202cc0846))
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
- remove added dep / prop ([a349727](https://github.com/okta/odyssey/commit/a3497270d0369fa3bd0b1d8571fef698d28c27c4))
- type issue need cast to force union start type when using callback ([2f8f482](https://github.com/okta/odyssey/commit/2f8f482bb42737dca5f32e97384fe2c83f6f7cbb))
- updates per review feedback ([10cf21e](https://github.com/okta/odyssey/commit/10cf21ef22c13e3affb1cec57ba3bb8e8b218256))

### Code Refactoring

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

### [0.8.4](https://github.com/okta/odyssey/compare/v0.8.3...v0.8.4) (2021-11-18)

### Features

- expose hidden choices reference ([a64597a](https://github.com/okta/odyssey/commit/a64597a57f41bbbb1053d9e1a7254148d9318875))
- support async select options ([0bc1986](https://github.com/okta/odyssey/commit/0bc1986e01d6f843cd589c56d4cdda27b629750f))

## [0.8.3](https://github.com/okta/odyssey/compare/v0.8.2...v0.8.3) (2021-11-10)

**Note:** Version bump only for package @okta/odyssey-react

# [0.8.2](https://github.com/okta/odyssey/compare/v0.8.1...v0.8.2) (2021-11-04)

### Features

- **odyssey-react:** add Text component ([afea2917](https://github.com/okta/odyssey/commit/afea29175d75da3afbe078b1e001b1a20df5aed4))
- **odyssey-react:** add Box component ([507c7d62](https://github.com/okta/odyssey/commit/507c7d6207195e95087a62c746f23b4af8c8d85e))

# [0.8.1](https://github.com/okta/odyssey/compare/v0.8.0...v0.8.1) (2021-10-29)

# [0.8.0](https://github.com/okta/odyssey/compare/@okta/odyssey_0.7.0...v0.8.0) (2021-10-28)

### Bug Fixes

- **odyssey-react:** add missing comma ([177ad7a](https://github.com/okta/odyssey/commit/177ad7a74b9e4102a34dddbf678244612271946e))
- **odyssey-react:** add missing id ([e061262](https://github.com/okta/odyssey/commit/e061262f578f7f680e8ac7ce66b234707286084d))
- **odyssey-react:** allow cx to handle preceding falsy values ([9fbb664](https://github.com/okta/odyssey/commit/9fbb6646924792ff0cbea13858dc3b317d9b5035))
- **odyssey-react:** allow eyes-storybook to fail and exit non zero ([d59d390](https://github.com/okta/odyssey/commit/d59d390469b3741bf13fc5886a6550c33adc959f))
- **odyssey-react:** allow postcss config to be used outside transformStyles context ([451febd](https://github.com/okta/odyssey/commit/451febd2a0026eb8d549442ccd54d50b02ba91c6))
- **odyssey-react:** browser support for indeterminate checkbox state ([6d9a166](https://github.com/okta/odyssey/commit/6d9a166fb654007e18a56768ab201d5e5bc1a002))
- **odyssey-react:** constrain FieldGroup width ([#1135](https://github.com/okta/odyssey/issues/1135)) ([d1334ca](https://github.com/okta/odyssey/commit/d1334ca8c998e15589e7e033c16a2f90bcb166e2))
- **odyssey-react:** displayName for withStyles HOC ([cd14966](https://github.com/okta/odyssey/commit/cd14966a225e1d9b5b4af0978595c0dc8f9a7f7c))
- **odyssey-react:** english leak for Select ([c315342](https://github.com/okta/odyssey/commit/c315342e7d776775673a6b85afcf2865ca177a85))
- **odyssey-react:** english leak for Toast ([18fe14e](https://github.com/okta/odyssey/commit/18fe14eebdb2797fd2e86f71e9d1ab6e6de924c2))
- **odyssey-react:** fix failing test ([d6eb04c](https://github.com/okta/odyssey/commit/d6eb04cf55892257537f25433d2a14cf954b4c2c))
- **odyssey-react:** fix Link display issues ([#1045](https://github.com/okta/odyssey/issues/1045)) ([082d862](https://github.com/okta/odyssey/commit/082d862e35ca3ca41aa051b81348722312c54416))
- **odyssey-react:** fix TextArea storybook side nav layout ([56a8451](https://github.com/okta/odyssey/commit/56a84515cff953b13698ffc8fa9c92597e7d5e24))
- **odyssey-react:** merge branch 'develop' into ab/table-sass-module to resolve conflicts ([b650fe5](https://github.com/okta/odyssey/commit/b650fe53afe3f91f54686a80f47200af1e2c2a2d))
- **odyssey-react:** move react to peer dependencies ([a0f876b](https://github.com/okta/odyssey/commit/a0f876b8cc174fcc07a8995b15d00c0fd93a07a6))
- **odyssey-react:** post merge linting errors ([d0e3f0b](https://github.com/okta/odyssey/commit/d0e3f0b575d65ed10d180190fce084e8e476ae42))
- **odyssey-react:** production postcssrc config ([07bec04](https://github.com/okta/odyssey/commit/07bec0497cc095c3211af1709f38403fc76c2ef8))
- **odyssey-react:** prop types for Title ([c1c07df](https://github.com/okta/odyssey/commit/c1c07df7d7aed60ba96ed353b99f3bf1e5932213))
- **odyssey-react:** remove unnecessary build storybook script ([3ce7bb9](https://github.com/okta/odyssey/commit/3ce7bb9dc03e12af688469f375bdd048768486af))
- **odyssey-react:** resolve react-hook violations ([0a0fa4f](https://github.com/okta/odyssey/commit/0a0fa4f81fa7dd8b24bb98e231eae4c20ff71d1f))
- **odyssey-react:** resolve upstream conflict ([073fcbf](https://github.com/okta/odyssey/commit/073fcbf90b1c52fcf53bc6d958c3886e6f21e231))
- **odyssey-react:** static storybook build ([f07add5](https://github.com/okta/odyssey/commit/f07add5c66bc46679ce9b92bf94aba85d9885fc1))
- **odyssey-react:** swap children to ReactText type ([ef0a24c](https://github.com/okta/odyssey/commit/ef0a24cb7bb2147d2d3d36cbe2751039195df360))
- **odyssey-react:** switch ternary for status label ([0f0d7bb](https://github.com/okta/odyssey/commit/0f0d7bbb70fdfc66c2bc321e0c02daa983fe1c63))
- **odyssey-react:** ts docgen for Checkbox ([7fa03ff](https://github.com/okta/odyssey/commit/7fa03ff29c2f2a7f1846e94c7cb62c27b63cfdea))
- **odyssey-react:** ts docgen for Infobox ([11bde84](https://github.com/okta/odyssey/commit/11bde848ee00bec4486510fcb820f914c087ff50))
- **odyssey-react:** ts docgen for Link ([227bd10](https://github.com/okta/odyssey/commit/227bd1072633356d9bdd7c4bbe690b525317ec43))
- **odyssey-react:** ts docgen for List ([fb67c39](https://github.com/okta/odyssey/commit/fb67c39653aaa57c229aa3d0c50b547e61342e2c))
- **odyssey-react:** update Tabe story with title prop and removal of Table.Container ([e29a466](https://github.com/okta/odyssey/commit/e29a466a0aa094224c892aa5daaa6274d3e9b53e))
- **odyssey-react:** updated broken test for table sort indicator ([#1066](https://github.com/okta/odyssey/issues/1066)) ([bf3fe59](https://github.com/okta/odyssey/commit/bf3fe596266e7572c1ab988b44a321f67e6bc978))
- **odyssey-react:** updated svgr script to take output from congif ([866db7c](https://github.com/okta/odyssey/commit/866db7cf79e9d64b0fd4aeb4cd5433970100cef6))
- **odyssey-react:** use closure for icon obj ([6bfc783](https://github.com/okta/odyssey/commit/6bfc7834dd3dd4ff9816321a00ef54be8c682c43))
- **odyssey-storybook:** prevent main babel config load ([161785d](https://github.com/okta/odyssey/commit/161785d548e3362bf25f329d9a0ea352964935df))

### Features

- add withStyles to RadioButton ([4b872b2](https://github.com/okta/odyssey/commit/4b872b20123d74128563a3c07ec238ddf8507014))
- compress and add fingerprint to deprecated css ([15a51a5](https://github.com/okta/odyssey/commit/15a51a5c8abe0925f1d5d13591eaef55cf923264))
- extract stories into odyssey-storybook ([57e0c95](https://github.com/okta/odyssey/commit/57e0c95dc96c53ff0daa00d85e242e64f1e84d8e))
- improve css module safety with new lint config ([8f9215d](https://github.com/okta/odyssey/commit/8f9215d70c0ea68ec8463d9116802c08e0411179))
- lint to support ComponentPropsWithoutRef pattern ([5b28647](https://github.com/okta/odyssey/commit/5b28647d5828d71bc6906440c68837eaa2417cf3))
- add eslint package ([5192fe0](https://github.com/okta/odyssey/commit/5192fe022b6e03cb9701a6cae123f9c79fbb2771))
- add eslint-plugin-import config ([5147530](https://github.com/okta/odyssey/commit/5147530a64880209bb9e08d484a549a523832821))
- **odyssey-babel:** transformScssModules plugin ([976a1da](https://github.com/okta/odyssey/commit/976a1da3309c3259de96e0b7dfaece8de0573154))
- **odyssey-react:** add arrow and caret ui indicators ([bb64905](https://github.com/okta/odyssey/commit/bb64905f4c01f74580c9a0f5c9c526748ff74dd8))
- **odyssey-react:** add banner component ([#1002](https://github.com/okta/odyssey/issues/1002)) ([ea855b2](https://github.com/okta/odyssey/commit/ea855b2990937e9306b3b7f3f5c1c88a4684d332))
- **odyssey-react:** add build script ([39d77ef](https://github.com/okta/odyssey/commit/39d77efa6605328a6312412b21100c3fd2371ed1))
- **odyssey-react:** add Checkbox component ([#988](https://github.com/okta/odyssey/issues/988)) ([b5cc123](https://github.com/okta/odyssey/commit/b5cc1236c291e83ffb316267effa6da5a2fca497))
- **odyssey-react:** add CircularLoadIndicator component ([f2a306a](https://github.com/okta/odyssey/commit/f2a306abf9250852e660fae17f95e0a7bb8e3e92))
- **odyssey-react:** add cx util ([a3a615d](https://github.com/okta/odyssey/commit/a3a615de3ca56de4a7e5d05032439b4f24ee2b45))
- **odyssey-react:** add documenting \_Icon class and update storybook ([6d7470b](https://github.com/okta/odyssey/commit/6d7470b7b6ce7a67ad467191759673b59e59a39d))
- **odyssey-react:** add FieldLabel component ([354e2d4](https://github.com/okta/odyssey/commit/354e2d4d51b97bf93557e6e2bddc02282c7e1a20))
- **odyssey-react:** add Icon to external Link ([a6b068c](https://github.com/okta/odyssey/commit/a6b068c97b56ad9cae9f886d72b8d5dc95d5a403))
- **odyssey-react:** add Icon unit tests ([9b47442](https://github.com/okta/odyssey/commit/9b474427d0813771f05a794f7688ffc3b495d5e9))
- **odyssey-react:** add icons ([1fc0321](https://github.com/okta/odyssey/commit/1fc0321e757baa1b1405e99be56a8fe2366e3f54))
- **odyssey-react:** add infobox component ([#1000](https://github.com/okta/odyssey/issues/1000)) ([5e8cd59](https://github.com/okta/odyssey/commit/5e8cd59ac35a5e207afad46ab3415b82abd16e57))
- **odyssey-react:** add List component ([077ca14](https://github.com/okta/odyssey/commit/077ca14ede0c2b1983ead0696dce77cda69bd03e))
- **odyssey-react:** add List component with styles and sub-components ([db681ec](https://github.com/okta/odyssey/commit/db681ecbc34d1e0fe875d59547ed9ee019a987a4))
- **odyssey-react:** add omit and useOmit hook ([21f5841](https://github.com/okta/odyssey/commit/21f5841d9e2013c9fd5ba4b1387db0bc5c51f63d))
- **odyssey-react:** add optional label to TextArea ([ec3fc36](https://github.com/okta/odyssey/commit/ec3fc3616c54e0dd4a4e20eeb18cbd7c40f31cab))
- **odyssey-react:** add Radio sass modules ([02a2768](https://github.com/okta/odyssey/commit/02a2768e749655ccaa1c641572089617e894fcd6))
- **odyssey-react:** add RadioButton component ([#986](https://github.com/okta/odyssey/issues/986)) ([ee2857a](https://github.com/okta/odyssey/commit/ee2857a6de0f8b6c1f7ffd1c8ae5eb7ec6b10406))
- **odyssey-react:** add sass module for Title ([85e0f14](https://github.com/okta/odyssey/commit/85e0f14aeb269ee53a306630b30f33487a2866b0))
- **odyssey-react:** add Select component ([e109a4c](https://github.com/okta/odyssey/commit/e109a4c1515539c5856b21be794b52ec1c24b618))
- **odyssey-react:** add select scss module ([70b5d36](https://github.com/okta/odyssey/commit/70b5d36b49750405f48ff1051b0dd97adab3339f))
- **odyssey-react:** add status scss ([4917d7f](https://github.com/okta/odyssey/commit/4917d7f355176c129bef99a727fd7408045803c0))
- **odyssey-react:** add storybook a11y ([89123a8](https://github.com/okta/odyssey/commit/89123a837323442bbf1b81b10c72e7d2072e767c))
- **odyssey-react:** add Table prototype component OKTA-399765 ([524e14c](https://github.com/okta/odyssey/commit/524e14c45d9871a759501813f231d2f5e154a436))
- **odyssey-react:** add Table sass module ([0832b7e](https://github.com/okta/odyssey/commit/0832b7ec7ce63fa2f0685a528a226aa0a425c2a9))
- **odyssey-react:** add Tag component ([71bbdc0](https://github.com/okta/odyssey/commit/71bbdc0a6fdfdd06ba7fa56576d3b729187c08df))
- **odyssey-react:** add TextArea component ([9c5f467](https://github.com/okta/odyssey/commit/9c5f4672ffe506a8d755fef5bd182a71800bdff3))
- **odyssey-react:** add TextInput component ([439135f](https://github.com/okta/odyssey/commit/439135f272f9d25b169faf218c64e62b7d312e1f))
- **odyssey-react:** add Title component ([#991](https://github.com/okta/odyssey/issues/991)) ([74b89df](https://github.com/okta/odyssey/commit/74b89dfc6fe6807d208bf61c46c7e9a21c031cb1))
- **odyssey-react:** add Tooltip component ([6e8ec9c](https://github.com/okta/odyssey/commit/6e8ec9c4b61ce1dd59b342d6b2fee11a70101103))
- **odyssey-react:** add ui indicators to icons ([3584dcf](https://github.com/okta/odyssey/commit/3584dcf04b1f38909bc5cbcfc7c53560fd8cf00d))
- **odyssey-react:** add useOid hook ([84b983e](https://github.com/okta/odyssey/commit/84b983ea203eb3f62ca248ca79dc2b05afb127ef))
- **odyssey-react:** add utils dir and oid ([b4fd186](https://github.com/okta/odyssey/commit/b4fd18623f0d0d350891eecd1c7ab5e412673784))
- **odyssey-react:** add withStyles HOC util ([de1e78d](https://github.com/okta/odyssey/commit/de1e78d868c68144f25f9951048820ab049bc862))
- **odyssey-react:** add withStyles to Status ([6824f77](https://github.com/okta/odyssey/commit/6824f77c3600c4429da747cfaf4a6713e31c5a9a))
- **odyssey-react:** add withStyles to Tab, refactor implementaion to align with other components ([7998346](https://github.com/okta/odyssey/commit/79983461901c4c2677242e9285943cbf448ab38d))
- **odyssey-react:** add withStyles to Table and related components ([416e526](https://github.com/okta/odyssey/commit/416e5262e7c828d9844b99a669a0fcb96518c294))
- **odyssey-react:** add witStyles to Icon ([8dbf34c](https://github.com/okta/odyssey/commit/8dbf34c44f6ac59b95a614af88220f3c7d5a9daa))
- **odyssey-react:** adds em/strong as available tags ([#1064](https://github.com/okta/odyssey/issues/1064)) ([0f3dc2a](https://github.com/okta/odyssey/commit/0f3dc2a5c6fc9f53501f7ecdc596c7c36f0ed6cf))
- **odyssey-react:** adds link component ([#989](https://github.com/okta/odyssey/issues/989)) ([600e0c0](https://github.com/okta/odyssey/commit/600e0c050283df10ef0087e7a26e94b7d11c1694))
- **odyssey-react:** adds Modal component ([#998](https://github.com/okta/odyssey/issues/998)) ([fddd231](https://github.com/okta/odyssey/commit/fddd231e5124431fecf96bec0d985106a7a224b9))
- **odyssey-react:** Adds odyssey-react package with typescript, button component, storybook ([#942](https://github.com/okta/odyssey/issues/942)) ([3ad23cf](https://github.com/okta/odyssey/commit/3ad23cfa6dc953c5ef750e5782f8c29142ff6f66))
- **odyssey-react:** adds Status component ([f5a87f6](https://github.com/okta/odyssey/commit/f5a87f6f43e96b0fbf4f327971fe8f4bef4d1f75))
- **odyssey-react:** adds tab component ([#1006](https://github.com/okta/odyssey/issues/1006)) ([01c4288](https://github.com/okta/odyssey/commit/01c42888c8e84c2c306dd7ee5b520008398eaf42))
- **odyssey-react:** allow storybook to consume scss module ([170e721](https://github.com/okta/odyssey/commit/170e7218dd28c5b2dc3705cc318fe8970a0acee3))
- **odyssey-react:** build source watch mode ([857dd31](https://github.com/okta/odyssey/commit/857dd31e50ad9c4f48741c7c9e3313fe098c56e1))
- **odyssey-react:** build sourcemaps ([925a27e](https://github.com/okta/odyssey/commit/925a27e21bb10e6d5f1e8a4ee1a800d22636ee50))
- **odyssey-react:** clean up Table and sub component className generation ([2098c04](https://github.com/okta/odyssey/commit/2098c04797bb7df44a7cb360ae5947bbcf3774d3))
- **odyssey-react:** closeMessage API for Modal ([bfeb9c0](https://github.com/okta/odyssey/commit/bfeb9c03cbdc287e573faea2b635eb85d34dae26))
- **odyssey-react:** enable identityObjectProxy for test ([a907b00](https://github.com/okta/odyssey/commit/a907b0064ab2608c206558c03bcf935916c0f171))
- **odyssey-react:** export ScreenReaderText props type ([e30f8c1](https://github.com/okta/odyssey/commit/e30f8c187cd35b9140b6372d78cbef416410bff3))
- **odyssey-react:** fix Banner props TS docgen ([1a53251](https://github.com/okta/odyssey/commit/1a53251102003b98e1ed29fa692da06fea38d2ec))
- **odyssey-react:** fix Button props TS docgen ([ff9411e](https://github.com/okta/odyssey/commit/ff9411ecd8ed861337dc90e979c9b51581f06d9f))
- **odyssey-react:** improve Icon types ([08c9e1b](https://github.com/okta/odyssey/commit/08c9e1b7b0bc1f38be93530198ea5626071cbebe))
- **odyssey-react:** improve Infobox types ([645114e](https://github.com/okta/odyssey/commit/645114e61b398f4130ba00d963024fa4dad59960))
- **odyssey-react:** improve Title type annotations ([58bf9c9](https://github.com/okta/odyssey/commit/58bf9c9994df0d8c1041c59dcbfb5faec3f5a4b2))
- **odyssey-react:** improve withStyles types ([f69a80d](https://github.com/okta/odyssey/commit/f69a80df607ab1c73c4ba457b8db95ad67ccdba2))
- **odyssey-react:** include deprecated global css as part of publish ([840df3e](https://github.com/okta/odyssey/commit/840df3ebe0125bfea847232ed4f0a2c92f9c2e3b))
- **odyssey-react:** keyframe pattern rule ([f4ea7f1](https://github.com/okta/odyssey/commit/f4ea7f134989b2ec8677289946e54d3c49fd2a2b))
- **odyssey-react:** list uses forward ref, added tests ([62a2091](https://github.com/okta/odyssey/commit/62a2091ede210d0c4821e8e72961e5ad5f3d67c1))
- **odyssey-react:** make Tabs keyboard navigatable ([#1059](https://github.com/okta/odyssey/issues/1059)) ([8cde2ab](https://github.com/okta/odyssey/commit/8cde2ab6807d4de80814062b1a38c74443603361))
- **odyssey-react:** remove indicators from css and add in as jsx elements ([95651e2](https://github.com/okta/odyssey/commit/95651e24ba108211a56118354ebdfc343bba65df))
- **odyssey-react:** replace icon placeholders with Icon components ([d612681](https://github.com/okta/odyssey/commit/d6126814623d972b343bc523c5e5a5f00c3dd848))
- **odyssey-react:** ssr constructor withStyles ([2f8c7d2](https://github.com/okta/odyssey/commit/2f8c7d29b6a4465f31c0a0814235ce335a6654cf))
- **odyssey-react:** tests for icon prop in Button and Link ([df57ed3](https://github.com/okta/odyssey/commit/df57ed31be686bd8d1542b70b01d426e91d2b31a))
- **odyssey-react:** update Banner to use scss module ([#1023](https://github.com/okta/odyssey/issues/1023)) ([62ac865](https://github.com/okta/odyssey/commit/62ac8653fa76cdcbccbfbcda0e607f607da7750d))
- **odyssey-react:** update Checkbox to use scss module ([d7ac8fd](https://github.com/okta/odyssey/commit/d7ac8fd42243fc626b45ad916b5a175c3dd3c3d6))
- **odyssey-react:** update Infobox to use scss module ([#1017](https://github.com/okta/odyssey/issues/1017)) ([85c9f44](https://github.com/okta/odyssey/commit/85c9f4415820b969a1a043e7b1a3f5ef9e2b7a23))
- **odyssey-react:** update Link to use scss module ([#1019](https://github.com/okta/odyssey/issues/1019)) ([7b3f089](https://github.com/okta/odyssey/commit/7b3f08936ab0a905c1df3bdcfa3a680179a8f116))
- **odyssey-react:** update Modal to use scss module ([#1027](https://github.com/okta/odyssey/issues/1027)) ([6c30bc2](https://github.com/okta/odyssey/commit/6c30bc26e8027fb0c772442b9f5cc0e02777f0dc))
- **odyssey-react:** update prop types ([6a8fbd2](https://github.com/okta/odyssey/commit/6a8fbd2fb9cc24236f0f406daf94abe871732df7))
- **odyssey-react:** update Tabs to use scss module ([#1025](https://github.com/okta/odyssey/issues/1025)) ([50b6a7f](https://github.com/okta/odyssey/commit/50b6a7f0234ddc8b1185f853187115567ad19bb7))
- **odyssey-react:** update Tag to use scss module ([d2e8877](https://github.com/okta/odyssey/commit/d2e8877ec3ae0a7b6b6134197a1762686d8b8d6e))
- **odyssey-react:** update TextArea to use scss module ([8cb4d6c](https://github.com/okta/odyssey/commit/8cb4d6cc5c77d06a79d0d7e0a36de4e97a6ee955))
- **odyssey-react:** update TextInput to use scss module ([953d5df](https://github.com/okta/odyssey/commit/953d5df6e62d3bfa02b169abc32e0d5b9cb95303))
- **odyssey-react:** update withStyles to support statics ([aa4b1a1](https://github.com/okta/odyssey/commit/aa4b1a1ac6a828952b3b50e609235de7f689b646))
- **odyssey-react:** use ComponentProps type for Title ([9a35034](https://github.com/okta/odyssey/commit/9a35034280cb1be3b9feff2135bc67f84152cfc9))
- **odyssey-react:** use ComponentProps type Tooltip ([3abd06e](https://github.com/okta/odyssey/commit/3abd06e325d349a530fcf22b82113395c05d6df7))
- **odyssey-react:** use rest and omit props for Button ([5345e0f](https://github.com/okta/odyssey/commit/5345e0f903cf7f821e973f9830922fb7f3a1ead8))
- **odyssey-react:** withStyles for Checkbox ([28da878](https://github.com/okta/odyssey/commit/28da8780723a47757242190ddac0cdc9ffb1b472))
- **odyssey-react:** withStyles Link ([2a3559d](https://github.com/okta/odyssey/commit/2a3559d445f6835959447c4aeb14c681bd31c9dc))
- **odyssey-react:** withStyles List ([a433440](https://github.com/okta/odyssey/commit/a433440ca1586eaf4d24526fb170c9924ce57356))
- **odyssey-react:** withStyles Modal ([f456c50](https://github.com/okta/odyssey/commit/f456c50d938dd5950e8520e44037976e417c8e4b))
- **odyssey-react:** withStyles ScreenReaderText ([70f45f7](https://github.com/okta/odyssey/commit/70f45f7075607e325f21f9025a1b7386337f2ffb))
- **odyssey-react:** withStyles Tag ([2b7ce09](https://github.com/okta/odyssey/commit/2b7ce097068fc297002fc6eeac258e886d9c3038))
- **odyssey-react:** withStyles Title ([82b660f](https://github.com/okta/odyssey/commit/82b660fd610415ffdf4b8cfd7afb5d5529dd2454))
- **odyssey-react:** withStyles Toast ([d008c08](https://github.com/okta/odyssey/commit/d008c08d53b035f45f0cd1357ee132edafa71a08))
- **odyssey-react:** withStyles Tooltip ([fddb2fa](https://github.com/okta/odyssey/commit/fddb2fa34a6c6d845be6b3a954b0635f1c4568be))
- **odyssey-storybook:** add odyssey-storybook private package ([0b347ee](https://github.com/okta/odyssey/commit/0b347eeee32eac6b2a5daaa2ee87fff9ff2adda4))
- **odyssey-transform-styles-postcss-preset:** add postcss-logical ([67ef17c](https://github.com/okta/odyssey/commit/67ef17c5292e1784a7d93c2190f8774808334446))
- **odyssey-typescript:** type declaration tsconfig ([9692749](https://github.com/okta/odyssey/commit/9692749505dc4cf8b9dc3cf2b7f5b6dd3c45f8a9))
- refactor babel packages ([0d04d5b](https://github.com/okta/odyssey/commit/0d04d5b1b46a01f1cf11a6e807069469c684ece2))
- run types and source compile in parallel ([76b950b](https://github.com/okta/odyssey/commit/76b950bd93e5e6b1a2916676d6023fa976dae2a6))
- transpile deprecated css ([158ae78](https://github.com/okta/odyssey/commit/158ae78695b99b05b82bf959fc33b544e02e474e))

### Reverts

- Revert "chore(odyssey-react): remove global css reset styles in favor of story decorator (#1056)" (#1067) ([e908884](https://github.com/okta/odyssey/commit/e90888482da6a52af94e2a0d24bbb1a0d228b0d6)), closes [#1056](https://github.com/okta/odyssey/issues/1056) [#1067](https://github.com/okta/odyssey/issues/1067)

### BREAKING CHANGES

- **odyssey-react:** requires updating children ([ef0a24c](https://github.com/okta/odyssey/commit/ef0a24cb7bb2147d2d3d36cbe2751039195df360))
