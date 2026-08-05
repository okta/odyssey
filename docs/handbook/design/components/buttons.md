---
label: Buttons
description: Trigger actions and reveal grouped options. Button for single actions; MenuButton for multiple actions in constrained space.
---

# Buttons

Button lets users trigger a single action. MenuButton lets users choose from a list of actions using a dropdown menu. MenuItem represents a single option inside a MenuButton.

## When to use

### Button

- Use Button when users need to take a single, clear action such as Add, Save, or Cancel.
- Use `variant="primary"` for the most important action in a context — at most one primary button per view.
- Use `variant="secondary"` for supplemental actions. Pair with a primary button, or use multiple secondary buttons for equal-weight actions.
- Use `variant="danger"` or `variant="dangerSecondary"` for actions that permanently change or delete the user's data.
- Use `variant="floating"` for inline contextual actions where a visible boundary is undesirable, such as table row actions or the close button in a dialog.
- Use `variant="floatingAction"` for inline actions that appear link-like with blue text, but perform an in-page action rather than navigation.
- Use `size="small"` for inline table actions or other space-constrained contexts.

### MenuButton

- Use MenuButton when you need to present multiple related actions but space is limited.

### MenuItem

- Use MenuItem only as a direct child of a MenuButton's `children` prop.

## When NOT to use

### Button

- **When users navigate to another page** — use `Link` instead.
- **When there are multiple actions in a constrained space** — use `MenuButton` instead.
- **When users need to make a form selection** — use `Select`, `RadioGroup`, or `Checkbox` instead.

### MenuButton

- **When users need to make a form selection** — use `Select`, `RadioGroup`, or `Checkbox` instead.
- **When there is only one action** — use a regular `Button` instead.

## Anatomy and variants

### Button variants

| Variant           | Visual style                | When to use                                                             |
| ----------------- | --------------------------- | ----------------------------------------------------------------------- |
| `primary`         | Filled, highest prominence  | The single most important action per context                            |
| `secondary`       | Outlined                    | Supporting action; paired with primary or used for equal-weight actions |
| `danger`          | Filled, destructive color   | Primary destructive action (delete, remove)                             |
| `dangerSecondary` | Outlined, destructive color | Secondary destructive action                                            |
| `floating`        | No visible boundary         | Inline contextual actions (table rows, dialog close)                    |
| `floatingAction`  | No boundary, blue text      | Inline actions with link-like appearance                                |

**Which variant should I use?**

```text
Is this action destructive?
├─ Yes → danger or dangerSecondary
└─ No
      └─ Is it the most important action in the view?
            ├─ Yes → primary
            └─ No
                  └─ Does it need a visible boundary?
                        ├─ Yes → secondary
                        └─ No
                              └─ Does it look like a navigation link?
                                    ├─ Yes → floatingAction
                                    └─ No  → floating
```

### Button sizes

| Size     | Default | Use case                                         |
| -------- | ------- | ------------------------------------------------ |
| `small`  |         | Inline table actions, space-constrained contexts |
| `medium` | ✓       | Standard use; matches height of input fields     |
| `large`  |         | Largest click target when needed                 |

### Button with icons

- Use `startIcon` or `endIcon` (never both) to reinforce the button's label with a visual cue.
- For icon-only buttons, omit `label` and provide `ariaLabel` and `tooltipText` — the tooltip renders automatically above the button on hover and focus.
- The icon must be universally understood and unambiguous. Never use an icon for decoration.

### MenuButton trigger variants

MenuButton's `buttonVariant` accepts the same values as Button's `variant`.

| `buttonVariant`       | When to use                                                                           |
| --------------------- | ------------------------------------------------------------------------------------- |
| `secondary` (default) | Standard grouped actions                                                              |
| `floating`            | Inline grouped actions in tables                                                      |
| `primary`             | Grouped actions that are the primary focus of a context                               |
| `isOverflow={true}`   | Overflow menu pattern; renders a vertical dots icon (MoreIcon) instead of ChevronDown |

### MenuItem variants

| Variant       | Default | When to use                                                                    |
| ------------- | ------- | ------------------------------------------------------------------------------ |
| `default`     | ✓       | Standard action                                                                |
| `destructive` |         | Action that permanently changes or deletes data; always place last in the list |

## Props

### Button

| Prop                     | Type                                                                                          | Default    | Description                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `variant`                | `"primary" \| "secondary" \| "danger" \| "dangerSecondary" \| "floating" \| "floatingAction"` | —          | **Required.** Visual style of the button.                                     |
| `label`                  | `string`                                                                                      | `""`       | Button text. Omit for icon-only buttons (must supply `ariaLabel`).            |
| `size`                   | `"small" \| "medium" \| "large"`                                                              | `"medium"` | Button size.                                                                  |
| `isDisabled`             | `boolean`                                                                                     | —          | Prevents interaction. The page must explain why the button is disabled.       |
| `isFullWidth`            | `boolean`                                                                                     | —          | Stretches the button to fill its container width.                             |
| `onClick`                | `MouseEventHandler`                                                                           | —          | Click handler. Not called when `isDisabled` is true.                          |
| `startIcon`              | `ReactElement`                                                                                | —          | Icon displayed before the label.                                              |
| `endIcon`                | `ReactElement`                                                                                | —          | Icon displayed after the label.                                               |
| `tooltipText`            | `string`                                                                                      | —          | Tooltip for icon-only buttons. Auto-rendered above the button on hover/focus. |
| `href`                   | `string`                                                                                      | —          | Renders the button as an `<a>` tag navigating to this URL.                    |
| `type`                   | `"button" \| "submit" \| "reset"`                                                             | `"button"` | HTML button type. Use `"submit"` inside forms.                                |
| `ariaLabel`              | `string`                                                                                      | —          | Accessible label. Required when `label` is omitted.                           |
| `ariaLabelledBy`         | `string`                                                                                      | —          | ID of an element that labels the button.                                      |
| `ariaDescribedBy`        | `string`                                                                                      | —          | ID of an element that describes the button.                                   |
| `ariaControls`           | `string`                                                                                      | —          | ID of the element the button controls.                                        |
| `ariaExpanded`           | `boolean \| "true" \| "false"`                                                                | —          | Indicates expanded/collapsed state of controlled content.                     |
| `ariaHasPopup`           | `AriaAttributes["aria-haspopup"]`                                                             | —          | Indicates the button opens a popup.                                           |
| `id`                     | `string`                                                                                      | —          | HTML `id` for the button element.                                             |
| `tabIndex`               | `number`                                                                                      | —          | Override tab order.                                                           |
| `testId`                 | `string`                                                                                      | —          | `data-se` attribute for test selectors.                                       |
| `buttonRef`              | `RefObject<FocusHandle>`                                                                      | —          | Ref to imperatively focus the button.                                         |
| `translate`              | `"yes" \| "no"`                                                                               | —          | HTML `translate` attribute.                                                   |
| ~~`variant="tertiary"`~~ | —                                                                                             | —          | **Deprecated.** Maps to `"secondary"`. Use `"secondary"` directly.            |

### MenuButton

| Prop                       | Type                                                                                          | Default       | Description                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| `buttonLabel`              | `string`                                                                                      | —             | Label on the trigger button. Required unless `ariaLabel` or `ariaLabelledBy` is provided.        |
| `children`                 | `ReactNode`                                                                                   | —             | `MenuItem`, `Divider`, and `ListSubheader` components. Mutually exclusive with `popoverContent`. |
| `popoverContent`           | `ReactNode`                                                                                   | —             | Freeform content shown in a popover. Mutually exclusive with `children`.                         |
| `buttonVariant`            | `"primary" \| "secondary" \| "danger" \| "dangerSecondary" \| "floating" \| "floatingAction"` | `"secondary"` | Visual variant of the trigger button.                                                            |
| `endIcon`                  | `ReactElement`                                                                                | —             | Custom icon on the trigger button. Overrides the default ChevronDown or MoreIcon.                |
| `isDisabled`               | `boolean`                                                                                     | —             | Disables the trigger button.                                                                     |
| `isOverflow`               | `boolean`                                                                                     | —             | Renders a vertical dots (MoreIcon) trigger instead of ChevronDown.                               |
| `menuAlignment`            | `"left" \| "right"`                                                                           | `"left"`      | Horizontal alignment of the open menu relative to the trigger.                                   |
| `shouldCloseOnSelect`      | `boolean`                                                                                     | `true`        | Close the menu when a MenuItem is clicked.                                                       |
| `size`                     | `"small" \| "medium" \| "large"`                                                              | —             | Size of the trigger button.                                                                      |
| `tooltipText`              | `string`                                                                                      | —             | Tooltip for an icon-only trigger.                                                                |
| `hasVerticalDivider`       | `boolean`                                                                                     | `false`       | Shows a vertical rule beside the trigger button.                                                 |
| `verticalDividerAlignment` | `"start" \| "end"`                                                                            | `"start"`     | Position of the vertical divider relative to the trigger.                                        |
| `ariaLabel`                | `string`                                                                                      | —             | Accessible label when `buttonLabel` is empty.                                                    |
| `ariaLabelledBy`           | `string`                                                                                      | —             | ID of the element that labels the trigger.                                                       |
| `ariaDescribedBy`          | `string`                                                                                      | —             | ID of an element describing the trigger.                                                         |
| `id`                       | `string`                                                                                      | —             | HTML `id` for the trigger button element.                                                        |
| `testId`                   | `string`                                                                                      | —             | `data-se` attribute for test selectors.                                                          |
| `translate`                | `"yes" \| "no"`                                                                               | —             | HTML `translate` attribute.                                                                      |

### MenuItem

| Prop              | Type                         | Default     | Description                                                                                                                 |
| ----------------- | ---------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `children`        | `ReactNode`                  | —           | **Required.** Content of the item — text, icon, or both.                                                                    |
| `variant`         | `"default" \| "destructive"` | `"default"` | `"destructive"` applies a danger color to signal irreversible actions.                                                      |
| `onClick`         | `MouseEventHandler`          | —           | Fired when the item is clicked. The menu closes after unless `shouldCloseOnSelect={false}` is set on the parent MenuButton. |
| `isDisabled`      | `boolean`                    | —           | Prevents selection of the item.                                                                                             |
| `isSelected`      | `boolean`                    | —           | Marks the item as the active selection (`aria-current`).                                                                    |
| `hasInitialFocus` | `boolean`                    | —           | Auto-focuses this item when the menu opens.                                                                                 |
| `value`           | `string`                     | —           | Optional string value associated with the item.                                                                             |
| `testId`          | `string`                     | —           | `data-se` attribute for test selectors.                                                                                     |

## Examples

### Correct

**Primary button for a single important action:**

```tsx
import { Button } from "@okta/odyssey-react-mui";

<Button label="Save changes" variant="primary" onClick={handleSave} />;
```

**Secondary button paired with a primary for a cancel action:**

```tsx
import { Button } from "@okta/odyssey-react-mui";

<>
  <Button label="Cancel" variant="secondary" onClick={handleCancel} />
  <Button label="Save changes" variant="primary" onClick={handleSave} />
</>;
```

**Danger button for a destructive action:**

```tsx
import { Button } from "@okta/odyssey-react-mui";

<Button label="Delete app" variant="danger" onClick={handleDelete} />;
```

**Icon-only button with tooltip:**

```tsx
import { Button } from "@okta/odyssey-react-mui";
import { AddIcon } from "@okta/odyssey-react-mui/icons";

<Button
  ariaLabel="Add user"
  startIcon={<AddIcon />}
  tooltipText="Add user"
  variant="primary"
/>;
```

**Floating button for an inline table row action:**

```tsx
import { Button } from "@okta/odyssey-react-mui";

<Button label="Edit" variant="floating" size="small" onClick={handleEdit} />;
```

**MenuButton with a destructive action separated by a divider:**

```tsx
import { Divider, MenuButton, MenuItem } from "@okta/odyssey-react-mui";

<MenuButton buttonLabel="Actions" buttonVariant="secondary">
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
  <Divider />
  <MenuItem variant="destructive" onClick={handleDelete}>
    Delete
  </MenuItem>
</MenuButton>;
```

**Overflow MenuButton for table row actions:**

```tsx
import { MenuButton, MenuItem } from "@okta/odyssey-react-mui";

<MenuButton
  ariaLabel="Row actions"
  isOverflow
  buttonVariant="floating"
  size="small"
>
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem onClick={handleDeactivate}>Deactivate</MenuItem>
  <MenuItem variant="destructive" onClick={handleDelete}>
    Delete
  </MenuItem>
</MenuButton>;
```

**MenuButton with section groupings:**

```tsx
import { ListSubheader, MenuButton, MenuItem } from "@okta/odyssey-react-mui";

<MenuButton buttonLabel="Assign" buttonVariant="primary">
  <ListSubheader>ROLES</ListSubheader>
  <MenuItem onClick={() => assign("admin")}>Admin</MenuItem>
  <MenuItem onClick={() => assign("member")}>Member</MenuItem>
  <ListSubheader>GROUPS</ListSubheader>
  <MenuItem onClick={() => assign("group-a")}>Group A</MenuItem>
  <MenuItem onClick={() => assign("group-b")}>Group B</MenuItem>
</MenuButton>;
```

**Icon-only MenuButton trigger with tooltip:**

```tsx
import { MenuButton, MenuItem } from "@okta/odyssey-react-mui";

<MenuButton ariaLabel="More options" tooltipText="More options">
  <MenuItem onClick={handleSettings}>Settings</MenuItem>
  <MenuItem onClick={handleHelp}>Help</MenuItem>
</MenuButton>;
```

### Incorrect

**Multiple primary buttons in the same context:**

```tsx
// Wrong — only one primary button per context; users cannot identify the most important action
<Button label="Save" variant="primary" onClick={handleSave} />
<Button label="Submit for review" variant="primary" onClick={handleSubmit} />
```

**Button used for page navigation:**

```tsx
// Wrong — use Link for navigation; Button implies an in-page action
<Button
  label="Go to settings"
  variant="floatingAction"
  onClick={() => navigate("/settings")}
/>
```

**Icon-only button without ariaLabel and tooltipText:**

```tsx
// Wrong — icon-only buttons must have ariaLabel and tooltipText for accessibility
<Button startIcon={<AddIcon />} variant="primary" />
```

**MenuButton used for form selection:**

```tsx
// Wrong — use Select or RadioGroup for form selections; MenuButton is for triggering actions
<MenuButton buttonLabel="Choose role">
  <MenuItem onClick={() => setRole("admin")}>Admin</MenuItem>
  <MenuItem onClick={() => setRole("member")}>Member</MenuItem>
</MenuButton>
```

**Destructive MenuItem placed first:**

```tsx
// Wrong — destructive actions must be placed last to prevent accidental selection
<MenuButton buttonLabel="Actions">
  <MenuItem variant="destructive" onClick={handleDelete}>
    Delete
  </MenuItem>
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
</MenuButton>
```

**Leading and trailing icons on the same button:**

```tsx
// Wrong — use startIcon or endIcon, never both
<Button
  label="Save"
  startIcon={<EditIcon />}
  endIcon={<CheckIcon />}
  variant="primary"
/>
```

## Rules

- Use at most one `variant="primary"` button per context.
- Never use a secondary button alone — pair it with a primary button or other secondary buttons.
- Icon-only buttons must provide both `ariaLabel` and `tooltipText`.
- Use `variant="danger"` or `variant="dangerSecondary"` only for actions that permanently change or delete data.
- Never use Button for page navigation — use `Link` instead.
- Use `startIcon` or `endIcon`, never both on the same button.
- Button labels must lead with a strong verb (e.g., "Save changes", "Delete app"). Exceptions: Done, Close, Cancel, Add, Delete when context makes the noun obvious.
- Button labels must be 1–4 words and under 30 characters including spaces.
- Write button labels in sentence case — capitalize the first word and proper nouns only.
- For full-page layouts (data tables), place buttons at the top right. For forms, place buttons at the bottom right.
- Use `size="small"` for buttons inside table rows; use `size="medium"` (default) everywhere else to match input field height.
- Use MenuButton instead of multiple Buttons when space is constrained.
- In a MenuButton, place destructive MenuItem entries last, after a `Divider`.
- Use `ListSubheader` grouping only when there are at least two groups and each group has at least two items.
- `ListSubheader` labels are fully capitalized (e.g., `ROLES`, `CREW`). Do not use end punctuation.
- MenuItem labels follow the same verb + noun formula as Button labels, in sentence case, under 20 characters.
- Never use a MenuButton for form selections — use `Select`, `RadioGroup`, or `Checkbox`.
- The `"tertiary"` button variant is deprecated — use `"secondary"` instead.
