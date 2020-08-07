---
template: component
name: Button
lead: An Odyssey button appears as a rounded rectangle that is wider than it is tall, with a descriptive caption inflexs center. Users press the button by clicking it with a pointer controlled by a mouse, keystrokes can also be used to execute the command of a button.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'SCSS'
    id: 'scss'
  - label: 'Figma guide'
    id: 'figma-guide'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_button.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/pULYhG6KIhBsnQTFjkpTFv/Buttons?node-id=2660%3A365
---

::: slot overview
<section class="odo-grid--2col">
  <header class="odo-header">

  ## Button types

  In Odyssey there are 5 different button types; Primary, Secondary, Danger, Clear, and Overlay.

  </header>

  <Example>

  ##### Primary
  Our default button is used for primary action on a page or view. For example, “Save”. Use this button sparingly to provide a clear target for users to get to. 

  It’s best to use this button on a white background.

  </Example>

  <figure class="ods-overview--rendered">
    <button class="ods-button">Default</button>
    <button class="ods-button is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button">Disabled</button>
  </figure>

  <Example>
  
  ##### Secondary
  Ideal for a secondary actions to compliment the Primary button. Similar to the Primary button, use this button sparingly to provide focus to the user. 

  It’s best to use this button on a white background.

  </Example>

  <figure class="ods-overview--rendered">
    <button class="ods-button is-ods-button-secondary">Default</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-secondary is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-secondary">Disabled</button>
  </figure>

  <Example>

  ##### Danger
  Use this button for scenarios where a user may be deleting information or completing a task that could not be reversed. 

  It’s best to use this button on a white background.

  </Example>

  <figure class="ods-overview--rendered">
    <button class="ods-button is-ods-button-danger">Default</button>
    <button class="ods-button is-ods-button-danger is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-danger is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-danger">Disabled</button>
  </figure>

  <Example>

  ##### Clear
  These are used for in-page interactions that modify the visible UI but do not modify data or an ongoing process. For example, hiding or showing a password field. 

  They pair well with Primary and Secondary buttons. 

  It’s best to use this button on a white background.

  </Example>

  <figure class="ods-overview--rendered">
    <button class="ods-button is-ods-button-clear">Default</button>
    <button class="ods-button is-ods-button-clear is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-clear is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-clear">Disabled</button>
  </figure>

  <Example>

  ##### Overlay
  These buttons may only be used on top of a “Base Color” such as Purple 500 or on top of a colored background, photo, or illustration. They should only be used in the scenario where Primary, Secondary, and regular text links cannot be used.

  Lastly, they only exist at the large size.

  </Example>

  <figure class="ods-overview--rendered">
    <button class="ods-button is-ods-button-overlay">Default</button>
    <button class="ods-button is-ods-button-overlay is-ods-button-hover">Hover</button>
    <button class="ods-button is-ods-button-overlay is-ods-button-focus">Focus</button>
    <button disabled="disabled" class="ods-button is-ods-button-overlay">Disabled</button>
  </figure>
</section>

<section class="odo-grid--1col">
  <header class="odo-header">

  ## Anatomy

  Button UI is simple. It consists of typography within a rectangular container.

  </header>

  <FigureAnatomy img="/images/button-anatomy.svg" />
</section>

<section class="odo-grid--2col">
  <header class="odo-header">

  ## Guidelines

  Use buttons to indicate the important actions that a user can take. Don’t use buttons to navigate around the site or product; use links instead

  </header>

  <div>

  ### Punctuation and copy

  ##### Context
  Be as direct as possible with the goal you are trying to get the user to accomplish. Try to avoid dark patterns that require the user to discover what a button does. Be strategic in your button placement so a user has the best context. Consider using buttons at the end of an input form, or by preceding with supporting copy.

  </div>

  <div>
    <FigureExample type="positive">
      <button class="ods-button">Download report</button>
    </FigureExample>
    <FigureExample type="negative">
      <button class="ods-button">Download</button>
    </FigureExample>
  </div>

  <div>

  ##### Word count
  Never use more than 3 words inside of a button. If you think you need more words, consider other design solutions on the page.

  </div>

  <div>
    <FigureExample type="positive">
      <button class="ods-button">Download report</button>
    </FigureExample>
    <FigureExample type="negative">
      <button class="ods-button">Download most recent report</button>
    </FigureExample>
  </div>

  <div>

  ##### Capitalization
  If using multiple words, use sentence case. Sentence case means that a captial letter is applied to the first word and all other characters are lower case.
  
  </div>

  <div>
    <FigureExample type="positive">
      <button class="ods-button">Download report</button>
    </FigureExample>
    <FigureExample type="negative">
      <button class="ods-button">Download Report</button>
    </FigureExample>
  </div>

</section>


<section class="odo-grid--2col">
  <div>

  ## Accessibility
    
  Buttons should display a visible :focus state when users interact with their keyboard.

  Color is not a clear affordance for all users, please use clear, concise copy to label buttons

  User the `<button>` element instead of `<a>` whenever possible. The keyboard and screen reader interaction for these elements is different. Space will trigger a `<button>`; Enter will trigger an `<a>`.

  </div>

</section>

:::

::: slot scss

##### Primary

<figure class="ods--example">
  <div class="ods--rendered">
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

##### Secondary

<figure class="ods--example">
  <div class="ods--rendered">
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

##### Danger

<figure class="ods--example">
  <div class="ods--rendered">
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

##### Overlay

<figure class="ods--example">
  <div class="ods--rendered is-rendered-success">
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

##### Clear

<figure class="ods--example">
  <div class="ods--rendered">
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

---

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
:::

::: slot figma-guide
<section class="odo-grid--2col">
  <header class="odo-header">
  
  ## Find them

  </header>

  <div>
  
  ##### Location
  In the upper left hand corner of of Figma, you’ll see two tabs Layers and Assets. Click on “Assets”.

  From there, you’ll see all of the available components in Odyssey. Find “Buttons”, and click on the button type you need to use.

  </div>
  
  <figure>
    <img src="/images/button-figma-guide-01.png" />
  </figure>

  <header class="odo-header">
  
  ## Use them

  </header>
  
  <div>
  
  ##### Drag and drop
  After you follow the steps above, you can just drag and drop the button to your frame.
  
  ##### Override text
  After you follow the steps above, you can just drag and drop the button to your frame.
  
  ##### Override button type
  After you follow the steps above, you can just drag and drop the button to your frame.

  </div>

  <figure>
    <img src="/images/button-figma-guide-02.png" />
  </figure>
</section>
:::
