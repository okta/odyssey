---
label: Radio & RadioGroup
description: Allow users to make a single selection from a group of two or more mutually exclusive options.
---

# Radio & RadioGroup

RadioGroup wraps two or more Radio buttons to present mutually exclusive options as a cohesive unit. Radio represents one selectable option within the group.

## When to use

- Display all possible options so users can compare them without needing to interact with the component.
- Allow the user to select exactly one option from a fixed list.
- Present two or more mutually exclusive options that are specific or require context.

## When NOT to use

- **Use Checkbox instead** — when multiple options can be selected simultaneously. Checkboxes are independent of one another.
- **Use Select instead** — when there are more than five options; a dropdown avoids overwhelming the user.
- **Use Switch instead** — when there are exactly two binary, mutually exclusive options.

## Anatomy

A RadioGroup is composed of:

- **RadioGroup label** (required in code, can be hidden visually): Describes the group of options and helps users make a selection.
- **Group hint text** (optional): Clarifies the group or explains the set of options.
- **Radio input**: The circular control for each option.
- **Radio item label** (required): Describes the individual option. Together with the radio input, this makes one radio button.
- **Input hint text** (optional): Provides more information about a single radio option.

<!-- TODO: confirm if inline layout (radio buttons on the same horizontal line with hidden group label) is prop-driven or CSS-only; check Figma component for a matching prop — design.md describes an "Inline" variant but no corresponding prop exists in the current RadioGroupProps source -->

## Props

### RadioGroup

| Name                | Type                                                            | Default | Description                                                                             |
| ------------------- | --------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `children`          | `ReactNode`                                                     | —       | **Required.** Radio components within the group. Must include two or more.              |
| `label`             | `string`                                                        | —       | **Required.** Text label for the RadioGroup. Always required even when hidden visually. |
| `defaultValue`      | `string`                                                        | —       | Value of the Radio that should be selected by default (uncontrolled).                   |
| `value`             | `string`                                                        | —       | Currently selected value (controlled).                                                  |
| `onChange`          | `(event: ChangeEvent<HTMLInputElement>, value: string) => void` | —       | Callback fired when the selected value changes.                                         |
| `errorMessage`      | `string`                                                        | —       | Error message shown below the group. Apply here, not on individual Radio items.         |
| `errorMessageList`  | `string[]`                                                      | —       | Multiple error messages shown below the group.                                          |
| `hint`              | `string`                                                        | —       | Group-level helper text.                                                                |
| `HintLinkComponent` | `ReactElement<typeof HintLink>`                                 | —       | Link rendered at the end of the group hint text.                                        |
| `id`                | `string`                                                        | —       | ID of the `input` element.                                                              |
| `isDisabled`        | `boolean`                                                       | —       | Disables all Radio options in the group.                                                |
| `isReadOnly`        | `boolean`                                                       | `false` | Prevents value changes; selection remains visible and focusable.                        |
| `name`              | `string`                                                        | —       | Name attribute for the input group. Defaults to `id` if not set.                        |
| `ariaDescribedBy`   | `string`                                                        | —       | IDs of elements that describe the group.                                                |
| `testId`            | `string`                                                        | —       | `data-se` test attribute.                                                               |
| `translate`         | `string`                                                        | —       | HTML `translate` attribute.                                                             |

### Radio

| Name         | Type                                       | Default | Description                                                                               |
| ------------ | ------------------------------------------ | ------- | ----------------------------------------------------------------------------------------- |
| `label`      | `string`                                   | —       | **Required.** Label text for the Radio.                                                   |
| `value`      | `string`                                   | —       | **Required.** Value attribute of the Radio.                                               |
| `hint`       | `string`                                   | —       | Helper text specific to this individual Radio option.                                     |
| `id`         | `string`                                   | —       | ID of the `input` element.                                                                |
| `isChecked`  | `boolean`                                  | —       | Whether the Radio is checked.                                                             |
| `isDisabled` | `boolean`                                  | —       | Prevents interaction with this Radio option.                                              |
| `isInvalid`  | `boolean`                                  | —       | Marks this Radio as having an invalid value. Prefer `errorMessage` on RadioGroup instead. |
| `isReadOnly` | `boolean`                                  | —       | Prevents value changes while still rendering the option as visible.                       |
| `name`       | `string`                                   | —       | Name attribute of the input element.                                                      |
| `inputRef`   | `React.RefObject<FocusHandle>`             | —       | Ref forwarded to the Radio input for programmatic focus.                                  |
| `onChange`   | `MuiRadioProps["onChange"]`                | —       | Callback fired when the Radio value changes.                                              |
| `onBlur`     | `MuiFormControlLabelProps["onBlur"]`       | —       | Callback fired when the blur event occurs.                                                |
| `onClick`    | `React.MouseEventHandler<HTMLSpanElement>` | —       | Click event handler.                                                                      |
| `testId`     | `string`                                   | —       | `data-se` test attribute.                                                                 |
| `translate`  | `string`                                   | —       | HTML `translate` attribute.                                                               |

## Examples

### Correct

#### Default

```tsx
<RadioGroup label="Speed">
  <Radio label="Light Speed" value="Light Speed" />
  <Radio label="Warp Speed" value="Warp Speed" />
  <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
</RadioGroup>
```

#### With group hint text

```tsx
<RadioGroup hint="Select the speed at which you wish to travel." label="Speed">
  <Radio label="Light Speed" value="Light Speed" />
  <Radio label="Warp Speed" value="Warp Speed" />
  <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
</RadioGroup>
```

#### With hint link

```tsx
<RadioGroup
  hint="Select the speed at which you wish to travel."
  HintLinkComponent={<Link href="#link">Learn more</Link>}
  label="Speed"
>
  <Radio label="Light Speed" value="Light Speed" />
  <Radio label="Warp Speed" value="Warp Speed" />
  <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
</RadioGroup>
```

#### With per-Radio hint text

```tsx
<RadioGroup label="Speed">
  <Radio hint="Hint text" label="Snail Speed" value="Snail Speed" />
  <Radio hint="Hint text" label="Turtle Speed" value="Turtle Speed" />
  <Radio hint="Hint text" label="Rabbit Speed" value="Rabbit Speed" />
</RadioGroup>
```

#### With error message

```tsx
<RadioGroup errorMessage="This field is required." label="Speed">
  <Radio label="Light Speed" value="Light Speed" />
  <Radio label="Warp Speed" value="Warp Speed" />
  <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
</RadioGroup>
```

#### Read-only

```tsx
<RadioGroup isReadOnly defaultValue="Warp Speed" label="Speed">
  <Radio label="Light Speed" value="Light Speed" />
  <Radio label="Warp Speed" value="Warp Speed" />
  <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
</RadioGroup>
```

#### Individually disabled Radio option

Use `Radio isDisabled` only when a specific option is unavailable. Use `RadioGroup isDisabled` to disable all options at once.

```tsx
<RadioGroup label="Service Tier">
  <Radio label="Basic" value="basic" />
  <Radio label="Standard" value="standard" />
  <Radio
    isDisabled
    label="Premium (Unavailable in your region)"
    value="premium"
  />
</RadioGroup>
```

#### Controlled

```tsx
import { ChangeEvent, useCallback, useState } from "react";
import { Radio, RadioGroup } from "@okta/odyssey-react-mui";

function C() {
  const [value, setValue] = useState("Ludicrous Speed");
  const onChange = useCallback(
    (_event: ChangeEvent<HTMLInputElement>, newValue: string) =>
      setValue(newValue),
    [],
  );
  return (
    <RadioGroup label="Speed" value={value} onChange={onChange}>
      <Radio label="Light Speed" value="Light Speed" />
      <Radio label="Warp Speed" value="Warp Speed" />
      <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
    </RadioGroup>
  );
}
```

### Incorrect

```tsx
{
  /* ❌ Radio rendered outside a RadioGroup — always wrap in RadioGroup */
}
<Radio label="Light Speed" value="Light Speed" />;
```

```tsx
{
  /* ❌ Validation on individual Radio — apply errorMessage to RadioGroup instead */
}
<RadioGroup label="Speed">
  <Radio isInvalid label="Light Speed" value="Light Speed" />
  <Radio label="Warp Speed" value="Warp Speed" />
</RadioGroup>;
```

```tsx
{
  /* ❌ Only one Radio in a group — always provide two or more */
}
<RadioGroup label="Speed">
  <Radio label="Light Speed" value="Light Speed" />
</RadioGroup>;
```

## Rules

- Always wrap Radio inside RadioGroup. Never render a Radio in isolation.
- Provide two or more Radio components in every RadioGroup.
- Apply `errorMessage` on RadioGroup, not on individual Radio items.
- Use `defaultValue` for uncontrolled groups and `value` + `onChange` for controlled groups. Do not mix both patterns on the same RadioGroup.
- Use `RadioGroup isDisabled` to disable all options simultaneously. Use `Radio isDisabled` only when a specific option is unavailable.
- Order options logically: most likely or safest first, riskiest last. Never alphabetical — alphabetical order does not hold after translation.
- Write Radio labels in sentence case. Keep labels concise and ensure options do not overlap (e.g., 0–20, 21–40, not 0–20, 20–40).
- Include a "None" Radio option if users must be able to withhold an answer.
- Use the group-level `hint` prop to describe the whole group. Use per-Radio `hint` only for context that applies to a single option.
- The `label` prop on RadioGroup is always required — even when the label is visually hidden for inline layouts. The label is still rendered as screen reader text.
- Default error message: **Select an option.**
