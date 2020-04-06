# Text Input

>`<input>` elements of type "text" create basic single-line text fields. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="name" id="name" autocomplete="name" spellcheck="false" required>
        <label class="ods-label" for="name">Name</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="name" id="name" autocomplete="name" spellcheck="false" required>
      <label class="ods-label" for="name">Name</label>
    </div>
  </fieldset>
  ```
</figure>


They can also be combined with an `.ods-field--hint` to provide greater context:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" aria-describedby="name-hinted-hint" name="name-hinted" id="name-hinted" autocomplete="name-hinted" spellcheck="false" required>
        <aside class="ods-field--hint" id="name-hinted-hint">Your full name, please.</aside>
        <label class="ods-label" for="name">Name</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" aria-describedby="name-hinted-hint" name="name-hinted" id="name-hinted" autocomplete="name-hinted" spellcheck="false" required>
      <aside class="ods-field--hint" id="name-hinted-hint">Your full name, please.</aside>
      <label class="ods-label" for="name">Name</label>
    </div>
  </fieldset>
  ```
</figure>

## States

### Disabled

> This Boolean attribute prevents the user from interacting with the input. In particular, the `click` event is not dispatched on disabled controls, and disabled controls aren't submitted with their form. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-disabled'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="name-disabled" id="name-disabled" autocomplete="name" spellcheck="false" required disabled>
        <label class="ods-label" for="name-disabled">Name</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="name-disabled" id="name-disabled" autocomplete="name" spellcheck="false" value="Diana Prince" required disabled>
        <label class="ods-label" for="name-disabled">Name</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="name-disabled" id="name-disabled" autocomplete="name" spellcheck="false" required disabled>
      <label class="ods-label" for="name-disabled">Name</label>
    </div>
  </fieldset>
  ```
</figure>

### Read only

> This Boolean attribute prevents the user from modifying the value of the input. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="name-readonly" id="name-readonly" autocomplete="name" spellcheck="false" required readonly>
        <label class="ods-label" for="name-readonly">Name</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="name-filled-readonly" id="name-filled-readonly" autocomplete="name" spellcheck="false" value="Diana Prince" required readonly>
        <label class="ods-label" for="name-filled-readonly">Name</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="name-readonly" id="name-readonly" autocomplete="name" spellcheck="false" required readonly>
      <label class="ods-label" for="name-readonly">Name</label>
    </div>
  </fieldset>
  ```
</figure>

### Optional

> The `:optional` CSS pseudo-class represents any `<input>`, `<select>`, or `<textarea>` element that does not have the required attribute set on it. [...] This pseudo-class is useful for styling fields that are not required to submit a form. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/:optional'>MDN</a></cite>

Based on our use cases, it's a better affordance to treat `:required` as our default form behavior and signal `:optional` forms instead.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="name-optional" id="name-optional" autocomplete="name" spellcheck="false">
        <label class="ods-label" for="name-optional">Name <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="name-optional" id="name-optional" autocomplete="name" spellcheck="false">
      <label class="ods-label" for="name-optional">Name <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>

### Invalid

>The :invalid CSS pseudo-class represents any `<input>` or other `<form>` element whose contents fail to validate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid'>MDN</a></cite>

Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

Note, when indicating a validation error, please use a `.ods-field--error` to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" aria-describedby="name-invalid-hint" name="name-invalid" id="name-invalid" autocomplete="name" spellcheck="false" required data-invalid>
        <label class="ods-label" for="name-invalid">Name</label>
        <aside class="ods-field--error" id="name-invalid-hint">
          This field is required and cannot be left empty.
        </aside>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" aria-describedby="name-invalid-hint" name="name-invalid" id="name-invalid" autocomplete="name" spellcheck="false" required data-invalid>
      <label class="ods-label" for="name-invalid">Name</label>
      <aside class="ods-field--error" id="name-invalid-hint">
        This field is required and cannot be left empty.
      </aside>
    </div>
  </fieldset>
  ```
</figure>

## Additional types

### Text area

> The HTML `<textarea>` element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <textarea class="ods-text-input ods-text-area" name="description" id="description" rows='4' cols='50' spellcheck="true" required></textarea>
        <aside class="ods-field--hint">
          Please describe your perfect Saturday in as many words as you need.
        </aside>
        <label class="ods-label" for="description">Your Perfect Saturday</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <textarea class="ods-text-input ods-text-area" name="description" id="description" rows='4' cols='50' spellcheck="true" required></textarea>
      <aside class="ods-field--hint">
        Please describe your perfect Saturday in as many words as you need.
      </aside>
      <label class="ods-label" for="description">Your Perfect Saturday</label>
    </div>
  </fieldset>
  ```
</figure>

### Email

>`<input>` elements of type "email" are used to let the user enter and edit an email address, or, if the multiple attribute is specified, a list of email addresses. The input value is automatically validated to ensure that it's either empty or a properly-formatted email address (or list of addresses) before the form can be submitted. The `:valid` and `:invalid` CSS pseudo-classes are automatically applied as appropriate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="email" name="email" id="email" autocomplete="email" spellcheck="false" required>
        <label class="ods-label" for="email">Email</label>
      </div>
    </fieldset>
  </div>


  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="email" id="email" autocomplete="email" spellcheck="false" required>
      <label class="ods-label" for="email">Email</label>
    </div>
  </fieldset>
  ```
</figure>

### Password

>`<input>` elements of type "password" provide a way for the user to securely enter a password. The element is presented as a one-line plain text editor control in which the text is obscured so that it cannot be read, usually by replacing each character with a symbol such as the asterisk ("*") or a dot ("•"). This character will vary depending on the user agent and OS. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password">MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="password" name="password" id="password" autocomplete="new-password" spellcheck="false" required>
        <label class="ods-label" for="password">Password</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="password" name="password" id="password" autocomplete="new-password" spellcheck="false" required>
      <label class="ods-label" for="password">Password</label>
    </div>
  </fieldset>
  ```
</figure>

### Telephone number

>`<input>` elements of type "tel" are used to let the user enter and edit a telephone number. Unlike `<input type="email">` and `<input type="url">`, the input value is not automatically validated to a particular format before the form can be submitted, because formats for telephone numbers vary so much around the world. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="tel" name="tel" id="tel" autocomplete="tel-national" spellcheck="false" required>
        <label class="ods-label" for="tel">Telephone Number</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="tel" name="tel" id="tel" autocomplete="tel-national" spellcheck="false" required>
      <label class="ods-label" for="tel">Telephone Number</label>
    </div>
  </fieldset>
  ```
</figure>

