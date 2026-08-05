# Visual Regression Testing

Odyssey uses Storybook and Applitools to detect rendered changes. Bacon reports
the result as the **Visual Regression Test** suite.

A failed suite usually means the pull request produced screenshots that differ
from their baselines. It does not, by itself, mean Odyssey infrastructure is
broken.

## When the Suite Fails

1. Open the Applitools results URL from the Bacon suite's custom message.
2. Review every changed screenshot and classify it as intentional or unexpected.
3. If the change is intentional, confirm it matches the purpose of the pull
   request and approve the changed baseline in Applitools.
4. If the change is unexpected, do not approve it. Fix the implementation or
   Storybook state, push the correction, and rerun the suite.
5. Rerun the Bacon suite after all changed screenshots are resolved.

The author may approve an intentional baseline change using their judgment.
Baseline approval is separate from normal code and design review. Never approve
an unexplained difference merely to make CI green.

Under the current Applitools configuration, a first-time visual checkpoint for a
new Storybook story passes automatically and does not require a separate manual
baseline approval step. Later differences from that baseline follow the normal
author-review workflow above.

## Failure Categories

| What you see                                                                              | Owner                 | Action                                               |
| ----------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------- |
| An expected visual difference                                                             | PR author             | Verify intent, approve the baseline, and rerun Bacon |
| An unexpected visual difference                                                           | PR author             | Fix the change, push, and rerun Bacon                |
| No Applitools access                                                                      | PR author and manager | Follow the internal access guide                     |
| Missing results URL, authentication error, outage, timeout, or unexplained nondeterminism | Odyssey or CI owner   | Escalate with the diagnostic details below           |

## Access and Current UI Steps

The internal
[VRT Access Setup and Visual Review Guide](https://oktainc.atlassian.net/wiki/spaces/ODS/pages/913604967/Guide+VRT+Access+Setup+Reviewing+Visual+Changes)
owns the current access request, Bacon navigation, and Applitools UI steps. Those
procedures change more often than the ownership and approval rules in this
handbook.

## Escalation

Ask in `#odyssey` when access, infrastructure, or unexplained nondeterminism
prevents the author from resolving the suite. Include:

- the pull request URL;
- the Bacon suite URL;
- the Applitools results URL, when available;
- the failing Storybook story names;
- whether the issue is access, infrastructure, or an unexplained screenshot
  difference;
- what happened after one rerun.

Use `@nomy guardian-odyssey-eng` when the issue requires Odyssey engineering
support.

## Authoring Visual Coverage

Stories should render directly in the state that VRT needs to review. Use story
args or a dedicated story for an open menu, dialog, tooltip, drawer, calendar, or
other visual state instead of driving the component there through interaction.

Interaction behavior belongs in browser tests. Storybook `play` functions add VRT
runtime and timing risk, so use them rarely: only when the interaction itself is
the visual behavior under review and the state cannot reasonably be rendered
directly. Do not add a `play` function solely to expose a state that story args or
direct rendering can represent.

Applitools Eyes captures a screenshot of each story after its `play` function
completes (Storybook emits `STORY_RENDERED` post-play), so a story's resting
render must already show the state you want captured.

### Prefer rendering the state by default over a `play` function

When a component's open or expanded state is controlled by a boolean prop or arg
(dialogs, drawers, toasts, accordions), render it open by default (set the arg to
`true`, or seed the render's initial `useState`) and omit the `play`. The trigger
button stays so a human can still toggle it in Canvas.

Because `autodocs` is enabled globally in `.storybook/preview.ts`, an open overlay
would render its full-viewport backdrop inline on the component's Docs page, so
pair the conversion with a manual MDX docs page (`Component.mdx` with
`<Meta of={...} />`) that documents the API using `<Controls />` and a closed,
controlled code example rather than `<Primary />` or `<Stories />`. Accordions
have no backdrop, so their Docs page renders fine either way. The rationale is in
the [decision record](../../decisions/2026-07-28-open-by-default-overlays-in-stories.md).

### When a `play` function is still required

Use one for states that cannot be expressed as an initial prop: hover-revealed
tooltips, focus-revealed content (SkipToContent), menus with no force-open prop,
dropdowns opened via interaction, row selection or expansion, multi-step
navigation, and any story whose interaction is the behavior under test. Also add
`play` functions to variant stories that render different option layouts in a
dropdown (for example, Picker with descriptions vs. metadata vs. groups).

Do not add a `play` function to static stories (Disabled, ReadOnly, Error) whose
visual state is already in the initial render, to overlays rendered open by
default per the rule above, or to components with no hidden transient UI (Banner,
Badge, Card layout, and similar).

### Keeping `play` functions minimal

A required `play` should perform one click or hover to produce the visual state.
No assertions, no axe checks, no returning to the resting state. Import
`userEvent` and `within` from `"storybook/test"`. Do not type into controlled
inputs inside a `play`, because `useArgs` re-renders can swallow keystrokes; use
clicks and hovers only.

```tsx
// Good: opens dropdown for VRT capture
play: async ({ canvasElement, step }) => {
  await step("Open dropdown", async () => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));
  });
},

// Good: shows tooltip for VRT capture
play: async ({ canvasElement, step }) => {
  await step("Show tooltip", async () => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button", { name: "Info" }));
  });
},
```

Keep stories deterministic. Do not approve a baseline that hides missing assets,
incorrect state, clipped content, or unrelated layout changes.
