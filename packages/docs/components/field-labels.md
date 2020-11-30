---
template: component
id: component-field-labels
title: Field Labels
description: These captions help make forms more accessible.
lead: These captions help make forms more accessible by providing context to the user. They can be used with all Odyssey inputs.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_label.scss
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-field-label.svg" />

## Usage

<Description>

Field labels provide textual affordances and context for Odyssey's various inputs. Our UI Kit provides these labels alongside each component.

Please refer to individual components for complete documentation. These examples are provided for quick illustration.

</Description>

### Label

<Description>

Labels caption pieces of UI, typically form fields. They are required for all inputs. When related to sets of Radios or Checkboxes, they may also be referred to as "legends".

Keep labels to a word or two so users can quickly scan the form. Always use sentence casing.

</Description>

<Visual content="full">
  <form>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" id="overview-label" required>
        <label class="ods-label" for="overview-label">Destination</label>
      </div>
    </fieldset>
  </form>
</Visual>

### Field hint

<Description>

Use field hints to provide context, formatting help, or other guidelines to the user. Do not use the placeholder attribute for these purposes.

Limit hints to a short sentence. If additional context is required, it should be provided outside the Field.

</Description>

<Visual>
  <fieldset class="ods-fieldset" aria-describedby="field-hint">
    <legend class="ods-input-legend">Select speed</legend>
    <aside class="ods-field--hint" id="field-hint">
      None of these are achievable... yet.
    </aside>
    <input class="ods-radio" type="radio" name="overview-hint" id="overview-hint-1" value="1" required>
    <label class="ods-radio--label" for="overview-hint-1">Lightspeed</label>
    <input class="ods-radio" type="radio" name="overview-hint" id="roverview-hint-2" value="2" required checked>
    <label class="ods-radio--label" for="overview-hint-2">Warp Speed</label>
    <input class="ods-radio" type="radio" name="overview-hint" id="overview-hint-3" value="3" required>
    <label class="ods-radio--label" for="overview-hint-3">Ludicrous Speed</label>
  </fieldset>
</Visual>

### Error messages

<Description>

Invalid fields should include an inline message to explain the error.

If possible, describe how the error may be resolved.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="overview-error" id="overview-error" value="terms-accepted" aria-describedby="checkbox-invalid-error" required data-invalid>
    <label class="ods-checkbox--label" for="overview-error">I understand the risks of space travel.</label>
    <aside class="ods-field--error" id="checkbox-invalid-error">You must acknowledge the dangers before proceeding.</aside>
  </fieldset>
</Visual>

### Optional fields

<Description>

Odyssey assumes inputs are required by default. Optional labels should be used to indicate when data is not required for the user to complete a task.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-optional" name="overview-optional">
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-optional">Destination star <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
</Visual>

:::

::: slot html-scss

## Usage

<Description>

Please refer to individual components for complete documentation. These examples are provided for quick illustration.

</Description>

### Label

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="example-0" id="example-0" spellcheck="false" value="Input value" required>
        <label class="ods-label" for="example-0">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="example-0" id="example-0" spellcheck="false" value="Input value" required>
      <label class="ods-label" for="example-0">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

### Field hint

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset" aria-describedby="ods-field-hint">
      <legend class="ods-input-legend">Field label</legend>
      <aside class="ods-field--hint" id="field-hint">
        This is a field hint.
      </aside>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-0" value="value-0" required checked>
      <label class="ods-radio--label" for="example-1-0">Label 1</label>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-1" value="value-1" required>
      <label class="ods-radio--label" for="example-1-1">Label 2</label>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-2" value="value-2" required>
      <label class="ods-radio--label" for="example-1-2">Label 3</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset"  aria-describedby="ods-field-hint">
    <legend class="ods-input-legend">Field label</legend>
    <aside class="ods-field--hint" id="field-hint">
      This is a field hint.
    </aside>
    <input class="ods-radio" type="radio" name="example-1" id="example-1-0" value="value-0" required checked>
      <label class="ods-radio--label" for="example-1-0">Label 1</label>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-1" value="value-1" required>
      <label class="ods-radio--label" for="example-1-1">Label 2</label>
      <input class="ods-radio" type="radio" name="example-1" id="example-1-2" value="value-2" required>
      <label class="ods-radio--label" for="example-1-2">Label 3</label>
  </fieldset>
  ```

</figure>

### Error messages

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Field legend label</legend>
      <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-1" value="value-1" checked data-invalid>
      <label class="ods-checkbox--label" for="example-2-1">Label 1</label>
      <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-2" value="value-2" data-invalid>
      <label class="ods-checkbox--label" for="example-2-2">Label 2</label>
      <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-3" value="value-3" data-invalid>
      <label class="ods-checkbox--label" for="example-2-3">Label 3</label>
      <aside class="ods-field--error" id="checkbox-invalid-error"><span class="u-visually-hidden">Error:</span> Invalid error description</aside>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Field legend label</legend>
    <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-1" value="value-1" checked data-invalid>
    <label class="ods-checkbox--label" for="example-2-1">Label 1</label>
    <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-2" value="value-2" data-invalid>
    <label class="ods-checkbox--label" for="example-2-2">Label 2</label>
    <input class="ods-checkbox" type="checkbox" name="example-2" id="example-2-3" value="value-3" data-invalid>
    <label class="ods-checkbox--label" for="example-2-3">Label 3</label>
    <aside class="ods-field--error" id="checkbox-invalid-error"><span class="u-visually-hidden">Error:</span> Invalid error description</aside>
  </fieldset>
  ```
</figure>

### Optional fields

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset" data-optional>
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="example-3" name="example-3" required>
          <option></option>
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <option value="value-3" selected>Option 3</option>
          <option value="value-4">Option 4</option>
          <option value="value-5">Option 5</option>
          <option value="value-6">Option 6</option>
        </select>
        <label class="ods-label" for="example-3">Field label <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset" data-optional>
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="example-3" name="example-3" required>
        <option></option>
        <option value="value-1">Option 1</option>
        <option value="value-2">Option 2</option>
        <option value="value-3" selected>Option 3</option>
        <option value="value-4">Option 4</option>
        <option value="value-5">Option 5</option>
        <option value="value-6">Option 6</option>
      </select>
      <label class="ods-label" for="example-3">Field label <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>
