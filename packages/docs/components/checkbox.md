---
template: component
id: component-checkbox
title: Checkbox
description: Typically shown in sets, Checkboxes appear as a square shaped UI accompanied by a caption.
lead: Typically shown in sets, Checkboxes appear as a square shaped UI accompanied by a caption. Checkboxes can be found in tables, forms, or in and around text inputs.
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

<Anatomy
  img="/images/anatomy-checkbox.svg"
/>

## Behavior

<Description>

Users can click a Checkbox to make a choice and click it again to deselect an option. They allow users to select one or more options of something.

</Description>

<Visual>

  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Payload includes</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-2" value="example-2" checked>
    <label class="ods-checkbox--label" for="example-2">Tungsten rods</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-3" value="example-3" checked>
    <label class="ods-checkbox--label" for="example-3">Oxygen filters</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-3" value="example-3">
    <label class="ods-checkbox--label" for="example-3">Liquid fuel</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-3" value="example-3">
    <label class="ods-checkbox--label" for="example-3">Replacement crew</label>
  </fieldset>

</Visual>

## States

<Description>

There are six Checkbox states: Checked, unchecked, disabled, invalid, optional/required, and indeterminate.

</Description>

### Checked

<Description>

Checked Checkboxes, sometimes referred to as "ticked", display a check to indicate the they are selected.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input checked class="ods-checkbox" type="checkbox" name="checkbox" id="example-1" value="example-1">
    <label class="ods-checkbox--label" for="example-1">Enable auto-docking</label>
  </fieldset>
</Visual>

### Unchecked

<Description>

Unchecked Checkboxes appear as stated above as a rounded rectangle with white fill. This indicates that the Checkbox is not selected.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-1" value="example-1">
    <label class="ods-checkbox--label" for="example-1">Allow low-oxygen mix</label>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

Checkboxes are disabled individually. The values of disabled inputs will not be submitted.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-0" value="example-0" disabled>
    <label class="ods-checkbox--label" for="example-0">Open pod bay doors</label>
  </fieldset>
</Visual>

### Invalid

<Description>

Checkboxes present as invalid when a required input is left unchecked or some other criteria isn’t met.

Unlike Radio Buttons, Checkboxes validate individually, not as a group.

Visually, they appear in an error red color.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Undocking Procedure</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-0" value="example-0" checked>
    <label class="ods-checkbox--label" for="example-0">Cycle airlock</label>
    <input checked class="ods-checkbox" type="checkbox" name="checkbox" id="example-1" value="example-1">
    <label class="ods-checkbox--label" for="example-1">Disengage maglock</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-1" value="example-1" data-invalid checked>
    <label class="ods-checkbox--label" for="example-1">Release docking clamps</label>
    <aside class="ods-field--error" id="checkbox-invalid-error">Clamp C is still engaged.</aside>
  </fieldset>
</Visual>

### Required

<Description>

Unlike other inputs, Odyssey assumes Checkboxes are optional by default.

Individual checkboxes can be set to required. This is useful when a user confirms they have read the terms of service.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" checked required>
    <label class="ods-checkbox--label" for="checkbox-required">I understand the risks of space travel.</label>
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
          <td>Hermetic seals</td>
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
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="label-1" value="value-1" checked>
      <label class="ods-checkbox--label" for="label-1">Label 1</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="label-2" value="value-2">
      <label class="ods-checkbox--label" for="label-2">Label 2</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="label-3" value="value-3">
      <label class="ods-checkbox--label" for="label-3">Label 3</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field legend label</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="label-1" value="value-1" checked>
    <label class="ods-checkbox--label" for="label-1">Label 1</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="label-2" value="value-2">
    <label class="ods-checkbox--label" for="label-2">Label 2</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="label-3" value="value-3">
    <label class="ods-checkbox--label" for="label-3">Label 3</label>
  </fieldset>
  ```

</figure>

## <span class="u-visually-hidden">Checkbox</span> Inline

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" checked required>
      <label class="ods-checkbox--label" for="checkbox-required">I agree to share the donut assortment.</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" checked required>
    <label class="ods-checkbox--label" for="checkbox-required">I agree to share the donut assortment.</label>
  </fieldset>
  ```
</figure>

## <span class="u-visually-hidden">Checkbox</span> State: Disabled

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" disabled>
      <label class="ods-checkbox--label" for="checkbox-required">I agree to share the donut assortment.</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" disabled>
    <label class="ods-checkbox--label" for="checkbox-required">I agree to share the donut assortment.</label>
  </fieldset>
  ```
</figure>

## <span class="u-visually-hidden">Checkbox</span> State: Error

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
    <input class="ods-checkbox" data-invalid type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" required>
      <label class="ods-checkbox--label" for="checkbox-required">I agree to share the donut assortment.</label>
      <aside class="ods-field--error" id="checkbox-invalid-error">This field is required.</aside>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" data-invalid type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" required>
    <label class="ods-checkbox--label" for="checkbox-required">I agree to share the donut assortment.</label>

    <aside class="ods-field--error" id="checkbox-invalid-error">This field is required.</aside>
  </fieldset>
  ```
</figure>

:::
