---
template: component
id: component-radio-button
title: Radio Button
description: Radios appear as a ring shaped UI accompanied by a caption that allows the user to choose only one option at a time.
lead:
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
  img="/images/anatomy-radio-button.svg"
/>

## Behavior

<Description>

Radio Buttons allow users to select one option from a set. Users can click a Radio to make a choice; selecting another will deselect the last.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Select speed</legend>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0" required>
    <label class="ods-radio--label" for="radio-0-glazed">Lightspeed</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-boston-cream" value="3" required checked>
    <label class="ods-radio--label" for="radio-0-boston-cream">Warp Speed</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-homer" value="3" required>
    <label class="ods-radio--label" for="radio-0-homer">Ludicrous Speed</label>
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
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0" required>
    <label class="ods-radio--label" for="radio-0-glazed">Warp speed</label>
  </fieldset>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the input.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0" required>
    <label class="ods-radio--label is-ods-radio-hover" for="radio-0-glazed">Warp speed</label>
  </fieldset>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the input with a pointer, keyboard, or voice.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio is-ods-radio-focus" type="radio" name="question-0" id="radio-0-glazed" value="0" required>
    <label class="ods-radio--label" for="radio-0-glazed">Warp speed</label>
  </fieldset>
</Visual>

### Checked

<Description>

Checked Radios display a blue fill to indicate the they are selected.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0" required checked>
    <label class="ods-radio--label" for="radio-0-glazed">Warp speed</label>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

Radios are disabled by option.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0" required disabled>
    <label class="ods-radio--label" for="radio-0-glazed">Warp speed</label>
  </fieldset>
</Visual>

### Optional

<Description>

Odyssey assumes inputs are required by default. Optional inputs should be used to indicate when data is not required for the user to complete a task.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Select speed  <span class="ods-label--optional">Optional</span></legend>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0">
    <label class="ods-radio--label" for="radio-0-glazed">Lightspeed</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-boston-cream" value="3" checked>
    <label class="ods-radio--label" for="radio-0-boston-cream">Warp Speed</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-homer" value="3">
    <label class="ods-radio--label" for="radio-0-homer">Ludicrous Speed</label>
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
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0" required data-invalid checked>
    <label class="ods-radio--label" for="radio-0-glazed">Lightspeed</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-boston-cream" value="3" required data-invalid>
    <label class="ods-radio--label" for="radio-0-boston-cream">Warp Speed</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-homer" value="3" required data-invalid>
    <label class="ods-radio--label" for="radio-0-homer">Ludicrous Speed</label>
    <aside class="ods-field--error" id="checkbox-invalid-error">The general theory of relativity forbids it.</aside>
  </fieldset>
</Visual>

:::

::: slot html-scss

## Basic example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Which of the following is the largest?</legend>
      <input class="ods-radio" type="radio" name="radio" id="radio-peanut" value="peanut" required checked>
      <label class="ods-radio--label" for="radio-peanut">A peanut</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-elephant" value="elephant" required>
      <label class="ods-radio--label" for="radio-elephant">An elephant</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-moon" value="moon" required>
      <label class="ods-radio--label" for="radio-moon">The moon</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-tennis-ball" value="tennis-ball" required>
      <label class="ods-radio--label" for="radio-tennis-ball">A tennis ball</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Which of the following is the largest?</legend>
    <input class="ods-radio" type="radio" name="radio" id="radio-peanut" value="peanut" required checked>
    <label class="ods-radio--label" for="radio-peanut">A peanut</label>
    <input class="ods-radio" type="radio" name="radio" id="radio-elephant" value="elephant" required>
    <label class="ods-radio--label" for="radio-elephant">An elephant</label>
    <input class="ods-radio" type="radio" name="radio" id="radio-moon" value="moon" required>
    <label class="ods-radio--label" for="radio-moon">The moon</label>
    <input class="ods-radio" type="radio" name="radio" id="radio-tennis-ball" value="tennis-ball" required>
    <label class="ods-radio--label" for="radio-tennis-ball">A tennis ball</label>
  </fieldset>
  ```

</figure>

## <span class="u-visually-hidden">radio</span> State: Disabled

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Which of the following is the largest?</legend>
      <input class="ods-radio" type="radio" name="radio" id="radio-peanut" value="peanut" required checked>
      <label class="ods-radio--label" for="radio-peanut">A peanut</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-elephant" value="elephant" required>
      <label class="ods-radio--label" for="radio-elephant">An elephant</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-moon" value="moon" required>
      <label class="ods-radio--label" for="radio-moon">The moon</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-tennis-ball" value="tennis-ball" required>
      <label class="ods-radio--label" for="radio-tennis-ball">A tennis ball</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Which of the following is the largest?</legend>
      <input class="ods-radio" type="radio" name="radio" id="radio-peanut" value="peanut" required checked>
      <label class="ods-radio--label" for="radio-peanut">A peanut</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-elephant" value="elephant" required>
      <label class="ods-radio--label" for="radio-elephant">An elephant</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-moon" value="moon" required>
      <label class="ods-radio--label" for="radio-moon">The moon</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-tennis-ball" value="tennis-ball" required>
      <label class="ods-radio--label" for="radio-tennis-ball">A tennis ball</label>
  </fieldset>
  ```
</figure>

## <span class="u-visually-hidden">radio</span> State: Error

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Which of the following is the largest?</legend>
      <input class="ods-radio" type="radio" name="radio" id="radio-peanut" value="peanut" required checked>
      <label class="ods-radio--label" for="radio-peanut">A peanut</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-elephant" value="elephant" required>
      <label class="ods-radio--label" for="radio-elephant">An elephant</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-moon" value="moon" required>
      <label class="ods-radio--label" for="radio-moon">The moon</label>
      <input class="ods-radio" type="radio" name="radio" id="radio-tennis-ball" value="tennis-ball" required>
      <label class="ods-radio--label" for="radio-tennis-ball">A tennis ball</label>
      <aside class="ods-field--error" id="radio-invalid-error">This field is required.</aside>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Which of the following is the largest?</legend>
    <input class="ods-radio" type="radio" name="radio" id="radio-peanut" value="peanut" required checked>
    <label class="ods-radio--label" for="radio-peanut">A peanut</label>
    <input class="ods-radio" type="radio" name="radio" id="radio-elephant" value="elephant" required>
    <label class="ods-radio--label" for="radio-elephant">An elephant</label>
    <input class="ods-radio" type="radio" name="radio" id="radio-moon" value="moon" required>
    <label class="ods-radio--label" for="radio-moon">The moon</label>
    <input class="ods-radio" type="radio" name="radio" id="radio-tennis-ball" value="tennis-ball" required>
    <label class="ods-radio--label" for="radio-tennis-ball">A tennis ball</label>

    <aside class="ods-field--error" id="radio-invalid-error">This field is required.</aside>
  </fieldset>
  ```
</figure>

:::
