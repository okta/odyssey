---
template: component
id: component-button
title: Button
description: Buttons are used for in-page interactions like form submissions.
lede: A clickable button used for form submissions and most in-page interactions.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_button.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/pULYhG6KIhBsnQTFjkpTFv/Buttons?node-id=2660%3A365
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-button-1.svg" />

<Anatomy img="images/anatomy-button-2.svg" />

## Behavior

<Description>

Visually, a Button is a rounded rectangle with a descriptive caption at its center. Users interact with Buttons via both pointer devices and keystrokes.

</Description>

## Variants

<Description>

In Odyssey there are five Button variants: Primary, Secondary, Danger, Clear, and Dismiss.

</Description>

### Primary

<Description>

Use our default Button for primary actions in a view. For example, “Save”.

It's ideal to have one Primary Button per view. However, it's okay to have more than one Primary Button as long that they are equal in priority.

</Description>

<Visual>
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Launch</span>
    </button>
  </template>
</Visual>

### Secondary

<Description>

This is ideal for a secondary actions to compliment the Primary Button. Like the Primary Button, use this Button sparingly to provide focus to the user.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-secondary">
      <span class="ods-button--label">Reschedule launch</span>
    </button>
  </template>
</Visual>

### Danger

<Description>

Use Danger Buttons for scenarios where a user may be deleting information or making a decision that can not be reversed.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-danger">
      <span class="ods-button--label">Jettison oxygen</span>
    </button>
  </template>
</Visual>

### Clear

<Description>

Use Clear Buttons for interactions that change visible UI but don't submit data. For example, showing a password field or dismissing a modal.

They pair well with Primary and Secondary Buttons.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-clear">
      <span class="ods-button--label">Dismiss</span>
    </button>
  </template>
</Visual>


### Dismiss

<Description>

The Dismiss Button should only be used for dismissing UI. Typically, this Button is included as part of a larger Odyssey component, but may be useful when constructing unique UIs.

The Dismiss Button has unique padding and will inherit the text color of it's parent UI.

</Description>

<Visual variant="background">
  <template>
    <button class="ods-button is-ods-button-dismiss">
      <span class="ods-button--label">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path d="M2.32289 10.1181C1.89237 10.5486 1.89237 11.2466 2.32289 11.6771C2.7534 12.1076 3.45141 12.1076 3.88192 11.6771L7 8.55904L10.1181 11.6771C10.5486 12.1076 11.2466 12.1076 11.6771 11.6771C12.1076 11.2466 12.1076 10.5486 11.6771 10.1181L8.55904 7L11.6771 3.88193C12.1076 3.45141 12.1076 2.7534 11.6771 2.32289C11.2466 1.89237 10.5486 1.89237 10.1181 2.32289L7 5.44096L3.88193 2.32289C3.45141 1.89237 2.7534 1.89237 2.32289 2.32289C1.89237 2.7534 1.89237 3.45141 2.32289 3.88192L5.44096 7L2.32289 10.1181Z" fill="currentColor"/></svg>
      </span>
    </button>
  </template>
</Visual>

## Sizes

<Description>

We offer three sizes of Buttons for use: Small, Medium, and Large. Full-width buttons are also available.

In order to provide a sufficient click area, all Button labels have a minimum width equal to twice the line-height.

</Description>

### Small

<Description>

Small Buttons are best used for actions within Table rows. Their font-size is descreased while keeping padding proportional to our medium size.

</Description>

<Visual>
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Near and far planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the nearest and farthest planets.</caption>
      <thead>
        <tr>
          <th scope="column">
            Planet
          </th>
          <th scope="column" class="is-ods-table-num">
            Distance (AU)
          </th>
          <th scope="column">
            Travel
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mars</td>
          <td class="is-ods-table-num">0.52</td>
          <td><button class="ods-button is-ods-button-secondary">Travel</button></td>
        </tr>
        <tr>
          <td>Saturn</td>
          <td class="is-ods-table-num">8.52</td>
          <td><button class="ods-button is-ods-button-secondary">Travel</button></td>
        </tr>
        <tr>
          <td>Neptune</td>
          <td class="is-ods-table-num">29.09</td>
          <td><button class="ods-button is-ods-button-secondary">Travel</button></td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

### Medium

<Description>

Our default size, medium Buttons are built for use in most contexts.

</Description>

<Visual>
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Activate thrusters</span>
    </button>
  </template>
</Visual>

### Large

<Description>

Large Buttons incease their padding, but not their font size. They're intended for single-interaction UIs like logging in.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-large">
      <span class="ods-button--label">Log in to your console</span>
    </button>
  </template>
</Visual>

### Full-width

<Description>

Full-width Buttons are intended for single-interaction UIs. These are often widgets like "Sign In" or "Sign Up".

Use this variant when you desire the Button to be full-width regardless of screen size.

</Description>

<Visual content="full">
  <template>
    <button class="ods-button is-ods-button-full-width">
      <span class="ods-button--label">Sign up for Space Camp</span>
    </button>
  </template>
</Visual>

## States

<Description>

Odyssey provides visual affordances these states: Enabled, Focus, Hover, and Disabled.

</Description>

### Enabled

<Description>

Buttons in their "normal" state are considered enabled. They are ready for user interaction.

</Description>

<Visual>
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Launch</span>
    </button>
  </template>
</Visual>

### Focus

<Description>

The focus state is a visual affordance that the user has highlighted the Button with a pointer, keyboard, or voice.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-focus">
      <span class="ods-button--label">Launch</span>
    </button>
  </template>
</Visual>

### Hover

<Description>

Hover states are activated when the user pauses their pointer over the Button.

</Description>

<Visual>
  <template>
    <button class="ods-button is-ods-button-hover">
      <span class="ods-button--label">Launch</span>
    </button>
  </template>
</Visual>

### Disabled

<Description>

Disabled Buttons are unavailable for interaction and cannot be focused. They can be used when an action is unavailable, possibly due to incomplete information or access restrictions.

You should pair Disabled Buttons with a Tooltip if the user would benefit from additional context.

</Description>

<Visual>
  <template>
    <span class="has-ods-tooltip sample--tip">
      <button class="ods-button" aria-describedby="launch-description" disabled>
        <span class="ods-button--label">Launch</span>
      </button>
      <aside id="launch-description" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
        Unable to launch before countdown completes.
      </aside>
    </span>
  </template>
</Visual>

## Usage

<Description>

Use Buttons to indicate the in-page actions a user can take.

</Description>

<Visual variant="positive">
  <button class="ods-button">
    <span class="ods-button--label">Dock shuttle</span>
  </button>
</Visual>

<Description>

Don't use Buttons to navigate users around the site or product; use links instead.

</Description>

<Visual variant="negative">
  <button class="ods-button is-ods-button-secondary">
    <span class="ods-button--label">Visit space FAQ</span>
  </button>
</Visual>

## Content Guidelines

<Description>

Consider the following when writing content for Buttons. By doing so, it will ensure users can easily navigate the page and complete the task at hand efficiently.

</Description>

### Context

<Description>

Provide enough context to ensure the user is aware what the interaction will achieve. Avoid patterns that require the user to discover what a Button does.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Initiate docking</span>
    </button>
  </template>
</Visual>

<Description>

Be strategic in your Button placement so a user has the best context. For example, consider using Buttons at the end of a form or preceding them with supporting copy.

</Description>

<Visual variant="negative">
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Go</span>
    </button>
  </template>
</Visual>

### Word count

<Description>

Don't use more than three words inside of a Button. If a user needs more context, consider other design solutions.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Initiate docking</span>
    </button>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Initiate standard docking procedure</span>
    </button>
  </template>
</Visual>

### Capitalization

<Description>

When using multiple words, use sentence case. Capitalize only the first letter and any proper nouns.

</Description>

<Visual variant="positive">
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Initiate docking</span>
    </button>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <button class="ods-button">
      <span class="ods-button--label">Initiate Docking</span>
    </button>
  </template>
</Visual>

### Buttons with Icons

<Description>

Icons can be added to any of our Button variants to increase clarity or add flair. Icons will be laid out automatically based on language direction.

</Description>

<Visual>
  <template>
    <button class="ods-button">
      <OdsIcon icon="settings" />
      <span class="ods-button--label">Configure console</span>
    </button>
  </template>
</Visual>

#### Icon-only usability

<Description>

We recommend pairing icon-only Buttons with our Tooltip. While this is not required, it will increase clarity for sighted users.

</Description>

<Visual>
  <template>
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <OdsIcon icon="settings" />
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        <span class="ods-button--label">Configure console</span>
      </aside>
    </span>
  </template>
</Visual>

## Accessibility

<Description>

Color is not a clear affordance for all users, please use clear, concise copy to label Buttons. Good rules of thumb: use three or less words to describe your action and start your label with a verb (e.g. "Access report" vs "Report PDF").

</Description>

## References

### Related components

<Description>

- <a href="/components/link">Link</a>
- <a href="/components/tooltip">Tooltip</a>

</Description>

### Further reading

<Description>

- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">Button</a> - MDN
- <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">Accessibile Icon Buttons</a> - Sara Soueidan

</Description>

:::

::: slot html-scss

## Primary

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button">
      <span class="ods-button--label">Primary</span>
    </button>
    <button class="ods-button is-ods-button-hover">
      <span class="ods-button--label">Hover</span>
    </button>
    <button class="ods-button is-ods-button-focus">
      <span class="ods-button--label">Focus</span>
    </button>
    <button class="ods-button" disabled>
      <span class="ods-button--label">Disabled</span>
    </button>
  </div>

  ```html
  <button class="ods-button">
    <span class="ods-button--label">Primary</span>
  </button>
  <button class="ods-button" disabled>
    <span class="ods-button--label">Primary</span>
  </button>
  ```
</figure>

## Secondary

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button is-ods-button-secondary">
      <span class="ods-button--label">Default</span>
    </button>
    <button class="ods-button is-ods-button-secondary is-ods-button-hover">
      <span class="ods-button--label">Hover</span>
    </button>
    <button class="ods-button is-ods-button-secondary is-ods-button-focus">
      <span class="ods-button--label">Focus</span>
    </button>
    <button class="ods-button is-ods-button-secondary" disabled>
      <span class="ods-button--label">Disabled</span>
    </button>
  </div>

  ```html
  <button class="ods-button is-ods-button-secondary">
    <span class="ods-button--label">Default</span>
  </button>
  <button class="ods-button is-ods-button-secondary" disabled>
    <span class="ods-button--label">Default</span>
  </button>
  ```
</figure>

## Danger

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button is-ods-button-danger">
      <span class="ods-button--label">Danger</span>
    </button>
    <button class="ods-button is-ods-button-danger is-ods-button-hover">
      <span class="ods-button--label">Hover</span>
    </button>
    <button class="ods-button is-ods-button-danger is-ods-button-focus">
      <span class="ods-button--label">Focus</span>
    </button>
    <button class="ods-button is-ods-button-danger" disabled>
      <span class="ods-button--label">Disabled</span>
    </button>
  </div>

  ```html
  <button class="ods-button is-ods-button-danger">
    <span class="ods-button--label">Danger</span>
  </button>
  <button class="ods-button is-ods-button-danger" disabled>
    <span class="ods-button--label">Danger</span>
  </button>
  ```
</figure>

## Dismiss

<figure class="docs-example">
  <div class="docs-example--rendered is-rendered-success">
    <button class="ods-button is-ods-button-dismiss">
      <span class="ods-button--label">Dismiss</span>
    </button>
    <button class="ods-button is-ods-button-dismiss is-ods-button-hover">
      <span class="ods-button--label">Hover</span>
    </button>
    <button class="ods-button is-ods-button-dismiss is-ods-button-focus">
      <span class="ods-button--label">Focus</span>
    </button>
    <button class="ods-button is-ods-button-dismiss" disabled>
      <span class="ods-button--label">Disabled</span>
    </button>
  </div>

  ```html
  <button class="ods-button is-ods-button-dismiss">
    <span class="ods-button--label">Dismiss</span>
  </button>
  <button class="ods-button is-ods-button-dismiss" disabled>
    <span class="ods-button--label">Dismiss</span>
  </button>
  ```
</figure>

## Clear

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button is-ods-button-clear">
      <span class="ods-button--label">Clear</span>
    </button>
    <button class="ods-button is-ods-button-clear is-ods-button-hover">
      <span class="ods-button--label">Hover</span>
    </button>
    <button class="ods-button is-ods-button-clear is-ods-button-focus">
      <span class="ods-button--label">Focus</span>
    </button>
    <button class="ods-button is-ods-button-clear" disabled>
      <span class="ods-button--label">Disabled</span>
    </button>
  </div>

  ```html
  <button class="ods-button is-ods-button-clear">
    <span class="ods-button--label">Clear</span>
  </button>
  <button class="ods-button is-ods-button-clear" disabled>
    <span class="ods-button--label">Clear</span>
  </button>
  ```
</figure>

## Full-width

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button is-ods-button-full-width">
      <span class="ods-button--label">Sign up for Space Camp</span>
    </button>
  </div>

  ```html
  <button class="ods-button is-ods-button-full-width">
    <span class="ods-button--label">Sign up for Space Camp</span>
  </button>
  ```
</figure>

## Icon Buttons

<Description>

When using icons within a button, be sure to add `focusable="false"` to the SVG; this will prevent browsers (IE, specifically) from incorrectly focusing on the icon instead of the button. Similarly, the `[role="presentation"]` attribute on the icon SVG will ensure screen readers do not unnecessarily announce iconography.

</Description>

### Icon with label

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button">
      <OdsIcon role="presentation" icon="get-info" focusable="false" />
      <span class="ods-button--label">Button label</span>
    </button>
  </div>

  ```html
  <div class="docs-example--rendered">
    <button class="ods-button">
      <svg class="ods-icon" role="presentation" focusable="false">...</svg>
      <span class="ods-button--label">Button label</span>
    </button>
  </div>
  ```
</figure>


### Icon-only

<Description>

If your button does not have a visual label, be sure to apply the `u-visually-hidden` utility class to ensure screen readers can provide the necessary context to a user. Additionally, the use of the `presentation` role on the icon SVG enables decorative icons to be ignored by screen readers without compromising the accessibility of informative icons.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button">
      <OdsIcon role="presentation" icon="edit" focusable="false" />
      <span class="ods-button--label u-visually-hidden">Button label</span>
    </button>
  </div>

  ```html
  <div class="docs-example--rendered">
    <button aria-label="Button label" class="ods-button">
      <svg class="ods-icon" role="presentation" focusable="false">...</svg>
      <span class="ods-button--label u-visually-hidden">Button label</span>
    </button>
  </div>
  ```
</figure>

## Accessibility

<Description>

In addition to the above use-cases for Icon, consider using the `<button>` element instead of `<a>` whenever possible. The keyboard and screen reader interaction for these elements is different. Space will trigger a `<button>`; Enter will trigger an `<a>`.

</Description>
:::
