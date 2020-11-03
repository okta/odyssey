---
template: component
id: component-button
title: Button
description: Buttons are used for in-page interactions like form submissions.
lead: A clickable button used for form submissions and most in-page interactions.
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

<Anatomy img="/images/anatomy-button-1.svg" />

<Anatomy img="/images/anatomy-button-2.svg" />

## Behavior

<Description>

Visually, a Button is a rounded rectangle, wider than it is tall, with a descriptive caption at its center. Users interact with Buttons via both pointer devices and keystrokes.

</Description>

## Variants

<Description>

In Odyssey there are five Button variants: Primary, Secondary, Danger, Clear, and Overlay.

</Description>

### Primary

<Description>

Use our default button for primary actions in a view. For example, “Save”.

It's ideal to have one Primary Button per view. However, it's okay to have more than one Primary Button as long that they are equal in priority.

</Description>

<Visual>
  <template>
    <button class="ods-button">Launch</button>
  </template>
</Visual>

### Secondary

<Description>

This is ideal for a secondary actions to compliment the Primary Button. Like the Primary Button, use this button sparingly to provide focus to the user.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-secondary">Reschedule launch</button>
  </template>
</Visual>

### Danger

<Description>

Use Danger Buttons for scenarios where a user may be deleting information or making a decision that can not be reversed.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-danger">Jettison oxygen</button>
  </template>
</Visual>

### Clear

<Description>

Use Clear Buttons for interactions that change visible UI but don't submit data. For example, showing a password field or dismissing a modal.

They pair well with Primary and Secondary buttons.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-clear">Dismiss</button>
  </template>
</Visual>


### Overlay

<Description>

Use Overlay Buttons when Primary or Secondary variants aren't visually suitable. These Buttons may only be used on top of a base-variant background color, a photo, or an illustration.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-overlay">Register for Spacecamp</button>
  </template>
</Visual>

## States

<Description>

Odyssey provides visual affordances for all standard button states.

</Description>

### Enabled

<Description>

Buttons in their "normal" state are considered enabled. They are ready for user interaction.

</Description>

<Visual>
  <template>
    <button class="ods-button">Launch</button>
  </template>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the Button with a pointer, keyboard, or voice.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-focus">Launch</button>
  </template>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the Button.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-hover">Launch</button>
  </template>
</Visual>

### Disabled

<Description>

Disabled Buttons are unavailable for interaction and cannot be focused.

You should pair Disabled Buttons with a Tooltip if the user would benefit from additional context.

</Description>

<Visual>
  <template>
    <span class="has-ods-tooltip sample--tip">
      <button class="ods-button" aria-describedby="launch-description" disabled>
        Launch
      </button>
      <aside id="launch-description" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
        Unable to launch before countdown completes.
      </aside>
    </span>
  </template>
</Visual>

## Usage

<Description>

Use buttons to indicate the in-page actions a user can take.

</Description>

<Visual variant="positive">
  <button class="ods-button">
    Dock shuttle
  </button>
</Visual>

<Description>

Don't use buttons to navigate users around the site or product; use links instead.

</Description>

<Visual variant="negative">
  <button class="ods-button is-ods-button-secondary">
    Visit space FAQ
  </button>
</Visual>

## Content Guidelines

### Punctuation and copy

#### Context

<Description>

Be as direct as possible with the goal you are trying to get the user to do. Avoid patterns that need the user to discover what a button does.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">Initiate docking</button>
  </template>
</Visual>

<Description>

Be strategic in your button placement so a user has the best context. For example, consider using Buttons at the end of a form or preceding them with supporting copy.

</Description>

<Visual variant="negative">
  <template>
    <button class="ods-button">Go</button>
  </template>
</Visual>

#### Word count

<Description>

Don't use more than three words inside of a button. If a user needs more context, consider other design solutions.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">Initiate docking</button>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <button class="ods-button">Initiate standard docking procedure</button>
  </template>
</Visual>

#### Capitalization

<Description>

When using multiple words, use sentence case. Capitalize only the first letter and any proper nouns.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">Initiate docking</button>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <button class="ods-button">Initiate Docking</button>
  </template>
</Visual>

### Buttons with Icons

<Description>

Icons can be added to any of our button variants to increase clarity or add flair. Icons will be laid out automatically based on language direction.

</Description>

<Visual>
  <template>
    <button class="ods-button">
      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path d="M12.7918 8.31498L11.6591 7.45248C11.6943 7.15145 11.6943 6.84752 11.6591 6.54649L12.7928 5.6835C13.0053 5.51688 13.062 5.22471 12.9268 4.99399L11.7485 3.0105C11.6128 2.77833 11.3237 2.67694 11.0672 2.77151L9.73219 3.29452C9.48134 3.11729 9.21262 2.96534 8.93019 2.84103L8.72532 1.46002C8.68838 1.1949 8.4548 0.997838 8.18005 1.00002H5.81822C5.54575 0.998424 5.31405 1.19328 5.27602 1.45602L5.07065 2.841C4.78909 2.96651 4.5208 3.11857 4.26968 3.29501L2.93111 2.771C2.6772 2.67352 2.38841 2.77369 2.25491 3.00549L1.07552 4.99249C0.936676 5.22358 0.993837 5.51897 1.20953 5.685L2.34218 6.54749C2.30673 6.8485 2.30673 7.15248 2.34218 7.45349L1.2085 8.31599C0.99569 8.48237 0.938649 8.77471 1.07398 9.00549L2.25183 10.9895C2.38738 11.2218 2.6766 11.3233 2.93316 11.2285L4.26812 10.7055C4.51919 10.8828 4.78807 11.0349 5.07063 11.1595L5.276 12.5395C5.31215 12.8039 5.54428 13.0011 5.81819 13H8.18002C8.453 13.0021 8.68544 12.8072 8.72376 12.544L8.92913 11.159C9.21067 11.0334 9.47893 10.8814 9.7301 10.705L11.0702 11.2295C11.3241 11.3267 11.6127 11.2266 11.7464 10.995L12.9294 9.00001C13.0618 8.76962 13.0036 8.47979 12.7918 8.31498ZM6.99912 9.49998C5.5813 9.49998 4.4319 8.3807 4.4319 6.99998C4.4319 5.61925 5.58127 4.49998 6.99912 4.49998C8.41697 4.49998 9.56634 5.61925 9.56634 6.99998C9.56463 8.38002 8.41625 9.49834 6.99912 9.49998Z" fill="currentColor"/></svg>
      Configure console
    </button>
  </template>
</Visual>

#### Icon-only usability

<Description>

We recommend pairing icon-only buttons with our Tooltip. While this is not required, it will increase clarity for sighted users.

</Description>

<Visual>
  <template>
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path d="M12.7918 8.31498L11.6591 7.45248C11.6943 7.15145 11.6943 6.84752 11.6591 6.54649L12.7928 5.6835C13.0053 5.51688 13.062 5.22471 12.9268 4.99399L11.7485 3.0105C11.6128 2.77833 11.3237 2.67694 11.0672 2.77151L9.73219 3.29452C9.48134 3.11729 9.21262 2.96534 8.93019 2.84103L8.72532 1.46002C8.68838 1.1949 8.4548 0.997838 8.18005 1.00002H5.81822C5.54575 0.998424 5.31405 1.19328 5.27602 1.45602L5.07065 2.841C4.78909 2.96651 4.5208 3.11857 4.26968 3.29501L2.93111 2.771C2.6772 2.67352 2.38841 2.77369 2.25491 3.00549L1.07552 4.99249C0.936676 5.22358 0.993837 5.51897 1.20953 5.685L2.34218 6.54749C2.30673 6.8485 2.30673 7.15248 2.34218 7.45349L1.2085 8.31599C0.99569 8.48237 0.938649 8.77471 1.07398 9.00549L2.25183 10.9895C2.38738 11.2218 2.6766 11.3233 2.93316 11.2285L4.26812 10.7055C4.51919 10.8828 4.78807 11.0349 5.07063 11.1595L5.276 12.5395C5.31215 12.8039 5.54428 13.0011 5.81819 13H8.18002C8.453 13.0021 8.68544 12.8072 8.72376 12.544L8.92913 11.159C9.21067 11.0334 9.47893 10.8814 9.7301 10.705L11.0702 11.2295C11.3241 11.3267 11.6127 11.2266 11.7464 10.995L12.9294 9.00001C13.0618 8.76962 13.0036 8.47979 12.7918 8.31498ZM6.99912 9.49998C5.5813 9.49998 4.4319 8.3807 4.4319 6.99998C4.4319 5.61925 5.58127 4.49998 6.99912 4.49998C8.41697 4.49998 9.56634 5.61925 9.56634 6.99998C9.56463 8.38002 8.41625 9.49834 6.99912 9.49998Z" fill="currentColor"/></svg>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Configure console
      </aside>
    </span>
  </template>
</Visual>

## Accessibility

<Description>

Color is not a clear affordance for all users, please use clear, concise copy to label buttons. Good rules of thumb: use three or less words to describe your action and start your label with a verb (e.g. "Access report" vs "Report PDF").

</Description>

## References

### Related components

- <a href="/components/link">Link</a>
- <a href="/components/tooltip">Tooltip</a>

### Further reading

- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">Button</a> - MDN
- <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">Accessibile Icon Buttons</a> - Sara Soueidan

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

## Accessibility

<Description>

Buttons should display a visible :focus state when users interact with their keyboard.

Color is not a clear affordance for all users, please use clear, concise copy to label buttons

User the `<button>` element instead of `<a>` whenever possible. The keyboard and screen reader interaction for these elements is different. Space will trigger a `<button>`; Enter will trigger an `<a>`.

When using icons within a button, be sure to add focusable="false" to the svg; this will prevent browsers (IE, specifically) from incorrectly focusing on the icon instead of the button. Similarly, the aria-hidden attribute will ensure screen readers do not unnecessarily announce iconography.

Whether your button has a visual label or not, be sure to use the aria-label attribute to ensure screen readers will correctly identify your button, rather than extraneous content inside of it. Remember, if your button does contain a visual label, the text within aria-label should match exactly. This is a WCAG 2.1 requirement and will ensure that sighted users of screen readers are not confused by a mismatch.

This enables decorative icons to be ignored by screen readers without compromising the accessibility of informative icons - all with the same markup.

</Description>
:::
