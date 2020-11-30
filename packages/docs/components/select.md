---
template: component
id: component-select
title: Select
description: Often referred to as a “dropdown menu” this input triggers a menu of options a user can select.
lead: Often referred to as a “dropdown menu” this input triggers a menu of options a user can select. Country and state Selects are common examples.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_select.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/tVkWsXwnWICeguWhzX6Vwl/Inputs?node-id=476%3A3423
---

::: slot overview

## Anatomy

<Anatomy
  img="images/anatomy-select.svg"
/>

## Behavior

<Description>

Interacting with a Select displays a list of values to choose from. Choosing a value will override any previous selection and close the Select.

Odyssey also supports a Multi-Select variant that allows users to select many values.

To support expected functionality and behaviors, Select relies on the Choices.js library. Odyssey provides fallback styling when Choices.js isn't available.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-behavior" name="overview-behavior" required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-behavior">Destination star</label>
    </div>
  </fieldset>
</Visual>

## Variants

<Description>

Odyssey provides support for both single and multi-value Selects.

</Description>

### Single Select

<Description>

The default Select allows users to choose a single value from a list of options. Selecting another option will replace the first.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-single" name="overview-single" required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-single">Destination star</label>
    </div>
  </fieldset>
</Visual>

### Multi-Select

<Description>

The Multi-Select variant allows users to choose more than one value from the list of options.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-multi" name="overview-multi" multiple required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-multi">Destination star(s)</label>
    </div>
  </fieldset>
</Visual>

## States

<Description>

Select inputs support the following states: enabled, hover, focus, disabled, optional, and invalid.

</Description>

### Enabled

<Description>

Select inputs in their "normal" state are considered enabled. They are ready for user interaction.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-enabled" name="overview-enabled" required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-enabled">Destination star</label>
    </div>
  </fieldset>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the input.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex is-ods-select-hover">
      <select class="ods-select is-ods-input-hover" data-js-choices id="overview-hover" name="overview-hover" required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-hover">Destination star</label>
    </div>
  </fieldset>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the input with a pointer, keyboard, or voice.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex is-ods-select-focus">
      <select class="ods-select" data-js-choices id="overview-focus" name="overview-focus" required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-focus">Destination star</label>
    </div>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

The values of disabled inputs will not be submitted.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-disabled" name="overview-disabled" required disabled>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-disabled">Destination star</label>
    </div>
  </fieldset>
</Visual>

### Optional

<Description>

Odyssey assumes inputs are required by default. Optional inputs should be used to indicate when data is not required for the user to complete a task.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset" data-optional>
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

### Invalid

<Description>

The invalid state is for inputs with incorrect values or values of the wrong format.

When indicating a validation error, please use a Field Error label to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset" data-invalid>
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-invalid" name="overview-invalid" required data-invalid aria-describedby="overview-invalid-error">
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-invalid">Destination star</label>
      <aside class="ods-field--error" id="overview-invalid-error">
        <span class="u-visually-hidden">Error:</span>This does not appear to be a valid stellar object.
      </aside>
    </div>
  </fieldset>
</Visual>

## Usage

<Description>

Selects are most useful when users are  choosing between 7-15 options. For smaller sets, Radio Buttons are more  effective. For larger sets, a Text Input with autocompletion may be a  better fit.

Selects perform better when the options are familiar  to the user. If a user may be unfamiliar with their options or need to compare them, use Radio Buttons.

Select inputs should not have a default selected unless a majority of users will be choosing it.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-groups" name="overview-groups" required>
        <option></option>
        <optgroup label="Alpha Centauri system">
          <option value="proxima">Proxima Centauri</option>
          <option value="alpha-a">Alpha Centauri A</option>
          <option value="alpha-a">Alpha Centauri B</option>
        </optgroup>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <optgroup label="Sirius system">
          <option value="sirius-a">Sirius A</option>
          <option value="sirius-b">Sirius B</option>
        </optgroup>
      </select>
      <label class="ods-label" for="overview-groups">Destination star</label>
    </div>
  </fieldset>
</Visual>

### Option groups

<Description>

Options may be grouped within the Select list to help guide users. When doing this, consider that Choices will ignore any ungrouped items.

</Description>

## References

### Further Reading

- <a href="https://joshuajohnson.co.uk/Choices/">Choices.js documentation</a>

:::

::: slot html-scss

## Basic example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="example-1" name="example-1" required>
          <option></option>
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <option value="value-3">Option 3</option>
          <option value="value-4">Option 4</option>
          <option value="value-5">Option 5</option>
          <option value="value-6">Option 6</option>
        </select>
        <label class="ods-label" for="example-1">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="example-1" name="example-1" required>
        <option></option>
        <option value="value-1">Option 1</option>
        <option value="value-2">Option 2</option>
        <option value="value-3">Option 3</option>
        <option value="value-4">Option 4</option>
        <option value="value-5">Option 5</option>
        <option value="value-6">Option 6</option>
      </select>
      <label class="ods-label" for="example-1">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

## Multi-Select example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="example-2" name="example-2" multiple required>
          <option></option>
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <option value="value-3">Option 3</option>
          <option value="value-4">Option 4</option>
          <option value="value-5">Option 5</option>
          <option value="value-6">Option 6</option>
        </select>
        <label class="ods-label" for="example-2">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="example-2" name="example-2" multiple required>
        <option></option>
        <option value="value-1">Option 1</option>
        <option value="value-2">Option 2</option>
        <option value="value-3">Option 3</option>
        <option value="value-4">Option 4</option>
        <option value="value-5">Option 5</option>
        <option value="value-6">Option 6</option>
      </select>
      <label class="ods-label" for="example-2">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

## Option groups example


<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="example-3" name="example-3" required>
          <option></option>
          <optgroup label="Group 1">
            <option value="value-1-1">Option 1</option>
            <option value="value-1-2">Option 2</option>
            <option value="value-1-3">Option 3</option>
          </optgroup>
          <optgroup label="Group 2">
            <option value="value-2-1">Option 1</option>
            <option value="value-2-2">Option 2</option>
          </optgroup>
        </select>
        <label class="ods-label" for="example-3">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="example-3" name="example-3" required>
        <option></option>
        <optgroup label="Group 1">
          <option value="value-1-1">Option 1</option>
          <option value="value-1-2">Option 2</option>
          <option value="value-1-3">Option 3</option>
        </optgroup>
        <optgroup label="Group 2">
          <option value="value-2-1">Option 1</option>
          <option value="value-2-2">Option 2</option>
        </optgroup>
      </select>
      <label class="ods-label" for="example-3">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

## States

### Disabled

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="example-4" name="example-4" disabled required>
          <option></option>
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <option value="value-3" selected>Option 3</option>
          <option value="value-4">Option 4</option>
          <option value="value-5">Option 5</option>
          <option value="value-6">Option 6</option>
        </select>
        <label class="ods-label" for="example-4">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="example-4" name="example-4" disabled required>
        <option></option>
        <option value="value-1">Option 1</option>
        <option value="value-2">Option 2</option>
        <option value="value-3" selected>Option 3</option>
        <option value="value-4">Option 4</option>
        <option value="value-5">Option 5</option>
        <option value="value-6">Option 6</option>
      </select>
      <label class="ods-label" for="example-4">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

### Optional

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset" data-optional>
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="example-5" name="example-5">
          <option></option>
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <option value="value-3" selected>Option 3</option>
          <option value="value-4">Option 4</option>
          <option value="value-5">Option 5</option>
          <option value="value-6">Option 6</option>
        </select>
        <label class="ods-label" for="example-5">Field label <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset" data-optional>
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="example-5" name="example-5">
        <option></option>
        <option value="value-1">Option 1</option>
        <option value="value-2">Option 2</option>
        <option value="value-3" selected>Option 3</option>
        <option value="value-4">Option 4</option>
        <option value="value-5">Option 5</option>
        <option value="value-6">Option 6</option>
      </select>
      <label class="ods-label" for="example-5">Field label <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>

### Invalid

<Description>

Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset" data-invalid>
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="example-6" name="example-6" data-invalid required>
          <option></option>
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <option value="value-3" selected>Option 3</option>
          <option value="value-4">Option 4</option>
          <option value="value-5">Option 5</option>
          <option value="value-6">Option 6</option>
        </select>
        <label class="ods-label" for="example-6">Field label</label>
        <aside class="ods-field--error" id="overview-invalid-error">
          <span class="u-visually-hidden">Error:</span> Invalid error description
        </aside>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset" data-invalid>
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="example-6" name="example-6" data-invalid required>
        <option></option>
        <option value="value-1">Option 1</option>
        <option value="value-2">Option 2</option>
        <option value="value-3" selected>Option 3</option>
        <option value="value-4">Option 4</option>
        <option value="value-5">Option 5</option>
        <option value="value-6">Option 6</option>
      </select>
      <label class="ods-label" for="example-6">Field label</label>
      <aside class="ods-field--error" id="overview-invalid-error">
        <span class="u-visually-hidden">Error:</span> Invalid error description
      </aside>
    </div>
  </fieldset>
  ```
</figure>

:::
