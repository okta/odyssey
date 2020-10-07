---
template: component
title: Text Input
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/text-input.md
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_text-input.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/tVkWsXwnWICeguWhzX6Vwl/Inputs?node-id=476%3A3848
---

::: slot overview

## Anatomy

<Description>

Text input UI is simple. It consists of a label and a field for users to interact with.

</Description>

<Anatomy 
  title="title"
  meta="metadata"
  img="/images/anatomy-text-input.svg" 
/>

## Default

<Description class="fpo">

The foundation of all our inputs. By default, they have a 1px “Grey 500” stroke, with a 4px corner radius. They require to be paired with a label, shown in the Labels section below.

Required for any input. Keep it as concise as possible in 2-3 words max.

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" required>
      <label class="ods-label" for="email">What is your favorite donut?</label>
    </div>
  </fieldset>
</Example>


## States

<Description class="fpo">

Some high level text about the states

</Description>

### Disabled

<Description class="fpo">

<span class="fpo">Some text about the **disabled** state</span>

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input disabled class="ods-text-input" type="text" required>
      <label class="ods-label" for="email">Label</label>
    </div>
  </fieldset>
</Example>

### Invalid

<Description class="fpo">

Some text about the **invalid** state

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input data-invalid class="ods-text-input" type="text" required>
      <label class="ods-label" for="email">Label</label>
    </div>
  </fieldset>
</Example>

### Read only

<Description class="fpo">

Some text about the **read only** state

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="text" name="name-readonly" id="name-readonly" value="Read only value" autocomplete="name" spellcheck="false" required readonly>
      <label class="ods-label" for="email">Label</label>
    </div>
  </fieldset>
</Example>

## Types

<Description class="fpo">

Odyssey provides inputs for types `email`, `tel` and `password` out of the box.

### Email

Some high level text about the email type

### Tel

Some high level text about the tel type

### Password

Some high level text about the password type

</Description>

<Example>
  <form class="docskit-example--wide">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="email" name="email" id="email" autocomplete="email" spellcheck="false" value="donut@okta.com" required>
        <label class="ods-label" for="email">Email</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="phone" name="tel" id="tel" autocomplete="tel" spellcheck="false" required>
        <label class="ods-label" for="tel">Tel</label>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <input class="ods-text-input" type="password" name="password" id="password" autocomplete="password" spellcheck="false" required>
        <label class="ods-label" for="password">Password</label>
      </div>
    </fieldset>
  </form>
</Example>


## Additional types

<Description>

<span class="fpo">A description around what additional types are, and how they vary from the aformentioned types.</span>

</Description>

### Search

<Description>

Odyssey's standalone search is styled to provide minimal UI while maintaining accessibility when searching outside of normal form contexts. Inputs with type="search" will render with the "Search" UI indicator as well as a visually hidden label.

Unlike other inputs, we recommend using the placeholder attribute to indicate the scope of your search input. This text should match the hidden label.

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="search" name="search" id="search" autocomplete="search" spellcheck="false" placeholder="Search donuts" required>
      <label class="ods-label" for="search">Search donuts</label>
    </div>
  </fieldset>
</Example>

#### Button variant

<Description>

We also provide a variant with an attached button for in-page searching or when placeholder text is undesirable. Please follow our [Button guidelines](/components/button) when using these variants.

</Description>


<Example>
  <form>
    <fieldset class="ods-fieldset docskit-example--wide">
      <div class="ods-fieldset--attached">
        <input class="ods-text-input" type="search" name="search" id="button-search" autocomplete="search" spellcheck="false" aria-labelledby="search-button" required>
        <button class="ods-button" id="search-button">Search donuts</button>
      </div>
    </fieldset>
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset--attached">
        <input class="ods-text-input" type="search" name="search" id="button-search-sec" autocomplete="search" spellcheck="false" aria-labelledby="search-button" required>
        <button class="ods-button is-ods-button-secondary" id="search-button">Find donut</button>
      </div>
    </fieldset>
  </form>
</Example>



## Labels

<Description class="fpo">

There are five label types; Default, Default with hint, Disabled, Error, and Supporting text. Each component has the margin built in and can be paired with any input field above. Just stack them on top or below and input and you’ll have a match.

</Description>

### Default

<Description class="fpo">

Some text about **default label states**

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input type="text" required="required" class="ods-text-input">
      <label for="email" class="ods-label">Label</label>
    </div>
  </fieldset>
</Example>

### Default with hint

<Description class="fpo">

Some text about **default label states, with hints**

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input type="text" required="required" class="ods-text-input">
      <aside class="ods-field--hint" id="name-hinted-hint">Hint: additional context can be provided here.</aside>
      <label for="email" class="ods-label">Label</label>
    </div>
  </fieldset>
</Example>

### Error

<Description class="fpo">

Some text about **label error states**

</Description>

<Example>
  <fieldset class="ods-fieldset docskit-example--wide">
    <div class="ods-fieldset-flex">
      <input data-invalid class="ods-text-input" type="text" required>
      <label class="ods-label" for="email">Label</label>
      <aside class="ods-field--error" id="name-invalid-hint">
        Validation error message.
      </aside>
    </div>
  </fieldset>
</Example>

:::

::: slot html-scss
## HTML & CSS
:::
