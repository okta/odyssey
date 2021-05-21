[![Go to GitHub Build](https://img.shields.io/github/workflow/status/okta/odyssey/preview)](https://img.shields.io/github/workflow/status/okta/odyssey/preview)
![Odyssey uses Lerna](https://img.shields.io/github/lerna-json/v/okta/odyssey)
![Odyssey supports WCAG 2.0 AA standards](https://img.shields.io/badge/wcag-2.0%20AA-informational)
![Odyssey is covered under the Apache Version 2.0 license](https://img.shields.io/badge/license-Apache%202.0-informational)

# Odyssey Design System

This repository contains the code for Okta's Design System Odyssey. It includes Icons, SCSS, and React Components used to build products and experiences at Okta.

## Packages

| Package/README                                                                                      | Description                                                        |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [@okta/odyssey-icons](https://github.com/okta/odyssey/tree/master/packages/odyssey-icons/README.md) | Odyssey SVG icons.                                                 |
| [@okta/odyssey-react](https://github.com/okta/odyssey/tree/master/packages/odyssey-react/README.md) | Odyssey components for [React](https://reactjs.org/).              |
| [@okta/odyssey-scss](https://github.com/okta/odyssey/tree/master/packages/odyssey-scss/README.md)   | Odyssey SCSS, includes components, includes base and reset styles. |

## Git Workflow
This project takes care to use standard gitflow workflow with minor exceptions.

### Branches
- `master` contains code for the latest version of Odyssey. The code in here is tagged with a semver and release notes. This is a protected branch.
- `develop` is a working branch which contains the latest working code from different branches. This is a protected branch.
- `feature/${branch-name}` the feature prefix is reserved for new feature work
- `bugfix/${branch-name}` the bugfix prefix is reserved for existing features that have bugfixes

Additionally, `refactor` and `hotfix` branch prefixes may be necessary in certain instances. Use at your discression.

```

           -▸ develop --▸ feature/branch-name --▸ | --▸ commit #1
                 ▲                                | --▸ commit #2
                 |                                | --▸ commit #3
  Squash & Merge |                                | --▸ commit #4
                 |                                ▼
                 ╰--------- Pull Request ---------╯

```
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
