---
template: component
id: component-form
title: Form
description:
lede:
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_label.scss
---

::: slot overview

# Form Components

<Description>

The purpose of this document is to outline the spectrum of components required to make up a complete Form. This includes: Input, Field, FieldGroup, and Form.

Along with a general description and suggested structure, each component below includes a list of possible attributes and states. Design should review these lists to ensure that any values that require user affordances are accounted for. For example: `disabled` or `:invalid`.

**Note:** All code examples are for illustrative purposes only. Structure and behavior may change based on subsequent designs for these components. There are also opportunities for re-use across components; for example, Form.Title extending from Title.

</Description>

## Inputs

<Description>

Inputs are the atomic units around which the following components are built. Inputs represent unique controls and are not covered in this document, which seeks to outline the ubiquitous aspects of Forms.

For the sake of clarity, when an Input component is referenced below, it includes only the concerns that make it unique. For example, an Input of the type RadioButtonGroup includes a set of RadioButtons, but *not* their associated Label, Hint, or Error. Those components belong to Field.

</Description>

<Visual>
  <fieldset class="ods-field">
    <input type="checkbox" name="input-checkbox" id="input-checkbox" value="input-checkbox-enabled" class="ods-checkbox">
    <label for="overview-enabled" class="ods-checkbox--label">Enable auto-docking</label>
  </fieldset>
  <fieldset class="ods-field">
    <input class="ods-radio" type="radio" name="input-radio" id="input-radio-0" value="value-0" required checked>
    <label class="ods-radio--label" for="input-radio-0">Astronaut</label>
    <input class="ods-radio" type="radio" name="input-radio" id="input-radio-1" value="value-1" required>
    <label class="ods-radio--label" for="input-radio-1">Cosmonaut</label>
    <input class="ods-radio" type="radio" name="input-radio" id="input-radio-2" value="value-2" required>
    <label class="ods-radio--label" for="input-radio-2">Taikonaut</label>
  </fieldset>
  <div class="ods-field">
    <input class="ods-text-input" type="text" name="input-text" id="input-text" spellcheck="false" value="Cassiopeia">
  </div>
</Visual>


## Field

<Description>

Field is the primary component for assembling forms. It includes all of the supporting context required by the Input. This component would also be responsible for managing the appropriate application of `aria-` attributes and `id` associations between Inputs and their associated elements.

Because the requirements for both behavior and display of fields are stringent, I recommend that authors not rely on composition to assemble their fields if possible.

### Non-global attrs

#### Fieldset-specific HTML attributes

Regarding Field, these attributes would only be available/apply when utilizing a "grouped" Input type like Radio or Checkbox. While they can be applied to the containing `fieldset`, it would be less brittle to apply them to the individual Input tags associated with the Field.

- `disabled`: If this Boolean attribute is set, all Inputs that are descendants of the `<fieldset>` are disabled.
  - In the case of Field, putting this on the `fieldset` would have the desired behavior, but passing `disabled` to the Input itself would be less brittle.
- `name`: The name associated with the group.
- `form`: This attribute takes the value of the id attribute of a `<form>` element you want the `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the `<input>` elements inside the `<fieldset>` to be associated with the form, you need to use the form attribute directly on those elements.
  - In the case of Field, this attribute should be passed to Input instead of the containing `fieldset` to create the ideal behavior here.

#### Input-specific HTML attributes

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

### States

Many of these states are assigned or applicable to the `<input>` element. However, those Input states may be better reflected at the Field level.

For example: dimming Field.Label for `disabled` elements; showing Field.Error only when an Input is `invalid`. Both of these cases reflect Input states that require affordances on Field.

#### Defaults

These states represent "default" UI states. While these states may technically apply, it's unlikely that they will be set manually and will not require additional affordances.

- `blank`: When an Input is empty.
- `dir`: The reading direction currently applied.
- `enabled`: When an Input is enabled (rather than disabled). This is the default state.
- `in-range` When an Input is within the range constrictions. e.g. a slider.
- `placeholder-shown`: When placeholder text is visible.
- `read-write`: When an Input is user-editable (rather than read-only). This is the default state.
- `required`: When an Input is required.
- `valid`: When an Input has valid contents/values.

#### Unstyled states

These states represent non-defaults that do not currently require unique affordances.

- `active`: When the Input is activated by the user. Not often applicable.
- `autofill`: When an Input has been auto-filled by the browser.
  - Browsers and plugins provide bespoke styling to indicate when a field has been auto-filled. To preserve consistency of user-experience, it's best to leave these unstyled.
- `target`: When the component is the target of a URL. e.g. `site.com/form#firstname`
- `target-within`: When a child is a `target`.

#### Styled states

These states require affordances to indicate their status to the user. In some cases, styles will be shared across states. For ex: `invalid` and `out-of-range`.

- `checked`: When Inputs like Radio and Checkbox are checked.
- `indeterminate`: When Inputs are in an indeterminate state. e.g. A "parent" checkbox for a group of mixed checked/unchecked Inputs.

- `disabled`: When an Input is disabled.

- `read-only`: When an Input cannot be changed by the user.

- `focus`: When the Input has focus.
- `focus-within` When a child has `focus`.
  - Should be the same as `:focus` unless input-specific

- `hover`: When the Input is hovered by a pointing device.

- `invalid`: When an Input has invalid contents/values.
- `user-invalid`: When an Input is invalid, but only after a user has interacted with it.
  - Identical to invalid
- `out-of-range`: When an Input is outside of range constrictions.
  - Unnec until shipping range inputs, would mimic invalid

- `optional`: When an Input is optional.
  - "Optional" label becomes present/visible

### Content

- FieldLabel: a text label for the field (element may be `<label>` or `<legend>` depending on Field input)
  - The Label also indicates the Field's optional/required status
- FieldHint: context for the field
- Input: the UI control
- FieldValidation: any error or success state messaging for the field

### Psuedo-structure

```html
<Field>
  <Field.Label>A field</Field.Label>
  <Field.Hint>This is a field you should fill in.</Field.Hint>
  <Input/>
  <Field.Validation type="error">This is an error message.</Field.Validation>
</Field>
```

### HTML

Different Field types will require different rendered HTML based on their associated Input.

#### Single-Input Field

```html
<div class="ods-field">
  <label class="ods-field--label" for="first-name">
    First name
    <span class="ods-field--optional">Optional</span>
  </label>
  <p class="ods-field--hint" id="first-name-hint">
    Please enter your first name.
  </p>
  <input class="ods-text-input" type="text" name="first-name" id="first-name" spellcheck="false" value="" autocomplete="fname" aria-describedby="first-name-hint first-name-error">
  <p class="ods-field--error" id="first-name-error"><span class="ods-u-visually-hidden">Error:</span> Numbers are disallowed.</p>
</div>
```

#### Grouped-Input Field

Support for Hint and Error association is more limited for Grouped Inputs. Based on cross-browser testing, two options follow.

First, setting the associations on the first input:

```html
<fieldset class="ods-field">
  <legend class="ods-field--label">
    Select your speed
    <span class="ods-field--optional">Optional</span>
  </legend>
  <p class="ods-field--hint" id="speed-hint">
    Please select the desired speed of your craft.
  </p>
  <input class="ods-radio" type="radio" name="speed" id="speed-1" aria-describedby="speed-hint speed-error" value="1" required>
  <label class="ods-radio--label" for="speed-1">Lightspeed</label>
  <input class="ods-radio" type="radio" name="speed" id="speed-2" value="2" required checked>
  <label class="ods-radio--label" for="speed-2">Warp Speed</label>
  <input class="ods-radio" type="radio" name="speed" id="speed-3" value="3" required>
  <label class="ods-radio--label" for="speed-3">Ludicrous Speed</label>
  <p class="ods-field--error" id="speed-error"><span class="ods-u-visually-hidden">Error:</span> You must set a speed before continuing.</p>
</fieldset>
```

As a second option, we could dynamically insert/remove the appropriate hint/error into the `legend` as SR-only and turn off voice-over for the visible messaging. Note the SR-only classes within the label and addition of `aria-hidden` on the visible messaging.

```html
<fieldset class="ods-field">
  <legend class="ods-field--label">
    Select your speed
    <span class="ods-field--optional">Optional</span>
    <span class="ods-visually-hidden">Please select the desired speed of your craft.</span>
    <span class="ods-visually-hidden">Error: You must set a speed before continuing.</p>
  </legend>
  <p class="ods-field--hint" id="speed-hint" aria-hidden>
    Please select the desired speed of your craft.
  </p>
  <input class="ods-radio" type="radio" name="speed" id="speed-1" value="1" required>
  <label class="ods-radio--label" for="speed-1">Lightspeed</label>
  <input class="ods-radio" type="radio" name="speed" id="speed-2" value="2" required checked>
  <label class="ods-radio--label" for="speed-2">Warp Speed</label>
  <input class="ods-radio" type="radio" name="speed" id="speed-3" value="3" required>
  <label class="ods-radio--label" for="speed-3">Ludicrous Speed</label>
  <p class="ods-field--error" id="speed-error" aria-hidden><span class="ods-u-visually-hidden">Error:</span> You must set a speed before continuing.</p>
</fieldset>
```

<a href="https://blog.tenon.io/accessible-validation-of-checkbox-and-radiobutton-groups/">This article</a> provides more detailed results of both implementations as well as alternatives.

</Description>

<Visual>
  <div class="ods-field">
    <label class="ods-field--label" for="field-0">Destination</label>
    <input class="ods-text-input" type="text" id="field-0">
  </div>
  <div class="ods-field">
    <label for="field-1" class="ods-field--label">
      Destination
      <span class="ods-field--label--optional">Optional</span>
    </label>
    <input class="ods-text-input" type="text" id="field-1">
  </div>
  <div class="ods-field">
    <label class="ods-field--label" for="field-2">Destination</label>
    <p class="ods-field--hint" id="field-2-hint">Your planetary destination.</p>
    <input class="ods-text-input" type="text" id="field-2" aria-describedby="field-2-hint">
  </div>
  <div class="ods-field">
    <label class="ods-field--label" for="field-3">Destination</label>
    <input class="ods-text-input" type="text" id="field-3" aria-describedby="field-3-error" required>
    <p class="ods-field--error" id="field-3-error"><span class="u-visually-hidden">Error:</span> This field may not be left blank.</p>
  </div>
  <div class="ods-field">
    <label class="ods-field--label" for="field-4">Destination (Disabled)</label>
    <input class="ods-text-input" type="text" id="field-4" disabled>
  </div>
  <div class="ods-field">
    <label class="ods-field--label" for="field-5">Destination (Read-Only)</label>
    <input class="ods-text-input" type="text" id="field-5" value="Mercury" readonly>
  </div>
  <hr>
  <fieldset class="ods-field">
    <legend class="ods-field--label">Select Destination</legend>
    <input class="ods-radio" type="radio" name="grouped-field" id="grouped-field-a" value="Mercury" required checked>
    <label class="ods-radio--label" for="grouped-field-a">Mercury</label>
    <input class="ods-radio" type="radio" name="grouped-field" id="grouped-field-b" value="Mars" required>
    <label class="ods-radio--label" for="grouped-field-b">Mars</label>
    <input class="ods-radio" type="radio" name="grouped-field" id="grouped-field-c" value="Venus" required>
    <label class="ods-radio--label" for="grouped-field-c">Venus</label>
  </fieldset>
  <fieldset class="ods-field">
    <legend class="ods-field--label">
      Select Destination
      <span class="ods-field--label--optional">Optional</span>
    </legend>
    <input class="ods-radio" type="radio" name="grouped-field" id="grouped-field-a" value="Mercury">
    <label class="ods-radio--label" for="grouped-field-a">Mercury</label>
    <input class="ods-radio" type="radio" name="grouped-field" id="grouped-field-b" value="Mars">
    <label class="ods-radio--label" for="grouped-field-b">Mars</label>
    <input class="ods-radio" type="radio" name="grouped-field" id="grouped-field-c" value="Venus">
    <label class="ods-radio--label" for="grouped-field-c">Venus</label>
  </fieldset>
  <fieldset class="ods-field">
    <legend class="ods-field--label">
      Select Destination
    </legend>
    <p class="ods-field--hint" id="grouped-field-1-hint">Select your planetary destination.</p>
    <input class="ods-radio" type="radio" name="grouped-field-1" id="grouped-field-1-a" value="Mercury" aria-describedby="grouped-field-1-hint" required checked>
    <label class="ods-radio--label" for="grouped-field-1-a">Mercury</label>
    <input class="ods-radio" type="radio" name="grouped-field-1" id="grouped-field-1-b" value="Mars" required>
    <label class="ods-radio--label" for="grouped-field-1-b">Mars</label>
    <input class="ods-radio" type="radio" name="grouped-field-1" id="grouped-field-1-c" value="Venus" required>
    <label class="ods-radio--label" for="grouped-field-1-c">Venus</label>
  </fieldset>
  <fieldset class="ods-field">
    <legend class="ods-field--label">
      Select Destination
    </legend>
    <input class="ods-radio" type="radio" name="grouped-field-2" id="grouped-field-2-a" value="Mercury" aria-describedby="grouped-field-2-error" required>
    <label class="ods-radio--label" for="grouped-field-2-a">Mercury</label>
    <input class="ods-radio" type="radio" name="grouped-field-2" id="grouped-field-2-b" value="Mars" required>
    <label class="ods-radio--label" for="grouped-field-2-b">Mars</label>
    <input class="ods-radio" type="radio" name="grouped-field-2" id="grouped-field-2-c" value="Venus" required>
    <label class="ods-radio--label" for="grouped-field-2-c">Venus</label>
    <p class="ods-field--error" id="grouped-field-2-error"><span class="u-visually-hidden">Error:</span> A destination must be selected before continuing.</p>
  </fieldset>
  <fieldset class="ods-field">
    <legend class="ods-field--label">Select Destination (Disabled)</legend>
    <input class="ods-radio" type="radio" name="grouped-field-3" id="grouped-field-3-a" value="Mercury" required disabled>
    <label class="ods-radio--label" for="grouped-field-3-a">Mercury</label>
    <input class="ods-radio" type="radio" name="grouped-field-3" id="grouped-field-3-b" value="Mars" required disabled>
    <label class="ods-radio--label" for="grouped-field-3-b">Mars</label>
    <input class="ods-radio" type="radio" name="grouped-field-3" id="grouped-field-3-c" value="Venus" required disabled>
    <label class="ods-radio--label" for="grouped-field-3-c">Venus</label>
  </fieldset>
  <fieldset class="ods-field">
    <legend class="ods-field--label">Select Destination (Read-Only)</legend>
    <input class="ods-radio" type="radio" name="grouped-field-4" id="grouped-field-4-a" value="Mercury" required readonly>
    <label class="ods-radio--label" for="grouped-field-4-a">Mercury</label>
    <input class="ods-radio" type="radio" name="grouped-field-4" id="grouped-field-4-b" value="Mars" required readonly>
    <label class="ods-radio--label" for="grouped-field-4-b">Mars</label>
    <input class="ods-radio" type="radio" name="grouped-field-4" id="grouped-field-4-c" value="Venus" required readonly>
    <label class="ods-radio--label" for="grouped-field-4-c">Venus</label>
  </fieldset>
</Visual>

## FieldGroup

<Description>

### Non-global attrs

Fieldset-specific HTML attributes:

- `disabled`: If this Boolean attribute is set, all Inputs that are descendants of the `<fieldset>` are disabled.
  - Form elements inside the `<legend>` element won't be disabled, but this doesn't seem like a valid use case for Odyssey.
  - In the case of FieldGroup, `disabled` could be passed to the child Fields (or their Inputs). Disabling whole FieldGroups on the parent `fieldset` is also viable.
- `name`: The name associated with the group.
- `form`: This attribute takes the value of the id attribute of a `<form>` element you want the `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the `<input>` elements inside the `<fieldset>` to be associated with the form, you need to use the form attribute directly on those elements.
  - Because of the unintuitive behavior of this attribute, I recommend that this be relegated to use on Field or we provide a way to cascade this attribute to all child Inputs.

As noted above, it may be beneficial to pass these attributes directly to the child Inputs rather than applying them to the parent `fieldset`.

### Content areas

- Title: contains legend for FieldGroup
- Descr: contains a description for a FieldGroup
- Error: contains an Infobox describing FieldGroup-level errors ("Two valid options you have selected are incompatible.")
- Slot: contains Fields

### Pseudo-Structure

```html
<FieldGroup>
  <FieldGroup.Title>A Group of Fields</FieldGroup.Title>
  <FieldGroup.Desc>This is a description of the FieldGroup.</FieldGroup.Desc>
  <FieldGroup.Error>
    <Infobox variant="error" />
  </FieldGroup.Error>
  [...]
</FieldGroup>
```

### HTML

```html
<fieldset class="ods-field-group">
  <legend class="ods-field-group--title">A Group of Fields</legend>
  <p class="ods-field-group--desc">This is a description of the FieldGroup.</p>
  <section class="ods-field-group--error">
    [...]
  </section>
  [...]
</fieldset>
```

</Description>

<Visual>
  <fieldset class="ods-field-group">
    <legend class="ods-field-group--title">Origination logistics</legend>
    <p class="ods-field-group--desc">This information is required for your craft to leave the starport.</p>
    <section class="ods-field-group--error">
      <aside class="ods-infobox is-ods-infobox-danger" role="alert">
        <span class="ods-infobox--icon">
          <OdsIcon icon="error"></OdsIcon>
        </span>
        <h1 class="ods-infobox--title">Disallowed combination</h1>
        <section class="ods-infobox--content">
          <p>This destination cannot be reached utilizing your current speed selection.</p>
        </section>
      </aside>
    </section>
    <div class="ods-field">
      <label class="ods-field--label" for="fieldgroup-destination-star">Destination star</label>
      <p class="ods-field--hint" id="fieldgroup-destination-star-hint">
        The stellar object you are traveling to.
      </p>
      <select class="ods-select" data-js-choices id="fieldgroup-destination-star" name="fieldgroup-destination-star" required aria-describedby="fieldgroup-destination-star-hint">
        <option value="proxima">Proxima Centauri</option>
        <option value="barnards">Barnard's Star</option>
        <option value="wise">WISE 1049-5319</option>
        <option value="wolf">Wolf 359</option>
        <option value="lalande">Lalande 21185</option>
        <option value="sirius-a">Sirius A</option>
        <option value="sirius-b">Sirius B</option>
      </select>
    </div>
    <fieldset class="ods-field">
      <legend class="ods-field--label">Traveling speed</legend>
      <input class="ods-radio" type="radio" name="fieldgroup-speed" id="fieldgroup-speed-1" value="1" required>
      <label class="ods-radio--label" for="fieldgroup-speed-1">Lightspeed</label>
      <input class="ods-radio" type="radio" name="fieldgroup-speed" id="fieldgroup-speed-2" value="2" required>
      <label class="ods-radio--label" for="fieldgroup-speed-2">Warp Speed</label>
      <input class="ods-radio" type="radio" name="fieldgroup-speed" id="fieldgroup-speed-3" value="3" required checked>
      <label class="ods-radio--label" for="fieldgroup-speed-3">Ludicrous Speed</label>
    </fieldset>
  </fieldset>
</Visual>

## Form

<Description>

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
    <FieldGroup>
      <FieldGroup.Title>A Group of Fields</FieldGroup.Title>
      <FieldGroup.Desc>This is a description of the FieldGroup.</FieldGroup.Desc>
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

</Description>

<Visual content="no-padding">
  <form class="ods-form">
    <header class="ods-form--header">
      <h1 class="ods-form--title">Interplanetary flight registration</h1>
      <p class="ods-form--desc">Complete this form in order to register for your interplanetary transfer.</p>
    </header>
    <section class="ods-form--error">
      <aside class="ods-infobox is-ods-infobox-danger" role="alert">
        <span class="ods-infobox--icon">
          <OdsIcon icon="error"></OdsIcon>
        </span>
        <h1 class="ods-infobox--title">Signal interrupted</h1>
        <section class="ods-infobox--content">
          <p>Solar flare activity has caused your submission to fail. Please try again.</p>
        </section>
      </aside>
    </section>
    <section class="ods-form--main">
      <fieldset class="ods-field-group">
        <legend class="ods-field-group--title">Origination logistics</legend>
        <p class="ods-field-group--desc">This information is required for your craft to leave the starport.</p>
        <section class="ods-field-group--error">
        </section>
        <fieldset class="ods-field">
          <legend class="ods-field--label">Payload</legend>
          <p class="ods-field--hint">
            Please select all non-smuggled items.
          </p>
          <input class="ods-checkbox" type="checkbox" name="payload[]" id="payload-1" value="tungsten" checked>
          <label class="ods-checkbox--label" for="payload-1">Tungsten rods</label>
          <input class="ods-checkbox" type="checkbox" name="payload[]" id="payload-2" value="filters" checked>
          <label class="ods-checkbox--label" for="payload-2">Oxygen filters</label>
          <input class="ods-checkbox" type="checkbox" name="payload[]" id="payload-3" value="fuel">
          <label class="ods-checkbox--label" for="payload-3">Liquid fuel</label>
          <input class="ods-checkbox" type="checkbox" name="payload[]" id="payload-4" value="crew">
          <label class="ods-checkbox--label" for="payload-4">Replacement crew</label>
        </fieldset>
        <div class="ods-field">
          <label class="ods-field--label" for="origin-system">Starting system</label>
          <p class="ods-field--hint">
            Your origin system has been pre-populated.
          </p>
          <input class="ods-text-input" type="text" id="origin-system" readonly value="Sol">
        </div>
        <fieldset class="ods-field">
          <legend class="ods-field--label">Select speed</legend>
          <input class="ods-radio" type="radio" name="speed" id="speed-1" value="1" required aria-describedby="speed-error">
          <label class="ods-radio--label" for="speed-1">Lightspeed</label>
          <input class="ods-radio" type="radio" name="speed" id="speed-2" value="2" required>
          <label class="ods-radio--label" for="speed-2">Warp Speed</label>
          <input class="ods-radio" type="radio" name="speed" id="speed-3" value="3" required>
          <label class="ods-radio--label" for="speed-3">Ludicrous Speed</label>
          <p class="ods-field--error" id="destination-star-error"><span class="u-visually-hidden">Error:</span> You must set a speed before continuing.</p>
        </fieldset>
      </fieldset>
      <fieldset class="ods-field-group">
        <legend class="ods-field-group--title">Destination information</legend>
        <p class="ods-field-group--desc">Provide the requested details, so the station can calculate your jump coordinates.</p>
        <section class="ods-field-group--error">
          <aside class="ods-infobox is-ods-infobox-danger" role="alert">
            <span class="ods-infobox--icon">
              <OdsIcon icon="error"></OdsIcon>
            </span>
            <h1 class="ods-infobox--title">Passcode rejected</h1>
            <section class="ods-infobox--content">
              <p>Your destination passcode has been rejected. Please re-enter passcode or select a new destination.</p>
            </section>
          </aside>
        </section>
        <div class="ods-field">
          <label class="ods-field--label" for="destination-star">Destination star</label>
          <p class="ods-field--hint" id="destination-star-hint">
            The stellar object you are traveling to.
          </p>
          <select class="ods-select" data-js-choices id="destination-star" name="destination-star" required aria-describedby="destination-star-hint destination-star-error">
            <option></option>
            <option value="proxima">Proxima Centauri</option>
            <option value="barnards">Barnard's Star</option>
            <option value="wise">WISE 1049-5319</option>
            <option value="wolf">Wolf 359</option>
            <option value="lalande">Lalande 21185</option>
            <option value="sirius-a">Sirius A</option>
            <option value="sirius-b">Sirius B</option>
          </select>
        </div>
        <div class="ods-field">
          <label class="ods-field--label" for="origin-system">Destination</label>
          <p class="ods-field--hint">
            Select a stellar object before inputting your destination.
          </p>
          <input class="ods-text-input" type="text" id="origin-system" disabled>
        </div>
        <div class="ods-field">
          <label for="passcode" class="ods-field--label">Destination passcode<span class="ods-field--label--optional">Optional</span></label>
          <input class="ods-text-input" type="text" id="passcode">
        </div>
      </fieldset>
    </section>
    <footer class="ods-form--footer">
      <button class="ods-button is-ods-button-primary">
        Submit
      </button>
    </footer>
  </form>
</Visual>

:::

::: slot html-scss

:::
