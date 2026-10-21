# @okta/odyssey-react-mui

## Production Readiness

Odyssey is production-ready and available to use for real things. The API is stable for the duration of the point-release, meaning that while Odyssey is in version 1.x.x, there will be no changes that break the API.

This project follows semantic versioning conventions:

- **Major point releases** may include breaking changes, but the API is stable for the duration of the major point release (for example, 1.x.x)
- **Minor point releases** include new features and are backwards-compatible (eg, x.1.x)
- **Patch releases** include bug fixes (eg, x.x.1)

## Getting Started

Install the package and peer dependencies:

```sh
yarn add @okta/odyssey-react-mui
```

Include fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

Import named ESM exports:

```js
import { PasswordInput } from "@okta/odyssey-react-mui";
```

Add the Odyssey `OdysseyProvider` around your whole app:

```jsx
import { OdysseyProvider } from "@okta/odyssey-react-mui";

const YourAppRoot = ({ children }) => (
  <OdysseyProvider>
    <CssBaseline />
    {children}
  </OdysseyProvider>
);
```

Add Material-UI components not exported from Odyssey with Odyssey styling or add your own theme to MUI:

```sh
yarn add @mui/material
```

```jsx
import { OdysseyThemeProvider } from "@okta/odyssey-react-mui";

import { myMaterialUiTheme } from "./myMaterialUiTheme.js";

const YourAppRoot = ({ children }) => (
  <OdysseyThemeProvider theme={myMaterialUiTheme}>
    {children}
  <OdysseyThemeProvider>
);
```

### Upgrade Piecemeal

It’s possible to have 2 versions of Odyssey running at the same time, so when adding MUI, you can do it piecemeal.

This is how you setup two `OdysseyProvider`s like so:

```jsx
import { OdysseyProvider } from "@okta/odyssey-react-mui";
import { ThemeProvider as OdysseyLegacyThemeProvider } from "@okta/odyssey-react-theme";

const YourAppRoot = ({ children }) => (
  <OdysseyProvider>
    <OdysseyLegacyThemeProvider>{children}</OdysseyLegacyThemeProvider>
  </OdysseyProvider>
);
```

### Overrides

It is possible to provide `nonce`, `themeOverride`, `languageCode` and `translationOverrides` to the underlying components via props:

```jsx
import { OdysseyProvider } from "@okta/odyssey-react-mui";
import { theme } from "./themeOverride.js";

const nonce =
  "K6ybeaqlwaAKk0hQF?hE2qZ0Ar3M=G4Bpr-XFk1x4XbL3dH3T5=mk0aXeWX9ifn9";

const languageCode = "en";

const translationOverrides = {
  en: {
    "fieldlabel.optional.text": "Not Required",
  },
  fr: {
    "fieldlabel.optional.text": "Non Requis",
  },
};

const YourAppRoot = ({ children }) => (
  <OdysseyProvider
    nonce={nonce}
    themeOverride={theme}
    languageCode={languageCode}
    translationOverrides={translationOverrides}
  >
    {children}
  </OdysseyProvider>
);
```

### Generating ok-PL and ok-SK files

Right now we do not have the code to generate these files in Odyssey.

If you are an Okta employee, the easiest way to generate these files is to replace the English properties file of another project and run the build commands to get the ok-PL and ok-SK versions. For ok-SK, you will also need to replace the prefix with `odyssey:odyssey-react-mui: `.

If you are not an Okta employee, please file an issue request for assistance.

## Vite Configuration

If your app or library uses Vite, you may need to configure it to prevent duplicate React instances. The right fix depends on your situation:

| Situation                                             | Fix                                             |
| ----------------------------------------------------- | ----------------------------------------------- |
| App using `renderReactInWebComponent` (older Odyssey) | `output.manualChunks` — keep React in one chunk |
| App with duplicate copies pulled in from libraries    | `resolve.dedupe`                                |
| Library or contributions package you publish          | `rollupOptions.external` + `output.globals`     |

For the full guide with code examples and rationale, see the **Configuring Vite** page in Storybook.

## Components

Components are published in an ESM format transpiled for the modern browsers within the [Okta supported browser list][1]. These modules can be served directly to evergreen browsers for simple applications, or further transpiled, bundled, and polyfilled for advanced use cases and browser support targets.

[1]: https://help.okta.com/en/prod/Content/Topics/Miscellaneous/Platforms_Browser_OS_Support.htm

## Message bus

`@okta/odyssey-react-mui/message-bus` sends typed, versioned messages between Odyssey apps and Unified UI Shell when each one bundles its own copy of Odyssey. The apps on a page share only `window`, so messages travel over `window.postMessage` and every received message is checked. Nothing on this subpath imports React or MUI, so an app not built with React can use it.

Odyssey's fullscreen components and Unified UI Shell use it under the hood. Import it directly only to define a channel of your own, or to run the fullscreen host in an app without UI Shell.

### Messages

Every message is a `{ type, payload }` object, the same shape Redux uses. `type` is `"<domain>/<event>"`, such as `"fullscreen/enterRequested"`.

On the wire, each message is wrapped in an envelope:

```json
{
  "channelName": "odyssey-fullscreen",
  "message": {
    "payload": { "fullscreenId": "…" },
    "type": "fullscreen/enterRequested"
  },
  "protocolVersion": 1
}
```

A receiver drops a message when any of these is true:

- It came from another origin.
- It's on another channel.
- It's from another `protocolVersion`.
- Its payload doesn't pass the channel's check.

#### Versions

Apps and UI Shell move to new Odyssey versions on their own schedules, so a page often runs several versions at once. Each channel has a whole-number `protocolVersion`.

| Change | Breaking? | What to do |
| --- | --- | --- |
| Add a message type | No | Nothing. Older receivers ignore types they don't know. |
| Add an optional payload field | No | Nothing. Older receivers ignore fields they don't know. |
| Rename, remove, or change the meaning of a type or field | Yes | Raise `protocolVersion`, and keep sending the old version until every receiver understands the new one. |

Never change a channel's messages in place. Its definition is a contract with code you don't control.

#### Defining a channel

`createMessageChannel` turns one set of payload checks into the TypeScript types, the runtime check, and a typed creator for each message:

```ts
import {
  createBrowserMessageBus,
  createMessageChannel,
} from "@okta/odyssey-react-mui/message-bus";

const toastMessageChannel = createMessageChannel({
  channelName: "my-app-toasts",
  messageDomain: "toast",
  payloadGuards: {
    shown: (payload: unknown): payload is { text: string } =>
      typeof payload === "object" &&
      payload !== null &&
      "text" in payload &&
      typeof payload.text === "string",
  },
  protocolVersion: 1,
});

const toastMessageBus = createBrowserMessageBus({
  messageChannel: toastMessageChannel,
});

toastMessageBus.subscribe((toastMessage) => {
  // toastMessage is { payload: { text: string }; type: "toast/shown" }
});

toastMessageBus.publish(
  toastMessageChannel.messageCreators.shown({ text: "Saved" }),
);
```

Messages arrive asynchronously, and the sender receives its own messages too. A message is copied with the structured clone algorithm, so it can't hold functions, symbols, or DOM elements.

### Fullscreen

The page keeps one **stack** of fullscreen ids. The id on top is the region shown in fullscreen. The ones under it are covered, and each is shown again as the one above it exits.

One **host** owns the stack: `createFullscreenModeHost`. Unified UI Shell runs it, because only one shell renders on a page while any number of apps can. Each app makes a `createFullscreenModeMessageBus`, which only asks the host for changes and reports the stacks the host sends back.

| Message | Sent by | What it does |
| --- | --- | --- |
| `fullscreen/enterRequested` | app | Puts an id on top. An id already in the stack moves to the top. |
| `fullscreen/exitRequested` | app, or the host on Escape | Removes an id, wherever it is. |
| `fullscreen/exitAllRequested` | app | Empties the stack. |
| `fullscreen/stateRequested` | app or host, on start | Asks the host for the current stack. |
| `fullscreen/stateChanged` | host | The whole stack, bottom first. Sent after every change and in reply to `stateRequested`. |

An app that starts late gets the same `stateChanged` snapshot every other app got. It never sees an `entered` replayed, so animations tied to entering can't run twice.

Without a host on the page, requests go unanswered and the stack stays empty. An app that renders without UI Shell has to call `createFullscreenModeHost()` itself, and prefer `renderUiShell` instead: the shell gives it more than fullscreen.

#### Two different questions

| Helper | `true` when | Use it for |
| --- | --- | --- |
| `getIsFullscreen` | **this** id is on top of the stack | what only the visible region does: focus, `inert`, announcements |
| `getIsInFullscreenStack` | this id is **anywhere** in the stack | what lasts until it exits: staying fixed, a pressed button |
| `getHasActiveFullscreen` | **anything** on the page is in fullscreen | page chrome, such as UI Shell hiding its navigation |

#### Escape

The host exits the top id when the user presses Escape, so each press goes back one step.

- A dialog, menu, or popover that handles Escape first wins, and fullscreen stays.
- Two hosts on one page, such as two shells on a Storybook docs page, act on the same press once between them.
- Screen reader users in browse mode don't send Escape to the page, so fullscreen never exits under them by surprise. The fullscreen button is how they leave.

#### Elements that leave the page

`watchElementDisconnection` calls back once an element leaves the document, including from inside a shadow root. `FullscreenRegion` uses it to exit when a host page removes its container without unmounting it, such as a Backbone view's `.remove()`. Without that, UI Shell's navigation would stay hidden with nothing on screen to bring it back.

An element moved in the same task, such as a reorder, isn't treated as leaving.

### Frames

Every bus publishes and listens on the **top** window when it's on the same origin, from `getTopMessageWindow`. An app in a same-origin iframe then reaches UI Shell in the page around it. A bus in an iframe also stops listening when its iframe unloads, so a reloaded iframe never leaves a listener behind on the top window.

Only messages from the page's own origin are delivered. An app in an iframe on another origin can't reach the top window, so it stays on its own window and can't use the shell's fullscreen yet.

## Running odyssey-react-mui for local development

Follow these steps for local [Odyssey development](https://odyssey-storybook.okta.design/?path=/docs/contributing-odyssey-development--docs)

## Downstream Testing

### Remote

Remote downstream tests run the entire bacon suite for a target repo with the latest version of odyssey published from your branch.

The script used for this is the `scripts/downstream-bacon.sh` file, which is used by the `Init * Downstream` bacon suites.
It performs the commits and triggers bacon suites using the `update-ui-packages` script found here: https://github.com/atko-eng/update-ui-packages.
The version to be tested is determined using the `ok-ui artifacts` command, which is implemented here: https://github.com/atko-eng/ui-build-tools/blob/master/packages/clis/ok-ui/src/commands/artifacts.ts

However, these bacon suites will only report a success/failure of whether the downstream tests were initiated, not if they actually succeeded. It's up to the developer merging their changes to ensure that the downstream suites have passed.

Each downstream suite will display custom messages to show:

- A link to the created commit in Bacon
- Information about the artifact/commit being tests

Check these messages and make sure the artifact being tested is the one you expect. And whether the downstream test suites are passing.

### Local

Local changes can be tested in various other okta packages using the `yarn ok-ui downstream` command, which will clone the specified repos, applies the changes from your local version via linking, and then run the build and test commands for the specified packages. Logs for the output of these individual commands can be found under `ok-ui-logs/downstream`.

To enable verbose logging use the `-v` flag.

By default, repos from previous test runs will be reused to speed up yarn install times. If you want to avoid using these cached repos, then use the `--forceGitClone` flag

You can configure which packages to test using the `ok.yaml` config file.

example:

```yaml
downstream:
  # Determines if any packages should be linked in addition to the target package
  additionalWorkspaces:
    - "@okta/odyssey-design-tokens"

  # List of repos to clone
  repos:
    - repoName: "example-react-spa"
      url: "https://github.com/atko-eng/example-react-spa.git"
      # List of packages to test for this repo
      packages:
        - pkgName: "@okta/example-react-spa"
    - repoName: "admin-ui"
      # optionally override the command used to build the packages
      buildCmd: "FORCE_COLOR=true yarn build:all"
      # url to colone from
      url: "https://github.com/atko-eng/admin-ui.git"
      # List of packages to test for this repo
      packages:
        - pkgName: "@okta/admin-v2.admin-app-react"
          # optionally override the command used to test the package
          testCmd: "yarn run vitest"
        - pkgName: "@okta/admin-v2.admin-dashboard"
```

## License

[Apache Version 2.0](https://github.com/atko-eng/odyssey-design-system/blob/master/LICENSE)

## Support Disclaimer

This library is community supported and is maintained by members of the Okta team for developers and IT professionals.
This library is not an official Okta product and does not qualify for any Okta support. Anyone who chooses to use this library must ensure that their implementation meets any applicable legal obligations including any Okta terms and conditions.
