---
template: component
title: Radio Button
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/modal.md
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_radio-button.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/tVkWsXwnWICeguWhzX6Vwl/Inputs?node-id=476%3A4173
---

::: slot overview

## Anatomy

<Description class="is-fpo">

Descriptive content around **radio button anatomy** should go here.

</Description>

<Anatomy 
  img="/images/anatomy-radio-button.svg" 
/>

<Description>

> <span class="is-fpo is-fpo-negative">`<input>` elements of type radio are generally used in radio groups—collections of radio buttons describing a set of related options. Only one radio button in a given group can be selected at the same time. Radio buttons are typically rendered as small circles, which are filled or highlighted when selected. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio'>MDN</a></cite></span>

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Which donut has pink frosting?</legend>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-glazed" value="0" required checked>
    <label class="ods-radio--label" for="radio-0-glazed">Glazed</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-boston-cream" value="3" required>
    <label class="ods-radio--label" for="radio-0-boston-cream">Boston Cream</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-homer" value="3" required checked>
    <label class="ods-radio--label" for="radio-0-homer">"The Homer"</label>
    <input class="ods-radio" type="radio" name="question-0" id="radio-0-old-fashioned" value="3" required>
    <label class="ods-radio--label" for="radio-0-old-fashioned">Old Fashioned</label>
  </fieldset>
</Visual>

## States

### Disabled

<Description>

> <span class="is-fpo is-fpo-negative">This Boolean attribute prevents the user from interacting with the input. In particular, the `click` event is not dispatched on disabled controls, and disabled controls aren't submitted with their form. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-disabled'>MDN</a></cite></span>

Disabling radio buttons happens on a per-option basis.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Disabled examples</legend>
    <input class="ods-radio" type="radio" name="question-1" id="radio-1-unchecked" value="0" disabled >
    <label class="ods-radio--label" for="radio-1-unchecked">Unchecked</label>
    <input class="ods-radio" type="radio" name="question-1" id="radio-1-checked" value="1"  disabled checked>
    <label class="ods-radio--label" for="radio-1-checked">Checked</label>
  </fieldset>
</Visual>

### Invalid

<Description>

> <span class="is-fpo is-fpo-negative">The :invalid CSS pseudo-class represents any `<input>` or other `<form>` element whose contents fail to validate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid'>MDN</a></cite></span>

Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

Note, when indicating a validation error, please use an `.ods-field--error` to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Invalid examples</legend>
    <input class="ods-radio" type="radio" name="question-2" id="radio-2-unchecked" value="0" data-invalid>
    <label class="ods-radio--label" for="radio-2-unchecked">Unchecked</label>
    <input class="ods-radio" type="radio" name="question-2" id="radio-2-checked" value="1"  data-invalid checked>
    <label class="ods-radio--label" for="radio-2-checked">Checked</label>
    <aside class="ods-field--error" id="checkbox-invalid-error">Validation error message.</aside>
  </fieldset>
</Visual>

### Optional

<Description>

> <span class="is-fpo is-fpo-negative">To avoid confusion as to whether a radio button group is required or not, authors are encouraged to specify the attribute on all the radio buttons in a group. - <cite><a href="https://www.w3.org/TR/html5/forms.html#the-required-attribute">W3</a></cite></span>

</Description>

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
