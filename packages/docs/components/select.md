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
  img="/images/anatomy-select.svg"
/>

## Behavior

<Description>

Interacting with a Select displays a list of values to choose from. Choosing a value will override any previous selection and close the Select.

Odyssey also supports a Multi-Select variant that allows users to select many values.

To support expected functionality and behaviors, Select relies on the Choices.js library. Odyssey provides fallback styling when Choices.js isn't available.

</Description>

<Visual>
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
      <label class="ods-label" for="overview-behavior">Wormhole destination</label>
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

<Visual>
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
      <label class="ods-label" for="overview-single">Wormhole destination</label>
    </div>
  </fieldset>
</Visual>

### Multi-Select

<Description>

The Multi-Select variant allows users to choose more than one value from the list of options.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-multi" name="overview-multi" required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-multi">Wormhole destination</label>
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

<Visual>
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
      <label class="ods-label" for="overview-enabled">Wormhole destination</label>
    </div>
  </fieldset>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the input.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="overview-hover" name="overview-hover" required>
        <option></option>
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
      <label class="ods-label" for="overview-hover">Wormhole destination</label>
    </div>
  </fieldset>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the input with a pointer, keyboard, or voice.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
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
      <label class="ods-label" for="overview-focus">Wormhole destination</label>
    </div>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

The values of disabled inputs will not be submitted.

</Description>

<Visual>
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
      <label class="ods-label" for="overview-disabled">Wormhole destination</label>
    </div>
  </fieldset>
</Visual>

### Optional

<Description>

Odyssey assumes inputs are required by default. Optional inputs should be used to indicate when data is not required for the user to complete a task.

</Description>

<Visual>
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
      <label class="ods-label" for="overview-optional">Wormhole destination <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
</Visual>

### Invalid

<Description>

The invalid state is for inputs with incorrect values or values of the wrong format.

When indicating a validation error, please use a Field Error label to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

</Description>

<Visual>
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
      <label class="ods-label" for="overview-invalid">Wormhole destination</label>
      <aside class="ods-field--error" id="overview-invalid-error">
        <span class="u-visually-hidden">Error:</span>This does not appear to be a valid planetoid.
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

<Visual>
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
      <label class="ods-label" for="overview-groups">Wormhole destination</label>
    </div>
  </fieldset>
</Visual>

### Option groups

<Description>

Options may be grouped within the Select list to help guide users.

</Description>

## References

### Further Reading

:::

::: slot html-scss
## HTML & CSS
:::
