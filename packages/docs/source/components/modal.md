# Modals

## General guidelines

Modal dialogs are a powerful UI element. They are inserted above the main content and change the context to a special mode that requires user interaction. That is, they disable all other contexts until the user interacts with the modal itself.

With this in mind, modals are a great tool for specific use cases:

<ul>
  <li>
    Important warnings - e.g. an irreversible, destructive action or error
  </li>
  <li>
    Gathering immediate information requisite to continuing the current flow - e.g. "Please enter your password again for security purposes."
  </li>
  <li>
    Confirming or pivoting a course of action when it would lessen the user's required effort - e.g. "These documents will be required - are you sure you want to continue?"
  </li>
  <li>
    Blocking user interaction - e.g. "Please agree to these terms before continuing."
  </li>
</ul>

Here are a few smells for when a modal dialog may be inappropriate:

<ul>
  <li>
    Immediate action is not required
  </li>
  <li>
    The dialog would interrupt a workflow
  </li>
  <li>
    Additional context may be required or helpful
  </li>
  <li>
    The dialog content is long-form
  </li>
</ul>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <button class="ods-button" data-micromodal-trigger="ods-modal-standard">Let me see it already!</button>
  </div>

  ```html
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
  ```
</figure>

## Accessibility

Modal dialogs are notorious for their accessibility issues, but don't worry! We've got your back.

### Accessible attributes

The modal components makes use of several ARIA attributes in order to give assistive technologies (AT) as much information as possible.

<ul>
  <li>
    <code>aria-hidden</code> - This indicates whether or not the modal is visible and should be automatically set to <code>true</code> or <code>false</code> by our companion Javascript.
  </li>
  <li>
    <code>role="dialog"</code> - Until the <code>role</code> element is widely supported, this attribute indicates the semantic status of the modal to the browser. Please use <code>"alertdialog"</code> instead if your modal represents a dangerous action or error.
  </li>
  <li>
    <code>aria-modal="true"</code> - This indicates that the rest of the workflow is stopped while this element is present.
  </li>
  <li>
    <code>aria-labelledby="ods-modal--title-id"</code> - This attribute informs ATs which other element can be treated as the label for this dialog. Please use the unique <code>id</code> associated with the dialog's title.
  </li>
  <li>
    <code>aria-label="Close"</code> - Please use this tag on any <code>button</code> that allows the user to exit the dialog. By default, this is included on the modal's exit "X".
  </li>
</ul>

### Accessible behavior

When a modal dialog is opened, interaction is limited to the new context. While this may seem expected, it can surprise users - and is even worse for users requiring assistive technologies.

For convenience, users can exit the modal in a few ways:

<ul>
  <li>
    Clicking on the overlay
  </li>
  <li>
    Hitting <kbd>ESC</kbd>
  </li>
  <li>
    Clicking or navigating to any element tagged with <code>data-micromodal-close</code>
  </li>
</ul>

For users happy with their new context, we ensure their attention won't be misdirected. Scrolling on the main content becomes locked, and we inform the browser to lock the `tabindex` to the modal context. This way, regardless of input method, a user's interactions are limited to their new scope.

## Legacy support

While our current usage of modals doesn't conform to the recommended guidelines above, the updated UI does come with a few additional benefits for our content-heavy configuration modals:

<ul>
  <li>
    Modal dialogs automatically expand in width and height based on their content.
  </li>
  <li>
    Modal height is adjusted for absolutely positioned UI elements like dropdowns (no more cut off select boxes).
  </li>
  <li>
    Scroll behavior is now uniform and applies to the entire modal.
  </li>
  <li>
    Form display is automatically adjusted for modal contexts.
  </li>
</ul>

<button class="ods-button is-ods-button-secondary" data-micromodal-trigger="ods-modal-form">Form Modal</button>

## Further reading

<ul>
  <li>
    <a href="https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/">How To Make Modal Windows Better For Everyone</a> - <cite>Scott O’Hara (2014)</cite>
  </li>
  <li>
    <a href="https://www.scottohara.me/blog/2016/09/07/revised-modal-window.html">Making Modal Windows Better For Everyone, again...</a> - <cite>Scott O'Hara (2016)</cite>
  </li>
  <li>
    <a href="https://www.nngroup.com/articles/modal-nonmodal-dialog/">Modal & Nonmodal Dialogs: When (& When Not) to Use Them</a> - <cite>Therese Fessenden, Nielsen Norman Group (2017)</cite>
  </li>
  <li>
    <a href="https://micromodal.now.sh/">Micromodal.js</a> - JS Documentation
  </li>
</ul>
