---
template: component
id: component-modal
description: UI that appears on top of the main content and moves the system into a mode requiring user interaction.
lead: UI that appears on top of the main content and moves the system into a mode requiring user interaction. This dialog disables the main content until the user interacts with the modal dialog.
title: Modal
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_modal.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/qqAGCkxl8lfUJKNGsgdoUG/Modal
---

::: slot overview

## Anatomy

<Anatomy fill img="images/anatomy-modal.svg" />

## Behavior

<Description>

Modals are inserted above the main content as a blocking mechanism to ask for user input or confirm an action. They disable all other contexts until the user interacts with the modal itself.

</Description>

<Visual>

  <button class="ods-button" data-micromodal-trigger="ods-modal-standard">Launch modal</button>

</Visual>

### Arrival

<Description>

How modals arrive on the screen is as important as the content they contain. Animation does more than provide a pleasing experience. It contextualizes the new UI the user is being presented.

</Description>

### Dismissing

<Description>

Users may close modals by clicking on the button in the upper right-hand corner of the container. They may also click anywhere outside of the container, within the "curtain".

</Description>

### Autofocus

<Description>

Focus is placed on the first item a user can select, allowing them to immediately exit or submit the modal when possible. Focus is limited to the scope of the dialog while the modal is open.

</Description>

## Usage

<Description>

The default modal allows users to interact with and alter the experience it is currently interrupting. Modals interrupt a user’s experience. This may be bothersome, and modals should be used with discretion. If a modal is becoming complicated or claustrophobic, another solution may be needed.

</Description>

### Use when...

<Description>

- Blocking user interaction for security reasons - e.g. "Please reenter your password to initiate launch."
- Gathering immediate information to continue a task - e.g. "A hangar number is required to continue."
- Confirming user interaction during destructive actions - e.g. "Please confirm the starship name to begin disassembly."
- Offering an alternative that would lessen the user's required effort - e.g. "Additional security clearance will be required - are you sure you want to continue?"

</Description>

### Don't use when...

<Description>

- Immediate action is not required
- The dialog would interrupt a workflow
- Additional context may be required or helpful
- The dialog content is long-form
- The user has not triggered the modal via interaction (e.g. on page load)
- There is already a modal being displayed

</Description>

## Content guidelines

<Description>

Context is key. There needs to be a direct connection between the trigger (i.e. a button or link) and the modal that follows. Repeating the trigger's copy within the modal can help reinforce this connection. Providing a sense of connection between the trigger and modal is important to ensure a consistent user experience.

</Description>

## Accessibility

### Accessible behavior

<Description>

When a user opens a modal, interaction is limited to the new context. While this may seem expected, it can surprise users. This is heightened for users requiring assistive technologies.

For convenience, users can exit the modal in a few ways:

- Clicking on the overlay

- Hitting <kbd>esc</kbd>

- Clicking or navigating to any element tagged with `data-micromodal-close`

For users happy with their new context, we ensure their attention isn't misdirected. Scrolling on the main content becomes locked, and we inform the browser to lock the `tabindex` to the modal context. This way, regardless of input method, a user's interactions are limited to their new scope.

</Description>

## Further reading

- [How To Make Modal Windows Better For Everyone](https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/) - <cite>Scott O'Hara (2014)</cite>
- [Making Modal Windows Better For Everyone, again...](https://www.scottohara.me/blog/2016/09/07/revised-modal-window.html) - <cite>Scott O'Hara (2016)</cite>
- [Modal & Nonmodal Dialogs: When (& When Not) to Use Them](https://www.nngroup.com/articles/modal-nonmodal-dialog/) - <cite>Therese Fessenden, Nielsen Norman Group (2017)</cite>
- [Micromodal.js](https://micromodal.now.sh/) - JS Documentation

<!-- The following are the modals shown to the user on the site -->
<div class="ods-modal" id="ods-modal-standard" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1" data-micromodal-close>
      <div class="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-standard-title">
        <header class="ods-modal--header">
          <button class="ods-modal--close" aria-label="Close modal" data-micromodal-close></button>
          <h1 class="ods-modal--title" id="ods-modal-standard-title">
            Launch Safety Confirmation
          </h1>
        </header>
        <main class="ods-modal--content" id="ods-modal-standard-content">
          <p>
            Please confirm that Launchpad DS-21A is cleared of personnel and debris to proceed with countdown.
          </p>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-clear" aria-label="Close this dialog window" data-micromodal-close>Cancel</button>
          <button class="ods-button" data-micromodal-close>Confirm</button>
        </footer>
      </div>
    </div>
  </div>
</div>

:::

::: slot html-scss

<figure class="docs-example">
  <div class="ods-modal is-open is-animation-stopped" id="ods-modal-standard" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1">
      <div class="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-standard-title">
        <header class="ods-modal--header">
          <button class="ods-modal--close" aria-label="Close modal"></button>
          <h1 class="ods-modal--title" id="ods-modal-standard-title">
            Modal Title
          </h1>
        </header>
        <main class="ods-modal--content" id="ods-modal-standard-content">
          <p>This is the modal content area. It's width is determined based on the amount of content within it.</p>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-clear" aria-label="Close this dialog window">Cancel</button>
          <button class="ods-button">Continue</button>
        </footer>
      </div>
    </div>
  </div>

  ```html
  <div class="ods-modal" id="ods-modal-standard" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1" data-micromodal-close>
      <div class="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-standard-title">
        <header class="ods-modal--header">
          <button class="ods-modal--close" aria-label="Close modal" data-micromodal-close></button>
          <h1 class="ods-modal--title" id="ods-modal-standard-title">
            Modal Title
          </h1>
        </header>
        <main class="ods-modal--content" id="ods-modal-standard-content">
          <p>
            Modal content
          </p>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-clear" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
          <button class="ods-button">Continue</button>
        </footer>
      </div>
    </div>
  </div>
  ```
</figure>

### Accessible attributes

<Description>

The modal components makes use of several ARIA attributes in order to give assistive technologies (AT) as much information as possible.

- `aria-hidden` - This indicates whether or not the modal is visible and should be automatically set to `true` or `false` by our companion Javascript.
- `role="dialog"` - Until the `role` element is widely supported, this attribute indicates the semantic status of the modal to the browser. Please use `"alertdialog"` instead if your modal represents a dangerous action or error.
- `aria-modal="true"` - This indicates that the rest of the workflow is stopped while this element is present.
- `aria-labelledby="ods-modal--title-id"` - This attribute informs ATs which other element can be treated as the label for this dialog. Please use the unique `id` associated with the dialog's title.
- `aria-label="Close"` - Please use this tag on any `button` that allows the user to exit the dialog. By default, this is included on the modal's exit button.

</Description>
:::
