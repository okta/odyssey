---
template: component
id: button
title: Button
description: Is a rounded rectangle with a small description. They are used for in-page interactions like form submissions.
lead: An Odyssey button appears as a rounded rectangle that is wider than it is tall, with a descriptive caption inflexs center. Users press the button by clicking it with a pointer controlled by a mouse, keystrokes can also be used to execute the command of a button.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/button.md
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_button.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/pULYhG6KIhBsnQTFjkpTFv/Buttons?node-id=2660%3A365
---

::: slot overview

## Anatomy

<Description>

Button UI is simple. It consists of typography within a rectangular container.

</Description>

<Anatomy img="/images/anatomy-button-1.svg" />

<Anatomy img="/images/anatomy-button-2.svg" />

## Variants

<Description>

In Odyssey there are 5 different button types; Primary, Secondary, Danger, Clear, and Overlay.

</Description>

### Primary

<Description>

Our default button is used for primary action on a page or view. For example, “Save”. Use this button sparingly to provide a clear target for users to get to. 

It’s best to use this button on a white background.

</Description>

<Visual>
  <template>
    <button class="ods-button">Default</button>
    <button class="ods-button is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button">Disabled</button>
  </template>
</Visual>



### Secondary

<Description>

Ideal for a secondary actions to compliment the Primary button. Similar to the Primary button, use this button sparingly to provide focus to the user. 

It’s best to use this button on a white background.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-secondary">Default</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-secondary">Disabled</button>
  </template>
</Visual>

### Danger

<Description>

Use this button for scenarios where a user may be deleting information or completing a task that could not be reversed. 

It’s best to use this button on a white background.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-danger">Default</button>
    <button class="ods-button is-ods-button-danger is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-danger is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-danger">Disabled</button>
  </template>
</Visual>

### Clear

<Description>

These are used for in-page interactions that modify the visible UI but do not modify data or an ongoing process. For example, hiding or showing a password field. 

They pair well with Primary and Secondary buttons. 

It’s best to use this button on a white background.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-clear">Default</button>
    <button class="ods-button is-ods-button-clear is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-clear is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-clear">Disabled</button>
  </template>
</Visual>


### Overlay

<Description>

These buttons may only be used on top of a “Base Color” such as Purple 500 or on top of a colored background, photo, or illustration. They should only be used in the scenario where Primary, Secondary, and regular text links cannot be used.

Lastly, they only exist at the large size.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-overlay">Default</button>
    <button class="ods-button is-ods-button-overlay is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-overlay is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-overlay">Disabled</button>
  </template>
</Visual>

## Guidelines

<Description>

Use buttons to indicate the important actions that a user can take. Don’t use buttons to navigate around the site or product; use links instead

</Description>

### Punctuation and copy

#### Context

<Description>

Be as direct as possible with the goal you are trying to get the user to accomplish. Try to avoid dark patterns that require the user to discover what a button does. Be strategic in your button placement so a user has the best context. Consider using buttons at the end of an input form, or by preceding with supporting copy.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">Download report</button>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <button class="ods-button">Download</button>
  </template>
</Visual>

#### Word count

<Description>

Never use more than 3 words inside of a button. If you think you need more words, consider other design solutions on the page.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">Download report</button>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <button class="ods-button">Download most recent report</button>
  </template>
</Visual>

#### Capitalization

<Description>

If using multiple words, use sentence case. Sentence case means that a captial letter is applied to the first word and all other characters are lower case.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">Download report</button>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <button class="ods-button">Download Report</button>
  </template>
</Visual>

## Accessibility

<Description>

Buttons should display a visible :focus state when users interact with their keyboard.

Color is not a clear affordance for all users, please use clear, concise copy to label buttons

User the `<button>` element instead of `<a>` whenever possible. The keyboard and screen reader interaction for these elements is different. Space will trigger a `<button>`; Enter will trigger an `<a>`.

</Description>

:::

::: slot html-scss

## Primary

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button">Primary</button>
    <button class="ods-button is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-focus">Focus</button>
    <button class="ods-button" disabled>Disabled</button>
  </div>

  ```html
  <button class="ods-button">Primary</button>
  <button class="ods-button" disabled>Primary</button>
  ```
</figure>

## Secondary

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button is-ods-button-secondary">Default</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-focus">Focus</button>
    <button class="ods-button is-ods-button-secondary" disabled>Disabled</button>
  </div>

  ```html
  <button class="ods-button is-ods-button-secondary">Default</button>
  <button class="ods-button is-ods-button-secondary" disabled>Default</button>
  ```
</figure>

## Danger

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button is-ods-button-danger">Danger</button>
    <button class="ods-button is-ods-button-danger is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-danger is-ods-button-focus">Focus</button>
    <button class="ods-button is-ods-button-danger" disabled>Disabled</button>
  </div>

  ```html
  <button class="ods-button is-ods-button-danger">Danger</button>
  <button class="ods-button is-ods-button-danger" disabled>Danger</button>
  ```
</figure>

## Overlay

<figure class="docs-example">
  <div class="docs-example--rendered is-rendered-success">
    <button class="ods-button is-ods-button-overlay">Overlay</button>
    <button class="ods-button is-ods-button-overlay is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-overlay is-ods-button-focus">Focus</button>
    <button class="ods-button is-ods-button-overlay" disabled>Disabled</button>
  </div>

  ```html
  <button class="ods-button is-ods-button-overlay">Overlay</button>
  <button class="ods-button is-ods-button-overlay" disabled>Overlay</button>
  ```
</figure>

## Clear

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button is-ods-button-clear">Clear</button>
    <button class="ods-button is-ods-button-clear is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-clear is-ods-button-focus">Focus</button>
    <button class="ods-button is-ods-button-clear" disabled>Disabled</button>
  </div>

  ```html
  <button class="ods-button is-ods-button-clear">Clear</button>
  <button class="ods-button is-ods-button-clear" disabled>Clear</button>
  ```
</figure>


## Implementation

### SCSS

<Description>

  Styles related to buttons can be found in `/components/_button.scss`.

  Semantic states can be combined to produce Secondary Danger styles.

  <figure class="ods-table--figure">
    <table class="ods-table">
      <thead>
        <tr>
          <th scope="column">
            Selector
          </th>
          <th scope="column">
            Purpose
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-button</code>
          </td>
          <td>
            Applies primary & general button styles
          </td>
        </tr>
        <tr>
          <td>
            <code>.is-ods-button-secondary</code>
          </td>
          <td>
            Applies Secondary button styles
          </td>
        </tr>
        <tr>
          <td>
            <code>.is-ods-button-danger</code>
          </td>
          <td>
            Applies Danger button styles
          </td>
        </tr>
      </tbody>
    </table>
  </figure>

</Description>
:::
