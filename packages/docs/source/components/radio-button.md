# Radio Button

> `<input>` elements of type radio are generally used in radio groups—collections of radio buttons describing a set of related options. Only one radio button in a given group can be selected at the same time. Radio buttons are typically rendered as small circles, which are filled or highlighted when selected. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

## States

### Disabled

> This Boolean attribute prevents the user from interacting with the input. In particular, the `click` event is not dispatched on disabled controls, and disabled controls aren't submitted with their form. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-disabled'>MDN</a></cite>

Disabling radio buttons happens on a per-option basis.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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
  </div>

  ```html
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
  ```
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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
  </div>

  ```html
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
  ```
</figure>

### Invalid

>The :invalid CSS pseudo-class represents any `<input>` or other `<form>` element whose contents fail to validate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid'>MDN</a></cite>

Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

Note, when indicating a validation error, please use an `.ods-field--error` to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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
  </div>

  ```html
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
  ```
</figure>

### Optional

> To avoid confusion as to whether a radio button group is required or not, authors are encouraged to specify the attribute on all the radio buttons in a group. - <cite><a href="https://www.w3.org/TR/html5/forms.html#the-required-attribute">W3</a></cite>

