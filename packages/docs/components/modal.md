---
template: component
title: Modal
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/modal.md
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_modal.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/pULYhG6KIhBsnQTFjkpTFv/Buttons?node-id=2660%3A365
---

::: slot overview

## Anatomy

<div class="docskit--desc fpo">

Descriptive content around **modal anatomy** should go here.

</div>

<FigureAnatomy img="/images/fpo.svg" />


## General guidelines

<div class="docskit--desc">

Modal dialogs are a powerful UI element. They are displayed on top of the main content and change the context to a special mode that requires user interaction. That is, they disable all other contexts until the user interacts with the modal itself.

With this in mind, modals are a great tool for specific use cases:

- Important warnings - e.g. an irreversible, destructive action or error
- Gathering immediate information requisite to continuing the current flow - e.g. "Please enter your password again for security purposes."
- Confirming or pivoting a course of action when it would lessen the user's required effort - e.g. "These documents will be required - are you sure you want to continue?"
- Blocking user interaction - e.g. "Please agree to these terms before continuing."

Here are a few smells for when a modal dialog may be inappropriate:

- Immediate action is not required
- The dialog would interrupt a workflow
- Additional context may be required or helpful
- The dialog content is long-form

</div>

<figure>
    <button class="ods-button" data-micromodal-trigger="ods-modal-standard">Let me see it already!</button>
</figure>

## Accessibility

<div class="docskit--desc">

Modal dialogs are notorious for their accessibility issues, but don't worry! We've got your back.

</div>

### Accessible attributes

<div class="docskit--desc">

The modal components makes use of several ARIA attributes in order to give assistive technologies (AT) as much information as possible.

- `aria-hidden</code> - This indicates whether or not the modal is visible and should be automatically set to `true` or `false` by our companion Javascript.
- `role="dialog"` - Until the `role` element is widely supported, this attribute indicates the semantic status of the modal to the browser. Please use `"alertdialog"` instead if your modal represents a dangerous action or error.
- `aria-modal="true"` - This indicates that the rest of the workflow is stopped while this element is present.
- `aria-labelledby="ods-modal--title-id"` - This attribute informs ATs which other element can be treated as the label for this dialog. Please use the unique `id` associated with the dialog's title.
- `aria-label="Close"` - Please use this tag on any `button` that allows the user to exit the dialog. By default, this is included on the modal's exit "X".

</div>

### Accessible behavior

<div class="docskit--desc">

When a modal dialog is opened, interaction is limited to the new context. While this may seem expected, it can surprise users - and is even worse for users requiring assistive technologies.

For convenience, users can exit the modal in a few ways:

- Clicking on the overlay

- Hitting <kbd>esc</kbd>

- Clicking or navigating to any element tagged with `data-micromodal-close`

For users happy with their new context, we ensure their attention won't be misdirected. Scrolling on the main content becomes locked, and we inform the browser to lock the `tabindex` to the modal context. This way, regardless of input method, a user's interactions are limited to their new scope.

</div>

## Further reading

- [How To Make Modal Windows Better For Everyone](https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/) - <cite>Scott O'Hara (2016)</cite>
- [Making Modal Windows Better For Everyone, again...](https://www.scottohara.me/blog/2016/09/07/revised-modal-window.html)
- [Modal & Nonmodal Dialogs: When (& When Not) to Use Them](https://www.nngroup.com/articles/modal-nonmodal-dialog/) - <cite>Therese Fessenden, Nielsen Norman Group (2017)</cite>
- [Micromodal.js](https://micromodal.now.sh/) - JS Documentation

<!-- The following are the modals shown to the user on the site -->
<div class="ods-modal" id="ods-modal-standard" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1" data-micromodal-close>
      <div class="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-standard-title">
        <header class="ods-modal--header">
          <button class="ods-modal--close" aria-label="Close modal" data-micromodal-close></button>
          <h1 class="ods-modal--title" id="ods-modal-standard-title">
            This is a Modal
          </h1>
        </header>
        <main class="ods-modal--content" id="ods-modal-standard-content">
          <p>
            Try hitting the <kbd>tab</kbd> key and notice how the focus stays within the modal itself. Also, <kbd>esc</kbd> to close modal.
          </p>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-clear" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
          <button class="ods-button">Continue</button>
        </footer>
      </div>
    </div>
  </div>
</div>

:::

::: slot html-scss
## HTML & CSS
:::
