---
label: Fields
description: Input controls for collecting text, selections, and search queries.
---

# Fields

Fields are the primary mechanism for user input. Six components form this family — they share a common prop surface (`FieldComponentProps`) and consistent behavior for labels, hints, error states, and disabled/read-only modes.

## Choosing a field component

```
Does the user need to type free text?
├── Sensitive credential (password, PIN) → PasswordField
├── Searching or filtering a data set → SearchField
└── General text, number, email, URL, phone → TextField

Does the user select from a predefined list?
├── Needs to type to filter a long or growing list → Autocomplete
├── Mobile-first or needs native browser picker → NativeSelect
└── Standard styled dropdown → Select
```

---

## Shared field behavior

All field components except `SearchField` extend `FieldComponentProps`. Use these shared props consistently across the family.

### Shared props

| Prop                | Type           | Default | Description                                                                                           |
| ------------------- | -------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `errorMessage`      | `string`       | —       | Single error message displayed below the input.                                                       |
| `errorMessageList`  | `string[]`     | —       | Multiple error messages displayed below the input.                                                    |
| `hint`              | `string`       | —       | Helper text rendered between the label and the input.                                                 |
| `HintLinkComponent` | `ReactElement` | —       | A `HintLink` appended at the end of `hint`.                                                           |
| `id`                | `string`       | —       | `id` attribute on the underlying `input`.                                                             |
| `isDisabled`        | `boolean`      | `false` | Prevents interaction. Disabled field values are not submitted in forms.                               |
| `isFullWidth`       | `boolean`      | `false` | Stretches the field to fill its container.                                                            |
| `isOptional`        | `boolean`      | `false` | Renders an "(Optional)" indicator after the label. Fields are required by default.                    |
| `isReadOnly`        | `boolean`      | `false` | Prevents editing. Read-only field values are submitted in forms. Users can select and copy the value. |
| `name`              | `string`       | —       | `name` attribute on the underlying `input`. Defaults to `id` when omitted.                            |

### Shared states

- **Error**: display inline validation as soon as the field loses focus or a selection is made. Remove the error state the moment the value becomes valid, even if the user is still editing. Error messages appear below the input and never replace hint text.
- **Disabled**: use to block interaction when a field is temporarily unavailable. Make the reason clear from surrounding context.
- **Read-only**: use when data must be visible but not editable. The value participates in form submission.
- **Optional**: mark optional fields explicitly — all fields are required by default.

### Shared content rules

- **Label**: every field requires a label. Use sentence case (e.g. "First name", not "First Name"). Keep labels to one to five words. Use nouns, not instructions ("Name", not "Enter a name"). Do not use a colon.
- **Hint text**: use to clarify the label or provide format guidance. Keep to one sentence. Do not restate the label.
- **Error text**: tell the user what to enter, not just that they made an error. Format: "Enter your [field label]" for missing input, "Enter a complete [field label], such as [example]" for format errors.
- **Placeholder text**: avoid — it disappears when the user starts typing and fails accessibility guidelines. If used, never put required instructions in a placeholder.

---

## TextField

`TextField` accepts short-form or long-form free text including email, number, telephone, and URL inputs.

### When to use

- When the user needs to input information not limited to a preset list of options.
- When the user can enter information faster by typing than by making a selection.
- When collecting email addresses, URLs, phone numbers, numeric values, or open-ended text.

### When NOT to use

- When input must come from a predefined list of values. Use `Select`, `NativeSelect`, or `Autocomplete`.
- When building a search or filter experience. Use `SearchField`.
- When collecting a password or sensitive credential. Use `PasswordField`.

### Variants

| `type`                    | Use for                                                      |
| ------------------------- | ------------------------------------------------------------ |
| `"text"` (default)        | General free text                                            |
| `"email"`                 | Email addresses — triggers email keyboard on mobile          |
| `"number"`                | Numeric values — use `min`, `max`, `step` to constrain range |
| `"tel"`                   | Phone numbers — triggers phone keyboard on mobile            |
| `"url"`                   | URLs — triggers URL keyboard on mobile                       |
| multiline (`isMultiline`) | Long-form text that wraps onto multiple lines                |

### Adornments

| Adornment  | Prop                            | Use for                                           |
| ---------- | ------------------------------- | ------------------------------------------------- |
| Start text | `startAdornment` (string)       | Prefixes like "$", "USD", "https://", "+1"        |
| End text   | `endAdornment` (string)         | Suffixes like ".com", "kg"                        |
| Start icon | `startAdornment` (ReactElement) | Visual clarity icons (decorative only, no action) |
| End icon   | `endAdornment` (ReactElement)   | Visual clarity icons (decorative only, no action) |
| End button | `endAdornment` (ReactElement)   | Action limited to the field (e.g. clear, copy)    |

### Props

| Prop                               | Type                                              | Default  | Description                                                    |
| ---------------------------------- | ------------------------------------------------- | -------- | -------------------------------------------------------------- |
| `label`                            | `string`                                          | —        | **Required.** Label text for the input.                        |
| `type`                             | `"email" \| "number" \| "tel" \| "text" \| "url"` | `"text"` | HTML input type.                                               |
| `isMultiline`                      | `boolean`                                         | `false`  | Renders a `TextareaAutosize` for multi-line input.             |
| `value`                            | `string`                                          | —        | Controlled value.                                              |
| `defaultValue`                     | `string`                                          | —        | Initial value for uncontrolled usage.                          |
| `placeholder`                      | `string`                                          | —        | Placeholder text (avoid — see shared content rules).           |
| `startAdornment`                   | `string \| ReactElement`                          | —        | Prepended adornment.                                           |
| `endAdornment`                     | `string \| ReactElement`                          | —        | Appended adornment.                                            |
| `autoCompleteType`                 | `string`                                          | —        | HTML `autocomplete` attribute value.                           |
| `inputMode`                        | `string`                                          | —        | HTML `inputmode` attribute — controls keyboard type on mobile. |
| `min`                              | `number`                                          | —        | Minimum value for `type="number"`.                             |
| `max`                              | `number`                                          | —        | Maximum value for `type="number"`.                             |
| `step`                             | `number`                                          | —        | Step interval for `type="number"`.                             |
| `hasInitialFocus`                  | `boolean`                                         | —        | Focuses the input on mount.                                    |
| `inputRef`                         | `React.RefObject<FocusHandle>`                    | —        | Ref forwarded to the input for programmatic focus.             |
| `onBlur`                           | `FocusEventHandler`                               | —        | Fired when the input loses focus.                              |
| `onChange`                         | `ChangeEventHandler`                              | —        | Fired when the value changes.                                  |
| `onFocus`                          | `FocusEventHandler`                               | —        | Fired when the input gains focus.                              |
| `ariaDescribedBy`                  | `string`                                          | —        | Additional `aria-describedby` target IDs.                      |
| `testId`                           | `string`                                          | —        | `data-se` attribute for test selectors.                        |
| `translate`                        | `string`                                          | —        | HTML `translate` attribute.                                    |
| + all shared `FieldComponentProps` | —                                                 | —        | See shared props table above.                                  |

### Examples

#### Correct

```tsx
import { TextField } from "@okta/odyssey-react-mui";

// Basic required text field
<TextField label="Username" />

// Email field with autocomplete hint
<TextField
  label="Work email"
  type="email"
  autoCompleteType="work email"
  hint="Enter the email address associated with your Okta account."
/>

// Number field with range constraints
<TextField
  label="Session timeout"
  type="number"
  min={5}
  max={43200}
  step={1}
  hint="Minutes before an inactive session expires (5–43200)."
  endAdornment="min"
/>

// Multi-line description field
<TextField
  label="Description"
  isMultiline
  isOptional
  hint="Briefly describe the purpose of this resource."
/>

// Controlled field with error
<TextField
  label="Group name"
  value={groupName}
  onChange={(event) => setGroupName(event.target.value)}
  errorMessage={groupNameError}
/>

// URL field with prefix adornment
<TextField
  label="Subdomain"
  type="url"
  startAdornment="https://"
  endAdornment=".okta.com"
/>
```

#### Incorrect

```tsx
// Wrong — using TextField for a predefined list
<TextField label="Country" placeholder="Select a country" />
// Right — use Select when options are predefined

// Wrong — putting instructions in placeholder instead of hint
<TextField label="Email" placeholder="Enter your work email address" />
// Right — put instructions in the hint prop

// Wrong — using TextField for password input
<TextField label="Password" type="password" />
// Right — use PasswordField for sensitive credentials

// Wrong — missing label
<TextField placeholder="Search…" />
// Right — always provide a label (use SearchField for search)
```

### Rules

- Provide a `label` on every `TextField`.
- Use `type="email"`, `type="tel"`, or `type="url"` when the expected format matches — this activates the correct mobile keyboard.
- Use `type="number"` with `min`, `max`, and `step` to constrain numeric input.
- Use `isMultiline` for free-form paragraphs or multi-line content.
- Use adornments only for static prefixes/suffixes or icons. Use a button adornment only for actions scoped to the field (clear, toggle visibility).
- Do not use `TextField` when input must come from a fixed list — use `Select` or `Autocomplete`.
- Do not use `TextField` for password fields — use `PasswordField`.

<!-- TODO: add Do/Don't visual examples -->

---

## PasswordField

`PasswordField` collects sensitive credentials. It provides a show/hide toggle so users can verify their entry.

### When to use

- When collecting a password, PIN, or other sensitive credential.
- When the user needs to create or update a password.

### When NOT to use

- When the input is not a credential. Use `TextField`.

### Props

| Prop                               | Type                                   | Default | Description                                                                                                         |
| ---------------------------------- | -------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `label`                            | `string`                               | —       | **Required.** Label text for the input.                                                                             |
| `hasShowPassword`                  | `boolean`                              | `true`  | Shows the show/hide visibility toggle. Set to `false` only when legally prohibited (e.g. government compliance).    |
| `autoCompleteType`                 | `"current-password" \| "new-password"` | —       | HTML `autocomplete` value. Use `"new-password"` for registration/reset flows, `"current-password"` for login flows. |
| `value`                            | `string`                               | —       | Controlled value.                                                                                                   |
| `defaultValue`                     | `string`                               | —       | Initial value for uncontrolled usage.                                                                               |
| `placeholder`                      | `string`                               | —       | Placeholder text (avoid — see shared content rules).                                                                |
| `hasInitialFocus`                  | `boolean`                              | —       | Focuses the input on mount.                                                                                         |
| `inputRef`                         | `React.RefObject<FocusHandle>`         | —       | Ref for programmatic focus.                                                                                         |
| `onBlur`                           | `FocusEventHandler`                    | —       | Fired when the input loses focus.                                                                                   |
| `onChange`                         | `ChangeEventHandler`                   | —       | Fired when the value changes.                                                                                       |
| `onFocus`                          | `FocusEventHandler`                    | —       | Fired when the input gains focus.                                                                                   |
| `ariaDescribedBy`                  | `string`                               | —       | Additional `aria-describedby` target IDs.                                                                           |
| `testId`                           | `string`                               | —       | `data-se` attribute for test selectors.                                                                             |
| `translate`                        | `string`                               | —       | HTML `translate` attribute.                                                                                         |
| + all shared `FieldComponentProps` | —                                      | —       | See shared props table above.                                                                                       |

### Examples

#### Correct

```tsx
import { PasswordField } from "@okta/odyssey-react-mui";

// Login form — current password
<PasswordField
  label="Password"
  autoCompleteType="current-password"
/>

// Registration form — new password with validation hints
<PasswordField
  label="New password"
  autoCompleteType="new-password"
  hint="At least 8 characters, one uppercase, one number."
  errorMessageList={passwordErrors}
/>

// Compliance scenario — hide show/hide toggle
<PasswordField
  label="Government PIN"
  hasShowPassword={false}
/>
```

#### Incorrect

```tsx
// Wrong — using TextField with type="password"
<TextField label="Password" type="password" />
// Right — use PasswordField, which includes the show/hide toggle and correct autocomplete semantics

// Wrong — hiding the toggle without a legal/compliance reason
<PasswordField label="Password" hasShowPassword={false} />
// Right — leave hasShowPassword={true} (the default) unless required by legal or security policy
```

### Rules

- Use `PasswordField` for all credential inputs — never `TextField` with `type="password"`.
- Set `autoCompleteType="new-password"` for creation/reset flows and `"current-password"` for authentication flows to help password managers.
- Set `hasShowPassword={false}` only when displaying the password is legally prohibited. The show/hide toggle is required for usability under WCAG 2.2.
- Use `errorMessageList` to surface multiple password validation errors simultaneously rather than one at a time.

---

## SearchField

`SearchField` lets users enter a word or phrase to discover content or filter a data set. It has a fixed search icon and an optional clear button — it does not support error states.

### When to use

- To search an entire site or application (global search).
- To find or filter data in a large or complex data set such as a data table.

### When NOT to use

- When filtering a long list of predefined options. Use `Autocomplete`.
- When the data set is small and visible on one screen without searching.

### Variants

| `variant`             | Background | Use when                                        |
| --------------------- | ---------- | ----------------------------------------------- |
| `"outline"` (default) | White      | The field appears on a gray/colored background. |
| `"filled"`            | Gray       | The field appears on a white background.        |

The variant is detected automatically based on background context in most placements. Set it manually only when the automatic detection does not match your layout.

### Props

| Prop               | Type                    | Default     | Description                                                                                       |
| ------------------ | ----------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `label`            | `string`                | —           | **Required.** Accessible label (visually hidden — the search icon identifies the field visually). |
| `variant`          | `"outline" \| "filled"` | `"outline"` | Visual style. `"filled"` provides a gray background for white-background contexts.                |
| `value`            | `string`                | —           | Controlled value.                                                                                 |
| `defaultValue`     | `string`                | —           | Initial value. When set, the clear button appears.                                                |
| `placeholder`      | `string`                | —           | Optional hint text visible before the user types. Default: "Search…".                             |
| `isDisabled`       | `boolean`               | `false`     | Prevents interaction.                                                                             |
| `isFullWidth`      | `boolean`               | `false`     | Stretches to fill the container.                                                                  |
| `onClear`          | `() => void`            | —           | Fired when the clear (×) button is pressed.                                                       |
| `onChange`         | `ChangeEventHandler`    | —           | Fired when the value changes.                                                                     |
| `onBlur`           | `FocusEventHandler`     | —           | Fired when the input loses focus.                                                                 |
| `onFocus`          | `FocusEventHandler`     | —           | Fired when the input gains focus.                                                                 |
| `hasInitialFocus`  | `boolean`               | —           | Focuses the input on mount.                                                                       |
| `tabIndex`         | `number`                | —           | HTML `tabindex` override.                                                                         |
| `id`               | `string`                | —           | `id` of the `input`.                                                                              |
| `name`             | `string`                | —           | `name` attribute.                                                                                 |
| `autoCompleteType` | `string`                | —           | HTML `autocomplete` attribute.                                                                    |
| `ariaDescribedBy`  | `string`                | —           | Additional `aria-describedby` target IDs.                                                         |
| `testId`           | `string`                | —           | `data-se` attribute for test selectors.                                                           |
| `translate`        | `string`                | —           | HTML `translate` attribute.                                                                       |

> **Note:** `SearchField` does not support `errorMessage`, `errorMessageList`, `hint`, `HintLinkComponent`, `isOptional`, or `isReadOnly`. If a search returns no results, display a user-action empty state, not an error.

### Examples

#### Correct

```tsx
import { SearchField } from "@okta/odyssey-react-mui";

// Global search — label is accessible but not visible
<SearchField label="Search" />

// Scoped search with custom placeholder
<SearchField
  label="Search"
  placeholder="Search realms"
  isFullWidth
/>

// Controlled search with clear callback
<SearchField
  label="Search"
  value={query}
  onChange={(event) => setQuery(event.target.value)}
  onClear={() => setQuery("")}
/>

// Filled variant for white backgrounds
<SearchField label="Search" variant="filled" />
```

#### Incorrect

```tsx
// Wrong — using TextField to build a search experience
<TextField label="Search" startAdornment={<SearchIcon />} />
// Right — use SearchField, which includes the correct ARIA role and clear button behavior

// Wrong — hiding the label entirely in code (not just visually)
// The label prop is required for accessibility even though it's visually hidden.
<SearchField />
// Right — always provide label="Search" or a more specific accessible label
```

### Rules

- Always provide a `label` — it is visually hidden but required for screen readers.
- Use `placeholder` to clarify the scope of the search (e.g. "Search realms", "Search users"). Keep it short.
- Implement `onClear` whenever `value` is controlled so the clear button removes the value.
- Do not use `SearchField` for filtering a predefined option list — use `Autocomplete`.
- Do not attempt to show error states on `SearchField` — display an empty state instead when no results are found.

---

## Select

`Select` renders a styled dropdown allowing single or multiple selection from a predefined list of options.

### When to use

- When the user must choose from four or more predefined options.
- When there is not enough space to display all options inline (radio group).

### When NOT to use

- When the list is long and the user needs to type to filter it. Use `Autocomplete`.
- When there are two or three options. Use a radio group to reduce cognitive load.
- When a mobile-native picker experience is required. Use `NativeSelect`.

### Variants

| Mode                    | Prop                         | Description                                                                                                                                                                  |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single select (default) | `hasMultipleChoices={false}` | User selects one option. Menu closes on selection.                                                                                                                           |
| Multi-select            | `hasMultipleChoices={true}`  | User selects multiple options. Menu stays open until dismissed.                                                                                                              |
| Inline                  | (layout)                     | Appears on the same horizontal line as another field. Label can be hidden. Use only for non-validated interactions (sorting, pagination). Do not use inline Select in forms. |
| Native                  | → use `NativeSelect`         | —                                                                                                                                                                            |

### Props

| Prop                               | Type                           | Default | Description                                                                                                                       |
| ---------------------------------- | ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `label`                            | `string`                       | —       | **Required.** Label text.                                                                                                         |
| `options`                          | `(string \| SelectOption)[]`   | —       | **Required.** List of options. Pass strings for simple lists; pass `SelectOption` objects for groups, headings, or custom values. |
| `hasMultipleChoices`               | `boolean`                      | —       | Enables multi-selection.                                                                                                          |
| `isMultiSelect`                    | `boolean`                      | —       | **Deprecated.** Use `hasMultipleChoices` instead.                                                                                 |
| `value`                            | `string \| string[]`           | —       | Controlled selected value(s).                                                                                                     |
| `defaultValue`                     | `string \| string[]`           | —       | Initial selected value(s) for uncontrolled usage.                                                                                 |
| `inputRef`                         | `React.RefObject<FocusHandle>` | —       | Ref for programmatic focus.                                                                                                       |
| `onBlur`                           | function                       | —       | Fired when the Select loses focus.                                                                                                |
| `onChange`                         | function                       | —       | Fired when the selection changes.                                                                                                 |
| `onFocus`                          | function                       | —       | Fired when the Select gains focus.                                                                                                |
| `ariaDescribedBy`                  | `string`                       | —       | Additional `aria-describedby` target IDs.                                                                                         |
| `testId`                           | `string`                       | —       | `data-se` attribute.                                                                                                              |
| `translate`                        | `string`                       | —       | HTML `translate` attribute.                                                                                                       |
| + all shared `FieldComponentProps` | —                              | —       | See shared props table above.                                                                                                     |

**`SelectOption` type:**

```ts
type SelectOption = {
  text: string; // Display text
  value?: string; // Submit value (defaults to text)
  type?: "heading" | "option"; // "heading" renders a non-selectable group label
  language?: string; // Language tag for the option text
};
```

### Examples

#### Correct

```tsx
import { Select } from "@okta/odyssey-react-mui";

// Simple string options
<Select
  label="Country"
  options={["Canada", "Mexico", "United States"]}
/>

// Object options with explicit values
<Select
  label="Role"
  hint="Select the access level for this admin."
  options={[
    { text: "Super Administrator", value: "SUPER_ADMIN" },
    { text: "Group Administrator", value: "GROUP_ADMIN" },
    { text: "Read Only Administrator", value: "READ_ONLY_ADMIN" },
  ]}
/>

// Grouped options with heading
<Select
  label="Region"
  options={[
    { text: "Americas", type: "heading" },
    { text: "Canada", value: "CA" },
    { text: "United States", value: "US" },
    { text: "Europe", type: "heading" },
    { text: "Germany", value: "DE" },
    { text: "United Kingdom", value: "GB" },
  ]}
/>

// Multi-select
<Select
  label="Allowed grant types"
  hasMultipleChoices
  options={["Authorization Code", "Implicit", "Client Credentials", "Device Authorization"]}
  value={grantTypes}
  onChange={handleGrantTypeChange}
/>

// Controlled with error
<Select
  label="Security question"
  options={securityQuestions}
  value={selectedQuestion}
  onChange={handleQuestionChange}
  errorMessage={questionError}
/>
```

#### Incorrect

```tsx
// Wrong — using deprecated isMultiSelect
<Select label="Roles" isMultiSelect options={roles} />
// Right — use hasMultipleChoices

// Wrong — using Select for two options
<Select label="Status" options={["Active", "Inactive"]} />
// Right — use a radio group for two to three options

// Wrong — using Select when user needs to type to filter
<Select label="User" options={allUsers} />
// Right — use Autocomplete when the list is long and filterable
```

### Rules

- Provide a `label` on every `Select`.
- Use `SelectOption` objects with explicit `value` fields when the submit value differs from the display text.
- Use `type: "heading"` options (not disabled options) to create non-selectable group labels.
- Use `hasMultipleChoices` (not the deprecated `isMultiSelect`) for multi-selection.
- Order options logically: most-used first, then alphabetically, or by increasing value.
- Use `hint` to clarify what the user should select, not to restate the label.
- Do not use inline Select in forms — only use it for non-validated interactions like sorting.

<!-- TODO: add Do/Don't visual examples for label wording -->

---

## NativeSelect

`NativeSelect` delegates rendering to the browser's native `<select>` element. Appearance and behavior are controlled by the operating system.

### When to use

- When the experience is primarily mobile — native selects provide the platform's native picker UI.
- When there are performance constraints — native select is lighter than the custom Select.

### When NOT to use

- When a consistent cross-platform visual style is required. Use `Select`.
- When the user needs to filter a long list by typing. Use `Autocomplete`.
- When two or three options are available. Use a radio group.

### Props

| Prop                                          | Type                                                 | Default | Description                                                                                                   |
| --------------------------------------------- | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `label`                                       | `string`                                             | —       | **Required.** Label text.                                                                                     |
| `children`                                    | `ReactElement<"option"> \| ReactElement<"optgroup">` | —       | Native `<option>` and `<optgroup>` elements. Use when you need full native HTML control over the option list. |
| `hasMultipleChoices`                          | `boolean`                                            | —       | Enables multi-selection.                                                                                      |
| `isMultiSelect`                               | `boolean`                                            | —       | **Deprecated.** Use `hasMultipleChoices` instead.                                                             |
| `autoCompleteType`                            | `string`                                             | —       | HTML `autocomplete` attribute.                                                                                |
| `value`                                       | `string \| string[]`                                 | —       | Controlled selected value(s).                                                                                 |
| `defaultValue`                                | `string \| string[]`                                 | —       | Initial value for uncontrolled usage.                                                                         |
| `inputRef`                                    | `React.RefObject<FocusHandle>`                       | —       | Ref for programmatic focus.                                                                                   |
| `onBlur`                                      | function                                             | —       | Fired when the NativeSelect loses focus.                                                                      |
| `onChange`                                    | function                                             | —       | Fired when the selection changes.                                                                             |
| `onFocus`                                     | function                                             | —       | Fired when the NativeSelect gains focus.                                                                      |
| `ariaDescribedBy`                             | `string`                                             | —       | Additional `aria-describedby` target IDs.                                                                     |
| `testId`                                      | `string`                                             | —       | `data-se` attribute.                                                                                          |
| `translate`                                   | `string`                                             | —       | HTML `translate` attribute.                                                                                   |
| + `FieldComponentProps` (except `isReadOnly`) | —                                                    | —       | See shared props table above. `NativeSelect` does not support `isReadOnly`.                                   |

> **Note:** `NativeSelect` does not support `isReadOnly`. Use `Select` when a read-only dropdown is required.

### Examples

#### Correct

```tsx
import { NativeSelect } from "@okta/odyssey-react-mui";

// Basic usage with children
<NativeSelect label="Country">
  <option value="">Select a country</option>
  <option value="CA">Canada</option>
  <option value="MX">Mexico</option>
  <option value="US">United States</option>
</NativeSelect>

// With optgroup
<NativeSelect label="Region">
  <optgroup label="Americas">
    <option value="CA">Canada</option>
    <option value="US">United States</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="DE">Germany</option>
    <option value="GB">United Kingdom</option>
  </optgroup>
</NativeSelect>
```

#### Incorrect

```tsx
// Wrong — using NativeSelect when a consistent styled dropdown is required
<NativeSelect label="Role" />
// Right — use Select for styled, cross-platform dropdowns

// Wrong — using deprecated isMultiSelect
<NativeSelect label="Roles" isMultiSelect>...</NativeSelect>
// Right — use hasMultipleChoices
```

### Rules

- Use `NativeSelect` for mobile-first experiences or where native browser behavior is preferred.
- Use `<optgroup>` for grouping — not heading-type options as in `Select`.
- Use `hasMultipleChoices` (not the deprecated `isMultiSelect`) for multi-selection.
- Do not expect `isReadOnly` — `NativeSelect` does not support it; use `Select` when read-only mode is needed.

---

## Autocomplete

`Autocomplete` is an input that filters a list of options as the user types. It supports single and multiple selection, optional free-form value entry, and virtualization for large option sets.

### When to use

- To filter or narrow down a long list of options, or one expected to grow over time.
- To find a specific value within a list.
- To suggest similar or previous searches when the list changes dynamically.

### When NOT to use

- When the list is short and stable. Use `Select` to reduce complexity.
- When a native picker experience is required. Use `NativeSelect`.
- When there are two or three options. Use a radio group.

### Variants

| Mode                    | Props                         | Description                                                                                     |
| ----------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| Single select (default) | —                             | User types to filter; selects one item; popover closes. Selected item is removed from the list. |
| Multi-select            | `hasMultipleChoices={true}`   | User selects multiple items; popover stays open. Selected items are removed from the list.      |
| Free-form               | `isCustomValueAllowed={true}` | User can type values not in the list. Default error copy: "Select or add an item."              |
| Inline                  | (layout)                      | Appears on the same horizontal line as another field. Label can be hidden.                      |

### Props

| Prop                                          | Type                                                 | Default        | Description                                                                                        |
| --------------------------------------------- | ---------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| `label`                                       | `string`                                             | —              | **Required.** Label text.                                                                          |
| `options`                                     | `ReadonlyArray<OptionType>`                          | —              | **Required.** Array of option values. Can be strings or objects.                                   |
| `hasMultipleChoices`                          | `boolean`                                            | —              | Enables multi-selection.                                                                           |
| `isCustomValueAllowed`                        | `boolean`                                            | —              | Enables free-form (free-solo) entry of values not in `options`.                                    |
| `isDisabled`                                  | `boolean`                                            | —              | Disables the input.                                                                                |
| `isLoading`                                   | `boolean`                                            | —              | Shows a loading indicator while options populate.                                                  |
| `isReadOnly`                                  | `boolean`                                            | —              | Prevents editing.                                                                                  |
| `isVirtualized`                               | `boolean`                                            | `false`        | Enables list virtualization. Set to `true` for option lists in the hundreds or more.               |
| `value`                                       | —                                                    | —              | Controlled selected value(s).                                                                      |
| `defaultValue`                                | —                                                    | —              | Initial value for uncontrolled usage.                                                              |
| `inputValue`                                  | `string`                                             | —              | Controlled value of the text input (separate from the selection).                                  |
| `noOptionsText`                               | `string`                                             | `"No options"` | Text displayed when no options match the current input.                                            |
| `getOptionLabel`                              | `(option: OptionType) => string`                     | —              | Extracts the display string from an option object. Required when `options` is an array of objects. |
| `getIsOptionEqualToValue`                     | `(option: OptionType, value: OptionType) => boolean` | —              | Custom equality check. Required when `options` is an array of objects.                             |
| `onBlur`                                      | function                                             | —              | Fired when the Autocomplete loses focus.                                                           |
| `onChange`                                    | function                                             | —              | Fired when a selection is made.                                                                    |
| `onFocus`                                     | function                                             | —              | Fired when the Autocomplete gains focus.                                                           |
| `onInputChange`                               | function                                             | —              | Fired when the user types in the text input.                                                       |
| `ariaDescribedBy`                             | `string`                                             | —              | Additional `aria-describedby` target IDs.                                                          |
| `testId`                                      | `string`                                             | —              | `data-se` attribute.                                                                               |
| `translate`                                   | `string`                                             | —              | HTML `translate` attribute.                                                                        |
| + `FieldComponentProps` (except `isDisabled`) | —                                                    | —              | See shared props table above.                                                                      |

> **Note:** `Autocomplete` exposes `isDisabled` directly (not from `FieldComponentProps`) because it wraps MUI Autocomplete's `disabled` prop.

### Examples

#### Correct

```tsx
import { Autocomplete } from "@okta/odyssey-react-mui";

// String options — single select
<Autocomplete
  label="Country"
  options={["Canada", "Mexico", "United States"]}
/>

// Object options — requires getOptionLabel and getIsOptionEqualToValue
<Autocomplete
  label="Assignee"
  options={users}
  getOptionLabel={(user) => user.displayName}
  getIsOptionEqualToValue={(option, value) => option.id === value.id}
  value={assignee}
  onChange={(_, newValue) => setAssignee(newValue)}
/>

// Multi-select
<Autocomplete
  label="Tags"
  options={availableTags}
  hasMultipleChoices
  value={selectedTags}
  onChange={(_, newValue) => setSelectedTags(newValue)}
/>

// Free-form entry
<Autocomplete
  label="Email domain"
  options={knownDomains}
  isCustomValueAllowed
  hint="Select a known domain or type a custom one."
/>

// Loading state for async options
<Autocomplete
  label="User"
  options={searchResults}
  isLoading={isSearching}
  onInputChange={(_, query) => searchUsers(query)}
/>

// Large option list with virtualization
<Autocomplete
  label="Timezone"
  options={allTimezones}
  isVirtualized
  getOptionLabel={(tz) => tz.label}
  getIsOptionEqualToValue={(option, value) => option.id === value.id}
/>
```

#### Incorrect

```tsx
// Wrong — object options without getOptionLabel
<Autocomplete label="User" options={users} />
// Right — provide getOptionLabel and getIsOptionEqualToValue when options are objects

// Wrong — using Autocomplete for a short stable list
<Autocomplete label="Status" options={["Active", "Inactive", "Suspended"]} />
// Right — use Select for short, stable option lists

// Wrong — not providing noOptionsText for async search
<Autocomplete label="User" options={[]} isLoading={false} />
// Right — set noOptionsText="No users found" so the empty state is informative
```

### Rules

- Provide a `label` on every `Autocomplete`.
- Provide `getOptionLabel` and `getIsOptionEqualToValue` whenever `options` contains objects — MUI strict equality will not match object references correctly without them.
- Set `isVirtualized={true}` for option lists in the hundreds or more to avoid rendering performance issues.
- Set `noOptionsText` to a user-facing message that matches the domain (e.g. "No users found") rather than leaving the default "No options".
- Use `isLoading` while async options are being fetched so users see the loading state instead of an empty list.
- Use `isCustomValueAllowed` only when the product explicitly needs free-form values beyond the predefined list.

<!-- TODO: add Do/Don't visual examples -->
<!-- TODO: expand virtualization guidance when Storybook example is available -->
