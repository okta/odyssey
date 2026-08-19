# AI Agent Instructions — `@okta/odyssey-react-mui`

This package follows the repo-wide agent instructions.

See the canonical instruction set: [../../../AGENTS.md](../../../AGENTS.md)

---

## Package-specific rules

### JSDoc for Components

Component source files are the single source of truth for documentation. The
MCP generation script
(`packages/platform/odyssey-mcp/scripts/generateMetadata.ts`) and any future
Storybook integration both read JSDoc from these files. **When a component or
prop changes, its JSDoc must be updated in the same commit.**

#### Component-level description

Place a JSDoc block immediately above the `const ComponentName = ...`
function declaration — **not** above the Props type, not above the memoized
re-export, not above the `export { }` statement.

```tsx
/**
 * Displays a small numeric count alongside an element. Typically used in
 * navigation to indicate unread messages, pending tasks, or notifications.
 */
const Badge = ({ badgeContent, type = "default" }: BadgeProps) => {
  // ...
};

const MemoizedBadge = memo(Badge);
MemoizedBadge.displayName = "Badge";

export { MemoizedBadge as Badge };
```

The generation script resolves the component by calling
`getVariableDeclaration(componentName)` on the source file. For the export
`{ MemoizedBadge as Badge }`, it looks for `const Badge = ...`. JSDoc on any
other declaration is not picked up.

#### Prop-level descriptions

Add a JSDoc block above each property in the `type ComponentNameProps` or
`interface ComponentNameProps` declaration:

```tsx
export type BadgeProps = {
  /** The numeric count to display. A value of 0 or less renders nothing. */
  badgeContent: number;
  /**
   * The maximum count before showing an overflow indicator (e.g. `100+`).
   * @default 100
   */
  badgeContentMax?: (typeof badgeContentMaxValues)[number];
  /**
   * The visual style of the badge, controlling background color.
   * @default "default"
   */
  type?: (typeof badgeTypeValues)[number];
};
```

#### `@default` tag

Add `@default <value>` to any prop that has a default in the destructuring
signature (e.g. `type = "default"`, `badgeContentMax = 100`). The value
should match exactly what is written in the destructuring.

#### `@deprecated` tag

Add `@deprecated <reason>` to props or components that are deprecated. This
propagates to the generated metadata and is exposed via MCP.

#### `@see` tag

Use `@see <url>` to link to external specifications or standards when the
prop behavior is non-obvious (e.g., HTML `autocomplete` attribute values).

#### Boolean prop descriptions

Lead with **`If \`true\``**, state the consequence, end with a period. Never
use "Whether X" — it is passive and less useful for agentic consumers.

```tsx
/** If `true`, the item is disabled and cannot be interacted with. */
isDisabled?: boolean;

/** If `true`, the input receives focus automatically on mount. */
hasInitialFocus?: boolean;
```

#### Enum prop descriptions

**Behavioral variants** (each value produces meaningfully different
behavior): write a lead sentence naming what the prop controls, then a
per-value bullet list using the `If 'value', consequence.` form.

```tsx
/**
 * Controls how the Drawer positions relative to page content.
 * - If `'temporary'`, overlays content and dismisses on backdrop click.
 * - If `'persistent'`, pushes the page layout and stays open.
 * @default "temporary"
 */
variant?: "temporary" | "persistent";
```

**Scale / self-describing values** (size, spacing, severity, numeric ranges
— values whose meaning is obvious from the name): a single descriptive
sentence is sufficient; per-value bullets add no information.

```tsx
/**
 * The size of the button.
 * @default "medium"
 */
size?: "small" | "medium" | "large";
```

#### Line length in JSDoc

Wrap JSDoc prose at 80 characters. The `*` prefix counts toward the limit.

### Browser Test Specifics

This package is the only one currently running **vitest 4 browser mode**
with the Playwright provider. It has a custom matcher registered in
`vitest-browser-setup.ts` that covers a gap in the built-in assertion set.

Use `renderWithOdysseyProvider` from
`./test-utils/renderWithOdysseyProvider.js` as the default render wrapper —
it provides an `OdysseyProvider` context and disables MUI transitions for
deterministic tests. Using `render` directly with `OdysseyProvider` is
acceptable when `renderWithOdysseyProvider` is not a good fit, but this
should be the exception.

#### `toBeAccessible`

All browser tests must include `toBeAccessible` assertions to catch
accessibility regressions. The matcher runs axe-core under the hood.

- **When to assert**: on initial render AND after each meaningful state
  change (open menu, selected option, focused input, expanded accordion,
  visible tooltip).
- **`disabledRules`**: pass rule IDs for known false positives or known
  issues that need to be fixed later (e.g., `"color-contrast"` for overlay
  components like Toast, Dialog, DatePicker calendar). Always add a comment
  above explaining what the issue is and whether it's a false positive or a
  known issue to fix.
- **Scoping**: pass a specific DOM element to scope the check to a region
  (e.g., an open dialog). Use `expect.element(locator)` for vitest locators.
- **Portal-rendered components**: MUI components that portal to
  `document.body` (Dialog, Drawer, Toast, Menu, Autocomplete listbox,
  DatePicker calendar) render **outside** the `container` returned by
  `renderWithOdysseyProvider`. Using `expect(container).toBeAccessible()` on
  these will silently scan an empty wrapper and never find violations.
  Always scope to the actual rendered element:
  `expect.element(page.getByRole("dialog"))`,
  `expect.element(page.getByRole("menu"))`, etc.

```tsx
test("menu opened via keyboard", async () => {
  const { container } = await renderWithOdysseyProvider(<MyComponent />);
  // Axe on initial render
  await expect(container).toBeAccessible();
  // Open the menu
  const trigger = page.getByRole("button", { name: "Options" });
  await userEvent.keyboard("{Enter}");
  // Axe scoped to the open menu — color-contrast disabled for overlay backdrop
  const menu = page.getByRole("menu");
  // TODO: fix — overlay has insufficient color contrast
  await expect
    .element(menu)
    .toBeAccessible({ disabledRules: ["color-contrast"] });
});
```

`toBeAccessible` takes a DOM `Element`. Use `expect.element(locator)` when
you have a vitest `Locator` — it pre-resolves the locator to an element
before calling the matcher. Use `expect(container)` when you already have a
DOM element (e.g. the `container` from `renderWithOdysseyProvider`).
`expect.element()` is safe here because the element is always expected to
exist.

#### Asserting hidden or absent state

- Element removed from DOM (popover unmount, conditional render):
  - `await expect.element(locator).not.toBeInTheDocument()` — async, with
    retry. Use to assert an element has been removed from the DOM. Pass the
    `Locator` directly.
  - `await expect.poll(() => locator.query()).toBeNull()` — async with
    retry. Use when removal may be delayed (e.g. exit animations that keep
    the element in the DOM briefly before unmounting).
- Element in DOM but not visible (MUI Collapse, CSS height:0, display:none):
  `await expect.element(locator).not.toBeVisible()`
  - Playwright's `not.toBeVisible()` detects an empty bounding box
    (height:0, display:none) and `visibility:hidden`. It does **not**
    detect `opacity:0` — see the note below.
  - `getByText` finds elements regardless of `aria-hidden`, so
    `expect.element(page.getByText("x")).not.toBeVisible()` works for MUI
    Collapse (height:0), even though the element has `aria-hidden="true"`
    set on a parent.
  - For `getByRole` locators: `aria-hidden` prevents them from matching by
    default. Add `{ includeHidden: true }` so the locator can resolve:
    `page.getByRole("region", { includeHidden: true })`

**Important — `opacity` does not count as "not visible":** An element is
considered visible when it has a non-empty bounding box and does not have
`visibility:hidden` computed style. Elements of zero size or with
`display:none` are not considered visible. `opacity:0` has no impact on
Playwright visibility — elements at `opacity:0` are still announced by
screen readers and other assistive technologies, so they are correctly
treated as visible. If a component hides content using only `opacity:0`,
assert the CSS directly (`toHaveStyle("opacity: 0")`) and add a `// TODO`
comment noting that the component should use `visibility:hidden` or remove
content from the DOM instead, so assistive technologies do not announce
hidden content.

#### Import note

Use `"vitest/browser"` for all vitest browser imports — `Locator`, `utils`,
`page`, `userEvent`, etc. The older `"@vitest/browser/context"` package is
deprecated and will stop working in the next major version.
