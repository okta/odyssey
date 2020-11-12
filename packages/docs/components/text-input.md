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

<Anatomy img="images/anatomy-text-input.svg" />

## Variants

### Default

<Description>

This default serves as the basis for our Text Inputs. A shown here, they required paired with a paired Label.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" id="overview-default" required>
      <label class="ods-label" for="overview-default">Destination</label>
    </div>
  </fieldset>
</Visual>

### Search

<Description>

Standalone Search provides minimal UI for searching outside of normal form contexts. Search inputs will render with the "Search" UI indicator as well as a visually hidden label.

In this case, we recommend using the placeholder attribute to state the scope of your search. This text should match the hidden label.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="search" name="overview-search" id="overview-search" autocomplete="search" spellcheck="false" placeholder="Search planets" required>
      <label class="ods-label" for="overview-search">Search planets</label>
    </div>
  </fieldset>
</Visual>

#### Button variant

<Description>

We also provide an attached button for in-page searching or avoiding placeholder text. Please follow our [Button guidelines](/components/button) when using these variants.

</Description>

<Visual content="full">
  <form>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input class="ods-text-input" type="search" name="overview-search-button" id="overview-search-button" autocomplete="search" spellcheck="false" aria-labelledby="overview-search-button" required>
        <button class="ods-button" id="overview-search-button">Search planets</button>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input class="ods-text-input" type="search" name="overview-search-button-sec" id="overview-search-button-sec" autocomplete="search" spellcheck="false" aria-labelledby="overview-search-button-sec" required>
        <button class="ods-button is-ods-button-secondary" id="overview-search-button-sec">Find cosmonaut</button>
      </div>
    </fieldset>
  </form>
</Visual>

### Textarea

<Description>

Textareas should be used for multi-line text inputs. As the user types the field will grow vertically to accommodate the new lines.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <textarea class="ods-text-input ods-text-area" name="overview-textarea" id="overview-textarea" rows='4' cols='50' spellcheck="true" required></textarea>
      <aside class="ods-field--hint">
        Describe your perfect planet in as many words as you need.
      </aside>
      <label class="ods-label" for="overview-textarea">The perfect planet</label>
    </div>
  </fieldset>
</Visual>

## States

<Description>

Text inputs support the following states: enabled, hover, focus, disabled, read-only, optional, and invalid.

</Description>

### Enabled

<Description>

Text inputs in their "normal" state are considered enabled. They are ready for user interaction.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="overview-enabled" id="overview-enabled" required>
      <label class="ods-label" for="overview-enabled">Destination</label>
    </div>
  </fieldset>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the input.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input is-ods-input-hover" name="overview-hover" type="text" id="overview-hover" required>
      <label class="ods-label" for="overview-hover">Destination</label>
    </div>
  </fieldset>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the input with a pointer, keyboard, or voice.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input is-ods-input-focus" name="overview-focus" type="text" id="overview-focus" required>
      <label class="ods-label" for="overview-focus">Destination</label>
    </div>
  </fieldset>
</Visual>

### Disabled

<Description>

Disabled inputs are unavailable for interaction and cannot be focused. They can be used when input is disallowed, possibly due to a system state or access restrictions.

The values of disabled inputs will not be submitted.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input disabled class="ods-text-input" type="text" name="overview-disabled" id="overview-disabled" required disabled>
      <label class="ods-label" for="overview-disabled">Destination</label>
    </div>
  </fieldset>
</Visual>

### Read-only

<Description>

Similar to disabled inputs, users cannot modify the values of read-only inputs. However, users can otherwise interact with read-only inputs and select their values for copying.

This state can be helpful when displaying computed or third-party values, or when a submitted form is being processed.

The values of read-only inputs will be submitted.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="overview-readonly" id="overview-readonly" value="Jupiter" required readonly spellcheck="false">
      <label class="ods-label" for="overview-readonly">Destination</label>
    </div>
  </fieldset>
</Visual>

### Optional

<Description>

Odyssey assumes inputs are required by default. Optional inputs should be used to indicate when data is not required for the user to complete a task.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="overview-optional" id="overview-optional" spellcheck="false">
      <label class="ods-label" for="overview-optional">Destination <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
</Visual>

### Invalid

<Description>

The invalid state is for inputs with incorrect values or values of the wrong format.

When indicating a validation error, please use a Field Error label to indicate the nature of the error. Color alone is not an accessible way to signify that something has gone wrong.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input data-invalid class="ods-text-input" type="text" name="overview-invalid" aria-describedby="overview-invalid-error" id="overview-invalid" spellcheck="false" value="4.76 miles/s" required>
      <label class="ods-label" for="overview-invalid">Destination</label>
      <aside class="ods-field--error" id="overview-invalid-error">
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

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="overview-email" id="overview-email" autocomplete="email" spellcheck="false" value="homer@okta.com" required>
      <label class="ods-label" for="overview-email">Email</label>
    </div>
  </fieldset>
</Visual>

### Tel

<Description>

Unlike email fields, tel inputs are not automatically validated because global formats are so varied.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="phone" name="overview-tel" id="overview-tel" autocomplete="tel" spellcheck="false" value="555-555-1212" required>
      <label class="ods-label" for="overview-tel">Telephone number</label>
    </div>
  </fieldset>
</Visual>

### Password

<Description>

Passwords inputs ensure that sensitive content is safely obscured.

</Description>

<Visual content="full">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="password" name="overview-password" id="overview-password" autocomplete="password" spellcheck="false" value="Big Gas Giants" required>
      <label class="ods-label" for="overview-password">Authorization code</label>
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


## Types

<Description>

Out of the box, Odyssey supports input types for `text`, `email`, `search`, `tel`, and `password` with more coming soon.

</Description>

## Text

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="example-1" id="example-1" spellcheck="false" value="Input value" required>
        <label class="ods-label" for="example-1">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="example-1" id="example-1" spellcheck="false" value="Input value" required>
      <label class="ods-label" for="example-1">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

### Email

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="email" name="example-2" id="example-2" autocomplete="email" spellcheck="false" value="name@okta.design" required>
        <label class="ods-label" for="example-2">Email</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="email" name="example-2" id="example-2" autocomplete="email" spellcheck="false" value="name@okta.design" required>
      <label class="ods-label" for="example-2">Email</label>
    </div>
  </fieldset>
  ```
</figure>

### Telephone

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="tel" name="example-3" id="example-3" spellcheck="false" value="888-722-7871" required>
        <label class="ods-label" for="example-2">Telephone number</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="tel" name="example-3" id="example-3" spellcheck="false" value="888-722-7871" required>
      <label class="ods-label" for="example-2">Telephone number</label>
    </div>
  </fieldset>
  ```
</figure>

### Password

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="password" name="example-4" id="example-4" spellcheck="false" value="fake-password-value" required>
        <label class="ods-label" for="example-4">Password</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="password" name="example-4" id="example-4" spellcheck="false" value="fake-password-value" required>
      <label class="ods-label" for="example-4">Password</label>
    </div>
  </fieldset>
  ```
</figure>

### Search

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <input type="search" name="example-5" id="example-5" autocomplete="search" placeholder="Placeholder value" spellcheck="false" aria-labelledby="example-5" required="required" class="ods-text-input">
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <input type="search" name="example-5" id="example-5" autocomplete="search" placeholder="Placeholder value" spellcheck="false" aria-labelledby="example-5" required="required" class="ods-text-input">
  </fieldset>
  ```
</figure>

### Search with attached primary button

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input type="search" name="example-6" id="example-6" autocomplete="search" spellcheck="false" aria-labelledby="example-6" required="required" class="ods-text-input">
        <button id="example-6" class="ods-button">Button label</button>
      </div>
    </fieldset>
  </div>

  ```html
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input type="search" name="example-6" id="example-6" autocomplete="search" spellcheck="false" aria-labelledby="example-6" required="required" class="ods-text-input">
        <button id="example-6" class="ods-button">Button label</button>
      </div>
    </fieldset>
  ```
</figure>

### Search with attached secondary button

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input type="search" name="example-7" id="example-7" autocomplete="search" spellcheck="false" aria-labelledby="example-7" required="required" class="ods-text-input">
        <button id="example-7" class="ods-button is-ods-button-secondary">Button label</button>
      </div>
    </fieldset>
  </div>

  ```html
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input type="search" name="example-7" id="example-7" autocomplete="search" spellcheck="false" aria-labelledby="example-7" required="required" class="ods-text-input">
        <button id="example-7" class="ods-button is-ods-button-secondary">Button label</button>
      </div>
    </fieldset>
  ```
</figure>

## Textarea

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <textarea class="ods-text-input ods-text-area" name="example-8" id="example-8" rows='4' cols='50' spellcheck="true" required></textarea>
        <aside class="ods-field--hint">
          Descriptive field hint
        </aside>
        <label class="ods-label" for="example-8">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <textarea class="ods-text-input ods-text-area" name="example-8" id="example-8" rows='4' cols='50' spellcheck="true" required></textarea>
      <aside class="ods-field--hint">
        Descriptive field hint
      </aside>
      <label class="ods-label" for="example-8">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

## States

### Disabled

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="example-9" id="example-9" spellcheck="false" value="Disabled input value" disabled required>
        <label class="ods-label" for="example-9">Field label</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="example-9" id="example-9" spellcheck="false" value="Disabled input value" disabled required>
      <label class="ods-label" for="example-9">Field label</label>
    </div>
  </fieldset>
  ```
</figure>

### Optional label

<figure class="docs-example">
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="example-10" id="example-10" spellcheck="false" value="">
        <label class="ods-label" for="example-10">Field label <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="example-10" id="example-10" spellcheck="false" value="">
      <label class="ods-label" for="example-10">Field label <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>

### Invalid label

<Description>
  
  Because of the current inability to ensure consistent validation behavior across browsers, we're using the `[data-invalid]` attribute to indicate this state.

</Description>

<figure class="docs-example" data-invalid>
  <div class="docs-example--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="text" name="example-11" id="example-11" spellcheck="false" value="" data-invalid required>
        <label class="ods-label" for="example-11">Field label</label>
        <aside class="ods-field--error" id="overview-invalid-error">
          <span class="u-visually-hidden">Error:</span> Invalid error description
        </aside>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="example-11" id="example-11" spellcheck="false" value="" data-invalid required>
      <label class="ods-label" for="example-11">Field label</label>
      <aside class="ods-field--error" id="overview-invalid-error">
        <span class="u-visually-hidden">Error:</span> Invalid error description
      </aside>
    </div>
  </fieldset>
  ```
</figure>

:::
