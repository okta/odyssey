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

<Description>

Descriptive content around **radio button anatomy** should go here.

</Description>

<Anatomy img="/images/fpo.svg" />


<Description>

> `<input>` elements of type radio are generally used in radio groups—collections of radio buttons describing a set of related options. Only one radio button in a given group can be selected at the same time. Radio buttons are typically rendered as small circles, which are filled or highlighted when selected. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio'>MDN</a></cite>

</Description>

<Example>
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
</Example>

## States

### Disabled

<Description>

> This Boolean attribute prevents the user from interacting with the input. In particular, the `click` event is not dispatched on disabled controls, and disabled controls aren't submitted with their form. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-disabled'>MDN</a></cite>

Disabling radio buttons happens on a per-option basis.

</Description>

<Example>
  <template>
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Which of the following is the largest?</legend>
      <input class="ods-radio" type="radio" name="radio-mix" id="radio-peanut-mix" value="peanut" required checked>
      <label class="ods-radio--label" for="radio-peanut-mix">A peanut</label>
      <input class="ods-radio" type="radio" name="radio-mix" id="radio-elephant-mix" value="elephant" required disabled>
      <label class="ods-radio--label" for="radio-elephant-mix">An elephant</label>
      <input class="ods-radio" type="radio" name="radio-mix" id="radio-moon-mix" value="moon" required>
      <label class="ods-radio--label" for="radio-moon-mix">The moon</label>
      <input class="ods-radio" type="radio" name="radio-mix" id="radio-tennis-ball-mix" value="tennis-ball" required>
      <label class="ods-radio--label" for="radio-tennis-ball-mix">A tennis ball</label>
    </fieldset>
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Which of the following is the largest?</legend>
      <input class="ods-radio" type="radio" name="radio-disabled" id="radio-peanut-disabled" value="peanut" required disabled checked>
      <label class="ods-radio--label" for="radio-peanut-disabled">A peanut</label>
      <input class="ods-radio" type="radio" name="radio-disabled" id="radio-elephant-disabled" value="elephant" required disabled>
      <label class="ods-radio--label" for="radio-elephant-disabled">An elephant</label>
      <input class="ods-radio" type="radio" name="radio-disabled" id="radio-moon-disabled" value="moon" required disabled>
      <label class="ods-radio--label" for="radio-moon-disabled">The moon</label>
      <input class="ods-radio" type="radio" name="radio-disabled" id="radio-tennis-ball-disabled" value="tennis-ball" required disabled>
      <label class="ods-radio--label" for="radio-tennis-ball-disabled">A tennis ball</label>
    </fieldset>
  </template>
</Example>

### Invalid

<Description>

<span class="fpo">

>The :invalid CSS pseudo-class represents any `<input>` or other `<form>` element whose contents fail to validate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid'>MDN</a></cite>

</span>

Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

Note, when indicating a validation error, please use an `.ods-field--error` to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

</Description>

<Example>
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Which of the following is the largest?</legend>
    <input data-invalid class="ods-radio" type="radio" aria-describedby="radio-invalid-error" name="radio-invalid" id="radio-peanut-invalid" value="peanut" required checked>
    <label class="ods-radio--label" for="radio-peanut-invalid">A peanut</label>
    <input data-invalid class="ods-radio" type="radio" aria-describedby="radio-invalid-error" name="radio-invalid" id="radio-elephant-invalid" value="elephant" required>
    <label class="ods-radio--label" for="radio-elephant-invalid">An elephant</label>
    <input data-invalid class="ods-radio" type="radio" aria-describedby="radio-invalid-error" name="radio-invalid" id="radio-moon-invalid" value="moon" required disabled>
    <label class="ods-radio--label" for="radio-moon">The moon</label>
    <input data-invalid class="ods-radio" type="radio" aria-describedby="radio-invalid-error" name="radio-invalid" id="radio-tennis-ball-invalid" value="tennis-ball" required>
    <label class="ods-radio--label" for="radio-tennis-ball-invalid">A tennis ball</label>
    <aside class="ods-field--error" id="radio-invalid-error">This selection is invalid.</aside>
  </fieldset>
</Example>

### Optional

<div class="docskit--desc">

> To avoid confusion as to whether a radio button group is required or not, authors are encouraged to specify the attribute on all the radio buttons in a group. - <cite><a href="https://www.w3.org/TR/html5/forms.html#the-required-attribute">W3</a></cite>

</div>

:::

::: slot html-scss

## Basic example

<figure class="odo-example">
  <div class="odo-example--rendered">
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

<figure class="odo-example">
  <div class="odo-example--rendered">
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

<figure class="odo-example">
  <div class="odo-example--rendered">
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
