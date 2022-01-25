# Odyssey Design System

Build and design consistent, efficient, and accessible UIs for all Okta users.

## Packages

| Package/README                                                                                                      | Description                                                      |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [@okta/odyssey-design-tokens](https://github.com/okta/odyssey/tree/master/packages/odyssey-design-tokens/README.md) | Low level token values needed to construct and maintain Odyssey. |
| [@okta/odyssey-react-theme](https://github.com/okta/odyssey/tree/master/packages/odyssey-react-themep/README.md)    | Theming layer for odyssey-react.                                 |
| [@okta/odyssey-react](https://github.com/okta/odyssey/tree/master/packages/odyssey-react/README.md)                 | Odyssey components for [React](https://reactjs.org/).            |

### Making a commit

Odyssey uses the [conventional commits](https://www.conventionalcommits.org)
standard for formating commit messages. After you commit work locally with
`git` your commit message wil be linted to ensure it adheres to the
configuration setup within the `@okta/odyssey-commitlint` package.
In case of emergencies, break the glass and use an invalid commit message
by providing the `--no-verify` flag to `git commit`.

## Browser Support

Odyssey browser support mirrors Okta's [Supported platforms, browsers, and operating systems](https://help.okta.com/en/prod/Content/Topics/Miscellaneous/Platforms_Browser_OS_Support.htm) with the exception of IE 11, which will be released at a later time.

## Feature Requests, Bugs & Feedback

### Oktanauts

- Reach out to us directly in the [#odyssey](https://okta.slack.com/archives/C7T2H3KNJ) Slack channel.
- Open a JIRA issue [via this GitHub link](https://github.com/okta/odyssey/issues/new/choose).

## License

[Apache Version 2.0](https://github.com/okta/odyssey/blob/master/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this
library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
