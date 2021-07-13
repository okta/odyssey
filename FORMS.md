<!-- This file will not be merged. -->

# Form Components

## Form

A container component that controls form behavior and provides layout slots.

### Non-global attrs

Form-specific HTML attributes we may need props for.

- `accept-charset`: Space-separated character encodings the server accepts. The browser uses them in the order in which they are listed. The default value means the same encoding as the page.
- `action`: The URL that processes the form submission. This value can be overridden by a formaction attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element.
- `autocomplete`: Indicates whether input elements can by default have their values automatically completed by the browser. autocomplete attributes on form elements override it on `<form>`. Possible values:
- - `off`: The browser may not automatically complete entries. (Browsers tend to ignore this for suspected login forms; see The autocomplete attribute and login fields.)
- - `on`: The browser may automatically complete entries.
- `enctype`: If the value of the method attribute is post, enctype is the MIME type of the form submission. This value can be overridden by formenctype attributes on `<button>`, `<input type="submit">`, or `<input type="image">` elements. Possible values:
- - `application/x-www-form-urlencoded`: The default value.
- - `multipart/form-data`: Use this if the form contains `<input>` elements with type=file.
- - `text/plain`: Introduced by HTML5 for debugging purposes.
- `method`: The HTTP method to submit the form with. This value is overridden by formmethod attributes on `<button>`, `<input type="submit">`, or `<input type="image">` elements. Possible (case insensitive) values:
- - `post`: The POST method; form data sent as the request body.
- - `get`: The GET method; form data appended to the action URL with a ? separator. Use this method when the form has no side-effects.
- - `dialog`: When the form is inside a `<dialog>`, closes the dialog on submission.
- `name`: The name of the form. The value must not be the empty string, and must be unique among the `form` elements in the forms collection that it is in, if any.
- `novalidate`: This Boolean attribute indicates that the form shouldn't be validated when submitted. If this attribute is not set (and therefore the form is validated), it can be overridden by a formnovalidate attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element belonging to the form.
- `rel`: Creates a hyperlink or annotation depending on the value, see the rel attribute for details.
- `target`: Indicates where to display the response after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a browsing context (for example, tab, window, or iframe). This value can be overridden by a formtarget attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element. The following keywords have special meanings:
- - `_self` (default): Load into the same browsing context as the current one.
- - `_blank`: Load into a new unnamed browsing context.
- - `_parent`: Load into the parent browsing context of the current one. If no parent, behaves the same as `_self`.
- - `_top`: Load into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one and has no parent). If no parent, behaves the same as `_self`.


### Content areas

- Header: contains Title, Description
- Main: contains FieldGroups, Fields
- Error: contains an Infobox displaying Form-level errors
- Footer: contains Form actions or action containers like ButtonGroup, also legalese

### Component markup

```html
<form class="ods-form">
  <header class="ods-form--header">
    <h1 class="ods-form--title">[...]</h1>
    <p class="ods-form--desc">[...]</p>
  </header>
  <section class="ods-form--error">
    [...]
  </section>
  <section class="ods-form--main">
    [...]
  </section>
  <footer class="ods-form--footer">
    [...]
  </footer>
</form>
```

## FieldGroup

### Non-global attrs

Fieldset-specific HTML attributes we may need props for.

- disabled
- form
- name

### Content areas

- Title: contains legend for FieldGroup
- Slot: contains Fields

### Component markup

```html
<fieldset class="ods-field-group">
  <legend class="ods-field-group--title">[...]</legend>
  [...]
</fieldset>
```

## Field

### Non-global attrs

Fieldset-specific HTML attributes we may need props for.

- disabled
- form
- name

### Content areas

- Label: a text label for the field (element may be `<label>` or `<legend>` depending on Field input, Optional status
- Hint: context for the field
- Slot: an Input or InputGroup
- Error: any errors for the field

### Component markup

```html
<fieldset class="ods-field">
  <label>/<legend>[...]</label>/</legend>
  <span class="ods-field--hint">[...]</span>
  [...]
  <span class="ods-field--error">[...]</span>
</fieldset>
```
