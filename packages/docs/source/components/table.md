# Table

A table is a structured set of data made up of rows and columns also known as tabular data. They allow you to quickly and easily look up values that indicate some kind of connection between different types of data or content.

## Usage

Our tables rely on semantic HTML and the `.ods-table` class to style them. This style should be sufficient for general use cases.

Note that tables should _not_ have a fixed width, nor should their columns. Browsers do an excellent job of allocating space and forced white-space will hurt readability. However, we automatically limit table cell widths to ~45 characters - ensuring rogue strings don't break the table display.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small countries
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest countries.</caption>
        <thead>
          <tr>
            <th scope="column">Country</th>
            <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-ods-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>China</td>
            <td class="is-ods-table-num">9,596,961</td>
            <td class="is-ods-table-num">1,343,239,923</td>
            <td>Beijing</td>
          </tr>
          <tr>
            <td>Algeria</td>
            <td class="is-ods-table-num">2,381,740</td>
            <td class="is-ods-table-num">42,008,054</td>
            <td>Algiers</td>
          </tr>
          <tr>
            <td>Uruguay</td>
            <td class="is-ods-table-num">176,215</td>
            <td class="is-ods-table-num">3,308,535</td>
            <td>Montevideo</td>
          </tr>
          <tr>
            <td>São Tomé and Príncipe</td>
            <td class="is-ods-table-num">964</td>
            <td class="is-ods-table-num">208,818</td>
            <td>São Tomé</td>
          </tr>
          <tr>
            <td>Seychelles</td>
            <td class="is-ods-table-num">451</td>
            <td class="is-ods-table-num">95,235</td>
            <td>Victoria</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small countries
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest countries.</caption>
      <thead>
        <tr>
          <th scope="column">Country</th>
          <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-ods-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>China</td>
          <td class="is-ods-table-num">9,596,961</td>
          <td class="is-ods-table-num">1,343,239,923</td>
          <td>Beijing</td>
        </tr>
        <tr>
          <td>Algeria</td>
          <td class="is-ods-table-num">2,381,740</td>
          <td class="is-ods-table-num">42,008,054</td>
          <td>Algiers</td>
        </tr>
        <tr>
          <td>Uruguay</td>
          <td class="is-ods-table-num">176,215</td>
          <td class="is-ods-table-num">3,308,535</td>
          <td>Montevideo</td>
        </tr>
        <tr>
          <td>São Tomé and Príncipe</td>
          <td class="is-ods-table-num">964</td>
          <td class="is-ods-table-num">208,818</td>
          <td>São Tomé</td>
        </tr>
        <tr>
          <td>Seychelles</td>
          <td class="is-ods-table-num">451</td>
          <td class="is-ods-table-num">95,235</td>
          <td>Victoria</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

### Row headings

If your data set has keys on two axes, we also support setting the left-most column as a row heading. This is particularly helpful when we expect the user to utilize a known value for data lookup (e.g. "What is the capital of Brazil?").

Be sure to identify your row heading column as well - that is, don't leave a blank cell in the upper left. Our secondary headings need context too!

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small countries
      </figcaption>
      <table class="ods-table">
        <caption>Information about some of the largest and smallest countries.</caption>
        <thead>
          <tr>
            <th scope="column">Country</th>
            <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-ods-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Algeria</td>
            <td class="is-ods-table-num">2,381,740</td>
            <td class="is-ods-table-num">42,008,054</td>
            <td>Algiers</td>
          </tr>
          <tr>
            <th scope="row">Brazil</th>
            <td class="is-ods-table-num">8,514,877</td>
            <td class="is-ods-table-num">203,429,773</td>
            <td>Brasília</td>
          </tr>
          <tr>
            <th scope="row">Democratic Republic of the Congo</th>
            <td class="is-ods-table-num">2,344,858</td>
            <td class="is-ods-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
          <tr>
            <th scope="row">Maldives</th>
            <td class="is-ods-table-num">298</td>
            <td class="is-ods-table-num">394,451</td>
            <td>Malé</td>
          </tr>
          <tr>
            <th scope="row">Suriname</th>
            <td class="is-ods-table-num">163,820</td>
            <td class="is-ods-table-num">491,989</td>
            <td>Paramaribo</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small countries
    </figcaption>
    <table class="ods-table">
      <caption>Information about some of the largest and smallest countries.</caption>
      <thead>
        <tr>
          <th scope="column">Country</th>
          <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-ods-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Algeria</td>
          <td class="is-ods-table-num">2,381,740</td>
          <td class="is-ods-table-num">42,008,054</td>
          <td>Algiers</td>
        </tr>
        <tr>
          <th scope="row">Brazil</th>
          <td class="is-ods-table-num">8,514,877</td>
          <td class="is-ods-table-num">203,429,773</td>
          <td>Brasília</td>
        </tr>
        <tr>
          <th scope="row">Democratic Republic of the Congo</th>
          <td class="is-ods-table-num">2,344,858</td>
          <td class="is-ods-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
        <tr>
          <th scope="row">Maldives</th>
          <td class="is-ods-table-num">298</td>
          <td class="is-ods-table-num">394,451</td>
          <td>Malé</td>
        </tr>
        <tr>
          <th scope="row">Suriname</th>
          <td class="is-ods-table-num">163,820</td>
          <td class="is-ods-table-num">491,989</td>
          <td>Paramaribo</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

### Row grouping

If you need to group rows by a shared data point, we also support using <code>rowspan</code> to do so. Otherwise, follow the same implementation guidelines as above.

Note that the use of <code>colspan</code> or <code>rowspan</code> may cause accessibility issues for users aided by assistive technologies, so proceed with caution or consider a different approach.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small countries
      </figcaption>
      <table class="ods-table">
        <caption>Information about some of the largest and smallest countries.</caption>
        <thead>
          <tr>
            <th scope="column">Continent</th>
            <th scope="column">Country</th>
            <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-ods-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" rowspan="3">Africa</th>
            <td>Algeria</td>
            <td class="is-ods-table-num">2,381,740</td>
            <td class="is-ods-table-num">42,008,054</td>
            <td>Algiers</td>
          </tr>
          <tr>
            <td>Democratic Republic of the Congo</td>
            <td class="is-ods-table-num">2,344,858</td>
            <td class="is-ods-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
          <tr>
            <td>São Tomé and Príncipe</td>
            <td class="is-ods-table-num">964</td>
            <td class="is-ods-table-num">208,818</td>
            <td>São Tomé</td>
          </tr>
          <tr>
            <th scope="row" rowspan="3">Asia</th>
            <td>China</td>
            <td class="is-ods-table-num">9,596,961</td>
            <td class="is-ods-table-num">1,343,239,923</td>
            <td>Beijing</td>
          </tr>
          <tr>
            <td>India</td>
            <td class="is-ods-table-num">3,287,263</td>
            <td class="is-ods-table-num">1,205,073,612</td>
            <td>New Delhi</td>
          </tr>
          <tr>
            <td>Singapore</td>
            <td class="is-ods-table-num">697</td>
            <td class="is-ods-table-num">5,353,494</td>
            <td>Singapore</td>
          </tr>
          <tr>
            <th scope="row" rowspan="3">South America</th>
            <td>Argentina</td>
            <td class="is-ods-table-num">2,780,400</td>
            <td class="is-ods-table-num">41,769,726</td>
            <td>Buenos Aires</td>
          </tr>
          <tr>
            <td>Suriname</td>
            <td class="is-ods-table-num">163,820</td>
            <td class="is-ods-table-num">491,989</td>
            <td>Paramaribo</td>
          </tr>
          <tr>
            <td>Uruguay</td>
            <td class="is-ods-table-num">176,215</td>
            <td class="is-ods-table-num">3,308,535</td>
            <td>Montevideo</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small countries
    </figcaption>
    <table class="ods-table">
      <caption>Information about some of the largest and smallest countries.</caption>
      <thead>
        <tr>
          <th scope="column">Continent</th>
          <th scope="column">Country</th>
          <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-ods-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowspan="3">Africa</th>
          <td>Algeria</td>
          <td class="is-ods-table-num">2,381,740</td>
          <td class="is-ods-table-num">42,008,054</td>
          <td>Algiers</td>
        </tr>
        <tr>
          <td>Democratic Republic of the Congo</td>
          <td class="is-ods-table-num">2,344,858</td>
          <td class="is-ods-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
        <tr>
          <td>São Tomé and Príncipe</td>
          <td class="is-ods-table-num">964</td>
          <td class="is-ods-table-num">208,818</td>
          <td>São Tomé</td>
        </tr>
        <tr>
          <th scope="row" rowspan="3">Asia</th>
          <td>China</td>
          <td class="is-ods-table-num">9,596,961</td>
          <td class="is-ods-table-num">1,343,239,923</td>
          <td>Beijing</td>
        </tr>
        <tr>
          <td>India</td>
          <td class="is-ods-table-num">3,287,263</td>
          <td class="is-ods-table-num">1,205,073,612</td>
          <td>New Delhi</td>
        </tr>
        <tr>
          <td>Singapore</td>
          <td class="is-ods-table-num">697</td>
          <td class="is-ods-table-num">5,353,494</td>
          <td>Singapore</td>
        </tr>
        <tr>
          <th scope="row" rowspan="3">South America</th>
          <td>Argentina</td>
          <td class="is-ods-table-num">2,780,400</td>
          <td class="is-ods-table-num">41,769,726</td>
          <td>Buenos Aires</td>
        </tr>
        <tr>
          <td>Suriname</td>
          <td class="is-ods-table-num">163,820</td>
          <td class="is-ods-table-num">491,989</td>
          <td>Paramaribo</td>
        </tr>
        <tr>
          <td>Uruguay</td>
          <td class="is-ods-table-num">176,215</td>
          <td class="is-ods-table-num">3,308,535</td>
          <td>Montevideo</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Content guidelines

### Do's

- Put the most important column on the left and cascade less important information to the right.
- Titles & captions should describe the table the user is viewing. They are not abstractions.

### Don'ts

- Use overly long column headings - try to keep them as short as or shorter than your column content.
- Don’t create complex interactions that change the state of the row.

### Supported content types

The basic table styling is based on what is most legible and scannable for a normal string of text. However, different data types may require alternate styling. Currently, we provide three variant styles and will add more as necessary.

#### Numerical data

If the data in a column consists primarily of figures or numerical data, you can utilize the <code>.is-ods-table-num</code> class. It's been applied to the above examples in order to ensure tabular number display and right-align the figures for easy comparison.

When presenting numerical data, be sure to leave off any units and incorporate them into the column's header.

#### Date

To maintain ease of reading, dates should not be line-broken. To preserve their white space, you can utilize the <code>.is-ods-table-date</code> class throughout their column.

#### Button

No extra styling is required when adding Buttons to your table. Buttons will automatically resize to their "Small" variant and align to the baseline of other type in the row.

Please follow normal Button variant guidelines within tables.

#### Status

No extra styling is required when adding Statuses to your table. However, the label should be hidden, and they require their own column with an appropriate heading.

Please follow all other Status guidelines as normal.

#### Checkboxes

You may include checkboxes in the first column of your table if row selection is necessary. Use the `.is-ods-table-checkbox` class on each cell to ensure proper spacing.

##### Checkbox behavior

Our Sass package does not come with JavaScript, so you'll need to use one of our associated libraries or implement the appropriate checkbox behavior yourself:

The heading checkbox should check/uncheck all rows when it is set to the related state.

If the selection of total rows is in a mixed state, the heading checkbox should be set to `:indeterminate`.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small countries
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest countries.</caption>
        <thead>
          <tr>
            <th scope="column" class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[all]" id="checkbox-all" value="check-all">
              <label class="ods-checkbox--label" for="checkbox-all">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </th>
            <th scope="column">Country</th>
            <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-ods-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[0]" id="checkbox-0" value="check-0" checked>
              <label class="ods-checkbox--label" for="checkbox-0">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Brazil</td>
            <td class="is-ods-table-num">8,514,877</td>
            <td class="is-ods-table-num">203,429,773</td>
            <td>Brasília</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
              <label class="ods-checkbox--label" for="checkbox-1">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Argentina</td>
            <td class="is-ods-table-num">2,780,400</td>
            <td class="is-ods-table-num">41,769,726</td>
            <td>Buenos Aires</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2" checked>
              <label class="ods-checkbox--label" for="checkbox-2">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Democratic Republic of the Congo</td>
            <td class="is-ods-table-num">2,344,858</td>
            <td class="is-ods-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[3]" id="checkbox-3" value="check-3">
              <label class="ods-checkbox--label" for="checkbox-3">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Suriname</td>
            <td class="is-ods-table-num">163,820</td>
            <td class="is-ods-table-num">491,989</td>
            <td>Paramaribo</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[4]" id="checkbox-4" value="check-4">
              <label class="ods-checkbox--label" for="checkbox-4">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Singapore</td>
            <td class="is-ods-table-num">697</td>
            <td class="is-ods-table-num">5,353,494</td>
            <td>Singapore</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small countries
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest countries.</caption>
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[all]" id="checkbox-all" value="check-all">
            <label class="ods-checkbox--label" for="checkbox-all">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </th>
          <th scope="column">Country</th>
          <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-ods-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[0]" id="checkbox-0" value="check-0" checked>
            <label class="ods-checkbox--label" for="checkbox-0">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Brazil</td>
          <td class="is-ods-table-num">8,514,877</td>
          <td class="is-ods-table-num">203,429,773</td>
          <td>Brasília</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
            <label class="ods-checkbox--label" for="checkbox-1">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Argentina</td>
          <td class="is-ods-table-num">2,780,400</td>
          <td class="is-ods-table-num">41,769,726</td>
          <td>Buenos Aires</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2" checked>
            <label class="ods-checkbox--label" for="checkbox-2">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Democratic Republic of the Congo</td>
          <td class="is-ods-table-num">2,344,858</td>
          <td class="is-ods-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[3]" id="checkbox-3" value="check-3">
            <label class="ods-checkbox--label" for="checkbox-3">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Suriname</td>
          <td class="is-ods-table-num">163,820</td>
          <td class="is-ods-table-num">491,989</td>
          <td>Paramaribo</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[4]" id="checkbox-4" value="check-4">
            <label class="ods-checkbox--label" for="checkbox-4">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Singapore</td>
          <td class="is-ods-table-num">697</td>
          <td class="is-ods-table-num">5,353,494</td>
          <td>Singapore</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## States

### Empty cells

If the value of a cell is empty, use an en dash (&ndash;) to indicate this.

### Empty tables

If no data is returned - whether due to filtering or an empty data set - be sure to provide a null state for your users. If you can detect why no data was returned, make that clear in the <code>tfoot</code>.

The <code>data-null</code> attribute will ensure the table styling is adjusted.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small countries
      </figcaption>
      <table class="ods-table" data-null>
        <caption>Information about the largest and smallest countries.</caption>
        <thead>
          <tr>
            <th scope="column">Country</th>
            <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-ods-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">
              Aw beans. This set of filters didn't return any results.
            </td>
          </tr>
        </tfoot>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <table class="ods-table" data-null>
      <caption>Big and small countries</caption>
      <thead>
        <tr>
          <th scope="column">Country</th>
          <th scope="column" class="is-ods-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-ods-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">
            Aw beans. This set of filters didn't return any results.
          </td>
        </tr>
      </tfoot>
    </table>
  </figure>
  ```
</figure>

## Additional features

### Sortable tables

While we provide styling for sortable tables, our Sass package does not currently come with JavaScript. You'll need to use one of our associated libraries or implement the appropriate sorting behavior yourself:

Any sortable column should display the appropriate icon for its state: ascending, descending, or unsorted.

When an unsorted heading is clicked, the column should sort in ascending (A to Z) order.

When an ascending heading is clicked, it should swap to descending (Z to A) order.

Finally, when a descending heading is clicked, it should swap to unsorted.

When any column becomes sorted, the previously active column should return to an unsorted state.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small countries
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest countries.</caption>
        <thead>
          <tr>
            <th scope="column">
              <button class="ods-table--sort is-ods-table-unsorted">Country</button>
            </th>
            <th scope="column" class="is-ods-table-num">
              <button class="ods-table--sort is-ods-table-desc">Area (km<sup>2</sup>)</button>
            </th>
            <th scope="column" class="is-ods-table-num">
              <button class="ods-table--sort is-ods-table-unsorted">Population</button>
            </th>
            <th scope="column">
              <button class="ods-table--sort is-ods-table-unsorted">Capital</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brazil</td>
            <td class="is-ods-table-num">8,514,877</td>
            <td class="is-ods-table-num">203,429,773</td>
            <td>Brasília</td>
          </tr>
          <tr>
            <td>Argentina</td>
            <td class="is-ods-table-num">2,780,400</td>
            <td class="is-ods-table-num">41,769,726</td>
            <td>Buenos Aires</td>
          </tr>
          <tr>
            <td>Democratic Republic of the Congo</td>
            <td class="is-ods-table-num">2,344,858</td>
            <td class="is-ods-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
          <tr>
            <td>Suriname</td>
            <td class="is-ods-table-num">163,820</td>
            <td class="is-ods-table-num">491,989</td>
            <td>Paramaribo</td>
          </tr>
          <tr>
            <td>Singapore</td>
            <td class="is-ods-table-num">697</td>
            <td class="is-ods-table-num">5,353,494</td>
            <td>Singapore</td>
          </tr>
          <tr>
            <td>Maldives</td>
            <td class="is-ods-table-num">298</td>
            <td class="is-ods-table-num">394,451</td>
            <td>Malé</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small countries
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest countries.</caption>
      <thead>
        <tr>
          <th scope="column">
            <button class="ods-table--sort is-ods-table-unsorted">Country</button>
          </th>
          <th scope="column" class="is-ods-table-num">
            <button class="ods-table--sort is-ods-table-desc">Area (km<sup>2</sup>)</button>
          </th>
          <th scope="column" class="is-ods-table-num">
            <button class="ods-table--sort is-ods-table-unsorted">Population</button>
          </th>
          <th scope="column">
            <button class="ods-table--sort is-ods-table-unsorted">Capital</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Brazil</td>
          <td class="is-ods-table-num">8,514,877</td>
          <td class="is-ods-table-num">203,429,773</td>
          <td>Brasília</td>
        </tr>
        <tr>
          <td>Argentina</td>
          <td class="is-ods-table-num">2,780,400</td>
          <td class="is-ods-table-num">41,769,726</td>
          <td>Buenos Aires</td>
        </tr>
        <tr>
          <td>Democratic Republic of the Congo</td>
          <td class="is-ods-table-num">2,344,858</td>
          <td class="is-ods-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
        <tr>
          <td>Suriname</td>
          <td class="is-ods-table-num">163,820</td>
          <td class="is-ods-table-num">491,989</td>
          <td>Paramaribo</td>
        </tr>
        <tr>
          <td>Singapore</td>
          <td class="is-ods-table-num">697</td>
          <td class="is-ods-table-num">5,353,494</td>
          <td>Singapore</td>
        </tr>
        <tr>
          <td>Maldives</td>
          <td class="is-ods-table-num">298</td>
          <td class="is-ods-table-num">394,451</td>
          <td>Malé</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Responsive design

### Fluid tables

Our default tables here have all been wrapped in `<figure class="ods-table--figure">` which will ensure that our tables are always scrollable and never extend beyond their container.

## Accessibility

### Titles and captions

Please provide each table with both a title and caption.

The title will provide a visible heading for your table, e.g. "Big and small countries" above.

A consice, descriptive title will provide all users with direct context for your data - something that may be missed if relying on page headings or surrounding body copy.

In addition, you may opt to give your table a visually hidden caption. Providing a caption will help those utilizing assistive technologies understand the context and breadth of your data set before the data is accessed. For example, "Information about the world's largest and smallest countries" above.

### Scoping

Utilize the <code>scope</code> attribute to indicate whether your headings apply to their associated column or row.

A note on the current HTML5 spec:

<blockquote>
  <p>
    Although the scope attribute is obsolete in HTML5, many screen readers rely on the attribute to programmatically replicate the visual associations a person not using a screen reader may be able to infer about a cell's position. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#Scoping_rows_and_columns">MDN</a></cite>
  </p>
</blockquote>

### Complicated tables

While the browser support is strong and they are valid attributes, try to refrain from using complicated table layouts that rely on <code>colspan</code> or <code>rowspan</code>.

<blockquote>
  <p>Assistive technology such as screen readers may have difficulty parsing tables that are so complex that header cells can’t be associated in a strictly horizontal or vertical way. This is typically indicated by the presence of the colspan and rowspan attributes.</p>

<p>Ideally, consider alternate ways to present the table's content, including breaking it apart into a collection of smaller, related tables that don't have to rely on using the colspan and rowspan attributes. In addition to helping people who use assistive technology understand the table's content, this may also benefit people with cognitive concerns who may have difficulty understanding the associations the table layout is describing. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#Complicated_tables">MDN</a></cite></p>
</blockquote>

This same advice applies to nested tables or hidden rows as well. While convenient for designers and useful for some users, they introduce accessibility problems that may make your data inaccessible to some users.

<script>
  var checkbox = document.getElementById("checkbox-all");
  checkbox.indeterminate = true;
</script>
