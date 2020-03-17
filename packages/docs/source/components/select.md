# Select

<aside class="ods-callout is-ods-callout-warning" aria-live="polite">
  <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
    <path class="icon--fill" fill="#2F3F4A" d="M97.186 73.579L60.63 11.364C58.23 7.414 54.083 5 49.5 5c-4.583 0-8.73 2.414-11.13 6.364L1.814 73.58c-2.4 3.95-2.4 8.887-.109 12.838C4.105 90.585 8.252 93 12.835 93h73.33c4.582 0 8.838-2.414 11.13-6.584 2.291-3.95 2.291-8.887-.11-12.837z"/>
    <path fill="#fff" d="M49 28c-1.645 0-3 1.566-3 3.466v28.067C46 61.434 47.355 63 49 63s3-1.566 3-3.467V31.466c0-1.9-1.355-3.466-3-3.466z"/>
    <ellipse cx="49" cy="73" fill="#fff" rx="4" ry="3"/>
  </svg>
  <div class="ods-callout--content">
    <p>
      These examples rely on the <a href="https://selectize.github.io/selectize.js/">Selectize.js</a> library.
    </p>
    <p>
      As this library is not currently included with Nim, these examples should be considered loose guidelines for behavior and <code>select</code> implementation.
    </p>
  </div>
</aside>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select-input" id="fav-color" name="fav-color" required>
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
      <select class="ods-select-input" id="fav-color" name="fav-color" required>
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

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select-input" id="fav-color-disabled" name="fav-color-disabled" required disabled>
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
      <select class="ods-select-input" id="fav-color-disabled" name="fav-color-disabled" required disabled>
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

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select-input" id="fav-animal" name="fav-color" required>
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
      <select class="ods-select-input" id="fav-animal" name="fav-color" required>
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

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select class="ods-select-input" id="fav-dino" name="fav-dino" required>
            <optgroup label="Theropods" disabled>
                <option>Tyrannosaurus</option>
                <option>Velociraptor</option>
                <option>Deinonychus</option>
            </optgroup>
            <optgroup label="Sauropods">
                <option>Diplodocus</option>
                <option>Saltasaurus</option>
                <option>Apatosaurus</option>
            </optgroup>
        </select>
        <label class="ods-label" for="fav-dino">Favorite dinosaur</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select class="ods-select-input" id="fav-dino" name="fav-dino" required>
          <optgroup label="Theropods" disabled>
              <option>Tyrannosaurus</option>
              <option>Velociraptor</option>
              <option>Deinonychus</option>
          </optgroup>
          <optgroup label="Sauropods">
              <option>Diplodocus</option>
              <option>Saltasaurus</option>
              <option>Apatosaurus</option>
          </optgroup>
      </select>
      <label class="ods-label" for="fav-dino">Favorite dinosaur</label>
    </div>
  </fieldset>
  ```
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <fieldset class="ods-fieldset">
      <div class="ods-fieldset-flex">
        <select id="select-multi" name="state[]" multiple class="ods-select-input">
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label class="ods-label" for="fav-dino">Favorite states</label>
      </div>
    </fieldset>
  </div>

  ```html
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <select id="select-multi" name="state[]" multiple class="ods-select-input">
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
      <label class="ods-label" for="fav-dino">Favorite states</label>
    </div>
  </fieldset>
  ```
</figure>
