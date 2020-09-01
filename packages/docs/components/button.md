# Button

Buttons are primarily used for in-page interactions like form submissions.

## Variants

Buttons are primarily used for in-page interactions like form submissions.

### Primary

Primary buttons, our default, are used for the principal action in a view. For example, "Save".

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

### Secondary

Secondary buttons indicate other safe actions a user might take.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <button class="ods-button is-ods-button-secondary">Secondary</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-focus">Focus</button>
    <button class="ods-button is-ods-button-secondary" disabled>Disabled</button>
  </div>

  ```html
  <button class="ods-button is-ods-button-secondary">Secondary</button>
  <button class="ods-button is-ods-button-secondary" disabled>Secondary</button>
  ```
</figure>

### Danger

These buttons indicate actions that, while the primary focus of a view, are dangerous or destructive. For example, "Delete".

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

### Overlay

These buttons may only be used on top of a “Base Color” such as Purple 500, or on top of a photo or illustration. They should only be used in the scenario where Primary, Secondary, and Clear buttons cannot be used.

Lastly, they only exist at the Large size.

<figure class="nimatron--example">
  <div class="nimatron--rendered is-rendered-success">
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

### Clear

These are used for in-page interactions that modify the visible UI but do not modify data or an ongoing process. For example, hiding or showing a password field.

They also pair well with Primary and Secondary buttons.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

### Button with icon

Icons can be added to any of our button variants to increase clarity or add flair.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <button class="ods-button is-ods-button-primary"><svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12V8L12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6L8 6V2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V6L2 6C1.44772 6 1 6.44771 1 7C1 7.55228 1.44772 8 2 8L6 8V12Z" fill="currentColor"/></svg></svg>Add User</button>
    <button class="ods-button is-ods-button-secondary"><svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12V8L12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6L8 6V2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V6L2 6C1.44772 6 1 6.44771 1 7C1 7.55228 1.44772 8 2 8L6 8V12Z" fill="currentColor"/></svg></svg>Add User</button>
    <button class="ods-button is-ods-button-danger"><svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12V8L12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6L8 6V2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V6L2 6C1.44772 6 1 6.44771 1 7C1 7.55228 1.44772 8 2 8L6 8V12Z" fill="currentColor"/></svg></svg>Add User</button>
    <button class="ods-button is-ods-button-clear"><svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12V8L12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6L8 6V2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V6L2 6C1.44772 6 1 6.44771 1 7C1 7.55228 1.44772 8 2 8L6 8V12Z" fill="currentColor"/></svg></svg>Add User</button>
  </div>

  ```html
  <button class="ods-button is-ods-button-clear">Clear</button>
  <button class="ods-button is-ods-button-clear" disabled>Clear</button>
  ```
</figure>

## Guidelines

**Do** use buttons to indicate the important actions that can be taken in a view.

**Don't** use buttons to navigate users around the site or product; use links instead.

### Accessibility

Buttons should display a visible `:focus` state with users interact via keyboard.

Color is not a clear affordance for all users, please use clear, concise copy to label buttons. Good rules of thumb: use three or less words to describe your action; start your label with a verb (e.g. "Download Report" vs "Report PDF").

Use the `<button>` element instead of `<a>` whenever possible. The keyboard and screen reader interaction for these elements is different. <kbd>Space</kbd> will trigger a `<button>`; <kbd>Enter</kbd> will trigger an `<a>`.

## Implementation

### SCSS

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
