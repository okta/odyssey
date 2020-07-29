# Number input

> `<input>` elements of type "number" are used to let the user enter a number. They include built-in validation to reject non-numerical entries. The browser may opt to provide stepper arrows to let the user increase and decrease the value using their mouse or by simply tapping with a fingertip. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-number-input" type="number" name="number-default" id="number-default" autocomplete="off" spellcheck="false" required>
        <label class="ods-label" for="number-default">Instances</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-number-input" type="number" name="number-default" id="number-default" autocomplete="off" spellcheck="false" required>
      <label class="ods-label" for="number-default">Instances</label>
    </div>
  </fieldset>
  ```
</figure>

## States

Number Inputs have the same available states as Text Inputs unless noted below.

### Read only

> This Boolean attribute prevents the user from modifying the value of the input. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly'>MDN</a></cite>

Since controls in this state are not intended for interaction, we remove the spinners.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-number-input" type="number" name="number-readonly" id="number-readonly" autocomplete="off" spellcheck="false" required readonly>
        <label class="ods-label" for="number-readonly">Instances</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-number-input" type="number" name="number-filled-readonly" id="number-filled-readonly" autocomplete="off" spellcheck="false" value="7" required readonly>
        <label class="ods-label" for="number-filled-readonly">Instances</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-number-input" type="number" name="number-readonly" id="number-readonly" autocomplete="off" spellcheck="false" required readonly>
      <label class="ods-label" for="number-readonly">Instances</label>
    </div>
  </fieldset>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-number-input" type="number" name="number-filled-readonly" id="number-filled-readonly" autocomplete="off" spellcheck="false" value="7" required readonly>
      <label class="ods-label" for="number-filled-readonly">Instances</label>
    </div>
  </fieldset>
  ```
</figure>
