<!-- This file will not be merged. -->

# Form Components

The purpose of this document is to outline the spectrum of components required to make up a complete Form.

Each component below includes a list of attributes present in HTML that represent possible semantic states or behaviors. Design should review these lists to ensure that any attribute values that require user affordances are accounted for. For example: `disabled` or `:invalid`.

**Note:** All code examples are for illustrative purposes only. Structure and behavior may change based on subsequent designs for these components. There are also opportunities for re-use across components; for example, Form.Title extending from Title.

## Inputs

Inputs are the atomic units around which the following components are built. Inputs represent unique controls and are not covered in this document, which seeks to outline the ubiquitous aspects of Forms.

For the sake of clarity, when an Input component is referenced below, it includes only the concerns that make it unique. For example, an Input of the type RadioButtonGroup includes a set of RadioButtons, but *not* their associated Label, Hint, or Error. Those components belong to Field.

## Field

Field is the primary component for assembling forms. It includes all of the supporting context required by the Input. This component would also be responsible for managing the appropriate application of `aria-` attributes and `id` associations between Inputs and their associated elements.

Because the requirements for both behavior and display of fields are stringent, I recommend that authors not rely on composition to assemble their fields if possible.

### Non-global attrs

#### Fieldset-specific HTML attributes/behaviors

- `disabled`: If this Boolean attribute is set, all Inputs that are descendants of the `<fieldset>` are disabled.
  - In the case of Field, putting this on the `fieldset` would have the desired behavior, but passing `disabled` to the Input itself would be less brittle.
- `name`: The name associated with the group.
- `form`: This attribute takes the value of the id attribute of a `<form>` element you want the `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the `<input>` elements inside the `<fieldset>` to be associated with the form, you need to use the form attribute directly on those elements.
  - In the case of Field, this attribute should be passed to Input instead of the containing `fieldset` to create the ideal behavior here.

#### Input-specific HTML attributes/behaviors

Inputs surface a huge list of attributes; these are the most relevant and global.

- `autocomplete`: The autocomplete attribute takes as its value a space-separated string that describes what, if any, type of autocomplete functionality the Input should provide. In cases where we are collecting information about a user, WCAG requires specifying this attribute to set the Field's purpose.
- `disabled`: Whether the Input is disabled. Disabled Inputs do not receive click events and are not submitted with the Form. See above.
- `form`: Associates the Input with a form element. See above.
- `name`: Name of the Input. Submitted with the form as part of a name/value pair.
- `readonly`: Value is not editable.
- `required`: A value is required.
- `type`: Type of Input.
- `value`: Initial value of the Input.

There are specific attributes that will need to be passed to individual Input types as well. <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input">This chart from MDN</a> provides an excellent breakdown.

### Content

- FieldLabel: a text label for the field (element may be `<label>` or `<legend>` depending on Field input)
  - The Label also indicates the Field's optional/required status
- FieldHint: context for the field
- Input: the UI control
- FieldValidation: any error or success state messaging for the field

### Psuedo-structure

```html
// via props

<Field
  label="A field"
  hint="This is a field you should fill in."
  type="text"
  name="a-field"
  optional
  disabled
  autocomplete="fname"
/>


// via composition

<Field>
  <Field.Label>A field</Field.Label>
  <Field.Hint>This is a field you should fill in.</Field.Hint>
  <Input/>
  <Field.Validation type="error">This is an error message.</Field.Validation>
</Field>
```

### HTML

```html
<fieldset class="ods-field">
  <label class="ods-field--label" for="first-name">
    First name
    <span class="ods-field--optional">Optional</span>
  </label>
  <aside class="ods-field--hint" id="first-name-hint">
    Please enter your first name.
  </aside>
  <input class="ods-text-input" type="text" name="first-name" id="first-name" spellcheck="false" value="" autocomplete="fname" aria-describedby="first-name-hint first-name-error">
  <aside class="ods-field--error" id="first-name-error"><span class="ods-u-visually-hidden">Error:</span> Numbers are disallowed.</aside>
</fieldset>
```

## FieldGroup

### Non-global attrs

Fieldset-specific HTML attributes/behaviors:

- `disabled`: If this Boolean attribute is set, all Inputs that are descendants of the `<fieldset>` are disabled.
  - Form elements inside the `<legend>` element won't be disabled, but this doesn't seem like a valid use case for Odyssey.
  - In the case of FieldGroup, `disabled` could be passed to the child Fields (or their Inputs). Disabling whole FieldGroups on the parent `fieldset` is also viable.
- `name`: The name associated with the group.
- `form`: This attribute takes the value of the id attribute of a `<form>` element you want the `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the `<input>` elements inside the `<fieldset>` to be associated with the form, you need to use the form attribute directly on those elements.
  - Because of the unintuitive behavior of this attribute, I recommend that this be relegated to use on Field or we provide a way to cascade this attribute to all child Inputs.

### Content areas

- Title: contains legend for FieldGroup
- Slot: contains Fields

### Pseudo-Structure

```html
<FieldGroup>
  <FieldGroup.Title>A Group of Fields</FieldGroup>
  [...]
</FieldGroup>
```

### HTML

```html
<fieldset class="ods-field-group">
  <legend class="ods-field-group--title">A Group of Fields</legend>
  [...]
</fieldset>
```

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

### Pseudo-Structure

```html
<Form>
  <Form.Header>
    <Form.Title>Form Title</Form.Title>
    <Form.Desc>This is a caption for the form.</Form.Desc>
  </Form.Header>
  <Form.Error>
    <Infobox variant="error" />
  </Form.Error>
  <Form.Main>
    <FieldGroup title="Field Group">
      <Field label="First name" type="text" hint="Please input your first name." required/>
      <Field label="Last name" type="number" hint="Please input your last name." required/>
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

