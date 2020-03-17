# Checkbox

> `<input>` elements of type checkbox are rendered by default as square boxes that are checked (ticked) when activated, like you might see in an official government paper form. They allow you to select single values for submission in a form (or not). - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-barry" value="barry" checked>
      <label class="ods-checkbox--label" for="checkbox-barry">Barry</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-diana" value="diana">
      <label class="ods-checkbox--label" for="checkbox-diana">Diana</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-clark" value="clark">
      <label class="ods-checkbox--label" for="checkbox-clark">Clark</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-alfred" value="alfred">
      <label class="ods-checkbox--label" for="checkbox-alfred">Alfred</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-barry" value="barry" checked>
    <label class="ods-checkbox--label" for="checkbox-barry">Barry</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-diana" value="diana">
    <label class="ods-checkbox--label" for="checkbox-diana">Diana</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-clark" value="clark">
    <label class="ods-checkbox--label" for="checkbox-clark">Clark</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox" id="checkbox-alfred" value="alfred">
    <label class="ods-checkbox--label" for="checkbox-alfred">Alfred</label>
  </fieldset>
  ```
</figure>

## States

### Disabled

> This Boolean attribute prevents the user from interacting with the input. In particular, the `click` event is not dispatched on disabled controls, and disabled controls aren't submitted with their form. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-disabled'>MDN</a></cite>

Disabling checkboxes happens on a per-option basis.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
      <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-barry-mix" value="barry" checked>
      <label class="ods-checkbox--label" for="checkbox-barry-mix">Barry</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-diana-mix" value="diana" disabled>
      <label class="ods-checkbox--label" for="checkbox-diana-mix">Diana</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-clark-mix" value="clark">
      <label class="ods-checkbox--label" for="checkbox-clark-mix">Clark</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-alfred-mix" value="alfred">
      <label class="ods-checkbox--label" for="checkbox-alfred-mix">Alfred</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-barry-mix" value="barry" checked>
    <label class="ods-checkbox--label" for="checkbox-barry-mix">Barry</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-diana-mix" value="diana" disabled>
    <label class="ods-checkbox--label" for="checkbox-diana-mix">Diana</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-clark-mix" value="clark">
    <label class="ods-checkbox--label" for="checkbox-clark-mix">Clark</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox-mix" id="checkbox-alfred-mix" value="alfred">
    <label class="ods-checkbox--label" for="checkbox-alfred-mix">Alfred</label>
  </fieldset>
  ```
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
      <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-barry-disabled" value="barry" disabled checked>
      <label class="ods-checkbox--label" for="checkbox-barry-disabled">Barry</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-diana-disabled" value="diana" disabled>
      <label class="ods-checkbox--label" for="checkbox-diana-disabled">Diana</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-clark-disabled" value="clark" disabled>
      <label class="ods-checkbox--label" for="checkbox-clark-disabled">Clark</label>
      <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-alfred-disabled" value="alfred" disabled>
      <label class="ods-checkbox--label" for="checkbox-alfred-disabled">Alfred</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
    <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-barry-disabled" value="barry" disabled checked>
    <label class="ods-checkbox--label" for="checkbox-barry-disabled">Barry</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-diana-disabled" value="diana" disabled>
    <label class="ods-checkbox--label" for="checkbox-diana-disabled">Diana</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-clark-disabled" value="clark" disabled>
    <label class="ods-checkbox--label" for="checkbox-clark-disabled">Clark</label>
    <input class="ods-checkbox" type="checkbox" name="checkbox-disabled" id="checkbox-alfred-disabled" value="alfred" disabled>
    <label class="ods-checkbox--label" for="checkbox-alfred-disabled">Alfred</label>
  </fieldset>
  ```
</figure>

### Invalid

>The :invalid CSS pseudo-class represents any `<input>` or other `<form>` element whose contents fail to validate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid'>MDN</a></cite>

Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

Note, when indicating a validation error, please use an `.ods-field--error` to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

Unlike radio buttons, checkboxes validate individually, not as a group.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
      <input data-invalid class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-lex-invalid" value="lex" checked>
      <label class="ods-checkbox--label" for="checkbox-lex-invalid">Lex</label>
      <input class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-diana-invalid" value="diana">
      <label class="ods-checkbox--label" for="checkbox-diana-invalid">Diana</label>
      <input data-invalid class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-clark-invalid" value="clark" checked disabled>
      <label class="ods-checkbox--label" for="checkbox-clark">Clark</label>
      <input class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-alfred-invalid" value="alfred">
      <label class="ods-checkbox--label" for="checkbox-alfred-invalid">Alfred</label>
      <aside class="field--error" id="checkbox-invalid-error">This combination won't work.</aside>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <legend class="ods-input-legend">Who should Bruce invite to his birthday?</legend>
    <input data-invalid class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-lex-invalid" value="lex" checked>
    <label class="ods-checkbox--label" for="checkbox-lex-invalid">Lex</label>
    <input class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-diana-invalid" value="diana">
    <label class="ods-checkbox--label" for="checkbox-diana-invalid">Diana</label>
    <input data-invalid class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-clark-invalid" value="clark" checked disabled>
    <label class="ods-checkbox--label" for="checkbox-clark">Clark</label>
    <input class="ods-checkbox" type="checkbox" aria-describedby="checkbox-invalid-error" name="checkbox-invalid" id="checkbox-alfred-invalid" value="alfred">
    <label class="ods-checkbox--label" for="checkbox-alfred-invalid">Alfred</label>
    <aside class="field--error" id="checkbox-invalid-error">This combination won't work.</aside>
  </fieldset>
  ```
</figure>

### Optional/Required

Unlike radio buttons, checkbox groups do not validate as a group. By default, checkbox groups should be treated as `:optional`.

Individually, checkboxes can be set to `required` - most commonly seen when a user confirms they have read terms of service.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" checked required>
      <label class="ods-checkbox--label" for="checkbox-required">I understand the terms of coming to Bruce's birthday</label>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <input class="ods-checkbox" type="checkbox" name="checkbox-required" id="checkbox-required" value="terms-accepted" checked required>
    <label class="ods-checkbox--label" for="checkbox-required">I understand the terms of coming to Bruce's birthday</label>
  </fieldset>
  ```
</figure>
