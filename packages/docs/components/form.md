---
template: component
id: component-form
title: Form
description:
lede:
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

## Kitchen Sink

This form provides a "kitchen sink" example while defining styles and component structure.

<Visual layout="wide">
  <form class="ods-form">
    <header class="ods-form--header">
      <h1 class="ods-form--title">Interplanetary flight registration</h1>
      <p class="ods-form--desc">Complete this form in order to register for your interplanetary transfer.</p>
    </header>
    <section class="ods-form--error">
      <aside class="ods-infobox is-ods-infobox-danger" role="alert">
        <span class="ods-infobox--icon">
          <OdsIcon icon="error"></OdsIcon>
        </span>
        <h1 class="ods-infobox--title">Safety checks have failed</h1>
        <section class="ods-infobox--content">
          <p>An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.</p>
        </section>
      </aside>
    </section>
    <section class="ods-form--main">
      <fieldset class="ods-field-group">
        <legend class="ods-field-group--title">A Group of Fields</legend>
        <p class="ods-field-group--desc">This is a description of the FieldGroup.</p>
        <section class="ods-field-group--error">
        </section>
        <fieldset class="ods-field">
          <legend class="ods-field--label">Payload includes</legend>
          <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-1" value="tungsten" checked>
          <label class="ods-checkbox--label" for="overview-behavior-1">Tungsten rods</label>
          <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-2" value="filters" checked>
          <label class="ods-checkbox--label" for="overview-behavior-2">Oxygen filters</label>
          <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-3" value="fuel">
          <label class="ods-checkbox--label" for="overview-behavior-3">Liquid fuel</label>
          <input class="ods-checkbox" type="checkbox" name="overview-behavior[]" id="overview-behavior-4" value="crew">
          <label class="ods-checkbox--label" for="overview-behavior-4">Replacement crew</label>
        </fieldset>
        <fieldset class="ods-field">
          <legend class="ods-field--label">Select speed</legend>
          <input class="ods-radio" type="radio" name="overview-behavior" id="overview-behavior-1" value="1" required>
          <label class="ods-radio--label" for="overview-behavior-1">Lightspeed</label>
          <input class="ods-radio" type="radio" name="overview-behavior" id="overview-behavior-2" value="2" required checked>
          <label class="ods-radio--label" for="overview-behavior-2">Warp Speed</label>
          <input class="ods-radio" type="radio" name="overview-behavior" id="overview-behavior-3" value="3" required>
          <label class="ods-radio--label" for="overview-behavior-3">Ludicrous Speed</label>
        </fieldset>
      </fieldset>
      <fieldset class="ods-field-group">
        <legend class="ods-field-group--title">A Group of Fields</legend>
        <p class="ods-field-group--desc">This is a description of the FieldGroup.</p>
        <section class="ods-field-group--error">
          <aside class="ods-infobox is-ods-infobox-danger" role="alert">
            <span class="ods-infobox--icon">
              <OdsIcon icon="error"></OdsIcon>
            </span>
            <h1 class="ods-infobox--title">Safety checks have failed</h1>
            <section class="ods-infobox--content">
              <p>An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.</p>
            </section>
          </aside>
        </section>
        <div class="ods-field">
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
          <label class="ods-field--label" for="overview-behavior">Destination star</label>
        </div>
        <div class="ods-field">
          <input class="ods-text-input" type="text" id="overview-default">
          <label class="ods-field--label" for="overview-default">Destination</label>
        </div>
      </fieldset>
    </section>
    <footer class="ods-form--footer">
      <button class="ods-button is-ods-button-primary">
        Submit
      </button>
    </footer>
  </form>
</Visual>

:::

::: slot html-scss

:::
