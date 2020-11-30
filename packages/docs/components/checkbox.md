---
template: component
id: component-checkbox
title: Checkbox
description: Checkboxes appear as a square shaped UI accompanied by a caption.
lead: Checkboxes appear as a square shaped UI accompanied by a caption. Checkboxes can be found in tables, forms, or in and around text inputs.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_checkbox.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/tVkWsXwnWICeguWhzX6Vwl/Inputs?node-id=476%3A3490
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-checkbox.svg"/>

## Behavior

<Description>

Users can click a Checkbox to make a choice and click it again to deselect an option. They allow users to select one or more options of something.

</Description>

<Visual>

  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Payload includes</legend>
    <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-1" value="tungsten" checked>
    <label class="ods-checkbox--label" for="overview-behavior-1">Tungsten rods</label>
    <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-2" value="filters" checked>
    <label class="ods-checkbox--label" for="overview-behavior-2">Oxygen filters</label>
    <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-3" value="fuel">
    <label class="ods-checkbox--label" for="overview-behavior-3">Liquid fuel</label>
    <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-4" value="crew">
    <label class="ods-checkbox--label" for="overview-behavior-4">Replacement crew</label>
  </fieldset>

</Visual>

## States

<Description>

Checkboxes support several states: enabled, hover, focus, disabled, invalid, required, and indeterminate.

</Description>

### Enabled

<Description>

Checkboxes in their "unchecked" state are considered enabled. They are ready for user interaction.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="overview-enabled" id="overview-enabled" value="overview-enabled">
    <label class="ods-checkbox--label" for="overview-enabled">Enable auto-docking</label>
  </fieldset>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the input.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="overview-hover" id="overview-hover" value="overview-hover">
    <label class="ods-checkbox--label is-ods-checkbox-hover" for="overview-hover">Enable auto-docking</label>
  </fieldset>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the input with a pointer, keyboard, or voice.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox is-ods-checkbox-focus" type="checkbox" name="overview-focus" id="overview-focus" value="overview-focus">
    <label class="ods-checkbox--label is-ods-checkbox-focus" for="overview-focus">Enable auto-docking</label>
  </fieldset>
</Visual>

### Checked

<Description>

Checked Checkboxes, sometimes referred to as "ticked", display a check to indicate the they are selected.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input checked class="ods-checkbox" type="checkbox" name="overview-checked" id="overview-checked" value="overview-checked">
    <label class="ods-checkbox--label" for="overview-checked">Enable auto-docking</label>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

Checkboxes are disabled individually. The values of disabled inputs will not be submitted.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="overview-disabled" value="overview-disabled" disabled>
    <label class="ods-checkbox--label" for="overview-disabled">Enable auto-docking</label>
  </fieldset>
</Visual>

### Invalid

<Description>

Checkboxes present as invalid when a required input is left unchecked or an incompatible choice has been made.

When indicating a validation error, please use a Field Error label to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

Unlike Radio Buttons, Checkboxes validate individually, not as a group.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Undocking Procedure</legend>
    <input class="ods-checkbox" type="checkbox" name="overview-invalid[]" id="overview-invalid-1" value="overview-invalid-1" checked>
    <label class="ods-checkbox--label" for="overview-invalid-1">Cycle airlock</label>
    <input checked class="ods-checkbox" type="checkbox" name="overview-invalid[]" id="overview-invalid-2" value="overview-invalid-2">
    <label class="ods-checkbox--label" for="overview-invalid-2">Disengage maglock</label>
    <input class="ods-checkbox" type="checkbox" name="overview-invalid[]" id="overview-invalid-3" value="overview-invalid-3" aria-describedby="overview-invalid-3-error" data-invalid checked>
    <label class="ods-checkbox--label" for="overview-invalid-3">Open the pod bay doors</label>
    <aside class="ods-field--error" id="overview-invalid-3-error">
      <span class="u-visually-hidden">Error:</span> I'm afraid I can't do that, Dave.
    </aside>
  </fieldset>
</Visual>

### Required

<Description>

Unlike other inputs, Odyssey assumes Checkboxes are optional by default.

Individual checkboxes can be set to required. This is useful when a user confirms they have read the terms of service.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="overview-required" id="overview-required" value="terms-accepted" checked required>
    <label class="ods-checkbox--label" for="overview-required">I understand the risks of space travel.</label>
  </fieldset>
</Visual>

### Indeterminate

<Description>

In the case of nested checkboxes, an indeterminate state may be required.

Note that this state is visual-only and will be submitted as either "checked" or "unchecked" depending on the design of your UI.

</Description>

<Visual>
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Hangar 18 inventory
    </figcaption>
    <table class="ods-table">
      <caption>A checklist for auditing facility storage.</caption>
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[all]" data-example-indeterminate value="check-all">
            <label class="ods-checkbox--label" for="checkbox-all">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </th>
          <th scope="column">Item</th>
          <th scope="column" class="is-ods-table-num">Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[0]" id="checkbox-0" value="check-0" checked>
            <label class="ods-checkbox--label" for="checkbox-0">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Tribbles</td>
          <td class="is-ods-table-num">8,514,877</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1" checked>
            <label class="ods-checkbox--label" for="checkbox-1">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Tiny flags</td>
          <td class="is-ods-table-num">2,780,400</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2">
            <label class="ods-checkbox--label" for="checkbox-2">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Moon rocks</td>
          <td class="is-ods-table-num">2,344,858</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

<script>
export default {
  mounted () {
    let checkbox = this.$el.querySelectorAll("[data-example-indeterminate]");

    checkbox.forEach((input) => {
      input.indeterminate = true;
    })
  }
}
</script>

:::

::: slot html-scss

## Basic example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Field legend label</legend>
      <input class="ods-checkbox" type="checkbox" name="example-0" id="example-0-1" value="value-1" checked>
      <label class="ods-checkbox--label" for="example-0-1">Label 1</label>
      <input class="ods-checkbox" type="checkbox" name="example-0" id="example-0-2" value="value-2">
      <label class="ods-checkbox--label" for="example-0-2">Label 2</label>
      <input class="ods-checkbox" type="checkbox" name="example-0" id="example-0-3" value="value-3">
      <label class="ods-checkbox--label" for="example-0-3">Label 3</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field legend label</legend>
    <input class="ods-checkbox" type="checkbox" name="example-0" id="label-1" value="value-1" checked>
    <label class="ods-checkbox--label" for="label-1">Label 1</label>
    <input class="ods-checkbox" type="checkbox" name="example-0" id="label-2" value="value-2">
    <label class="ods-checkbox--label" for="label-2">Label 2</label>
    <input class="ods-checkbox" type="checkbox" name="example-0" id="label-3" value="value-3">
    <label class="ods-checkbox--label" for="label-3">Label 3</label>
  </fieldset>
  ```

</figure>

### <span class="u-visually-hidden">Checkbox</span> Inline

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <input class="ods-checkbox" type="checkbox" name="example-1" id="example-1" value="terms-accepted" checked required>
      <label class="ods-checkbox--label" for="example-1">Inline label</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="example-1" id="example-1" value="terms-accepted" checked required>
    <label class="ods-checkbox--label" for="example-1">Inline label</label>
  </fieldset>
  ```
</figure>

### <span class="u-visually-hidden">Checkbox</span> State: Disabled

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Field legend label</legend>
      <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-1" value="value-1" checked disabled>
      <label class="ods-checkbox--label" for="example-2-1">Label 1</label>
      <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-2" value="value-2" disabled>
      <label class="ods-checkbox--label" for="example-2-2">Label 2</label>
      <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-3" value="value-3" disabled>
      <label class="ods-checkbox--label" for="example-2-3">Label 3</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field legend label</legend>
    <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-1" value="value-1" checked disabled>
    <label class="ods-checkbox--label" for="example-2-1">Label 1</label>
    <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-2" value="value-2" disabled>
    <label class="ods-checkbox--label" for="example-2-2">Label 2</label>
    <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-3" value="value-3" disabled>
    <label class="ods-checkbox--label" for="example-2-3">Label 3</label>
  </fieldset>
  ```
</figure>

### <span class="u-visually-hidden">Checkbox</span> State: Error

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Field legend label</legend>
      <input class="ods-checkbox" type="checkbox" name="example-3" id="example-3-1" value="value-1" checked data-invalid>
      <label class="ods-checkbox--label" for="example-3-1">Label 1</label>
      <input class="ods-checkbox" type="checkbox" name="example-3" id="example-3-2" value="value-2" data-invalid>
      <label class="ods-checkbox--label" for="example-3-2">Label 2</label>
      <input class="ods-checkbox" type="checkbox" name="example-3" id="example-3-3" value="value-3" data-invalid>
      <label class="ods-checkbox--label" for="example-3-3">Label 3</label>
      <aside class="ods-field--error" id="checkbox-invalid-error">Invalid error description</aside>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field legend label</legend>
    <input class="ods-checkbox" type="checkbox" name="example-3" id="example-3-1" value="value-1" checked data-invalid>
    <label class="ods-checkbox--label" for="example-3-1">Label 1</label>
    <input class="ods-checkbox" type="checkbox" name="example-3" id="example-3-2" value="value-2" data-invalid>
    <label class="ods-checkbox--label" for="example-3-2">Label 2</label>
    <input class="ods-checkbox" type="checkbox" name="example-3" id="example-3-3" value="value-3" data-invalid>
    <label class="ods-checkbox--label" for="example-3-3">Label 3</label>
    <aside class="ods-field--error" id="checkbox-invalid-error">Invalid error description</aside>
  </fieldset>
  ```
</figure>

:::
