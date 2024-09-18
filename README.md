# Odyssey Design System

Build and design consistent, efficient, and accessible UIs for all Okta users.

## Packages

| Package/README                                                                                                                | Description          |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| [@okta/odyssey-design-tokens](https://github.com/okta/odyssey/blob/main/packages/odyssey-design-tokens/README.md)             | Design tokens        |
| [@okta/browserslist-config-odyssey](https://github.com/okta/odyssey/blob/main/packages/browserslist-config-odyssey/README.md) | Browserslist config  |
| [@okta/odyssey-babel-preset](https://github.com/okta/odyssey/blob/main/packages/odyssey-babel-preset/README.md)               | Babel preset         |
| [@okta/odyssey-react-mui](https://github.com/okta/odyssey/blob/main/packages/odyssey-react-mui/README.md)                     | React MUI components |

## Browser Support

Odyssey browser support mirrors Okta's [Supported platforms, browsers, and operating systems](https://help.okta.com/en/prod/Content/Topics/Miscellaneous/Platforms_Browser_OS_Support.htm) with the exception of IE 11.

## Generating Okta Test Language files

For`*_ok_PL.properties` and `*_ok_SK.properties` you will need to download `@okta/tools.i18n.pseudo-loc` in the respective package directory (This will require access to our internal VPN).

Once that is downloaded you can run

```
yarn pseudo-loc generate --packageName ${absolutePathToPackage} --resourcePath ${pathToEnglishPropertiesFile} --bundle ${bundleName}
```

### Example:

```
(from odyssey root)
cd packages/odyssey-react-mui
yarn add @okta/tools.i18n.pseudo-loc
yarn pseudo-loc generate --packageName ${OKTA_HOME}/odyssey/packages/odyssey-react-mui --resourcePath src/properties --bundle odyssey-react-mui
```

Note:

- `${OKTA_HOME}` should contain an absolute path
- You may need to specify the `npmRegistryServer` property explicitly in `.yarnrc.yml` with the internal yarn registry URL

## Questions & Contributing

Please follow our [Getting Started guide](https://odyssey-storybook.okta.design/?path=/docs/contributing-getting-started--docs).

## Running Odyssey locally

Follow these steps for local [Odyssey development](https://odyssey-storybook.okta.design/?path=/docs/contributing-odyssey-development--docs)

## License

[Apache Version 2.0](https://github.com/okta/odyssey/blob/main/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
