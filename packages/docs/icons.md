---
id: icons
template: plain
pageHeaderVariant: icon
title: Icons
headline: Icons
lead: A system of icons which establishes a visual language that can be easily understood regardless of age, language or culture.
tabs:
  - label: 'Overview'
    id: 'overview'
---

<div class="docskit-container">

<Description>
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Library
    </figcaption>
    <table class="ods-table">
      <thead>
        <tr>
          <th scope="column">Icon</th>
          <th scope="column">Name</th>
          <th scope="column">Use</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><OdsIcon icon="caution"></OdsIcon></td>
          <td>Caution</td>
          <td>To indicate a crucial decision</td>
        </tr>
        <tr>
          <td><OdsIcon icon="search"></OdsIcon></td>
          <td>Search</td>
          <td>To search for something</td>
        </tr>
        <tr>
          <td><OdsIcon icon="get-info"></OdsIcon></td>
          <td>Get info</td>
          <td>To get information</td>
        </tr>
        <tr>
          <td><OdsIcon icon="user"></OdsIcon></td>
          <td>User</td>
          <td>To support a user name</td>
        </tr>
        <tr>
          <td><OdsIcon icon="copy"></OdsIcon></td>
          <td>Copy</td>
          <td>To copy text</td>
        </tr>
        <tr>
          <td><OdsIcon icon="delete"></OdsIcon></td>
          <td>Delete</td>
          <td>To delete something</td>
        </tr>
        <tr>
          <td><OdsIcon icon="download"></OdsIcon></td>
          <td>Download</td>
          <td>To download</td>
        </tr>
        <tr>
          <td><OdsIcon icon="notification"></OdsIcon></td>
          <td>Notification</td>
          <td>To notify the user of something</td>
        </tr>
        <tr>
          <td><OdsIcon icon="close"></OdsIcon></td>
          <td>Close</td>
          <td>To close a modal or other UI</td>
        </tr>
        <tr>
          <td><OdsIcon icon="complete"></OdsIcon></td>
          <td>Complete</td>
          <td>To show a completed process</td>
        </tr>
        <tr>
          <td><OdsIcon icon="error"></OdsIcon></td>
          <td>Error</td>
          <td>To indicate an error</td>
        </tr>
        <tr>
          <td><OdsIcon icon="go-forward"></OdsIcon></td>
          <td>Go forward</td>
          <td>To navigate forward</td>
        </tr>
        <tr>
          <td><OdsIcon icon="go-backward"></OdsIcon></td>
          <td>Go backward</td>
          <td>To navigate backward</td>
        </tr>
        <tr>
          <td><OdsIcon icon="edit"></OdsIcon></td>
          <td>Edit</td>
          <td>To edit something</td>
        </tr>
        <tr>
          <td><OdsIcon icon="settings"></OdsIcon></td>
          <td>Settings</td>
          <td>To edit user or app settings</td>
        </tr>
        <tr>
          <td><OdsIcon icon="plus"></OdsIcon></td>
          <td>Plus</td>
          <td>To add</td>
        </tr>
        <tr>
          <td><OdsIcon icon="minus"></OdsIcon></td>
          <td>Minus</td>
          <td>To subtract or remove</td>
        </tr>
        <tr>
          <td><OdsIcon icon="filter"></OdsIcon></td>
          <td>Filter</td>
          <td>To filter results</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Description>

## Built on a grid

<Description>

Every icon is built on a grid at a specific size. This ensures not only visual consistency, but allows us to easily swap icons in various applications.

</Description>

<Visual>
  <img alt="An example grid containing a square, an X, a circle and other horizontal and vertical lines which Odyssey icons are drawn on" src="/images/icons-grid.svg">
</Visual>

### Design your own

<Description>

This grid is also included as a component in Figma. If you need to create something new, just drag out an instance and start drawing.

</Description>

## Guidelines

### Page structure first

<Description>

Once your structure is solid, and you get to the point where icons, delight & Co. can come into play, follow this simple rule: Use as few icons as necessary—but not fewer.

Add icons at the very end of the design process, do not play with icons while working on your wireframes.

</Description>

### UI indicators vs. icons

<Description>

UI indicators are visual indicators that are baked into UIs like the radio circle, checkbox check, and select caret. In some cases we can override these indicators to match our overall aesthetics and style which can make it seem like they <em>are</em> icons.

</Description>

<Visual>
  <img alt="An illustration of a select input. On right side, arrow points at a down-arrow glyph which is an example of a UI indicator." src="/images/icons-indicator-example.svg">
</Visual>

### When to use an icon

<Description>

If you want to call attention to an action you want a user to take, icons make good targets and break up text.

</Description>

<Visual>
  <template>
    <div>
      <button class="ods-button">Add astronaut</button>
      <button class="ods-button">
        <OdsIcon icon="plus" />
        Add astronaut
      </button>
    </div>
  </template>
</Visual>

### Use words

<Description>

Almost all icons should be accompanied by copy. By doing so, you won't leave users guessing what an icon represents.

As best practice, use a verb to suggest an action. For more clarity use a verb + noun.

</Description>

<Visual variant="smiley-positive">
  <button class="ods-button">
    <OdsIcon icon="plus" />
    Add astronaut
  </button>
</Visual>

<Visual variant="smiley-neutral">
  <button class="ods-button">
    <OdsIcon icon="plus" />
    Add
  </button>
</Visual>

<Visual variant="smiley-negative">
  <button class="ods-button">
    <OdsIcon icon="plus" />
    <span class="u-visually-hidden">Add</span>
  </button>
</Visual>

### Choosing the right icon

<Description>

It’s recommended to use a word to accompany an icon. Like the previous example shows, icons should call attention to the action and the icon should follow suit. Depending on the situation, some icons are better for clicking, where others are better suited as static.

</Description>

<Visual variant="positive">
  <button class="ods-button is-ods-button-clear">
    <OdsIcon icon="user" />
    Add astronaut
  </button>
</Visual>

<Description>

As a result, this will drastically reduce the amount of icons we have, increase understanding and clarity in our actions.

</Description>

<Visual variant="negative">
  <button class="ods-button is-ods-button-secondary">
    <OdsIcon icon="user" />
    Add astronaut
  </button>
</Visual>

### Color

<Description>

By default, all icons are Grey 900. If using an icon on top of a solid color, for example in a primary button, it should be White. As a general guideline, icons should be the same color as their accompanying text.

</Description>

<Visual variant="positive">
  <button class="ods-button is-ods-button-danger">
    <OdsIcon icon="delete" />
    Abort mission
  </button>
</Visual>

<Description>

As an example, if you have a “Abort mission” button, do not colorize the delete button or trashcan icon with Green 400.

</Description>

<Visual variant="negative">
  <button class="ods-button is-ods-button-secondary">
    <OdsIcon icon="delete" class="is-sample-color-green" />
    Abort mission
  </button>
</Visual>

</div>
