---
description: Use when a team wants to create a new Odyssey contributions package from scratch. Scaffolds the package, updates CODEOWNERS, creates a Storybook decorator, initializes i18n, updates release config, and surfaces the Slack message for Terminus connection. Use only when explicitly invoked.
---

# /setup-contribution — Set up a new Odyssey contributions package

Walks through the full contribution package setup process end-to-end, replacing the manual steps in the [Confluence guide](https://oktainc.atlassian.net/wiki/spaces/EH/pages/663089045/Odyssey+Code+Contribution+Process).

Execute the following steps in order. Do not skip steps — complete each one before moving to the next.

---

## Pre-flight: Exit plan mode if active

Before doing anything else, check the conversation context for a "Plan mode is active" system-reminder. If plan mode is active:

1. Write to the plan file: "No plan needed — /setup-contribution is an execution workflow. Approve to exit plan mode and start the skill."
2. Call `ExitPlanMode` immediately.
3. Once the user approves, continue from the top of this skill.

---

## Pre-flight: Install dependencies

Run `yarn install` from the repo root before proceeding. This ensures the workspace graph is up to date and all yarn commands in later steps resolve correctly.

```bash
yarn install
```

Wait for it to complete. If it fails, surface the error and stop.

---

## Pre-flight: Terminus project check

Before collecting inputs, ask the user: **"Does your team already have a Terminus project created?"**

- If **yes**: proceed to Step 1.
- If **no** or **unsure**: tell them to follow the [Terminus guide](https://oktainc.atlassian.net/wiki/spaces/ODS/pages/913540729/Code+Contribution+Guide#Terminus) to create one, and come back once they have the project handle. Stop here until they confirm they have it.

The Terminus project is required before CODEOWNERS can be wired up — there is no automation available for creating one.

---

## Step 1 — Gather inputs

Ask the user for the following two values. Collect both before proceeding:

| Variable              | Example      | Description                                                                                                                                                     |
| --------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<PACKAGE_BASE_NAME>` | `iga`        | Short kebab-case base name — do **not** include `-components`. It is appended automatically.                                                                    |
| `<TERMINUS_PROJECT>`  | `eng-iga-ui` | The Terminus project name — the codeowner group is inferred as `@atko-eng/project-<TERMINUS_PROJECT>-codeowner` (e.g. `@atko-eng/project-eng-iga-ui-codeowner`) |

Always derive `<PACKAGE_SHORT_NAME>` = `<PACKAGE_BASE_NAME>-components` — never ask the user for this.

After collecting those, derive a default for `<STORYBOOK_DISPLAY_NAME>` by splitting `<PACKAGE_SHORT_NAME>` on `-`, title-casing each segment, and joining with spaces (e.g. `iga-components` → `Iga Components`, `resource-access-policy-components` → `Resource Access Policy Components`). Show the derived value to the user and ask them to confirm or override. Do not suggest acronym alternatives — the title-case derived name is always the correct pattern and must be consistent for codemods and tooling to work reliably.

All other values are computed — do not ask the user for these:

- `<PACKAGE_DIR>` = `packages/contributions/<PACKAGE_SHORT_NAME>`
- `<NPM_PACKAGE>` = `@okta/odyssey-contributions-<PACKAGE_SHORT_NAME>`
- `<PROVIDER_NAME>` = PascalCase of `<PACKAGE_SHORT_NAME>` (split on `-`, title-case each segment, join) + `Provider` (e.g. `iga-components` → `IgaComponentsProvider`, `test-project` → `TestProjectProvider`)
- `<DECORATOR_NAME>` = PascalCase of `<STORYBOOK_DISPLAY_NAME>` with spaces removed + `StorybookThemeDecorator` (e.g. `IGA Components` → `IgaComponentsStorybookThemeDecorator`)

---

## Step 2 — Scaffold the package

Run:

```bash
yarn create-contribution --name <PACKAGE_SHORT_NAME>
```

Wait for it to complete. If it fails, surface the error to the user and stop.

---

## Step 3 — Update CODEOWNERS

Append the following lines to the end of `.github/CODEOWNERS`, after all existing entries. Follow the same grouping pattern as existing packages (package dir + Storybook dir together, translations line after):

```
packages/contributions/<PACKAGE_SHORT_NAME>/ @atko-eng/project-<TERMINUS_PROJECT>-codeowner
packages/apps/odyssey-storybook/src/<STORYBOOK_DISPLAY_NAME>/ @atko-eng/project-<TERMINUS_PROJECT>-codeowner
packages/contributions/<PACKAGE_SHORT_NAME>/src/properties/translations/ @atko-eng/project-<TERMINUS_PROJECT>-codeowner @atko-eng/project-odyssey-design-system-codeowner
```

**Important**: the translation subfolder rule must appear **after** the package rule — GitHub CODEOWNERS uses the last matching rule, so the translation override only works if it comes later. Always add the translation line even if the team does not plan to use translations right away — it is harmless and avoids a follow-up PR later.

**Important**: use `\ ` (backslash-space) to escape spaces in the Storybook path, matching the convention used by existing entries (e.g. `IGA\ Components`).

---

## Step 4 — Create Storybook directory and decorator

1. Create the Storybook stories directory:

```bash
mkdir -p "packages/apps/odyssey-storybook/src/<STORYBOOK_DISPLAY_NAME>"
```

2. Create the decorator file at `packages/apps/odyssey-storybook/src/tools/<DECORATOR_NAME>.tsx`:

```tsx
/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Decorator } from "@storybook/react-vite";

import { <PROVIDER_NAME> } from "<NPM_PACKAGE>";

export const <DECORATOR_NAME>: Decorator = (Story, context) => (
  <<PROVIDER_NAME> languageCode={context.globals.locale as string}>
    <Story />
  </<PROVIDER_NAME>>
);
```

---

## Step 5 — Translations (optional)

Ask the user: **"Does your package need translations right now?"**

- **Yes**: run the interactive i18n init command, hand control to the user, and wait for them to confirm it completed:

  ```bash
  yarn workspace <NPM_PACKAGE> odyssey-cli i18n init
  ```

- **No**: skip this step. The CODEOWNERS translation line was already added in Step 3 — no follow-up needed when translations are added later.

---

## Step 6 — Add release config entry

Add an entry to `.config/releaserc.json` in the `initialVersion` object:

```json
"<NPM_PACKAGE>": "1.0.0"
```

---

## Step 7 — Print Slack message for the contributing team

Tell the user to post the following message in `#odyssey` to request the Terminus project connection. This step cannot be automated — print the exact message and confirm the user will send it:

```
@nomy guardian-odyssey-eng
please add our Terminus project, <TERMINUS_PROJECT>, to odyssey-design-system.
```

The Odyssey guardian will initiate a "Project Sharing" request. The owner of the contributing team's Terminus project must approve it before the CODEOWNERS entry takes effect.

---

## Step 8 — Summary

Print a summary of all changes made:

| File                                                             | Change                                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `<PACKAGE_DIR>/`                                                 | Package scaffolded by `create-contribution`                            |
| `<PACKAGE_DIR>/src/index.ts`                                     | Provider renamed from `ExampleComponentsProvider` to `<PROVIDER_NAME>` |
| `.github/CODEOWNERS`                                             | Added 3 entries for package dir, Storybook dir, and translations       |
| `packages/apps/odyssey-storybook/src/<STORYBOOK_DISPLAY_NAME>/`  | Directory created                                                      |
| `packages/apps/odyssey-storybook/src/tools/<DECORATOR_NAME>.tsx` | Decorator scaffolded                                                   |
| `.config/releaserc.json`                                         | `<NPM_PACKAGE>` added to `initialVersion`                              |

**Next steps for the contributing team:**

1. Approve the Terminus "Project Sharing" request once the Odyssey guardian sends it.
2. Create stories in `packages/apps/odyssey-storybook/src/<STORYBOOK_DISPLAY_NAME>/` and wrap them with `<DECORATOR_NAME>`.
3. Open the first PR — once the Terminus connection is approved, CODEOWNERS will route reviews correctly.
