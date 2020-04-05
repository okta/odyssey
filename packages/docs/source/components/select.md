# Select

The Select input is a form element that provides a menu of options for the user to... select.

## Usage

Selects are most useful when users have between 7 and 15 options to choose from. With a smaller number of options, Radio Buttons may be a better choice. When facing a larger set of options, a Text Input with autocompletion may be a better fit.

Selects also perform better when the options are familiar to the user. If a user may be unfamiliar with their options or need to compare them, Radio Buttons may be more useful.

Finally, Select inputs should not have a set default choice unless a supermajority of users will be choosing it.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" id="fav-color" name="fav-color" required>
          <option></option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
        <label class="ods-label" for="fav-color">Favorite color</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" id="fav-color" name="fav-color" required>
        <option></option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
      <label class="ods-label" for="fav-color">Favorite color</label>
    </div>
  </fieldset>
  ```
</figure>

### Option groups

Options may also be grouped within the Select dropdown list to help guide users.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" id="fav-animal" name="fav-animal" required>
          <option></option>
          <optgroup label="Mammals">
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="otter">Otter</option>
          </optgroup>
          <optgroup label="Birds">
            <option value="pigeon">Pigeon</option>
            <option value="robin">Robin</option>
            <option value="sparrow">Sparrow</option>
          </optgroup>
        </select>
        <label class="ods-label" for="fav-animal">Favorite animal</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" id="fav-animal" name="fav-animal" required>
        <option></option>
        <optgroup label="Mammals">
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="otter">Otter</option>
        </optgroup>
        <optgroup label="Birds">
          <option value="pigeon">Pigeon</option>
          <option value="robin">Robin</option>
          <option value="sparrow">Sparrow</option>
        </optgroup>
      </select>
      <label class="ods-label" for="fav-animal">Favorite animal</label>
    </div>
  </fieldset>
  ```
</figure>

## Choices.js

Odyssey provides styling and guidelines for both plain HTML `select` elements, as well as those using the <a href="https://github.com/jshjohnson/Choices">Choices.js</a> library. Demos beyond this section will provide examples of both implementations.

Currently, only `select`'s normal functionality is supported when using Choices.js. We recommend the following configuration as a baseline to ensure proper class names are applied:

```javascript
new Choices(element, {
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
  classNames: {
    containerOuter: 'ods-select',
    containerInner: 'ods-select--inner',
    input: 'ods-select--input',
    inputCloned: 'ods-select--input--cloned',
    list: 'ods-select--list',
    listItems: 'ods-select--list--multiple',
    listSingle: 'ods-select--list--single',
    listDropdown: 'ods-select--list--dropdown',
    item: 'ods-select--item',
    itemSelectable: 'ods-select--item--selectable',
    itemDisabled: 'ods-select--item--disabled',
    itemChoice: 'ods-select--item--choice',
    placeholder: 'ods-select--placeholder',
    group: 'ods-select--group',
    groupHeading: 'ods-select--heading',
    button: 'ods-select--button',
    activeState: 'is-ods-select-active',
    focusState: 'is-ods-select-focused',
    openState: 'is-ods-select-open',
    disabledState: 'is-ods-select-disabled',
    highlightedState: 'is-ods-select-highlighted',
    selectedState: 'is-ods-select-selected',
    flippedState: 'is-ods-select-flipped',
    loadingState: 'is-ods-select-loading',
    noResults: 'has-no-ods-select-results',
    noChoices: 'has-no-ods-select-choices'
  },
});
```

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="fav-color-choices" name="fav-color" required>
          <option></option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
        <label class="ods-label" for="fav-color-choices">Favorite color</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="fav-color-choices" name="fav-color" required>
        <option></option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
      <label class="ods-label" for="fav-color-choices">Favorite color</label>
    </div>
  </fieldset>
  ```
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices  id="fav-animal-choices" name="fav-animal" required>
          <option></option>
          <optgroup label="Mammals">
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="otter">Otter</option>
          </optgroup>
          <optgroup label="Birds">
            <option value="pigeon">Pigeon</option>
            <option value="robin">Robin</option>
            <option value="sparrow">Sparrow</option>
          </optgroup>
        </select>
        <label class="ods-label" for="fav-animal-choices">Favorite animal</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices  id="fav-animal-choices" name="fav-animal" required>
        <option></option>
        <optgroup label="Mammals">
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="otter">Otter</option>
        </optgroup>
        <optgroup label="Birds">
          <option value="pigeon">Pigeon</option>
          <option value="robin">Robin</option>
          <option value="sparrow">Sparrow</option>
        </optgroup>
      </select>
      <label class="ods-label" for="fav-animal-choices">Favorite animal</label>
    </div>
  </fieldset>
  ```
</figure>

## States

### Disabled

#### Vanilla

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" id="fav-color-disabled" name="fav-color" required disabled>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
        <label class="ods-label" for="fav-color-disabled">Favorite color</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" id="fav-color-disabled" name="fav-color" required disabled>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
      <label class="ods-label" for="fav-color-disabled">Favorite color</label>
    </div>
  </fieldset>
  ```
</figure>

You may also disable individual options or entire groups:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" id="fav-animal-disabled" name="fav-animal" required>
          <option></option>
          <optgroup label="Mammals" disabled>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="otter">Otter</option>
          </optgroup>
          <optgroup label="Birds">
            <option value="pigeon">Pigeon</option>
            <option value="robin" disabled>Robin</option>
            <option value="sparrow">Sparrow</option>
          </optgroup>
        </select>
        <label class="ods-label" for="fav-animal-disabled">Favorite animal</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" id="fav-animal-disabled" name="fav-animal" required>
        <option></option>
        <optgroup label="Mammals" disabled>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="otter">Otter</option>
        </optgroup>
        <optgroup label="Birds">
          <option value="pigeon">Pigeon</option>
          <option value="robin" disabled>Robin</option>
          <option value="sparrow">Sparrow</option>
        </optgroup>
      </select>
      <label class="ods-label" for="fav-animal-disabled">Favorite animal</label>
    </div>
  </fieldset>
  ```
</figure>

#### Choices.js

Choices.js leverages the `disabled` attribute as normal.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="fav-color-disabled-choices" name="fav-color" required disabled>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
        <label class="ods-label" for="fav-color-disabled-choices">Favorite color</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="fav-color-disabled-choices" name="fav-color" required disabled>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
      <label class="ods-label" for="fav-color-disabled-choices">Favorite color</label>
    </div>
  </fieldset>
  ```
</figure>

You may also disable individual options or entire groups. Note that when an entire option group is disabled while using Choices.js, it will be hidden entirely.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="fav-animal-disabled-choices" name="fav-animal" required>
          <option></option>
          <optgroup label="Mammals" disabled>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="otter">Otter</option>
          </optgroup>
          <optgroup label="Birds">
            <option value="pigeon">Pigeon</option>
            <option value="robin" disabled>Robin</option>
            <option value="sparrow">Sparrow</option>
          </optgroup>
        </select>
        <label class="ods-label" for="fav-animal-disabled-choices">Favorite animal</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="fav-animal-disabled-choices" name="fav-animal" required>
        <option></option>
        <optgroup label="Mammals" disabled>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="otter">Otter</option>
        </optgroup>
        <optgroup label="Birds">
          <option value="pigeon">Pigeon</option>
          <option value="robin" disabled>Robin</option>
          <option value="sparrow">Sparrow</option>
        </optgroup>
      </select>
      <label class="ods-label" for="fav-animal-disabled-choices">Favorite animal</label>
    </div>
  </fieldset>
  ```
</figure>

### Optional

#### Vanilla HTML

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" id="fav-color-optional" name="fav-color">
          <option></option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
        <label class="ods-label" for="fav-color-optional">Favorite color <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" id="fav-color-optional" name="fav-color">
        <option></option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
      <label class="ods-label" for="fav-color-optional">Favorite color <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>

#### Choices.js

Choice.js does not support or reproduce the `:required`/`:optional` pseudo-selectors, so optional fields should be marked with the `data-optional` attribute on their parent `fieldset`.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset" data-optional>
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="fav-color-choices-optional" name="fav-color">
          <option></option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
      <label class="ods-label" for="fav-color-choices-optional">Favorite color <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset" data-optional>
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="fav-color-choices-optional" name="fav-color">
        <option></option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
    <label class="ods-label" for="fav-color-choices-optional">Favorite color <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>

### Invalid

#### Vanilla HTML

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select" id="fav-color-invalid" name="fav-color" required data-invalid>
          <option></option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
        <label class="ods-label" for="fav-color-invalid">Favorite color <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select" id="fav-color-invalid" name="fav-color" required data-invalid>
        <option></option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
      <label class="ods-label" for="fav-color-invalid">Favorite color <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>

#### Choices.js

Choices.js doesn't pass along unknown `data-*` attributes, so `data-invalid` should be placed on the parent `fieldset` instead of the `select`.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset" data-invalid>
      <div class="ods-fieldset-flex">
        <select class="ods-select" data-js-choices id="fav-color-invalid-choices" name="fav-color" required>
          <option></option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="indigo">Indigo</option>
          <option value="violet">Violet</option>
        </select>
        <label class="ods-label" for="fav-color-invalid-choices">Favorite color <span class="ods-label--optional">Optional</span></label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset" data-invalid>
    <div class="ods-fieldset-flex">
      <select class="ods-select" data-js-choices id="fav-color-invalid-choices" name="fav-color" required>
        <option></option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violet">Violet</option>
      </select>
      <label class="ods-label" for="fav-color-invalid-choices">Favorite color <span class="ods-label--optional">Optional</span></label>
    </div>
  </fieldset>
  ```
</figure>
