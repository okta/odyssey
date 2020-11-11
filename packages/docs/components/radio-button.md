---
template: component
id: component-radio-button
title: Radio Button
description: Radios appear as a ring shaped UI accompanied by a caption that allows the user to choose only one option at a time.
lead: Radios appear as a ring shaped UI accompanied by a caption that allows the user to choose only one option at a time.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_radio-button.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/tVkWsXwnWICeguWhzX6Vwl/Inputs?node-id=476%3A4173
---

::: slot overview

## Anatomy

<Anatomy
  img="images/anatomy-radio-button.svg"
/>

## Behavior

<Description>

Radio Buttons allow users to select one option from a set. Users can click a Radio to make a choice; selecting another will deselect the last.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Select speed</legend>
    <input class="ods-radio" type="radio" name="overview-behavior" id="overview-behavior-1" value="1" required>
    <label class="ods-radio--label" for="overview-behavior-1">Lightspeed</label>
    <input class="ods-radio" type="radio" name="overview-behavior" id="overview-behavior-2" value="2" required checked>
    <label class="ods-radio--label" for="overview-behavior-2">Warp Speed</label>
    <input class="ods-radio" type="radio" name="overview-behavior" id="overview-behavior-3" value="3" required>
    <label class="ods-radio--label" for="overview-behavior-3">Ludicrous Speed</label>
  </fieldset>
</Visual>

## States

<Description>

There are fives Checkbox states: enabled, hover, focus, disabled, invalid, and optional.

</Description>

### Enabled

<Description>

Radio Buttons in their "unchecked" state are considered enabled. They are ready for user interaction.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio" type="radio" name="overview-enabled" id="overview-enabled" value="0" required>
    <label class="ods-radio--label" for="overview-enabled">Warp speed</label>
  </fieldset>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the input.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio" type="radio" name="overview-hover" id="overview-hover" value="0" required>
    <label class="ods-radio--label is-ods-radio-hover" for="overview-hover">Warp speed</label>
  </fieldset>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the input with a pointer, keyboard, or voice.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio is-ods-radio-focus" type="radio" name="overview-focus" id="overview-focus" value="0" required>
    <label class="ods-radio--label" for="overview-focus">Warp speed</label>
  </fieldset>
</Visual>

### Checked

<Description>

Checked Radios display a blue fill to indicate the they are selected.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio" type="radio" name="overview-checked" id="overview-checked" value="0" required checked>
    <label class="ods-radio--label" for="overview-checked">Warp speed</label>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

Radios are disabled by option.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio" type="radio" name="overview-disabled" id="overview-disabled" value="0" required disabled>
    <label class="ods-radio--label" for="overview-disabled">Warp speed</label>
  </fieldset>
</Visual>

### Optional

<Description>

Odyssey assumes inputs are required by default. Optional inputs should be used to indicate when data is not required for the user to complete a task.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Select speed  <span class="ods-label--optional">Optional</span></legend>
    <input class="ods-radio" type="radio" name="overview-optional[]" id="overview-optional-1" value="1">
    <label class="ods-radio--label" for="overview-optional-1">Lightspeed</label>
    <input class="ods-radio" type="radio" name="overview-optional[]" id="overview-optional-2" value="2" checked>
    <label class="ods-radio--label" for="overview-optional-2">Warp Speed</label>
    <input class="ods-radio" type="radio" name="overview-optional[]" id="overview-optional-3" value="3">
    <label class="ods-radio--label" for="overview-optional-3">Ludicrous Speed</label>
  </fieldset>
</Visual>

### Invalid

<Description>

Radios present as invalid when a required input is left unchecked or an incompatible choice has been made.

When indicating a validation error, please use a Field Error label to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

Unlike Checkboxes, Radios validate as a group, not individually.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Select speed</legend>
    <input class="ods-radio" type="radio" name="overview-invalid[]" id="overview-invalid-1" value="1" required data-invalid checked>
    <label class="ods-radio--label" for="overview-invalid-1">Lightspeed</label>
    <input class="ods-radio" type="radio" name="overview-invalid[]" id="overview-invalid-2" value="2" required data-invalid>
    <label class="ods-radio--label" for="overview-invalid-2">Warp Speed</label>
    <input class="ods-radio" type="radio" name="overview-invalid[]" id="overview-invalid-3" value="3" aria-describedby="overview-invalid-error" required data-invalid>
    <label class="ods-radio--label" for="overview-invalid-3">Ludicrous Speed</label>
    <aside class="ods-field--error" id="overview-invalid-error"><span class="u-visually-hidden">Error:</span> General relativity forbids it.</aside>
  </fieldset>
</Visual>

:::

::: slot html-scss

## Basic example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Field label</legend>
      <input class="ods-radio" type="radio" name="example-0" id="example-0-0" value="value-0" required checked>
      <label class="ods-radio--label" for="example-0-0">Label 1</label>
      <input class="ods-radio" type="radio" name="example-0" id="example-0-1" value="value-1" required>
      <label class="ods-radio--label" for="example-0-1">Label 2</label>
      <input class="ods-radio" type="radio" name="example-0" id="example-0-2" value="value-2" required>
      <label class="ods-radio--label" for="example-0-2">Label 3</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field label</legend>
    <input class="ods-radio" type="radio" name="group-name" id="input-0" value="value-0" required checked>
    <label class="ods-radio--label" for="input-0">Label 1</label>
    <input class="ods-radio" type="radio" name="group-name" id="input-1" value="value-1" required>
    <label class="ods-radio--label" for="input-1">Label 2</label>
    <input class="ods-radio" type="radio" name="group-name" id="input-2" value="value-2" required>
    <label class="ods-radio--label" for="input-2">Label 3</label>
  </fieldset>
  ```

</figure>

## <span class="u-visually-hidden">radio</span> State: Disabled

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Field label</legend>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-0" value="value-0" disabled required checked>
      <label class="ods-radio--label" for="example-1-0">Label 1</label>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-1" value="value-1" disabled required>
      <label class="ods-radio--label" for="example-1-1">Label 2</label>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-2" value="value-2" disabled required>
      <label class="ods-radio--label" for="example-1-2">Label 3</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field label</legend>
    <input class="ods-radio" type="radio" name="group-name" id="input-0" value="value-0" disabled required checked>
    <label class="ods-radio--label" for="input-0">Label 1</label>
    <input class="ods-radio" type="radio" name="group-name" id="input-1" value="value-1" disabled required>
    <label class="ods-radio--label" for="input-1">Label 2</label>
    <input class="ods-radio" type="radio" name="group-name" id="input-2" value="value-2" disabled required>
    <label class="ods-radio--label" for="input-2">Label 3</label>
  </fieldset>
  ```
</figure>

## <span class="u-visually-hidden">radio</span> State: Error

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Field label</legend>
      <input class="ods-radio" type="radio" name="example-2" id="example-2-0" value="value-0" aria-describedby="group-name-error" data-invalid required checked>
      <label class="ods-radio--label" for="example-2-0">Label 1</label>
      <input class="ods-radio" type="radio" name="example-2" id="example-2-1" value="value-1" data-invalid required>
      <label class="ods-radio--label" for="example-2-1">Label 2</label>
      <input class="ods-radio" type="radio" name="example-2" id="example-2-2" value="value-2" data-invalid required>
      <label class="ods-radio--label" for="example-2-2">Label 3</label>
      <aside class="ods-field--error" id="group-name-error"><span class="u-visually-hidden">Error:</span> This is an invalid selection.</aside>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field label</legend>
    <input class="ods-radio" type="radio" name="group-name" id="input-0" value="value-0" aria-describedby="group-name-error" data-invalid required checked>
    <label class="ods-radio--label" for="input-0">Label 1</label>
    <input class="ods-radio" type="radio" name="group-name" id="input-1" value="value-1" data-invalid required>
    <label class="ods-radio--label" for="input-1">Label 2</label>
    <input class="ods-radio" type="radio" name="group-name" id="input-2" value="value-2" data-invalid required>
    <label class="ods-radio--label" for="input-2">Label 3</label>
    <aside class="ods-field--error" id="group-name-error"><span class="u-visually-hidden">Error:</span> This is an invalid selection.</aside>
  </fieldset>
  ```
</figure>

:::
