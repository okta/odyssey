---
template: component
title: Checkbox
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/checkbox.md
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_checkbox.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/tVkWsXwnWICeguWhzX6Vwl/Inputs?node-id=476%3A3490
---

::: slot overview

## Anatomy

<div class="docskit--desc fpo">

Descriptive content around **checkbox anatomy** should go here.

</div>

<Anatomy img="/images/fpo.svg" />


<div class="docskit--desc">

<div class="fpo">

> `<input>` elements of type checkbox are rendered by default as square boxes that are checked (ticked) when activated, like you might see in an official government paper form. They allow you to select single values for submission in a form (or not). - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox'>MDN</a></cite>

</div>

</div>

<Example>
  <div>
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Donut toppings</legend>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-2" value="example-2">
      <label class="ods-checkbox--label" for="example-2">Sprinkles</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-3" value="example-3">
      <label class="ods-checkbox--label" for="example-3">Peanuts</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-3" value="example-3">
      <label class="ods-checkbox--label" for="example-3">Shredded coconut</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-3" value="example-3">
      <label class="ods-checkbox--label" for="example-3">Oreos</label>
    </fieldset>
  </div>
</Example>

## States

<div class="docskit--desc fpo">

Descriptive content around **states** should go here.

</div>

### Disabled

<div class="docskit--desc">

> This Boolean attribute prevents the user from interacting with the input. In particular, the `click` event is not dispatched on disabled controls, and disabled controls aren't submitted with their form. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-disabled'>MDN</a></cite>

Disabling checkboxes happens on a per-option basis.

</div>

<Example>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Disabled examples</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-0" value="example-0" disabled>
    <label class="ods-checkbox--label" for="example-0">Unchecked</label>
    <input checked class="ods-checkbox" type="checkbox" name="checkbox" id="example-1" value="example-1" disabled>
    <label class="ods-checkbox--label" for="example-1">Checked</label>
  </fieldset>
</Example>

### Invalid

<div class="docskit--desc">

>The :invalid CSS pseudo-class represents any `<input>` or other `<form>` element whose contents fail to validate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid'>MDN</a></cite>

Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

Note, when indicating a validation error, please use an `.ods-field--error` to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

Unlike radio buttons, checkboxes validate individually, not as a group.

</div>

<Example>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Invalid examples</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-0" value="example-0" data-invalid>
    <label class="ods-checkbox--label" for="example-0">Unchecked</label>
    <input checked class="ods-checkbox" type="checkbox" name="checkbox" id="example-1" value="example-1" data-invalid>
    <label class="ods-checkbox--label" for="example-1">Checked</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="example-1" value="example-1" data-invalid data-example-indeterminate>
    <label class="ods-checkbox--label" for="example-1">Indeterminate</label>
    <aside class="ods-field--error" id="checkbox-invalid-error">Validation error message.</aside>
  </fieldset>
</Example>

### Optional/Required

<div class="docskit--desc">

Unlike radio buttons, checkbox groups do not validate as a group. By default, checkbox groups should be treated as `:optional`.

Individually, checkboxes can be set to `required` - most commonly seen when a user confirms they have read terms of service.

</div>

<Example>
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" checked required>
    <label class="ods-checkbox--label" for="checkbox-required">I agree to share the donut assortment.</label>
  </fieldset>
</Example>

### Indeterminate

<div class="docskit--desc">

In the case of nested checkboxes, an `:indeterminate` state may be required.

Please note that this state must be set via javascript and is not reflected in the DOM - only `checked` and `unchecked` states will be submitted by default.

</div>

<Example>
<div>

<figure class="ods-table--figure">
  <figcaption class="ods-table--figcaption">
    Best donuts poll results
  </figcaption>
  <table class="ods-table">
    <caption>Results of the most popular donuts poll administered October 2020.</caption>
    <thead>
      <tr>
        <th scope="column" class="is-ods-table-checkbox">
          <input class="ods-checkbox" type="checkbox" name="row[all]" data-example-indeterminate value="check-all">
          <label class="ods-checkbox--label" for="checkbox-all">
            <span class="u-visually-hidden">Select this row</span>
          </label>
        </th>
        <th scope="column" class="is-ods-table-num">Rank</th>
        <th scope="column">Name</th>
        <th scope="column">Votes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="is-ods-table-checkbox">
          <input class="ods-checkbox" type="checkbox" name="row[0]" id="checkbox-0" value="check-0">
          <label class="ods-checkbox--label" for="checkbox-0">
            <span class="u-visually-hidden">Select this row</span>
          </label>
        </td>
        <td class="is-ods-table-num">1</td>
        <td>Glazed</td>
        <td class="is-ods-table-num">8,514,877</td>
      </tr>
      <tr>
        <td class="is-ods-table-checkbox">
          <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
          <label class="ods-checkbox--label" for="checkbox-1">
            <span class="u-visually-hidden">Select this row</span>
          </label>
        </td>
        <td class="is-ods-table-num">2</td>
        <td>Chocolate Glazed</td>
        <td class="is-ods-table-num">2,780,400</td>
      </tr>
      <tr>
        <td class="is-ods-table-checkbox">
          <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2">
          <label class="ods-checkbox--label" for="checkbox-2">
            <span class="u-visually-hidden">Select this row</span>
          </label>
        </td>
        <td class="is-ods-table-num">3</td>
        <td>Boston Creme</td>
        <td class="is-ods-table-num">2,344,858</td>
      </tr>
    </tbody>
  </table>
</figure>
</div>
</Example>

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

<figure class="odo-example">
  <div class="odo-example--rendered">
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

<figure class="odo-example">
  <div class="odo-example--rendered">
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

<figure class="odo-example">
  <div class="odo-example--rendered">
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

<figure class="odo-example">
  <div class="odo-example--rendered">
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
