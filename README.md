[![Go to GitHub Build](https://img.shields.io/github/workflow/status/okta/odyssey/preview)](https://img.shields.io/github/workflow/status/okta/odyssey/preview)
![Odyssey uses Lerna](https://img.shields.io/github/lerna-json/v/okta/odyssey)
![Odyssey supports WCAG 2.1 AA standards](https://img.shields.io/badge/wcag-2.1%20AA-informational)
![Odyssey is covered under the Apache Version 2.0 license](https://img.shields.io/badge/license-Apache%202.0-informational)

# Odyssey Design System

This repository contains the code for Okta's Design System Odyssey. It includes Icons and React Components used to build products and experiences at Okta.

## Packages

| Package/README                                                                                      | Description                                           |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [@okta/odyssey-icons](https://github.com/okta/odyssey/tree/master/packages/odyssey-icons/README.md) | Odyssey SVG icons.                                    |
| [@okta/odyssey-react](https://github.com/okta/odyssey/tree/master/packages/odyssey-react/README.md) | Odyssey components for [React](https://reactjs.org/). |

### Making a commit

Odyssey uses the [conventional commits](https://www.conventionalcommits.org)
standard for formating commit messages. After you commit work locally with
`git` your commit message wil be linted to ensure it adheres to the
configuration setup within the `@okta/odyssey-commitlint` package.
In case of emergencies, break the glass and use an invalid commit message
by providing the `--no-verify` flag to `git commit`.

## Browser Support

Odyssey browser support mirrors Okta's [Supported platforms, browsers, and operating systems](https://help.okta.com/en/prod/Content/Topics/Miscellaneous/Platforms_Browser_OS_Support.htm) and is as follows:

| Browser              | Support Policy                                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Internet Explorer 11 | Supported for the desktop mode of Windows 8. Metro Mode is not supported.                                               |
| Edge                 | Latest public version supported.                                                                                        |
| Chrome               | Latest public version supported.                                                                                        |
| Safari               | Latest public version supported.                                                                                        |
| Firefox              | Latest public version for Rapid Release supported. <br /> Latest public version for Extended Support Release supported. |

## Licenses

All source code, imagery, and icons fall under the [Apache Version 2.0 License](https://github.com/okta/odyssey/blob/master/LICENSE).

## Feature Requests, Bugs & Feedback

### Oktanauts

- Log an issue in in JIRA, use the `OKTA` project, and be sure to apply the `Team: UICore Odyssey` component and the apropriate issue type.
- Reach out to us directly in the [#odyssey](https://okta.slack.com/archives/C7T2H3KNJ) Slack channel.
- All other users please open a [GitHub issue](https://github.com/okta/odyssey/issues/new/choose).

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
