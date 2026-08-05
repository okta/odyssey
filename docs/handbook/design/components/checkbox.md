---
label: Checkbox and CheckboxGroup
description: Boolean selection controls — standalone or grouped — for independent multi-option choices.
---

# Checkbox and CheckboxGroup

Use `Checkbox` and `CheckboxGroup` for multiple-choice selections where each option is independent. Checking one checkbox has no effect on the others.

## When to use

- **Single `Checkbox`**: present one option the user toggles before clicking a submit button. For example, "I agree to the Terms of Service."
- **`CheckboxGroup`**: present multiple options where the user can select any combination. Each checkbox operates independently.
- Choose checkboxes for desktop-first experiences where precision input is expected.

## When NOT to use

| Scenario                                              | Use instead  |
| ----------------------------------------------------- | ------------ |
| Toggle takes effect immediately without a submit step | `Switch`     |
| Experience is primarily mobile                        | `Switch`     |
| Only one selection is allowed from the group          | `RadioGroup` |
| User must pick between mutually exclusive options     | `RadioGroup` |

## Anatomy

1. **Checkbox group label** — describes the set of options; always required for accessibility even when visually hidden.
2. **Group hint text** _(optional)_ — clarifies the group or the set of options.
3. **Checkbox input** — the square control; laid out one per line, vertically.
4. **Checkbox item label** — describes the individual option.
5. **Input hint text** _(optional)_ — provides additional context for a single checkbox.

## States

| State         | Description                                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unselected    | Default; no option is chosen.                                                                                                                                    |
| Selected      | User has chosen the option.                                                                                                                                      |
| Indeterminate | Visual-only state for a parent checkbox when its children are partially checked. The checkbox still submits as checked or unchecked based on its internal state. |
| Disabled      | User cannot change the value. Disabled values are **not** submitted with the form. Can be applied to individual checkboxes or the whole group.                   |
| Error         | Validation failed; an inline error message describes what to fix. Default message: **"Select at least one option."**                                             |
| Read-only     | User can view but not change the value. Read-only values **are** submitted with the form.                                                                        |

## Placement

Order options by:

- Most likely to least likely to be selected
- Simplest to most complex operation
- Least to most risk

Do not use alphabetical order — it breaks consistency after translation.

## Props — Checkbox

| Prop               | Type                                | Default     | Description                                                                                                            |
| ------------------ | ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`        | `string`                            | —           | Accessible label when no visible label is present.                                                                     |
| `ariaLabelledBy`   | `string`                            | —           | ID of an external element that labels this checkbox.                                                                   |
| `hint`             | `string`                            | —           | Helper text rendered below the checkbox.                                                                               |
| `id`               | `string`                            | —           | Overrides the auto-generated element ID.                                                                               |
| `inputRef`         | `React.RefObject<FocusHandle>`      | —           | Ref forwarded to the underlying `<input>`.                                                                             |
| `isChecked`        | `boolean`                           | —           | Controlled checked state. Requires `onChange`.                                                                         |
| `isDefaultChecked` | `boolean`                           | —           | Uncontrolled initial checked state. Omit `isChecked` when using this.                                                  |
| `isDisabled`       | `boolean`                           | —           | Prevents user interaction. Value is not submitted.                                                                     |
| `isIndeterminate`  | `boolean`                           | —           | Visual indeterminate state; typically used for a "select all" parent checkbox.                                         |
| `isReadOnly`       | `boolean`                           | `false`     | View-only. Value is still submitted.                                                                                   |
| `isRequired`       | `boolean`                           | —           | Marks the checkbox required; form cannot submit unless it is checked.                                                  |
| `label`            | `string`                            | —           | Visible label text.                                                                                                    |
| `name`             | `string`                            | —           | HTML `name` attribute. Falls back to `id`.                                                                             |
| `onBlur`           | `function`                          | —           | Fired on blur. Receives the React blur event.                                                                          |
| `onChange`         | `function`                          | —           | Fired when checked state changes. Receives `(event, checked)`.                                                         |
| `testId`           | `string`                            | —           | Sets the `data-se` attribute for test targeting.                                                                       |
| `translate`        | `"yes" \| "no"`                     | —           | HTML `translate` attribute.                                                                                            |
| `validity`         | `"valid" \| "invalid" \| "inherit"` | `"inherit"` | Per-checkbox validity override. Use only when an individual checkbox differs from the enclosing `CheckboxGroup` state. |
| `value`            | `string`                            | —           | HTML `value` attribute submitted with the form.                                                                        |

## Props — CheckboxGroup

| Prop                | Type            | Default      | Description                                                                |
| ------------------- | --------------- | ------------ | -------------------------------------------------------------------------- |
| `ariaDescribedBy`   | `string`        | —            | ID of an external element that describes the group.                        |
| `children`          | `ReactNode`     | **required** | One or more `Checkbox` elements.                                           |
| `errorMessage`      | `string`        | —            | Error text rendered below the group.                                       |
| `errorMessageList`  | `string[]`      | —            | Additional errors displayed as a list alongside `errorMessage`.            |
| `hint`              | `string`        | —            | Helper text for the entire group.                                          |
| `HintLinkComponent` | `ReactElement`  | —            | A `Link` element appended to the group hint text.                          |
| `id`                | `string`        | —            | Overrides the auto-generated fieldset ID.                                  |
| `isDisabled`        | `boolean`       | —            | Disables all child checkboxes.                                             |
| `isReadOnly`        | `boolean`       | `false`      | Makes all child checkboxes read-only. Propagates via `React.cloneElement`. |
| `isRequired`        | `boolean`       | `false`      | Marks the group required.                                                  |
| `label`             | `string`        | **required** | Visible group label.                                                       |
| `testId`            | `string`        | —            | Sets `data-se` on the inner `FormGroup` element.                           |
| `translate`         | `"yes" \| "no"` | —            | HTML `translate` attribute.                                                |

## Which variant should I use?

```
Need a selection control?
│
├─ One option only, no exclusive choice needed?
│  ├─ Takes effect immediately (no submit)?  → Switch
│  └─ Requires submit to take effect?        → Checkbox (standalone)
│
└─ Multiple options?
   ├─ Only one can be selected?              → RadioGroup
   └─ Any combination can be selected?      → CheckboxGroup
```

## Examples

### Correct

**Single checkbox — consent or confirmation (controlled):**

```tsx
import { Checkbox } from "@okta/odyssey-react-mui";

<Checkbox
  label="I agree to the Terms of Service"
  isChecked={agreed}
  isRequired
  onChange={(_, checked) => setAgreed(checked)}
/>;
```

**Single checkbox — uncontrolled initial state:**

```tsx
import { Checkbox } from "@okta/odyssey-react-mui";

<Checkbox
  label="Subscribe to product updates"
  isDefaultChecked
  name="newsletter"
  value="newsletter"
/>;
```

**Checkbox group — multiple independent selections:**

```tsx
import { Checkbox, CheckboxGroup } from "@okta/odyssey-react-mui";

<CheckboxGroup label="Assign permissions">
  <Checkbox label="View reports" name="view-reports" value="view-reports" />
  <Checkbox label="Edit records" name="edit-records" value="edit-records" />
  <Checkbox
    label="Delete records"
    name="delete-records"
    value="delete-records"
  />
</CheckboxGroup>;
```

**Group with hint text and required validation:**

```tsx
import { Checkbox, CheckboxGroup } from "@okta/odyssey-react-mui";

<CheckboxGroup
  label="Notification preferences"
  hint="Choose at least one channel"
  errorMessage="Select at least one option."
  isRequired
>
  <Checkbox label="Email" name="email" value="email" />
  <Checkbox label="SMS" name="sms" value="sms" />
  <Checkbox label="Push notification" name="push" value="push" />
</CheckboxGroup>;
```

**Group with hint link:**

```tsx
import { Checkbox, CheckboxGroup, Link } from "@okta/odyssey-react-mui";

<CheckboxGroup
  label="App access"
  hint="Learn more about app access requests"
  HintLinkComponent={<Link href="https://help.okta.com">help.okta.com</Link>}
>
  <Checkbox label="Salesforce" name="salesforce" value="salesforce" />
  <Checkbox label="Workday" name="workday" value="workday" />
</CheckboxGroup>;
```

**Indeterminate parent checkbox (select all):**

```tsx
import { Checkbox } from "@okta/odyssey-react-mui";

<Checkbox
  label="Select all"
  isIndeterminate={someChecked && !allChecked}
  isChecked={allChecked}
  onChange={handleSelectAll}
/>;
```

**Per-checkbox validity override — mixed error states:**

```tsx
import { Checkbox, CheckboxGroup } from "@okta/odyssey-react-mui";

// Use when individual checkboxes have different validity from the group.
<CheckboxGroup
  label="Required roles"
  errorMessage="At least one role is invalid."
>
  <Checkbox label="Admin" name="admin" value="admin" isDefaultChecked />
  <Checkbox label="Viewer" name="viewer" value="viewer" validity="valid" />
  <Checkbox label="Editor" name="editor" value="editor" validity="invalid" />
</CheckboxGroup>;
```

**Per-item hint text:**

```tsx
import { Checkbox, CheckboxGroup } from "@okta/odyssey-react-mui";

<CheckboxGroup label="Allowed actions">
  <Checkbox
    label="Allow users to reset passwords"
    hint="Users will receive a reset link by email"
    name="reset-pw"
    value="reset-pw"
  />
  <Checkbox
    label="Allow users to unlock accounts"
    hint="Requires admin approval after 5 failed attempts"
    name="unlock"
    value="unlock"
  />
</CheckboxGroup>;
```

### Incorrect

```tsx
// Wrong: using CheckboxGroup for mutually exclusive options
<CheckboxGroup label="Preferred contact method">
  <Checkbox label="Email" value="email" />
  <Checkbox label="Phone" value="phone" />
</CheckboxGroup>
// Only one contact method makes sense at a time. Use RadioGroup.
```

```tsx
// Wrong: standalone Checkbox for an immediate setting toggle
<Checkbox label="Enable dark mode" isChecked={isDark} onChange={toggle} />
// This takes effect immediately with no submit step. Use Switch.
```

```tsx
// Wrong: applying isRequired to individual Checkbox items inside a group
<CheckboxGroup label="Notification channels">
  <Checkbox label="Email" name="email" value="email" isRequired />
</CheckboxGroup>
// Set isRequired on CheckboxGroup, not on the individual Checkbox.
```

```tsx
// Wrong: omitting label on CheckboxGroup
<CheckboxGroup>
  <Checkbox label="Option A" value="a" />
</CheckboxGroup>
// label is required on CheckboxGroup. Screen readers need it.
```

## Rules

- Always provide `label` on standalone `Checkbox`. Always provide `label` on `CheckboxGroup`.
- Place `Checkbox` elements as direct children of `CheckboxGroup`. Do not insert other elements between them.
- Order options logically (most-likely first, least-risky first). Never alphabetize — order breaks after translation.
- Set `isRequired` on `CheckboxGroup`, not on individual `Checkbox` children, when at least one selection is required.
- Use `validity` on an individual `Checkbox` only when that checkbox's state differs from the group's overall validity.
- `isIndeterminate` is visual-only. The checkbox submits as checked or unchecked based on `isChecked` / `isDefaultChecked`.
- Use sentence case for all labels. Omit trailing punctuation unless the label is a complete sentence.
- Write labels in the positive. Prefer "Turn on notifications" over "Turn off notifications."
- Default error messages: group → **"Select at least one option."** Single required checkbox → **"Select the checkbox to continue."**
- `isReadOnly` on `CheckboxGroup` automatically propagates to all children. You do not need to set it on each `Checkbox`.
- Disabled checkboxes are not submitted with the form. Read-only checkboxes are submitted.
- Use `isChecked` + `onChange` for controlled checkboxes. Use `isDefaultChecked` (without `isChecked`) for uncontrolled ones. Do not mix both on the same instance.
