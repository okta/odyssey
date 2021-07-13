<!-- This file will not be merged. -->

# Form Components

## Form

A container component that controls form behavior and provides layout slots.

### Non-global attrs

- accept-charset
- action
- autocomplete
- enctype
- method
- name
- novalidate
- rel
- target

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

- disabled
- form
- name

### Component markup

```html
<fieldset class="ods-field-group">
  <legend class="ods-field-grou--title">[...]</legend>
  [...]
</fieldset>
```

## Field

### Non-global attrs

- disabled
- form
- name

```html
<fieldset class="ods-field">
  <label>/<legend>[...]</label>/</legend>
  <span class="ods-field--hint">[...]</span>
  [...]
  <span class="ods-field--error">[...]</span>
</fieldset>
```
