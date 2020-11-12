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

<Visual variant="background">
  <template>
    <button class="ods-button is-ods-button-overlay">Register for Spacecamp</button>
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

Disabled Buttons are unavailable for interaction and cannot be focused. They can be used when an action is unavailable, possibly due to incomplete information or access restrictions.

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
      <OdsIcon icon="settings" />
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
        <OdsIcon icon="settings" />
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

## Icon Buttons

<Description>

When using icons within a button, be sure to add `focusable="false"` to the SVG; this will prevent browsers (IE, specifically) from incorrectly focusing on the icon instead of the button. Similarly, the `[role="presentation"]` attribute on the icon SVG will ensure screen readers do not unnecessarily announce iconography.

</Description>

### Icon with label

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button">
      <OdsIcon role="presentation" icon="get-info" focusable="false" />
      Button label
    </button>
  </div>  

  ```html
  <div class="docs-example--rendered">
    <button class="ods-button">
      <svg class="ods-icon" role="presentation" focusable="false">...</svg>
      Button label
    </button>
  </div>
  ```
</figure>


### Icon-only

<Description>

If your button does not have a visual label, be sure to use the `aria-label` attribute to ensure screen readers will correctly identify it. Additionally, the use of the presentation role on the icon SVG enables decorative icons to be ignored by screen readers without compromising the accessibility of informative icons.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button aria-label="Button label" class="ods-button">
      <OdsIcon role="presentation" icon="edit" focusable="false" />
    </button>
  </div>

  ```html
  <div class="docs-example--rendered">
    <button aria-label="Button label" class="ods-button">
      <svg class="ods-icon" role="presentation" focusable="false">...</svg>
    </button>
  </div>
  ```
</figure>

## Accessibility

<Description>

In addition to the above use-cases for Icon, consider using the `<button>` element instead of `<a>` whenever possible. The keyboard and screen reader interaction for these elements is different. Space will trigger a `<button>`; Enter will trigger an `<a>`.

</Description>
:::
