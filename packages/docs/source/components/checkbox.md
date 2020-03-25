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
      <aside class="ods-field--error" id="checkbox-invalid-error">This combination won't work.</aside>
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
    <aside class="ods-field--error" id="checkbox-invalid-error">This combination won't work.</aside>
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

### Indeterminate

In the case of nested checkboxes, an `:indeterminate` state may be required.

Please note that this state must be set via javascript and is not reflected in the DOM - only `checked` and `unchecked` states will be submitted by default.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small countries
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest countries.</caption>
        <thead>
          <tr>
            <th scope="column" class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[all]" id="checkbox-all" value="check-all">
              <label class="ods-checkbox--label" for="checkbox-all">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </th>
            <th scope="column">Country</th>
            <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-ods-table-num">Population</th>
            <th scope="column">Capital</th>
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
            <td>Brazil</td>
            <td class="is-ods-table-num">8,514,877</td>
            <td class="is-ods-table-num">203,429,773</td>
            <td>Brasília</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
              <label class="ods-checkbox--label" for="checkbox-1">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Argentina</td>
            <td class="is-ods-table-num">2,780,400</td>
            <td class="is-ods-table-num">41,769,726</td>
            <td>Buenos Aires</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2" checked>
              <label class="ods-checkbox--label" for="checkbox-2">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Democratic Republic of the Congo</td>
            <td class="is-ods-table-num">2,344,858</td>
            <td class="is-ods-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small countries
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest countries.</caption>
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[all]" id="checkbox-all" value="check-all">
            <label class="ods-checkbox--label" for="checkbox-all">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </th>
          <th scope="column">Country</th>
          <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-ods-table-num">Population</th>
          <th scope="column">Capital</th>
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
          <td>Brazil</td>
          <td class="is-ods-table-num">8,514,877</td>
          <td class="is-ods-table-num">203,429,773</td>
          <td>Brasília</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
            <label class="ods-checkbox--label" for="checkbox-1">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Argentina</td>
          <td class="is-ods-table-num">2,780,400</td>
          <td class="is-ods-table-num">41,769,726</td>
          <td>Buenos Aires</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2" checked>
            <label class="ods-checkbox--label" for="checkbox-2">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Democratic Republic of the Congo</td>
          <td class="is-ods-table-num">2,344,858</td>
          <td class="is-ods-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

<script>
  var checkbox = document.getElementById("checkbox-all");
  checkbox.indeterminate = true;
</script>

