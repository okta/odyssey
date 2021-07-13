<!-- This file will not be merged. -->

# Form Components

## Form

A container component that controls form behavior and provides layout slots.

### Non-global attrs

Form-specific HTML attributes we may need props for.

#### Submission-related

These values can be overridden by a `formaction` attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element.

- `action`: The URL that processes the form submission.
- `enctype`: If the value of the method attribute is post, enctype is the MIME type of the form submission. Possible values: `application/x-www-form-urlencoded` (default), `multipart/form-data` (use when form contains `<input type='file'>` elements), `text/plain` (debugging).
- `method`: The HTTP method to submit the form with. Possible (case insensitive) values: `get`, `post`, `dialog`.
- `novalidate`: This Boolean attribute indicates that the form shouldn't be validated when submitted.
- `target`: Indicates where to display the response after submitting the form. The following values have special meanings: `_self` (default), `_blank`, `_parent`, `_top`.

#### Likely unnec

- `accept-charset`: Space-separated character encodings the server accepts. The default value means the same encoding as the page.
- `autocomplete`: Indicates whether input elements can by default have their values automatically completed by the browser. autocomplete attributes on form elements override it on `<form>`. Possible values: `off`, `on`.
  - WCAG requires that we specify this attribute on individual inputs that collect data about the user.
- `name`: The name of the form. The value must not be the empty string, and must be unique among the `form` elements in the forms collection that it is in, if any.
- `rel`: Creates a hyperlink or annotation depending on the value, see the rel attribute for details.

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

```react
<Form>
  <Form.Header>
    <Heading>/<Form.Title>Form Title</Form.Title>/</Heading>
    <Form.Desc>This is a caption for the form.</Form.Desc>
  </Form.Header>
  <Form.Error>
    <Infobox variant="error" />
  </Form.Error>
  <Form.Main>
    <FieldGroup title="Field Group">
      <Field label="A Field" type="text" hint="whatever" required/>
      <Field>
        <Field.Label>A Field</Field.Label>
        <Field.Hint>A field hint.</Field.Hint>
        <Input type="text" name="whatever" value="dog"/>
      </Field>
    </FieldGroup>
  </Form.Main>
  <Form.Footer>
    <ButtonGroup>
      <Button>Reset</Button>
      <Button>Submit</Button>
    </ButtonGroup>
  </Form.Footer>
</Form>
```

## FieldGroup

### Non-global attrs

Fieldset-specific HTML attributes we may need props for.

- `disabled`: If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>` are disabled. Note that form elements inside the `<legend>` element won't be disabled.
- `form`: This attribute takes the value of the `id` attribute of a `<form>` element you want the `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the `<input>` elements inside the `<fieldset>` to be associated with the form, you need to use the form attribute directly on those elements. You can check which elements are associated with a form via JavaScript, using `HTMLFormElement.elements`.
- `name`: The name associated with the group.

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

- `disabled`: If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>` are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the `<legend>` element won't be disabled.
- `form`: This attribute takes the value of the id attribute of a `<form>` element you want the `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the `<input>` elements inside the `<fieldset>` to be associated with the form, you need to use the form attribute directly on those elements. You can check which elements are associated with a form via JavaScript, using `HTMLFormElement.elements`.
- `name`: The name associated with the group.

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

