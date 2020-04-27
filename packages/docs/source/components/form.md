# Forms

Forms are a container for interactive controls used to submit information.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action="." novalidate>
      <header class="ods-form--header">
        <h1 class="ods-form--title">Getting to Know You</h1>
      </header>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="text" name="full-name" id="full-name" autocomplete="name" spellcheck="false" required>
          <label class="ods-label" for="full-name">Full Name</label>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <legend class="ods-input-legend">What's your favorite color?</legend>
        <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-red" value="red" required checked>
        <label class="ods-radio--label" for="favorite-color-red">Red is dread</label>
        <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-yellow" value="yellow" required>
        <label class="ods-radio--label" for="favorite-color-yellow">Yellow is mellow</label>
        <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-green" value="green" required>
        <label class="ods-radio--label" for="favorite-color-green">Green is queen</label>
        <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-blue" value="blue" required>
        <label class="ods-radio--label" for="favorite-color-blue">Blue is true</label>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <textarea class="ods-text-input" name="additional-comments" id="additional-comments" rows="4" cols="50" spellcheck="true" required=""></textarea>
          <label class="ods-label" for="additional-comments">Additional Comments</label>
        </div>
      </fieldset>
      <section class="ods-form--actions">
        <button class="ods-button">Submit Form</button>
      </section>
      <footer class="ods-form--footer">
        <p class="legalese">
          By clicking the button you agree to the <a href="#">terms & conditions</a> and understand the <a href="#">no obligation trial</a>.
        </p>
      </footer>
    </form>
  </div>

  ```html
  <form class="ods-form" action="." novalidate>
    <header class="ods-form--header">
      <h1 class="ods-form--title">Getting to Know You</h1>
    </header>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="full-name" id="full-name" autocomplete="name" spellcheck="false" required>
        <label class="ods-label" for="full-name">Full Name</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">What's your favorite color?</legend>
      <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-red" value="red" required checked>
      <label class="ods-radio--label" for="favorite-color-red">Red is dread</label>
      <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-yellow" value="yellow" required>
      <label class="ods-radio--label" for="favorite-color-yellow">Yellow is mellow</label>
      <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-green" value="green" required>
      <label class="ods-radio--label" for="favorite-color-green">Green is queen</label>
      <input class="ods-radio" type="radio" name="favorite-color" id="favorite-color-blue" value="blue" required>
      <label class="ods-radio--label" for="favorite-color-blue">Blue is true</label>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <textarea class="ods-text-input" name="additional-comments" id="additional-comments" rows="4" cols="50" spellcheck="true" required=""></textarea>
        <label class="ods-label" for="additional-comments">Additional Comments</label>
      </div>
    </fieldset>
    <section class="ods-form--actions">
      <button class="ods-button">Submit Form</button>
    </section>
    <footer class="ods-form--footer">
      <p class="legalese">
        By clicking the button you agree to the <a href="#">terms & conditions</a> and understand the <a href="#">no obligation trial</a>.
      </p>
    </footer>
  </form>
  ```
</figure>

## Form anatomy

While their content may get complicated, our forms are designed to present a hierarchy that is straightforward to implement as well as use. Most forms will utilize a header, some amount of field sets (each containing fields or form controls), actions, and an optional footer.

### Header

In most cases, the form header will only include the form title. The title should succinctly describe the purpose of the form.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action="." novalidate>
      <header class="ods-form--header">
        <h1 class="ods-form--title">Give Us Your Feedback</h1>
      </header>
    </form>
  </div>

  ```html
  <form class="ods-form" action="." novalidate>
    <header class="ods-form--header">
      <h1 class="ods-form--title">Give Us Your Feedback</h1>
    </header>
  </form>
  ```
</figure>

If your form utilizes Read/Edit states, you may also include an "Edit" button to switch modes:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action="." data-readonly>
      <header class="ods-form--header">
        <h1 class="ods-form--title">Give Us Your Feedback</h1>
        <button class="ods-button is-ods-button-secondary">Edit</button>
      </header>
    </form>
  </div>

  ```html
  <form class="ods-form" action="." data-readonly>
    <header class="ods-form--header">
      <h1 class="ods-form--title">Give Us Your Feedback</h1>
      <button class="ods-button is-ods-button-secondary">Edit</button>
    </header>
  </form>
  ```
</figure>

### Field sets

Field sets are used to group related form controls. When grouping fields, be sure to include a `<legend>` to both contextualize how the fields are related and ensure a clear hierarchy.

The form below utilizes two field sets, "General Info" and "Authentication Settings", each containing multiple fields.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action=".">
      <header class="ods-form--header">
        <h1 class="ods-form--title">Add New User</h1>
      </header>
      <fieldset class="ods-fieldset">
        <legend class="ods-group-legend">General Info</legend>
        <fieldset class="ods-fieldset">
          <div class="ods-fieldset-flex">
            <input class="ods-text-input" type="text" name="user-name" id="user-name"  autocomplete="off" spellcheck="false" required>
            <label class="ods-label" for="user-name">Full Name</label>
          </div>
        </fieldset>
        <fieldset class="ods-fieldset">
          <div class="ods-fieldset-flex">
            <input class="ods-text-input" type="email" name="user-email" id="user-email" autocomplete="off" spellcheck="false" required>
            <label class="ods-label" for="user-email">Email</label>
          </div>
        </fieldset>
      </fieldset>
      <fieldset class="ods-fieldset">
        <legend class="ods-group-legend">Authentication Settings</legend>
        <fieldset class="ods-fieldset">
          <div class="ods-fieldset-flex">
            <select class="ods-select" name="user-match" id="user-match" aria-describedby="user-match-hint"  autocomplete="off" spellcheck="false" required>
              <option value="dir" selected>Employee Directory</option>
              <option value="client">Client List</option>
              <option value="customer">Customer Database</option>
              <option value="supes">Known Aliases</option>
              <option value="NOC">NOC List</option>
            </select>
            <label class="ods-label" for="user-match">Match new users against</label>
          </div>
        </fieldset>
        <fieldset class="ods-fieldset">
          <legend class="ods-input-legend">If no match is found</legend>
          <input class="ods-radio" type="radio" name="user-no-match" id="user-no-match-new" aria-describedby="user-no-match-hint" value="new" required checked>
          <label class="ods-radio--label" for="user-no-match-new">Create new user</label>
          <input class="ods-radio" type="radio" name="user-no-match" id="user-no-match-redirect" aria-describedby="user-no-match-hint" value="redirect" required>
          <label class="ods-radio--label" for="user-no-match-redirect">Deny Access</label>
        </fieldset>
      </fieldset>
      <section class="ods-form--actions">
        <button class="ods-button">Add User</button>
      </section>
    </form>
  </div>

  ```html
  <form class="ods-form" action=".">
    <header class="ods-form--header">
      <h1 class="ods-form--title">Add New User</h1>
    </header>
    <fieldset class="ods-fieldset">
      <legend class="ods-group-legend">General Info</legend>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="text" name="user-name" id="user-name"  autocomplete="off" spellcheck="false" required>
          <label class="ods-label" for="user-name">Full Name</label>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="email" name="user-email" id="user-email" autocomplete="off" spellcheck="false" required>
          <label class="ods-label" for="user-email">Email</label>
        </div>
      </fieldset>
    </fieldset>
    <fieldset class="ods-fieldset">
      <legend class="ods-group-legend">Authentication Settings</legend>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <select class="ods-select" name="user-match" id="user-match" aria-describedby="user-match-hint"  autocomplete="off" spellcheck="false" required>
            <option value="dir" selected>Employee Directory</option>
            <option value="client">Client List</option>
            <option value="customer">Customer Database</option>
            <option value="supes">Known Aliases</option>
            <option value="NOC">NOC List</option>
          </select>
          <label class="ods-label" for="user-match">Match new users against</label>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <legend class="ods-input-legend">If no match is found</legend>
        <input class="ods-radio" type="radio" name="user-no-match" id="user-no-match-new" aria-describedby="user-no-match-hint" value="new" required checked>
        <label class="ods-radio--label" for="user-no-match-new">Create new user</label>
        <input class="ods-radio" type="radio" name="user-no-match" id="user-no-match-redirect" aria-describedby="user-no-match-hint" value="redirect" required>
        <label class="ods-radio--label" for="user-no-match-redirect">Deny Access</label>
      </fieldset>
    </fieldset>
    <section class="ods-form--actions">
      <button class="ods-button">Add User</button>
    </section>
  </form>
  ```
</figure>

### Fields

Though each field type may have its own set of guidelines, their general anatomy is similar. Every field should have an accompanying label - or legend for radio or checkbox groups.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="email" name="email-1" id="email-1" autocomplete="email" spellcheck="false" required>
        <label class="ods-label" for="email-1">Email</label>
      </div>
    </fieldset>
  </div>
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <legend class="ods-input-legend">What's your favorite color?</legend>
      <input class="ods-radio" type="radio" name="favorite-color-2" id="favorite-color-red-2" value="red" required checked>
      <label class="ods-radio--label" for="favorite-color-red-2">Red is dread</label>
      <input class="ods-radio" type="radio" name="favorite-color-2" id="favorite-color-yellow-2" value="yellow" required>
      <label class="ods-radio--label" for="favorite-color-yellow-2">Yellow is mellow</label>
      <input class="ods-radio" type="radio" name="favorite-color-2" id="favorite-color-green-2" value="green" required>
      <label class="ods-radio--label" for="favorite-color-green-2">Green is queen</label>
      <input class="ods-radio" type="radio" name="favorite-color-2" id="favorite-color-blue-2" value="blue" required>
      <label class="ods-radio--label" for="favorite-color-blue-2">Blue is true</label>
    </fieldset>
  </div>
</figure>

Fields should also include various error messages for possible invalid states. Error messages should be associated with their field via the `aria-describedby` attribute.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="email" name="email-empty" id="email-empty" autocomplete="email" aria-describedby="email-empty-error" spellcheck="false" required data-invalid>
        <label class="ods-label" for="email-empty">Email</label>
        <aside class="ods-field--error" id="email-empty-error">
          <span class="u-visually-hidden">Error:</span>This field can't be left blank.
        </aside>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="email-empty" id="email-empty" autocomplete="email" aria-describedby="email-empty-error" spellcheck="false" required data-invalid>
      <label class="ods-label" for="email-empty">Email</label>
      <aside class="ods-field--error" id="email-empty-error">
        <span class="u-visually-hidden">Error:</span>This field can't be left blank.
      </aside>
    </div>
  </fieldset>
  ```
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="email" name="email-invalid" id="email-invalid" autocomplete="email" aria-describedby="email-invalid-error" value="not gonna happen" spellcheck="false" required data-invalid>
        <label class="ods-label" for="email-invalid">Email</label>
        <aside class="ods-field--error" id="email-invalid-error">
          <span class="u-visually-hidden">Error:</span>This does not appear to be a valid email address.
        </aside>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="email-invalid" id="email-invalid" autocomplete="email" aria-describedby="email-invalid-error" value="not gonna happen" spellcheck="false" required data-invalid>
      <label class="ods-label" for="email-invalid">Email</label>
      <aside class="ods-field--error" id="email-invalid-error">
        <span class="u-visually-hidden">Error:</span>This does not appear to be a valid email address.
      </aside>
    </div>
  </fieldset>
  ```
</figure>

Fields may utilize field hints to provide context, formatting help, or other guidelines to the user. Do not use the `placeholder` attribute for these purposes (<a href="#placeholders">see why below</a>). Hints should be associated with their input via the `aria-describedby` attribute.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="email" name="email-hinted" id="email-hinted" autocomplete="email" spellcheck="false" aria-describedby="email-hinted-hint" required>
        <label class="ods-label" for="email-hinted">Email</label>
        <aside class="ods-field--hint" id="email-hinted-hint">
          e.g. jane.doe@gmail.com
        </aside>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="email-hinted" id="email-hinted" autocomplete="email" spellcheck="false" aria-describedby="email-hinted-hint" required>
      <label class="ods-label" for="email-hinted">Email</label>
      <aside class="ods-field--hint" id="email-hinted-hint">
        e.g. jane.doe@gmail.com
      </aside>
    </div>
  </fieldset>
  ```
</figure>

Field hints remain in place when an error message is displayed. In these cases, both messages should be associated with the input via `aria-describedby`:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" data-invalid type="email" name="email-both" id="email-both" autocomplete="email" spellcheck="false" aria-describedby="email-both-hint email-both-error" required>
        <label class="ods-label" for="email-hinted">Email</label>
        <aside class="ods-field--hint" id="email-both-hint">
          e.g. jane.doe@gmail.com
        </aside>
        <aside class="ods-field--error" id="email-both-error">
          <span class="u-visually-hidden">Error:</span>This field can't be left blank.
        </aside>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="email-both" id="email-both" autocomplete="email" spellcheck="false" aria-describedby="email-both-hint email-both-error" required>
      <label class="ods-label" for="email-hinted">Email</label>
      <aside class="ods-field--hint" id="email-both-hint">
        e.g. jane.doe@gmail.com
      </aside>
      <aside class="ods-field--error" id="email-both-error">
        <span class="u-visually-hidden">Error:</span>This field can't be left blank.
      </aside>
    </div>
  </fieldset>
  ```
</figure>

For more details about when and how to use different field types, please refer to their individual documentation.

### Actions

All forms should include an actions section that contains a button for submitting data. This section may also include secondary actions such as "Reset".

Button labels should clearly indicate what action the user is taking, e.g. "Add User" instead of "Submit".

This section is automatically hidden when forms are in a read-only state.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action="." novalidate>
      <section class="ods-form--actions">
        <button class="ods-button">Add User</button>
      </section>
    </form>
  </div>

  ```html
  <form class="ods-form" action="." novalidate>
    <section class="ods-form--actions">
      <button class="ods-button">Add User</button>
    </section>
  </form>
  ```
</figure>

### Footer

This optional section may contain form meta-data, support links, or "legalese" copy.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action="." novalidate>
      <footer class="ods-form--footer">
        <p class="legalese">
          By clicking the button you agree to the <a href="#">terms & conditions</a> and understand the <a href="#">no obligation trial</a>.
        </p>
      </footer>
    </form>
  </div>

  ```html
  <form class="ods-form" action="." novalidate>
    <footer class="ods-form--footer">
      <p class="legalese">
        By clicking the button you agree to the <a href="#">terms & conditions</a> and understand the <a href="#">no obligation trial</a>.
      </p>
    </footer>
  </form>
  ```
</figure>

## States

### Read-Only

Some forms require a read-only state. This can be achieved by adding the `data-readonly` attribute on your `<form>` and `readonly` on your `<input>`s. When in a read-only states, forms will automatically hide the actions section. Be sure to include an "Edit" action in the header if users are able to toggle this state.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action="." data-readonly>
      <header class="ods-form--header">
        <h1 class="ods-form--title">Organization Contact</h1>
        <button class="ods-button is-ods-button-secondary">Edit</button>
      </header>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="text" name="org-company" id="org-company" value="Okta" autocomplete="off" spellcheck="false" readonly required>
          <label class="ods-label" for="org-company">Company Name</label>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" aria-describedby="org-tel-hint"  type="tel" name="org-tel" id="org-tel" value="555-555-5555" autocomplete="off" spellcheck="false" readonly required>
          <label class="ods-label" for="org-tel">Telephone number</label>
          <aside class="ods-field--hint" id="org-tel-hint">
            Please include country code if outside the US.
          </aside>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="text" name="org-address" id="org-address" value="123 Street Avenue"  autocomplete="off" spellcheck="false" readonly required>
          <label class="ods-label" for="org-address">Address</label>
        </div>
      </fieldset>
      <section class="ods-form--actions">
        <button class="ods-button is-ods-button-secondary">Cancel</button>
        <button class="ods-button">Save</button>
      </section>
    </form>
  </div>

  ```html
  <form class="ods-form" action="." data-readonly>
    <header class="ods-form--header">
      <h1 class="ods-form--title">Organization Contact</h1>
      <button class="ods-button is-ods-button-secondary">Edit</button>
    </header>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="org-company" id="org-company" value="Okta" autocomplete="off" spellcheck="false" readonly required>
        <label class="ods-label" for="org-company">Company Name</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="tel" name="org-tel" id="org-tel" value="555-555-5555" autocomplete="off" spellcheck="false" readonly required>
        <label class="ods-label" for="org-tel">Telephone number</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="org-address" id="org-address" value="123 Street Avenue"  autocomplete="off" spellcheck="false" readonly required>
        <label class="ods-label" for="org-address">Address</label>
      </div>
    </fieldset>
    <section class="ods-form--actions">
      <button class="ods-button is-ods-button-secondary">Cancel</button>
      <button class="ods-button">Save</button>
    </section>
  </form>
  ```
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form class="ods-form" action="." novalidate>
      <header class="ods-form--header">
        <h1 class="ods-form--title">Organization Contact</h1>
        <button class="ods-button is-ods-button-secondary">Edit</button>
      </header>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="text" name="org-company" id="org-company" value="Okta" autocomplete="off" spellcheck="false" required>
          <label class="ods-label" for="org-company">Company Name</label>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" aria-describedby="org-tel-hint"  type="tel" name="org-tel" id="org-tel" value="555-555-5555" autocomplete="off" spellcheck="false" required>
          <label class="ods-label" for="org-tel">Telephone number</label>
          <aside class="ods-field--hint" id="org-tel-hint">
            Please include country code if outside the US.
          </aside>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="text" name="org-address" id="org-address" value="123 Street Avenue"  autocomplete="off" spellcheck="false" required>
          <label class="ods-label" for="org-address">Address</label>
        </div>
      </fieldset>
      <section class="ods-form--actions">
        <button class="ods-button is-ods-button-secondary">Cancel</button>
        <button class="ods-button">Save</button>
      </section>
    </form>
  </div>

  ```html
  <form class="ods-form" action="." novalidate>
    <header class="ods-form--header">
      <h1 class="ods-form--title">Organization Contact</h1>
      <button class="ods-button is-ods-button-secondary">Edit</button>
    </header>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="org-company" id="org-company" value="Okta" autocomplete="off" spellcheck="false" required>
        <label class="ods-label" for="org-company">Company Name</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="tel" name="org-tel" id="org-tel" value="555-555-5555" autocomplete="off" spellcheck="false" required>
        <label class="ods-label" for="org-tel">Telephone number</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="org-address" id="org-address" value="123 Street Avenue"  autocomplete="off" spellcheck="false" required>
        <label class="ods-label" for="org-address">Address</label>
      </div>
    </fieldset>
    <section class="ods-form--actions">
      <button class="ods-button is-ods-button-secondary">Cancel</button>
      <button class="ods-button">Save</button>
    </section>
  </form>
  ```
</figure>

## Accessibility

### Placeholders

#### Translation

Users who utilize their browser's auto-translation feature will still see placeholder text in its untranslated state. In order to prevent triggering a change in page layout or logic, browsers skip over translating certain attributes, `placeholder` included.

#### Recall

Placeholder text disappears when a field is interacted with. For this reason, it's not suitable for formatting guidelines or necessary context.

#### Utility

Placeholder content is limited to static text. Additionally, placeholder text is truncated beyond the width of its input.

#### Field value confusion

Low-contrast placeholder styling may be illegible for some users; however, there's evidence to suggest that placeholders with compliant contrast can be mistaken for field values.

Users who turn on High Contrast Mode (or its equivalent) will see placeholder text at the same contrast level as the input's value, making them even harder to distinguish.

Regardless of styling, users with low digital literacy may not understand the purpose or behavior of placeholder text.

## Reference

### Related components

<ul>
  <li>
    <a href="/components/buttons.html">
      Button
    </a>
  </li>
  <li>
    <a href="/components/checkbox.html">
      Checkbox
    </a>
  </li>
  <li>
    <a href="/components/number-input.html">
      Number Input
    </a>
  </li>
  <li>
    <a href="/components/radio-button.html">
      Radio Button
    </a>
  </li>
  <li>
    <a href="/components/select.html">
      Select
    </a>
  </li>
  <li>
    <a href="/components/text-input.html">
      Text Input
    </a>
  </li>
</ul>

### Further reading

<ul>
  <li>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form">
      MDN - &lt;form&gt;
    </a>
  </li>
  <li>
    <a href="https://www.w3.org/WAI/tutorials/forms/instructions/">
      Form Instructions - WAI Web Accessibility Tutorials
    </a>
  </li>
  <li>
    <a href="https://www.nngroup.com/articles/form-design-placeholders/">
      Placeholders in Form Fields Are Harmful
    </a>
  </li>
  <li>
    <a href="https://www.smashingmagazine.com/2018/06/placeholder-attribute/">
      Don’t Use The Placeholder Attribute
    </a>
  </li>
</ul>
