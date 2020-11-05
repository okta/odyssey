---
template: component
id: component-text-input
title: Text Input
description: Text inputs allow users to edit and input data.
lead: Text inputs allow users to edit and input data. They can range from simple search boxes to long-form text areas.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_text-input.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/tVkWsXwnWICeguWhzX6Vwl/Inputs?node-id=476%3A3848
---

::: slot overview

## Anatomy

<Anatomy
  title="title"
  meta="metadata"
  img="/images/anatomy-text-input.svg"
/>

## Variants

### Default

<Description>

This default serves as the basis for our Text Inputs. A shown here, they required paired with a paired Label.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" id="designation" required>
      <label class="ods-label" for="designation">Destination</label>
    </div>
  </fieldset>
</Visual>

### Search

<Description>

Standalone Search provides minimal UI for searching outside of normal form contexts. Search inputs will render with the "Search" UI indicator as well as a visually hidden label.

In this case, we recommend using the placeholder attribute to state the scope of your search. This text should match the hidden label.

</Description>

<Visual>
  <fieldset class="ods-fieldset docskit-visual--wide">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="search" name="search" id="search" autocomplete="search" spellcheck="false" placeholder="Search planets" required>
      <label class="ods-label" for="search">Search planets</label>
    </div>
  </fieldset>
</Visual>

#### Button variant

<Description>

We also provide an attached button for in-page searching or avoiding placeholder text. Please follow our [Button guidelines](/components/button) when using these variants.

</Description>

<Visual>
  <form>
    <fieldset class="ods-fieldset docskit-visual--wide">
      <div class="ods-fieldset--attached">
        <input class="ods-text-input" type="search" name="search" id="button-search" autocomplete="search" spellcheck="false" aria-labelledby="search-button" required>
        <button class="ods-button" id="search-button">Search planets</button>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input class="ods-text-input" type="search" name="search" id="button-search-sec" autocomplete="search" spellcheck="false" aria-labelledby="search-button" required>
        <button class="ods-button is-ods-button-secondary" id="search-button">Find cosmonaut</button>
      </div>
    </fieldset>
  </form>
</Visual>

### Textarea

<Description>

Textareas should be used for multi-line text inputs. As the user types the field will grow vertically to accommodate the new lines.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <textarea class="ods-text-input ods-text-area" name="description" id="description" rows='4' cols='50' spellcheck="true" required></textarea>
      <aside class="ods-field--hint">
        Please describe your perfect planet in as many words as you need.
      </aside>
      <label class="ods-label" for="description">The perfect planet</label>
    </div>
  </fieldset>
</Visual>

## States

<Description>

Text inputs support the following states: Enabled, Focus, Hover, Disabled, Read-only, Optional, and Invalid.

</Description>

### Enabled

<Description>

Text inputs in their "normal" state are considered enabled. They are ready for user interaction.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" id="enabled" required>
      <label class="ods-label" for="enabled">Destination</label>
    </div>
  </fieldset>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the input with a pointer, keyboard, or voice.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input is-ods-input-focus" type="text" id="focus" required>
      <label class="ods-label" for="focus">Destination</label>
    </div>
  </fieldset>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the input.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input is-ods-input-hover" type="text" id="focus" required>
      <label class="ods-label" for="focus">Destination</label>
    </div>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

The values of disabled inputs will not be submitted.

</Description>

<Visual>
  <fieldset class="ods-fieldset docskit-visual--wide">
    <div class="ods-fieldset-flex">
      <input disabled class="ods-text-input" type="text" required disabled>
      <label class="ods-label" for="email">Destination</label>
    </div>
  </fieldset>
</Visual>

### Read-only

<Description>

Similar to disabled inputs, users cannot modify the values of read-only inputs. However, users can otherwise interact with read-only inputs and select their values for copying.

This state can be helpful when displaying computed or third-party values, or when a submitted form is being processed.

The values of read-only inputs will be submitted.

</Description>

<Visual>
  <fieldset class="ods-fieldset docskit-visual--wide">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="name-readonly" id="name-readonly" value="Jupiter" autocomplete="name" spellcheck="false" required readonly>
      <label class="ods-label" for="email">Destination</label>
    </div>
  </fieldset>
</Visual>

### Optional

<Description>

Odyssey assumes inputs are required by default. Optional inputs should be used to indicate when data is not required for the user to complete a task.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="name-optional" id="name-optional" autocomplete="name" spellcheck="false">
      <label class="ods-label" for="name-optional">Destination <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
</Visual>

### Invalid

<Description>

The invalid state is for inputs with incorrect values or values of the wrong format.

When indicating a validation error, please use a Field Error label to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

</Description>

<Visual>
  <fieldset class="ods-fieldset docskit-visual--wide">
    <div class="ods-fieldset-flex">
      <input data-invalid class="ods-text-input" type="text" value="4.76 miles/s" required>
      <label class="ods-label" for="email">Destination</label>
      <aside class="ods-field--error" id="email-invalid-error">
        <span class="u-visually-hidden">Error:</span>This does not appear to be a valid planetoid.
      </aside>
    </div>
  </fieldset>
</Visual>

## Content Guidelines

<Description>

Text inputs support most free-form content, but we offer specific support for email, telephone numbers, and passwords.

</Description>

### Email

<Description>

There are no specific UI changes for email addresses, but inputs of this type will validate that the address is properly formatted.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="email" id="email" autocomplete="email" spellcheck="false" value="homer@okta.com" required>
      <label class="ods-label" for="email">Email</label>
    </div>
  </fieldset>
</Visual>

### Tel

<Description>

Unlike email fields, tel inputs are not automatically validated because global formats are so varied.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="phone" name="tel" id="tel" autocomplete="tel" spellcheck="false" value="555-555-1212" required>
      <label class="ods-label" for="tel">Tel</label>
    </div>
  </fieldset>
</Visual>

### Password

<Description>

Passwords inputs ensure that sensitive content is safely obscured.

</Description>

<Visual>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="password" name="password" id="password" autocomplete="password" spellcheck="false" value="Big Gas Giants" required>
      <label class="ods-label" for="password">Password</label>
    </div>
  </fieldset>
</Visual>

## Accessibility

### Placeholders

<Description>

Except for Search inputs, we advise against using placeholder text for inputs.

</Description>

#### Translation

<Description>

To prevent triggering a change in page layout, browsers don't translate certain attributes. Because of this, users will see untranslated placeholder text.

</Description>

#### Recall

<Description>

Placeholder text disappears when a field is interacted with. For this reason, it's not suitable for formatting guidelines or necessary context.

</Description>

#### Utility

<Description>

Placeholder content is limited to static text. Additionally, placeholder text is truncated beyond the width of its input.

</Description>

#### Field value confusion

<Description>

Low-contrast placeholders may be illegible for some users. Yet, placeholders with compliant contrast can be mistaken for field values. High Contrast Mode will make placeholders and values appear identical.

Finally, Users with low digital literacy may not understand the purpose or behavior of placeholder text.

</Description>

:::

::: slot html-scss
## HTML & CSS

### Invalid

The :invalid CSS pseudo-class represents any <input> or other <form> element whose contents fail to validate. - MDN
Because of the current inability to ensure consistent validation behavior across browsers, we're using the [data-invalid] attribute to indicate this state.


:::
