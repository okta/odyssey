---
description: Use when the user explicitly asks to promote a contributions component to odyssey-react-mui core. Runs the full promotion workflow — analysis, Jira tickets, deprecation notices, migration mapping, and PR creation. Use only when explicitly invoked.
---

# /promote-contribution — Promote a contributions component to odyssey-react-mui core

End-to-end workflow for analysing a contributions component, implementing it in `odyssey-react-mui`, staging a codemod migration branch, and coordinating the transition with contributing teams via Jira tickets, deprecation notices, and consumer fork-removal tracking.

**Prerequisites:**

- `gh` CLI authenticated (`gh auth status`)
- Jira ord-skill installed at version ≥ 1.10.0 (`~/.claude/plugins/cache/ord-claude-plugins/ord-skills/`)

Execute the following steps in order. Do not skip steps or batch them — complete each one before moving to the next.

---

## Pre-flight: Exit plan mode if active

Before doing anything else, check the conversation context for a "Plan mode is active" system-reminder. If plan mode is active:

1. Write to the plan file: "No plan needed — /promote-contribution is an execution workflow. Approve to exit plan mode and start the skill."
2. Call `ExitPlanMode` immediately.
3. Once the user approves, continue from the top of this skill.

---

## Pre-flight: Start contributions check in background

Immediately on skill invocation, before asking any questions, kick off the contributions check in the background so it is ready if needed in Step 1:

```bash
yarn workspace @okta/odyssey-contributions-promotion-check build:withDeps && yarn workspace @okta/odyssey-contributions-promotion-check check
```

Run this with `run_in_background: true`. Store the background task ID as `CONTRIBUTIONS_CHECK_TASK_ID`.

---

## Pre-flight: Get user initials

Check memory for a saved `user_initials` value.

- If found: use it silently as `<initials>`
- If not found: ask the user for their initials (e.g. `ms`), save to memory as a `user` type entry, and use that value for the rest of this skill

---

## Mode selection

Use the `AskUserQuestion` tool with a single-select question:

```
question: "Which mode do you want to run in?"
header: "Mode"
options:
  - label: "Normal"
    description: "Full workflow: Jira tickets, branch, commit, push, PR"
  - label: "Dry run"
    description: "Code changes only: no Jira tickets, no push, no PR. Branch creation and committing are optional."
  - label: "Dry run, no log"
    description: "Same as dry run but suppresses ticket previews"
```

Record:

- `DRY_RUN` — `true` if Dry run or Dry run, no log; `false` if Normal
- `NO_LOG` — `true` if Dry run, no log; `false` otherwise

In dry run mode:

- The Jira ord-skill and `gh` CLI are not required
- `TICKET_KEY` will be set to `DRY-RUN` (used as a placeholder in deprecation comments and summaries)
- Steps 4, 12 (push), 13, 14, and 15b–15d are skipped or modified as described in each step below

---

## Step 1: Select the component to promote

Wait for the background check to complete. Check whether a `<task-notification>` for `CONTRIBUTIONS_CHECK_TASK_ID` has already arrived in the conversation context:

- **If the notification has already arrived**: skip `TaskOutput` entirely — the task is already cleaned up and calling it will produce a "No task found" error. Use the `Read` tool directly on the output file path from the notification.
- **If the notification has not arrived yet**: call `TaskOutput` with `CONTRIBUTIONS_CHECK_TASK_ID` and `block: true`, then read the output file it returns.

Parse the output and present only the **Eligible for Promotion** section as a numbered list in your response:

```
Eligible for Promotion:
1. DataView — iga-components
2. Checkbox — passwordless-components
...
```

Then ask the user to type the number or name of the component they want to promote, or type any contribution component name not on the list.

Validate the response:

- **Number or name matches the eligible list** — use it, proceed.
- **Name not on the list** — scan all `contributionsMetadata.json` files under `packages/contributions/` for an entry where `componentName` matches (case-insensitive) and `isIgnoredFromPromotion` is absent or `false`. If found, proceed with a warning that this component did not pass the eligibility check. If not found at all, tell the user and re-ask.

Once a valid component is confirmed, record:

- `COMPONENT_NAME` — e.g. `Typography` (as typed by the user)
- `SOURCE_PACKAGE` — e.g. `resource-access-policy-components` (derived by scanning metadata)
- `SOURCE_PACKAGE_NPM` — read from `packages/contributions/<SOURCE_PACKAGE>/package.json` `"name"` field
- `SOURCE_FILE` — e.g. `packages/contributions/resource-access-policy-components/src/Typography/Typography.tsx`

---

## Step 2: Analyse the delta

Read the contribution component source file and the corresponding core file (if one exists).

To find the core file:

1. Look up the component's `contributionsMetadata.json` entry — check `forkedFrom` or `similarTo`
2. If `forkedFrom: "odyssey-react-mui::X"`, the core file is `packages/core/odyssey-react-mui/src/X.tsx` (or a subdirectory)
3. If `similarTo` or no core equivalent exists, the component is net-new

**Cross-package duplicate check:** Search all other `contributionsMetadata.json` files for the same component name or any entry whose `forkedFrom` or `similarTo` points to this contribution package. This surfaces packages that have already copied this component and will also need to migrate.

```bash
grep -r "COMPONENT_NAME" packages/contributions/*/contributionsMetadata.json
```

After the grep, explicitly record `AFFECTED_PACKAGES` as a structured list of every contribution package that has a local copy of the component. For each entry, read its `package.json` to capture the NPM name:

```
AFFECTED_PACKAGES = [
  { dir: SOURCE_PACKAGE, npm: SOURCE_PACKAGE_NPM },
  { dir: "<other-package-dir>", npm: "<read from packages/contributions/<other-package-dir>/package.json>" },
  ...
]
```

Every subsequent step that acts on contribution packages — Steps 8, 11, 15c, and 15d — **must iterate over `AFFECTED_PACKAGES`**. Do not act only on `SOURCE_PACKAGE`. If a package is in `AFFECTED_PACKAGES` it must receive deprecation notices (Step 8), `isIgnoredFromPromotion` (Step 11), and its own consumer migration + fork removal tickets (Steps 15c–15d). No package may be silently dropped.

**Build PROMOTED_COMPONENTS:**

After identifying `AFFECTED_PACKAGES`, build the full set of components being promoted. These are all components that share the same source file as `COMPONENT_NAME` and have a `contributionsMetadata.json` entry in any package in `AFFECTED_PACKAGES`.

1. Read `SOURCE_FILE` and collect all exported component names (e.g. `Typography`, `Heading1`, `Heading2`, etc.). Non-component exports like types and constants are noted for implementation context but excluded.
2. For each package in `AFFECTED_PACKAGES`, read its `contributionsMetadata.json` and collect all entries where `componentName` matches one of the exported names.
3. Deduplicate by name — each component name appears once in `PROMOTED_COMPONENTS` even if it appears in multiple packages.

Record:

```
PROMOTED_COMPONENTS = [
  "Typography",
  "Heading1",
  "Heading2",
  ...
]
```

These are the components that will be marked `isIgnoredFromPromotion` in Step 11 and listed in the plan in Step 3.

Classify the promotion as one of:

| Type                        | When                                                                      | Core change                                               |
| --------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------- |
| **A — Fork with additions** | `forkedFrom` an existing core component; contribution adds props/features | Add the new props/features to the existing core component |
| **B — Net-new component**   | No core equivalent; contribution created something genuinely new          | Add a new component file to `odyssey-react-mui`           |
| **C — Similar concept**     | `similarTo` a core component; APIs differ                                 | Decide with user whether to extend core or add alongside  |

Record:

- `PROMOTION_TYPE` — `A`, `B`, or `C` (used in Step 3 plan, Step 6 logic, and Done summary)

Also identify:

- Whether any **props were renamed** between contribution and core versions
- Whether the **component name itself changed** (e.g. contribution called it `PageHeader`, core will call it `PageHeader`)
- Whether any **default prop values** need to be injected during migration (existing callers won't have them)

Summarise the findings for the user:

- What the contribution adds vs core (list new props, behaviours, exports)
- How many packages have copies of this component
- Which promotion type (A, B, or C)
- Any prop renames or default values needed for the codemod

---

## Step 3: Confirm the plan

Present a clear plan to the user:

```
Component:      <COMPONENT_NAME>
Source package: <SOURCE_PACKAGE>
Type:           <A / B / C>
Core change:    <description of what will be added/changed in odyssey-react-mui>
Duplicate packages also affected: <list or "none">

Component family being promoted:
  <COMPONENT_NAME>, <companion1>, <companion2>, ...
  (all components sharing the same source file that have a contributionsMetadata.json entry)

Proposed API additions to core:
  - <prop name>: <type> — <description>
  ...

Codemod mapping:
  Source import: <COMPONENT_NAME> from <SOURCE_PACKAGE_NPM>
  Target import: <COMPONENT_NAME> from @okta/odyssey-react-mui
  Prop renames:  <old> → <new>, or "none"
  Default props: <prop>: <value>, or "none"
```

Use the `AskUserQuestion` tool:

```
question: "Does this plan look right?"
header: "Confirm plan"
options:
  - label: "Looks good, proceed"
    description: "Continue to implementation"
```

If the user selects "Other" and provides feedback, revise the plan summary based on their input and re-ask before continuing.

---

## Step 4: Create a Jira ticket

> **[DRY RUN]** Skip all Jira calls. Set `TICKET_KEY=DRY-RUN`. Unless `NO_LOG` is set, print:
>
> ```
> [DRY RUN] Would have created promotion Task:
>   Summary:     Promote <COMPONENT_NAME> from contributions to core
>   Description: Promote <COMPONENT_NAME> from <SOURCE_PACKAGE> to odyssey-react-mui. <brief description of what is being added>.
>   Type:        Task
>   Parent:      OKTA-1167817
> ```
>
> Then skip to Step 5.

All tickets created by this workflow are children of the standing promotion Epic:
**[OKTA-1167817](https://oktainc.atlassian.net/browse/OKTA-1167817) — Promote contributions components to odyssey-react-mui core**

Find the jira skill directory:

```bash
JIRA_SKILL=$(ls -d ~/.claude/plugins/cache/ord-claude-plugins/ord-skills/*/skills/jira 2>/dev/null | sort -V | tail -1)
```

Login: `$JIRA_SKILL/scripts/read/login_jira.sh`

**4a. Create the promotion Task:**

```bash
$JIRA_SKILL/scripts/write/create_jira.sh \
  --summary "Promote <COMPONENT_NAME> from contributions to core" \
  --description "Promote <COMPONENT_NAME> from <SOURCE_PACKAGE> to odyssey-react-mui. <brief description of what is being added>." \
  --component "Team: UICore Odyssey" \
  --issuetype "Task"
```

Capture the ticket key as `TICKET_KEY` (e.g. `OKTA-XXXXXXX`).

**4b. Link the ticket to the promotion Epic:**

```bash
$JIRA_SKILL/scripts/write/edit_jira.sh <TICKET_KEY> --field parent --value OKTA-1167817
```

---

## Step 5: Create a branch

> **[DRY RUN]** Use the `AskUserQuestion` tool:
>
> ```
> question: "Branch for these changes?"
> header: "Branch"
> options:
>   - label: "Create new branch"
>     description: "<initials>-promote-<component>-DRY-RUN"
>   - label: "Use current branch"
>     description: "<current-branch-name>"
> ```
>
> If they choose "Create new branch", follow the normal flow below.
> If they choose "Use current branch", skip ahead to Step 6.

Check for uncommitted changes and stash if needed.

Record `PROMOTION_BRANCH` before creating it — this variable is used in Step 12 (push) and Step 13 (return to branch):

```bash
PROMOTION_BRANCH=<initials>-promote-<component-name-lowercase>-<TICKET_KEY>
git stash
git checkout master
git pull origin master
git stash pop
git checkout -b $PROMOTION_BRANCH
```

---

## Step 6: Implement the core change

**Special case — SVG logo or icon components:**

Before applying the type-based rules below, check whether the contribution is a component that renders an inline SVG (a brand logo, a product icon, etc.). If so, **always** use the `add-icons` pipeline regardless of promotion type:

1. Determine classification from the SVG content:

- Brand/product mark → **logo** → `packages/core/odyssey-icons/src/figma.logo.generated/`
- UI glyph → **icon** → `packages/core/odyssey-icons/src/figma.icon.generated/`

2. Adapt the SVG to the required canvas size:

- Logo: `width="32" height="32"` with `viewBox="0 0 32 32"`
- Icon: `width="16" height="16"` with `viewBox="0 0 16 16"`
- If the original SVG paths are not in 32×32 (or 16×16) coordinate space, wrap them in a `<g transform="translate(X, Y) scale(S)">` to center and scale them. The `iconTemplate.ts` generator **always** overwrites the viewBox with `0 0 {size} {size}`, so the paths must be in the correct coordinate space. SVGO does **not** apply transforms from `<g>` elements (no `applyTransforms` plugin), so the transform will be preserved in the generated component.
- Example: a 27×40 logo → scale 0.8 to fit height (27×0.8=21.6 wide, 40×0.8=32 tall), center horizontally (offset = (32−21.6)/2 = 5.2): `<g transform="translate(5.2, 0) scale(0.8)">`

3. Name the file after the brand/product in kebab-case (e.g. `auth0.svg`), which will generate a component named `Auth0Icon`.
4. Run `yarn generate:icons` to generate the component in `logos.generated/` or `icons.generated/`.
5. The generated component uses `SvgIconNoChildrenProps` — there is **no** `size` prop; consumers use MUI's `fontSize` prop instead.
6. The logo/icon is exported from `@okta/odyssey-react-mui/logos` (or `/icons`), **not** the main `@okta/odyssey-react-mui` entry point. Record `TARGET_PACKAGE` accordingly:
   - Logo: `TARGET_PACKAGE=@okta/odyssey-react-mui/logos`
   - Icon: `TARGET_PACKAGE=@okta/odyssey-react-mui/icons`
7. Add a Storybook story importing from the correct sub-path.
8. Do **not** create a standalone component file — the generated file is the implementation.

**For Type A (fork with additions):**

Record `TARGET_PACKAGE=@okta/odyssey-react-mui` (used in Step 13 mapping file).

- Read the contribution source carefully
- Add only the new props/features to the existing core component — do not copy the whole file
- Ensure new props are optional with no breaking defaults
- Update all named sub-components/exports that also need the new props (e.g. `Heading1`–`Heading6` if Typography gains a prop)
- Do NOT copy internal implementation patterns that differ from core style — adapt to core conventions (see AGENTS.md)

**For Type B (net-new component):**

Record `TARGET_PACKAGE=@okta/odyssey-react-mui` (used in Step 13 mapping file).

- If the component is an SVG logo/icon, follow the **Special case** above instead of this section.
- Otherwise: create a new file in `packages/core/odyssey-react-mui/src/`, follow existing component patterns (named exports, memo, HtmlProps, useOdysseyDesignTokens), and add the export to the relevant `index.ts`.

**For Type C (similar concept):**

Record `TARGET_PACKAGE=@okta/odyssey-react-mui` unless agreed otherwise with the user in Step 3.

- Follow the approach agreed with the user in Step 3

In all cases, before writing any code, re-read AGENTS.md to ensure the implementation follows all project standards. Then:

- Run `yarn workspace @okta/odyssey-react-mui build` and fix any TypeScript errors
- Run `yarn typecheck` to verify no regressions

**`styled()` and polymorphic MUI components:** AGENTS.md forbids the `sx` prop and inline `style` props in `odyssey-react-mui` source — dynamic styles must use `styled()` from `@mui/material/styles` with `shouldForwardProp`. When `styled(MuiComponent)` causes a TypeScript error because a prop (e.g. `component`) is dropped due to MUI's polymorphic typing, re-declare that prop explicitly in the styled generic type parameter. Do **not** fall back to inline `style` or `sx` to avoid the TypeScript error.

Example:

```tsx
const StyledMuiTypography = styled(MuiTypography, {
  shouldForwardProp: (prop) => prop !== "clampLines" && prop !== "wordBreak",
})<{
  clampLines?: number;
  component?: ElementType; // re-declared because MUI's polymorphic typing drops it
  wordBreak?: TypographyProps["wordBreak"];
}>(({ clampLines, wordBreak }) => ({
  ...(wordBreak && { wordBreak }),
  ...(clampLines && {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: clampLines,
    overflow: "hidden",
  }),
}));
```

---

## Step 6a: Review each changed file with the user

After writing all changes for a file, before moving on to the next file:

1. Run `git diff <file>` and present it in a fenced code block.
2. Use the `AskUserQuestion` tool:
   ```
   question: "Does this implementation look right?"
   header: "Review: <filename>"
   options:
     - label: "Looks good"
       description: "Move to the next file"
     - label: "I have feedback"
       description: "Describe what to change"
   ```
3. If feedback is provided:
   a. Revise the implementation based on the feedback.
   b. Check whether the feedback surfaces a missing or incorrect rule in AGENTS.md. If so, show the proposed AGENTS.md change and ask for confirmation before writing it.
   c. Re-show the diff and re-ask.
4. Repeat until accepted.

**Unit of review is one file** — not one sub-component per approval. For example, all Typography sub-components in `Typography.tsx` are reviewed together as a single diff, not 12 separate approvals.

---

## Step 7: Compute the next Odyssey minor version

These variables are also used in Steps 13 and 15.

```bash
CURRENT_VERSION=$(node -p "require('./packages/core/odyssey-react-mui/package.json').version")
NEXT_MINOR_VERSION=$(node -p "
  const [major, minor] = '${CURRENT_VERSION}'.split('.');
  \`\${major}.\${parseInt(minor) + 1}.0\`
")
RELEASE_LABEL=$(node -p "
  const [major, minor] = '${NEXT_MINOR_VERSION}'.split('.');
  \`v\${major}.\${minor}\`
")
# e.g. CURRENT_VERSION=1.59.0, NEXT_MINOR_VERSION=1.60.0, RELEASE_LABEL=v1.60
```

---

## Step 8: Add deprecation notices to contribution source files

For every contribution package that contains a local copy of the promoted component, add a `@deprecated` JSDoc comment to each exported component, pointing to the core equivalent.

The comment must:

- Use `@deprecated` so IDEs show a strikethrough and surface the warning
- Name the replacement with a full import path
- Reference the migration codemod

Example for a forked `Typography`:

```ts
/**
 * @deprecated This component has been promoted to `odyssey-react-mui`.
 * Use `Typography` from `@okta/odyssey-react-mui` instead.
 *
 * To migrate automatically, run:
 *   yarn odyssey-cli migrate --components <ComponentName>
 */
export const Typography = ...
```

Apply the `@deprecated` comment to:

- The primary component export
- Any named sub-component exports that are also being superseded (e.g. `Heading1`–`Heading6` if Typography is being promoted)
- The exported props type, if applicable

Do this in every contribution package that has a local copy (identified in Step 2).

---

## Step 9: Write tests

Check whether `<ComponentName>.browser.test.tsx` already exists in the same directory as the component in `odyssey-react-mui`. If it does, add to it. If not, create it. Follow the testing conventions in AGENTS.md.

Focus tests on the promoted behaviour — if a new prop was added, test that it works as documented. Do not write tests for behaviour already covered by the existing core component's test suite.

Run the tests: `yarn workspace @okta/odyssey-react-mui test`

---

## Step 10: Add a Storybook story (if applicable)

If the component is user-facing and visible in Storybook, add or update a story in `packages/apps/odyssey-storybook/src/` demonstrating the new props.

Use the `AskUserQuestion` tool:

```
question: "Should I add a Storybook story for the promoted behaviour?"
header: "Storybook story"
options:
  - label: "Yes"
    description: "Add a story demonstrating the new behaviour"
  - label: "No"
    description: "Skip the Storybook story"
```

---

## Step 11: Mark the source contribution as promoted

For every package in `AFFECTED_PACKAGES`, open its `contributionsMetadata.json` and set `"isIgnoredFromPromotion": true` and `"ignoredFromPromotionReason": "promoted"` on **every entry whose `componentName` appears in `PROMOTED_COMPONENTS`**. This prevents the whole component family from re-appearing in future promotion check reports while teams migrate.

Example — updating all Typography-family entries in one package:

```json
{ "componentName": "Typography",  "forkedFrom": "...", "libraryName": "...", "isIgnoredFromPromotion": true, "ignoredFromPromotionReason": "promoted" },
{ "componentName": "Heading1",    "forkedFrom": "...", "libraryName": "...", "isIgnoredFromPromotion": true, "ignoredFromPromotionReason": "promoted" },
{ "componentName": "Heading2",    "forkedFrom": "...", "libraryName": "...", "isIgnoredFromPromotion": true, "ignoredFromPromotionReason": "promoted" },
...
```

Do not skip any entry in `PROMOTED_COMPONENTS` or any package in `AFFECTED_PACKAGES`. Every cell of the (PROMOTED_COMPONENTS × AFFECTED_PACKAGES) matrix must be updated.

---

## Step 12: Commit and push

> **[DRY RUN]** Do not commit or push automatically. Ask the user:
>
> > "Changes are complete. Do you want me to commit them?"
>
> If yes, stage and commit as below but do not push.
> If no, skip ahead to Step 13.

Stage changed files:

```bash
git add -u
```

Check for untracked new files (new test file, new component file) and ask whether to include them.

Commit using Conventional Commits (subject under 50 chars, lowercase after `:`):

```bash
git commit -m "feat: add <prop/feature> to <ComponentName>"
```

Push:

```bash
git push -u origin $PROMOTION_BRANCH
```

---

## Step 13: Create the migration branch and ticket

> **[DRY RUN]** Skip all branch and file creation. Instead, unless `NO_LOG` is set, print the **exact file content** that would have been written in Normal mode — substituting all real values gathered so far. Precede it with the destination path and branch it would have gone to:
>
> ```
> [DRY RUN] Migration mapping file (would be created in Normal mode):
>   File:   packages/platform/odyssey-cli/src/commands/migrate/mappings/<ComponentName>.ts
>   Branch: <initials>-migration-<component-name-lowercase>-<TICKET_KEY> (not created in dry run)
> ```
>
> Then output the full file as a fenced `ts` code block with **all placeholders replaced by real values and one Record entry per component in `PROMOTED_COMPONENTS`** — do not abbreviate with comments like `// ... follow same pattern`. Every companion component must appear as a complete entry.
>
> Unless `NO_LOG` is set, also print:
>
> ```
> [DRY RUN] Would have created migration Task:
>   Summary: Add codemod migration for <COMPONENT_NAME> once Odyssey ${RELEASE_LABEL} ships
>   (blocked by release ticket — linked in Step 15b)
> ```
>
> Set `MIGRATION_KEY=DRY-RUN`. Then continue to Step 14.

Before writing anything, read the "Component Mappings" section of `packages/platform/odyssey-cli/README.md`.

**Add the source package as a pinned dependency.** The mapping file imports types directly from the published contribution package. Look up its latest published version and pin it in `packages/platform/odyssey-cli/package.json`:

```bash
CONTRIB_VERSION=$(npm info <SOURCE_PACKAGE_NPM> version)
```

Add or update `"<SOURCE_PACKAGE_NPM>": "<CONTRIB_VERSION>"` in the `devDependencies` object of `packages/platform/odyssey-cli/package.json`, then run `yarn install`.

Create the branch and write the full mapping file using the prop analysis from Step 3:

```bash
MIGRATION_BRANCH=<initials>-migration-<component-name-lowercase>-<TICKET_KEY>
git stash
git checkout master
git pull origin master
git checkout -b $MIGRATION_BRANCH
```

Write `packages/platform/odyssey-cli/src/commands/migrate/mappings/<ComponentName>.ts`. The file must contain **one Record entry per component in `PROMOTED_COMPONENTS`** — not just the primary component. Extract the prop mappings as a shared const to avoid repetition. The codemod matches by both component name and source package, so each companion (Heading1, Paragraph, etc.) needs its own entry with its own `source.component` / `target.component`.

If `AFFECTED_PACKAGES` has multiple entries, collect all their NPM names into a single `sourcePackages` const and use `packages: sourcePackages` in every entry. Do not create one exported const per source package — a single export with the full `packages` array is correct and avoids duplication.

Note: `<TARGET_PACKAGE>` is where the consumer should import from after migration — `@okta/odyssey-react-mui` for regular components, `@okta/odyssey-react-mui/logos` for generated logos, `@okta/odyssey-react-mui/icons` for generated icons.

```ts
// packages/platform/odyssey-cli/src/commands/migrate/mappings/<ComponentName>.ts
import type { <ComponentName>Props as Source<ComponentName>Props } from "<FIRST_SOURCE_PACKAGE_NPM>";
import type { <ComponentName>Props } from "<TARGET_PACKAGE>";
import { type ComponentMapping, DROPPED } from "./types.js";

// All contribution packages that export this component family
const sourcePackages = [
  "<SOURCE_PACKAGE_NPM_1>",
  // "<SOURCE_PACKAGE_NPM_2>",  — add one entry per AFFECTED_PACKAGES entry
];

// Shared propMap — all companion components export the same prop surface
const <componentName>PropMap = {
  // filled in from Step 3 analysis — every source prop must appear
} satisfies ComponentMapping<Source<ComponentName>Props, <ComponentName>Props>["propMap"];

const minimumVersion = "<NEXT_MINOR_VERSION>";
export const <ComponentName>: Record<
  // Union of every component name in PROMOTED_COMPONENTS:
  | "<ComponentName>"
  | "<companion1>"
  | "<companion2>",
  // ... one key per PROMOTED_COMPONENTS entry
  ComponentMapping<Source<ComponentName>Props, <ComponentName>Props>
> = {
  <ComponentName>: {
    source: { component: "<ComponentName>", packages: sourcePackages, propsType: "Source<ComponentName>Props" },
    target: { component: "<ComponentName>", package: "<TARGET_PACKAGE>", propsType: "<ComponentName>Props", minimumVersion },
    propMap: <componentName>PropMap,
  },
  <companion1>: {
    source: { component: "<companion1>", packages: sourcePackages, propsType: "Source<ComponentName>Props" },
    target: { component: "<companion1>", package: "<TARGET_PACKAGE>", propsType: "<ComponentName>Props", minimumVersion },
    propMap: <componentName>PropMap,
  },
  // ... one entry per PROMOTED_COMPONENTS — write every entry in full, no abbreviation
};
```

Add the import and spread to `packages/platform/odyssey-cli/src/commands/migrate/mappings/index.ts`.

Build and test:

```bash
yarn workspace @okta/odyssey-cli build:withDeps
yarn workspace @okta/odyssey-cli test
```

Commit and push the branch:

```bash
git add packages/platform/odyssey-cli/src/commands/migrate/mappings/<ComponentName>.ts \
        packages/platform/odyssey-cli/src/commands/migrate/mappings/index.ts \
        packages/platform/odyssey-cli/tsconfig.json   # only if paths were updated
git commit -m "feat: add <ComponentName> migration mapping (do not merge until Odyssey ${RELEASE_LABEL})"
git push -u origin $MIGRATION_BRANCH
```

Return to the promotion branch:

```bash
git checkout $PROMOTION_BRANCH
git stash pop 2>/dev/null || true
```

**Create the migration ticket:**

```bash
cat > /tmp/migration_desc.txt << EOF
The codemod migration branch is ready to merge once Odyssey ${RELEASE_LABEL} ships:
  Branch: ${MIGRATION_BRANCH}

To complete this ticket once Odyssey ${RELEASE_LABEL} (${NEXT_MINOR_VERSION}) has shipped:
1. Open a PR for branch ${MIGRATION_BRANCH} into master and merge it.
2. Update the pinned @okta/odyssey-react-mui devDep in packages/platform/odyssey-cli/package.json from ${CURRENT_VERSION} to ${NEXT_MINOR_VERSION} if it hasn't been updated already.
3. Run: yarn install
4. Verify: yarn workspace @okta/odyssey-cli build:withDeps && yarn workspace @okta/odyssey-cli test

Promotion PR: <PR URL from Step 14>
EOF

MIGRATION_KEY=$($JIRA_SKILL/scripts/write/create_jira.sh \
  --summary "Add codemod migration for <COMPONENT_NAME> once Odyssey ${RELEASE_LABEL} ships" \
  --description-file /tmp/migration_desc.txt \
  --component "Team: UICore Odyssey" \
  --issuetype "Task" | jq -r '.key')

$JIRA_SKILL/scripts/write/edit_jira.sh $MIGRATION_KEY --field parent --value OKTA-1167817

echo "Migration ticket: https://oktainc.atlassian.net/browse/$MIGRATION_KEY"
```

Store `MIGRATION_KEY` — it will be linked as "blocked by" the release ticket in Step 15b.

---

## Step 14: Create the pull request

> **[DRY RUN]** Skip. Unless `NO_LOG` is set, print:
>
> ```
> [DRY RUN] Would have created PR:
>   Title: feat: add <prop/feature> to <ComponentName>
>   Body:  (see template below)
> ```
>
> Then skip to Step 15.

```bash
gh pr create \
  --title "feat: add <prop/feature> to <ComponentName>" \
  --assignee "$(gh api user --jq .login)" \
  --body "$(cat <<EOF
[<TICKET-KEY>](https://oktainc.atlassian.net/browse/<TICKET-KEY>)

## Summary

Promotes `<COMPONENT_NAME>` from `<SOURCE_PACKAGE>` to `odyssey-react-mui` core.

<List what was added and why — the contribution demonstrated demand for this API>

A codemod migration will be added to `odyssey-cli` once Odyssey ${RELEASE_LABEL} ships (tracked in [<MIGRATION_KEY>](https://oktainc.atlassian.net/browse/<MIGRATION_KEY>)).

## Affected contribution packages

The following packages have a local fork of this component and will need to migrate once this is released. Deprecation notices have been added to each fork pointing at the core version.

<list each package and its current odyssey-react-mui pin>

## Testing & Screenshots

- [ ] I have confirmed this change with my designer and the Odyssey Pillar Captains.
<!-- Please include screenshots if it has visuals; otherwise, put "N/A". -->
EOF
)"
```

---

## Step 15: Create follow-up tickets for contributing teams

> **[DRY RUN]** Skip all ticket creation in this step. Unless `NO_LOG` is set, print a preview of every ticket that would have been created (release ticket, consumer migration ticket) using the templates in 15b–15c. Then skip to Done.

One type of ticket is needed per affected contribution package:

1. **Consumer migration ticket** — for apps that import the component from the contributions package, to update their imports to `@okta/odyssey-react-mui` using the codemod.

---

**15a. Gather consumer data**

**External consumers from UI Stats:**

Build the promotion-check package if needed, then run the usage-detail CLI **once per entry in `AFFECTED_PACKAGES`**, using each entry's `.npm` name:

```bash
yarn workspace @okta/odyssey-contributions-promotion-check build:withDeps

# Repeat for each { dir, npm } in AFFECTED_PACKAGES:
USAGE_DETAIL_<DIR>=$(yarn workspace @okta/odyssey-contributions-promotion-check usage-detail \
  --package <entry.npm> \
  --component <COMPONENT_NAME>)
```

The output is a JSON array of `ComponentUsageDetailEntry`:

```json
[
  {
    "repoName": "<repo>",
    "consumerPackages": [
      { "consumerPackage": "<pkg>", "minimumViablePath": "<path>/", "files": [...] }
    ]
  }
]
```

Parse each `USAGE_DETAIL_<DIR>` to extract repos and `minimumViablePath` values needed for the per-package 15c tickets. If the output is an empty array (UI Stats unavailable or component not found), fall back to grepping for import references.

**Internal consumers (monorepo):**

Grep the monorepo for internal consumers **once per entry in `AFFECTED_PACKAGES`**:

```bash
# Repeat for each { dir, npm } in AFFECTED_PACKAGES:
grep -r "from ['\"]<entry.npm>['\"]" packages/ --include="*.ts" --include="*.tsx" -l
```

Record `INTERNAL_CONSUMERS_<DIR>` for each package (list of files/packages, or "none").

---

**15b. Create or find the next-release tracking ticket**

Consumer migration can only begin after the upcoming release ships. Create the release ticket if it doesn't exist yet, then link migration tickets to it.

Search for an existing ticket:

```bash
EXISTING_RELEASE_JSON=$($JIRA_SKILL/scripts/read/search_jira_jql.sh \
  "project = OKTA AND summary = \"Odyssey Release ${RELEASE_LABEL}\"" \
  "key" \
  --limit 1)
RELEASE_KEY=$(echo "$EXISTING_RELEASE_JSON" | jq -r '.[0].key // empty')
```

If `RELEASE_KEY` is empty (ticket not found), create it:

```bash
RELEASE_KEY=$($JIRA_SKILL/scripts/write/create_jira.sh \
  --summary "Odyssey Release ${RELEASE_LABEL}" \
  --description "Release Odyssey ${RELEASE_LABEL}" \
  --component "Team: UICore Odyssey" \
  --issuetype "Deployment" \
  --priority "P2" | jq -r '.key')

$JIRA_SKILL/scripts/write/edit_jira.sh $RELEASE_KEY \
  --field customfield_10122 --value OKTA-974451
```

Print: `"Release ticket: https://oktainc.atlassian.net/browse/$RELEASE_KEY"`

Link the migration ticket (created in Step 13) as blocked by the release:

```bash
$JIRA_SKILL/scripts/write/link_jira.sh $MIGRATION_KEY --to $RELEASE_KEY --type "is blocked by"
```

---

**For each affected contribution package:**

**15c. Create the consumer migration ticket**

Build the description string from `usageDetail`. For each repo entry in `usageDetail`, list each `consumerPackage` with its pre-computed `minimumViablePath` as the `--paths` value. If `usageDetail` is null, fall back to the repo count from the promotion check output.

Description template:

```
The <COMPONENT_NAME> component has been promoted to odyssey-react-mui core in <TICKET_KEY>.
All apps importing <COMPONENT_NAME> from <SOURCE_PACKAGE_NPM> should migrate to @okta/odyssey-react-mui.

This migration should begin once Odyssey ${RELEASE_LABEL} has shipped (tracked in ${RELEASE_KEY}).

Internal monorepo consumers:
<INTERNAL_CONSUMERS, or 'none found'>

To migrate, update @okta/odyssey-react-mui to >= ${NEXT_MINOR_VERSION} and run the codemod:

In <repoName>:
  <consumerPackage>:
    yarn odyssey-cli migrate --components <COMPONENT_NAME> --paths <minimumViablePath>

  <consumerPackage>:
    yarn odyssey-cli migrate --components <COMPONENT_NAME> --paths <minimumViablePath>

(repeat for each consumerPackage in usageDetail[repoIndex].consumerPackages, and each repo)
```

```bash
CONSUMER_KEY=$($JIRA_SKILL/scripts/write/create_jira.sh \
  --summary "Migrate <COMPONENT_NAME> imports from <SOURCE_PACKAGE> to core" \
  --description "<description built from template above>" \
  --component "Team: UICore Odyssey" \
  --issuetype "Task" | jq -r '.key')

$JIRA_SKILL/scripts/write/edit_jira.sh $CONSUMER_KEY --field parent --value OKTA-1167817

# Consumer migration can only begin after the release ships
$JIRA_SKILL/scripts/write/link_jira.sh $CONSUMER_KEY --to $RELEASE_KEY --type "is blocked by"

echo "Consumer migration ticket: https://oktainc.atlassian.net/browse/$CONSUMER_KEY"
```

Repeat 15c for each affected contribution package. Print all created ticket URLs.

---

## Done

**Before printing the summary, verify the following for every package in `AFFECTED_PACKAGES`:**

| Package                            | Deprecation added (Step 8) | `isIgnoredFromPromotion` set (Step 11) | Consumer migration ticket (Step 15c) |
| ---------------------------------- | -------------------------- | -------------------------------------- | ------------------------------------ |
| SOURCE_PACKAGE                     | ✓ / ✗                      | ✓ / ✗                                  | ✓ / ✗                                |
| (each additional AFFECTED_PACKAGE) | ✓ / ✗                      | ✓ / ✗                                  | ✓ / ✗                                |

If any cell is ✗, complete that step before printing the summary. A package in `AFFECTED_PACKAGES` is not done until all three columns are ✓.

---

**Normal mode** — print a summary:

- Epic: https://oktainc.atlassian.net/browse/OKTA-1167817
- Promotion ticket: `https://oktainc.atlassian.net/browse/<TICKET_KEY>`
- PR URL
- Branch name
- What was promoted and which type (A/B/C)
- Codemod mapping file created: `packages/platform/odyssey-cli/src/commands/migrate/mappings/<ComponentName>.ts`
- Contribution packages with deprecation notices added: `<list>`
- Release ticket (next minor): `https://oktainc.atlassian.net/browse/$RELEASE_KEY`
- Migration mapping ticket (blocked by release): `https://oktainc.atlassian.net/browse/$MIGRATION_KEY`
- Migration branch (ready to merge once ${RELEASE_LABEL} ships): `$MIGRATION_BRANCH`
- Consumer migration tickets (blocked by release, linked to epic): `<list of CONSUMER_KEY URLs>`

**Dry run mode** — print a summary:

- Mode: DRY RUN
- Component promoted: `<COMPONENT_NAME>` from `<SOURCE_PACKAGE>` (Type A/B/C)
- Branch: `<new branch name>` or `working on <existing branch>`
- Committed: yes / no
- Code changes made:
  - Core implementation: `<file path>`
  - Deprecation notices added to: `<list>`
  - Metadata updated (`isIgnoredFromPromotion`): `<list>`
- Skipped (dry run): Jira promotion ticket, migration branch and ticket, release ticket, consumer migration tickets, push, PR
- To run for real: re-run `/promote-contribution` and select **Normal** mode
