# Table

<blockquote>
  <p>The HTML <code>table</code> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table">MDN</a></cite>
  </p>
</blockquote>

## Basic Tables

Our basic tables rely on semantic HTML and the <code>.table</code> class to style them. This style should be sufficient for general use cases.

Note that tables should _not_ have a fixed width, nor should their columns. Browsers do an excellent job of allocating space and forced white-space will hurt readability. However, we automatically limit table cell widths to 45 characters - ensuring rogue strings don't break the table display.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="table--figure">
      <table class="table">
        <caption>Big and small countries</caption>
        <thead>
          <tr>
            <th scope="column">Country</th>
            <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>China</td>
            <td class="is-table-num">9,596,961</td>
            <td class="is-table-num">1,343,239,923</td>
            <td>Beijing</td>
          </tr>
          <tr>
            <td>Brazil</td>
            <td class="is-table-num">8,514,877</td>
            <td class="is-table-num">203,429,773</td>
            <td>Brasília</td>
          </tr>
          <tr>
            <td>India</td>
            <td class="is-table-num">3,287,263</td>
            <td class="is-table-num">1,205,073,612</td>
            <td>New Delhi</td>
          </tr>
          <tr>
            <td>Argentina</td>
            <td class="is-table-num">2,780,400</td>
            <td class="is-table-num">41,769,726</td>
            <td>Buenos Aires</td>
          </tr>
          <tr>
            <td>Algeria</td>
            <td class="is-table-num">2,381,740</td>
            <td class="is-table-num">42,008,054</td>
            <td>Algiers</td>
          </tr>
          <tr>
            <td>Democratic Republic of the Congo</td>
            <td class="is-table-num">2,344,858</td>
            <td class="is-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
          <tr>
            <td>Uruguay</td>
            <td class="is-table-num">176,215</td>
            <td class="is-table-num">3,308,535</td>
            <td>Montevideo</td>
          </tr>
          <tr>
            <td>Suriname</td>
            <td class="is-table-num">163,820</td>
            <td class="is-table-num">491,989</td>
            <td>Paramaribo</td>
          </tr>
          <tr>
            <td>São Tomé and Príncipe</td>
            <td class="is-table-num">964</td>
            <td class="is-table-num">208,818</td>
            <td>São Tomé</td>
          </tr>
          <tr>
            <td>Singapore</td>
            <td class="is-table-num">697</td>
            <td class="is-table-num">5,353,494</td>
            <td>Singapore</td>
          </tr>
          <tr>
            <td>Seychelles</td>
            <td class="is-table-num">451</td>
            <td class="is-table-num">95,235</td>
            <td>Victoria</td>
          </tr>
          <tr>
            <td>Maldives</td>
            <td class="is-table-num">298</td>
            <td class="is-table-num">394,451</td>
            <td>Malé</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="table--figure">
    <table class="table">
      <caption>Big and small countries</caption>
      <thead>
        <tr>
          <th scope="column">Country</th>
          <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>China</td>
          <td class="is-table-num">9,596,961</td>
          <td class="is-table-num">1,343,239,923</td>
          <td>Beijing</td>
        </tr>
        <tr>
          <td>Brazil</td>
          <td class="is-table-num">8,514,877</td>
          <td class="is-table-num">203,429,773</td>
          <td>Brasília</td>
        </tr>
        <tr>
          <td>India</td>
          <td class="is-table-num">3,287,263</td>
          <td class="is-table-num">1,205,073,612</td>
          <td>New Delhi</td>
        </tr>
        <tr>
          <td>Argentina</td>
          <td class="is-table-num">2,780,400</td>
          <td class="is-table-num">41,769,726</td>
          <td>Buenos Aires</td>
        </tr>
        <tr>
          <td>Algeria</td>
          <td class="is-table-num">2,381,740</td>
          <td class="is-table-num">42,008,054</td>
          <td>Algiers</td>
        </tr>
        <tr>
          <td>Democratic Republic of the Congo</td>
          <td class="is-table-num">2,344,858</td>
          <td class="is-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
        <tr>
          <td>Uruguay</td>
          <td class="is-table-num">176,215</td>
          <td class="is-table-num">3,308,535</td>
          <td>Montevideo</td>
        </tr>
        <tr>
          <td>Suriname</td>
          <td class="is-table-num">163,820</td>
          <td class="is-table-num">491,989</td>
          <td>Paramaribo</td>
        </tr>
        <tr>
          <td>São Tomé and Príncipe</td>
          <td class="is-table-num">964</td>
          <td class="is-table-num">208,818</td>
          <td>São Tomé</td>
        </tr>
        <tr>
          <td>Singapore</td>
          <td class="is-table-num">697</td>
          <td class="is-table-num">5,353,494</td>
          <td>Singapore</td>
        </tr>
        <tr>
          <td>Seychelles</td>
          <td class="is-table-num">451</td>
          <td class="is-table-num">95,235</td>
          <td>Victoria</td>
        </tr>
        <tr>
          <td>Maldives</td>
          <td class="is-table-num">298</td>
          <td class="is-table-num">394,451</td>
          <td>Malé</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Advanced Tables

### Row Headings

If your data set has keys on two axes, we also support setting the left-most column as a row heading. This is particularly helpful when we expect the user to utilize a known value for data lookup (e.g. "What is the capital of Brazil?").

Be sure to identify your row heading column as well - that is, don't leave a blank cell in the upper left. Our secondary headings need context too!

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="table--figure">
      <table class="table">
        <caption>Big and small countries</caption>
        <thead>
          <tr>
            <th scope="column">Country</th>
            <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Algeria</td>
            <td class="is-table-num">2,381,740</td>
            <td class="is-table-num">42,008,054</td>
            <td>Algiers</td>
          </tr>
          <tr>
            <th scope="row">Argentina</th>
            <td class="is-table-num">2,780,400</td>
            <td class="is-table-num">41,769,726</td>
            <td>Buenos Aires</td>
          </tr>
          <tr>
            <th scope="row">Brazil</th>
            <td class="is-table-num">8,514,877</td>
            <td class="is-table-num">203,429,773</td>
            <td>Brasília</td>
          </tr>
          <tr>
            <th scope="row">China</th>
            <td class="is-table-num">9,596,961</td>
            <td class="is-table-num">1,343,239,923</td>
            <td>Beijing</td>
          </tr>
          <tr>
            <th scope="row">Democratic Republic of the Congo</th>
            <td class="is-table-num">2,344,858</td>
            <td class="is-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
          <tr>
            <th scope="row">India</th>
            <td class="is-table-num">3,287,263</td>
            <td class="is-table-num">1,205,073,612</td>
            <td>New Delhi</td>
          </tr>
          <tr>
            <th scope="row">Maldives</th>
            <td class="is-table-num">298</td>
            <td class="is-table-num">394,451</td>
            <td>Malé</td>
          </tr>
          <tr>
            <th scope="row">São Tomé and Príncipe</th>
            <td class="is-table-num">964</td>
            <td class="is-table-num">208,818</td>
            <td>São Tomé</td>
          </tr>
          <tr>
            <th scope="row">Seychelles</th>
            <td class="is-table-num">451</td>
            <td class="is-table-num">95,235</td>
            <td>Victoria</td>
          </tr>
          <tr>
            <th scope="row">Singapore</th>
            <td class="is-table-num">697</td>
            <td class="is-table-num">5,353,494</td>
            <td>Singapore</td>
          </tr>
          <tr>
            <th scope="row">Suriname</th>
            <td class="is-table-num">163,820</td>
            <td class="is-table-num">491,989</td>
            <td>Paramaribo</td>
          </tr>
          <tr>
            <th scope="row">Uruguay</th>
            <td class="is-table-num">176,215</td>
            <td class="is-table-num">3,308,535</td>
            <td>Montevideo</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="table--figure">
    <table class="table">
      <caption>Big and small countries</caption>
      <thead>
        <tr>
          <th scope="column">Country</th>
          <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Algeria</td>
          <td class="is-table-num">2,381,740</td>
          <td class="is-table-num">42,008,054</td>
          <td>Algiers</td>
        </tr>
        <tr>
          <th scope="row">Argentina</th>
          <td class="is-table-num">2,780,400</td>
          <td class="is-table-num">41,769,726</td>
          <td>Buenos Aires</td>
        </tr>
        <tr>
          <th scope="row">Brazil</th>
          <td class="is-table-num">8,514,877</td>
          <td class="is-table-num">203,429,773</td>
          <td>Brasília</td>
        </tr>
        <tr>
          <th scope="row">China</th>
          <td class="is-table-num">9,596,961</td>
          <td class="is-table-num">1,343,239,923</td>
          <td>Beijing</td>
        </tr>
        <tr>
          <th scope="row">Democratic Republic of the Congo</th>
          <td class="is-table-num">2,344,858</td>
          <td class="is-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
        <tr>
          <th scope="row">India</th>
          <td class="is-table-num">3,287,263</td>
          <td class="is-table-num">1,205,073,612</td>
          <td>New Delhi</td>
        </tr>
        <tr>
          <th scope="row">Maldives</th>
          <td class="is-table-num">298</td>
          <td class="is-table-num">394,451</td>
          <td>Malé</td>
        </tr>
        <tr>
          <th scope="row">São Tomé and Príncipe</th>
          <td class="is-table-num">964</td>
          <td class="is-table-num">208,818</td>
          <td>São Tomé</td>
        </tr>
        <tr>
          <th scope="row">Seychelles</th>
          <td class="is-table-num">451</td>
          <td class="is-table-num">95,235</td>
          <td>Victoria</td>
        </tr>
        <tr>
          <th scope="row">Singapore</th>
          <td class="is-table-num">697</td>
          <td class="is-table-num">5,353,494</td>
          <td>Singapore</td>
        </tr>
        <tr>
          <th scope="row">Suriname</th>
          <td class="is-table-num">163,820</td>
          <td class="is-table-num">491,989</td>
          <td>Paramaribo</td>
        </tr>
        <tr>
          <th scope="row">Uruguay</th>
          <td class="is-table-num">176,215</td>
          <td class="is-table-num">3,308,535</td>
          <td>Montevideo</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</div>

### Row Grouping

If you need to group rows by a shared data point, we also support using <code>rowspan</code> to do so. Otherwise, follow the same implementation guidelines as above.

Note that the use of <code>colspan</code> or <code>rowspan</code> may cause accessibility issues for users aided by assistive technologies, so proceed with caution or consider a different approach.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="table--figure">
      <table class="table">
        <caption>Big and small countries</caption>
        <thead>
          <tr>
            <th scope="column">Continent</th>
            <th scope="column">Country</th>
            <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-table-num">Population</th>
            <th scope="column">Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" rowspan="4">Africa</th>
            <td>Algeria</td>
            <td class="is-table-num">2,381,740</td>
            <td class="is-table-num">42,008,054</td>
            <td>Algiers</td>
          </tr>
          <tr>
            <td>Democratic Republic of the Congo</td>
            <td class="is-table-num">2,344,858</td>
            <td class="is-table-num">84,004,989</td>
            <td>Kinshasa</td>
          </tr>
          <tr>
            <td>São Tomé and Príncipe</td>
            <td class="is-table-num">964</td>
            <td class="is-table-num">208,818</td>
            <td>São Tomé</td>
          </tr>
          <tr>
            <td>Seychelles</td>
            <td class="is-table-num">451</td>
            <td class="is-table-num">95,235</td>
            <td>Victoria</td>
          </tr>
          <tr>
            <th scope="row" rowspan="4">Asia</th>
            <td>China</td>
            <td class="is-table-num">9,596,961</td>
            <td class="is-table-num">1,343,239,923</td>
            <td>Beijing</td>
          </tr>
          <tr>
            <td>India</td>
            <td class="is-table-num">3,287,263</td>
            <td class="is-table-num">1,205,073,612</td>
            <td>New Delhi</td>
          </tr>
          <tr>
            <td>Maldives</td>
            <td class="is-table-num">298</td>
            <td class="is-table-num">394,451</td>
            <td>Malé</td>
          </tr>
          <tr>
            <td>Singapore</td>
            <td class="is-table-num">697</td>
            <td class="is-table-num">5,353,494</td>
            <td>Singapore</td>
          </tr>
          <tr>
            <th scope="row" rowspan="4">South America</th>
            <td>Argentina</td>
            <td class="is-table-num">2,780,400</td>
            <td class="is-table-num">41,769,726</td>
            <td>Buenos Aires</td>
          </tr>
          <tr>
            <td>Brazil</td>
            <td class="is-table-num">8,514,877</td>
            <td class="is-table-num">203,429,773</td>
            <td>Brasília</td>
          </tr>
          <tr>
            <td>Suriname</td>
            <td class="is-table-num">163,820</td>
            <td class="is-table-num">491,989</td>
            <td>Paramaribo</td>
          </tr>
          <tr>
            <td>Uruguay</td>
            <td class="is-table-num">176,215</td>
            <td class="is-table-num">3,308,535</td>
            <td>Montevideo</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="table--figure">
    <table class="table">
      <caption>Big and small countries</caption>
      <thead>
        <tr>
          <th scope="column">Continent</th>
          <th scope="column">Country</th>
          <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-table-num">Population</th>
          <th scope="column">Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowspan="4">Africa</th>
          <td>Algeria</td>
          <td class="is-table-num">2,381,740</td>
          <td class="is-table-num">42,008,054</td>
          <td>Algiers</td>
        </tr>
        <tr>
          <td>Democratic Republic of the Congo</td>
          <td class="is-table-num">2,344,858</td>
          <td class="is-table-num">84,004,989</td>
          <td>Kinshasa</td>
        </tr>
        <tr>
          <td>São Tomé and Príncipe</td>
          <td class="is-table-num">964</td>
          <td class="is-table-num">208,818</td>
          <td>São Tomé</td>
        </tr>
        <tr>
          <td>Seychelles</td>
          <td class="is-table-num">451</td>
          <td class="is-table-num">95,235</td>
          <td>Victoria</td>
        </tr>
        <tr>
          <th scope="row" rowspan="4">Asia</th>
          <td>China</td>
          <td class="is-table-num">9,596,961</td>
          <td class="is-table-num">1,343,239,923</td>
          <td>Beijing</td>
        </tr>
        <tr>
          <td>India</td>
          <td class="is-table-num">3,287,263</td>
          <td class="is-table-num">1,205,073,612</td>
          <td>New Delhi</td>
        </tr>
        <tr>
          <td>Maldives</td>
          <td class="is-table-num">298</td>
          <td class="is-table-num">394,451</td>
          <td>Malé</td>
        </tr>
        <tr>
          <td>Singapore</td>
          <td class="is-table-num">697</td>
          <td class="is-table-num">5,353,494</td>
          <td>Singapore</td>
        </tr>
        <tr>
          <th scope="row" rowspan="4">South America</th>
          <td>Argentina</td>
          <td class="is-table-num">2,780,400</td>
          <td class="is-table-num">41,769,726</td>
          <td>Buenos Aires</td>
        </tr>
        <tr>
          <td>Brazil</td>
          <td class="is-table-num">8,514,877</td>
          <td class="is-table-num">203,429,773</td>
          <td>Brasília</td>
        </tr>
        <tr>
          <td>Suriname</td>
          <td class="is-table-num">163,820</td>
          <td class="is-table-num">491,989</td>
          <td>Paramaribo</td>
        </tr>
        <tr>
          <td>Uruguay</td>
          <td class="is-table-num">176,215</td>
          <td class="is-table-num">3,308,535</td>
          <td>Montevideo</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Style-by-Type

The basic table styling is based on what is most legible and scannable for a normal string of text. However, different data types may require alternate styling. Currently, we provide two variant styles and will add more as necessary.

### Numerical Data

If the data in a column consists primarily of figures or numerical data, you can utilize the <code>.is-table-num</code> class. It's been applied to the above examples in order to ensure tabular number display and right-align the figures for easy comparison.

When presenting numerical data, be sure to leave off any units and incorporate them into the column's header.

### Dates

To maintain ease of reading, dates should not be line-broken. To preserve their white space, you can utilize the <code>.is-table-date</code> class throughout their column.

## Empty Tables

If no data is returned - whether due to filtering or an empty data set - be sure to provide a null state for your users. If you can detect why no data was returned, make that clear in the <code>tfoot</code>.

The <code>data-null</code> attribute will ensure the table styling is adjusted.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="table--figure">
      <table class="table" data-null>
        <caption>Big and small countries</caption>
        <thead>
          <tr>
            <th scope="column">Country</th>
            <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
            <th scope="column" class="is-table-num">Population</th>
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
  <figure class="table--figure">
    <table class="table" data-null>
      <caption>Big and small countries</caption>
      <thead>
        <tr>
          <th scope="column">Country</th>
          <th scope="column" class="is-table-num">Area (km<sup>2</sup>)</th>
          <th scope="column" class="is-table-num">Population</th>
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

## Responsive Tables

Our default tables here have all been wrapped in `<figure class="table--figure">` which will ensure that our tables are always scrollable and never extend beyond their container. This default behavior assumes that comparison across rows is important.

If this isn't true for your use case, you may want to utilize a linear table.

### Linear Tables

If the data in your table is not intended for comparison, then moving to a linear table might be a good option - especially if you'd like to maintain the visibility of the entire dataset. Using the `.is-table-linear` class in conjunction with the `data-title` attribute, you can achieve beautiful things.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="table--figure">
      <table class="table is-table-linear">
        <caption>Directory / People</caption>
        <thead>
          <tr>
            <th scope="column">Person</th>
            <th scope="column">Username</th>
            <th scope="column">Primary Email</th>
            <th scope="column">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-title="Person">Carol Abbot</td>
            <td data-title="Username">cabbot1@integrationcorp.com</td>
            <td data-title="Primary Email">cabbot@workday.net</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Justin Adams</td>
            <td data-title="Username">AdamsJu@okta.local</td>
            <td data-title="Primary Email">madhavi.manduri@okta.com</td>
            <td data-title="Status">No password</td>
          </tr>
          <tr>
            <td data-title="Person">Ben Adams</td>
            <td data-title="Username">badams@integrationcorp.com</td>
            <td data-title="Primary Email">cindy@workday.net</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Emma Aker</td>
            <td data-title="Username">AkerEm@okta.local</td>
            <td data-title="Primary Email">madhavi.manduri@okta.com</td>
            <td data-title="Status">Active</td>
          </tr>
          <tr>
            <td data-title="Person">Habib Al Manar</td>
            <td data-title="Username">hmanar@integrationcorp.com</td>
            <td data-title="Primary Email">hmanar@workday.net</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Libby Alden</td>
            <td data-title="Username">lalden@integrationcorp.com</td>
            <td data-title="Primary Email">lalden@rain.com</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Cody Alexander</td>
            <td data-title="Username">AlexaCo@okta.local</td>
            <td data-title="Primary Email">AlexaCo@okta.local</td>
            <td data-title="Status">No password</td>
          </tr>
          <tr>
            <td data-title="Person">Vijay Alexander</td>
            <td data-title="Username">vijay.alexander@okta.com</td>
            <td data-title="Primary Email">vijay.alexander@okta.com</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Monica Ang</td>
            <td data-title="Username">mang@workday-pd.local</td>
            <td data-title="Primary Email">mang@rain.com</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Madison Anna</td>
            <td data-title="Username">AnnaMa@okta.local</td>
            <td data-title="Primary Email">AnnaMa@okta.local</td>
            <td data-title="Status">No password</td>
          </tr>
          <tr>
            <td data-title="Person">Nick Arcidy</td>
            <td data-title="Username">nick.arcidy@okta.com</td>
            <td data-title="Primary Email">nick.arcidy@okta.com</td>
            <td data-title="Status">Active</td>
          </tr>
          <tr>
            <td data-title="Person">Isabel Arguello</td>
            <td data-title="Username">iarguello_change@integrationcorp.com</td>
            <td data-title="Primary Email">iarguello_primary_work@workday.net</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Abigail August</td>
            <td data-title="Username">AugusAb@okta.local</td>
            <td data-title="Primary Email">AugusAb@okta.local</td>
            <td data-title="Status">No password</td>
          </tr>
          <tr>
            <td data-title="Person">Olivia Aust</td>
            <td data-title="Username">AustOl@okta.local</td>
            <td data-title="Primary Email">AustOl@okta.local</td>
            <td data-title="Status">No password</td>
          </tr>
          <tr>
            <td data-title="Person">Owen Bailey</td>
            <td data-title="Username">BaileOw@okta.local</td>
            <td data-title="Primary Email">BaileOw@okta.local</td>
            <td data-title="Status">No password</td>
          </tr>
          <tr>
            <td data-title="Person">Austin Baker</td>
            <td data-title="Username">BakerAu@okta.local</td>
            <td data-title="Primary Email">BakerAu@okta.local</td>
            <td data-title="Status">No password</td>
          </tr>
          <tr>
            <td data-title="Person">Amanda Baker</td>
            <td data-title="Username">abaker@integrationcorp.com</td>
            <td data-title="Primary Email">abaker@rain.com</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Lijsbeth Bakker</td>
            <td data-title="Username">lbakker@integrationcorp.com</td>
            <td data-title="Primary Email">lbakker@workday.net</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Chloé Ballantyne</td>
            <td data-title="Username">cballantyne@integrationcorp.com</td>
            <td data-title="Primary Email">cballantyne@workday.net</td>
            <td data-title="Status">Password reset</td>
          </tr>
          <tr>
            <td data-title="Person">Cole Barnes</td>
            <td data-title="Username">BarneCo@okta.local</td>
            <td data-title="Primary Email">BarneCo@okta.local</td>
            <td data-title="Status">No password</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="table--figure">
    <table class="table is-table-linear">
      <caption>Directory / People</caption>
      <thead>
        <tr>
          <th scope="column">Person</th>
          <th scope="column">Username</th>
          <th scope="column">Primary Email</th>
          <th scope="column">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-title="Person">Carol Abbot</td>
          <td data-title="Username">cabbot1@integrationcorp.com</td>
          <td data-title="Primary Email">cabbot@workday.net</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Justin Adams</td>
          <td data-title="Username">AdamsJu@okta.local</td>
          <td data-title="Primary Email">madhavi.manduri@okta.com</td>
          <td data-title="Status">No password</td>
        </tr>
        <tr>
          <td data-title="Person">Ben Adams</td>
          <td data-title="Username">badams@integrationcorp.com</td>
          <td data-title="Primary Email">cindy@workday.net</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Emma Aker</td>
          <td data-title="Username">AkerEm@okta.local</td>
          <td data-title="Primary Email">madhavi.manduri@okta.com</td>
          <td data-title="Status">Active</td>
        </tr>
        <tr>
          <td data-title="Person">Habib Al Manar</td>
          <td data-title="Username">hmanar@integrationcorp.com</td>
          <td data-title="Primary Email">hmanar@workday.net</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Libby Alden</td>
          <td data-title="Username">lalden@integrationcorp.com</td>
          <td data-title="Primary Email">lalden@rain.com</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Cody Alexander</td>
          <td data-title="Username">AlexaCo@okta.local</td>
          <td data-title="Primary Email">AlexaCo@okta.local</td>
          <td data-title="Status">No password</td>
        </tr>
        <tr>
          <td data-title="Person">Vijay Alexander</td>
          <td data-title="Username">vijay.alexander@okta.com</td>
          <td data-title="Primary Email">vijay.alexander@okta.com</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Monica Ang</td>
          <td data-title="Username">mang@workday-pd.local</td>
          <td data-title="Primary Email">mang@rain.com</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Madison Anna</td>
          <td data-title="Username">AnnaMa@okta.local</td>
          <td data-title="Primary Email">AnnaMa@okta.local</td>
          <td data-title="Status">No password</td>
        </tr>
        <tr>
          <td data-title="Person">Nick Arcidy</td>
          <td data-title="Username">nick.arcidy@okta.com</td>
          <td data-title="Primary Email">nick.arcidy@okta.com</td>
          <td data-title="Status">Active</td>
        </tr>
        <tr>
          <td data-title="Person">Isabel Arguello</td>
          <td data-title="Username">iarguello_change@integrationcorp.com</td>
          <td data-title="Primary Email">iarguello_primary_work@workday.net</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Abigail August</td>
          <td data-title="Username">AugusAb@okta.local</td>
          <td data-title="Primary Email">AugusAb@okta.local</td>
          <td data-title="Status">No password</td>
        </tr>
        <tr>
          <td data-title="Person">Olivia Aust</td>
          <td data-title="Username">AustOl@okta.local</td>
          <td data-title="Primary Email">AustOl@okta.local</td>
          <td data-title="Status">No password</td>
        </tr>
        <tr>
          <td data-title="Person">Owen Bailey</td>
          <td data-title="Username">BaileOw@okta.local</td>
          <td data-title="Primary Email">BaileOw@okta.local</td>
          <td data-title="Status">No password</td>
        </tr>
        <tr>
          <td data-title="Person">Austin Baker</td>
          <td data-title="Username">BakerAu@okta.local</td>
          <td data-title="Primary Email">BakerAu@okta.local</td>
          <td data-title="Status">No password</td>
        </tr>
        <tr>
          <td data-title="Person">Amanda Baker</td>
          <td data-title="Username">abaker@integrationcorp.com</td>
          <td data-title="Primary Email">abaker@rain.com</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Lijsbeth Bakker</td>
          <td data-title="Username">lbakker@integrationcorp.com</td>
          <td data-title="Primary Email">lbakker@workday.net</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Chloé Ballantyne</td>
          <td data-title="Username">cballantyne@integrationcorp.com</td>
          <td data-title="Primary Email">cballantyne@workday.net</td>
          <td data-title="Status">Password reset</td>
        </tr>
        <tr>
          <td data-title="Person">Cole Barnes</td>
          <td data-title="Username">BarneCo@okta.local</td>
          <td data-title="Primary Email">BarneCo@okta.local</td>
          <td data-title="Status">No password</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Accessibility

### Captions

Providing a <code>caption</code> will help those utilizing assistive technologies understand the context and breadth of your data set before the data is accessed.

More generally, a consice, descriptive <code>caption</code> will provide all users with direct context for your data - something that may be missed if relying on page headings or surrounding body copy.

### Scoping

Utilize the <code>scope</code> attribute to indicate whether your headings apply to their associated column or row.

A note on the current HTML5 spec:

<blockquote>
  <p>
    Although the scope attribute is obsolete in HTML5, many screen readers rely on the attribute to programmatically replicate the visual associations a person not using a screen reader may be able to infer about a cell's position. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#Scoping_rows_and_columns">MDN</a></cite>
  </p>
</blockquote>

### Complicated Tables

While the browser support is strong and they are valid attributes, try to refrain from using complicated table layouts that rely on <code>colspan</code> or <code>rowspan</code>.

<blockquote>
  <p>Assistive technology such as screen readers may have difficulty parsing tables that are so complex that header cells can’t be associated in a strictly horizontal or vertical way. This is typically indicated by the presence of the colspan and rowspan attributes.</p>

<p>Ideally, consider alternate ways to present the table's content, including breaking it apart into a collection of smaller, related tables that don't have to rely on using the colspan and rowspan attributes. In addition to helping people who use assistive technology understand the table's content, this may also benefit people with cognitive concerns who may have difficulty understanding the associations the table layout is describing. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#Complicated_tables">MDN</a></cite></p>
</blockquote>

This same advice applies to nested tables or hidden rows as well. While convenient for designers and useful for some users, they introduce accessibility problems that may make your data inaccessible to some users.

## A Data-Heavy Example

Below is an actual data set from a QA SysLog. The slight underline represents a possible non-link solution to in-table filters - an interaction point we have not addressed yet.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="table--figure">
      <table class="table">
        <caption>SysLog Events</caption>
        <thead>
          <tr>
            <th scope="column" class="is-table-date">Time</th>
            <th scope="column">Actor</th>
            <th scope="column">Event Info</th>
            <th scope="column">Targets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="is-table-date">
              Sep 11 22:48:22
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 22:48:21
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 22:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 22:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user:</button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 22:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 22:48:16
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 22:48:16
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 19:48:22
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 19:48:19
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 19:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 19:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 19:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 19:48:17
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 19:48:17
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:57:52
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User accessing Okta admin app</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(AppUser)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:57:44
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">Evaluating of sign-on policy</button>
              <button class="table--cell-filter table--cell-status">allow</button>
            </td>
            <td>
              <ul class="table--cell-list">
                <li>
                  <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
                </li>
                <li>
                  <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:57:43
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User login to Okta</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:48:23
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:48:18
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:48:17
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:48:17
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
              <button class="table--cell-filter table--cell-status">failure</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 16:48:17
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:47:17
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User accessing Okta admin app</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(AppUser)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:47:15
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">Evaluating of sign-on policy</button>
              <button class="table--cell-filter table--cell-status">allow</button>
            </td>
            <td>
              <ul class="table--cell-list">
                <li>
                  <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
                </li>
                <li>
                  <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:47:15
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User login to Okta</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:47:15
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">User reset password for Okta (by admin)</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:47:15
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User update password for Okta</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:44:19
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">User reset password for Okta (by admin)</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:44:19
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Send self-service password reset email</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:42:27
            </td>
            <td>
              <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User accessing Okta admin app</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(AppUser)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:42:26
            </td>
            <td>
              <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">Evaluating of sign-on policy</button>
              <button class="table--cell-filter table--cell-status">allow</button>
            </td>
            <td>
              <ul class="table--cell-list">
                <li>
                  <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
                </li>
                <li>
                  <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:42:26
            </td>
            <td>
              <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User login to Okta</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:36:24
            </td>
            <td>
              <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User accessing Okta admin app</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(AppUser)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:36:23
            </td>
            <td>
              <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">Evaluating of sign-on policy</button>
              <button class="table--cell-filter table--cell-status">allow</button>
            </td>
            <td>
              <ul class="table--cell-list">
                <li>
                  <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
                </li>
                <li>
                  <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:36:23
            </td>
            <td>
              <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User login to Okta</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 14:36:10
            </td>
            <td>
              <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
            </td>
            <td>
              <button class="table--cell-filter">User login to Okta</button>
              <button class="table--cell-filter table--cell-status">failure: INVALID CREDENTIALS</button>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 13:48:26
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
          <tr>
            <td class="is-table-date">
              Sep 11 13:48:23
            </td>
            <td>
              <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
            </td>
            <td>
              <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
              <button class="table--cell-filter table--cell-status">success</button>
            </td>
            <td>
              <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
            </td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="table--figure">
    <table class="table">
      <caption>SysLog Events</caption>
      <thead>
        <tr>
          <th scope="column" class="is-table-date">Time</th>
          <th scope="column">Actor</th>
          <th scope="column">Event Info</th>
          <th scope="column">Targets</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="is-table-date">
            Sep 11 22:48:22
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 22:48:21
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 22:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 22:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user:</button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 22:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 22:48:16
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 22:48:16
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 19:48:22
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 19:48:19
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 19:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 19:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 19:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 19:48:17
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 19:48:17
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:57:52
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User accessing Okta admin app</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(AppUser)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:57:44
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">Evaluating of sign-on policy</button>
            <button class="table--cell-filter table--cell-status">allow</button>
          </td>
          <td>
            <ul class="table--cell-list">
              <li>
                <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
              </li>
              <li>
                <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:57:43
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User login to Okta</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:48:23
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:48:18
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:48:17
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Unable to read Office 365 directory sync for the company, received error: Could not validate your Office 365 credentials, received error: Invalid Credentials., user: </button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:48:17
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Could not validate your Office 365 credentials, received error: Invalid Credentials.</button>
            <button class="table--cell-filter table--cell-status">failure</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 16:48:17
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:47:17
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User accessing Okta admin app</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(AppUser)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:47:15
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">Evaluating of sign-on policy</button>
            <button class="table--cell-filter table--cell-status">allow</button>
          </td>
          <td>
            <ul class="table--cell-list">
              <li>
                <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
              </li>
              <li>
                <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:47:15
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User login to Okta</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:47:15
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">User reset password for Okta (by admin)</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:47:15
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User update password for Okta</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:44:19
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">User reset password for Okta (by admin)</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:44:19
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Send self-service password reset email</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Edbury Enegren</button> <button class="table--cell-filter">(User)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:42:27
          </td>
          <td>
            <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User accessing Okta admin app</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(AppUser)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:42:26
          </td>
          <td>
            <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">Evaluating of sign-on policy</button>
            <button class="table--cell-filter table--cell-status">allow</button>
          </td>
          <td>
            <ul class="table--cell-list">
              <li>
                <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
              </li>
              <li>
                <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:42:26
          </td>
          <td>
            <button class="table--cell-filter">Taylor Laubach</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User login to Okta</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:36:24
          </td>
          <td>
            <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User accessing Okta admin app</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(AppUser)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:36:23
          </td>
          <td>
            <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">Evaluating of sign-on policy</button>
            <button class="table--cell-filter table--cell-status">allow</button>
          </td>
          <td>
            <ul class="table--cell-list">
              <li>
                <button class="table--cell-filter">Default Policy</button> <button class="table--cell-filter">(PolicyEntity)</button>
              </li>
              <li>
                <button class="table--cell-filter">Default Rule</button> <button class="table--cell-filter">(PolicyRule)</button>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:36:23
          </td>
          <td>
            <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User login to Okta</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 14:36:10
          </td>
          <td>
            <button class="table--cell-filter">Johnatan Uribe</button> <button class="table--cell-filter">(User)</button>
          </td>
          <td>
            <button class="table--cell-filter">User login to Okta</button>
            <button class="table--cell-filter table--cell-status">failure: INVALID CREDENTIALS</button>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 13:48:26
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
        <tr>
          <td class="is-table-date">
            Sep 11 13:48:23
          </td>
          <td>
            <button class="table--cell-filter">Okta System</button> <button class="table--cell-filter">(SystemPrincipal)</button>
          </td>
          <td>
            <button class="table--cell-filter">Heartbeat sent to Microsoft Azure Active Directory.</button>
            <button class="table--cell-filter table--cell-status">success</button>
          </td>
          <td>
            <button class="table--cell-filter">Microsoft Office 365</button> <button class="table--cell-filter">(AppInstance)</button>
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Further Reading

<ul>
  <li>
    <a href="https://alistapart.com/article/web-typography-tables">Web Typography: Designing Tables to be Read, Not Looked At</a> - <cite>Richard Rutter (2017)</cite>
  </li>
  <li>
    <a href="https://webaim.org/techniques/tables/data">Creating Accessible Tables</a> - <cite>WebAIM (2017)</cite>
  </li>
  <li>
    <a href="https://a11yproject.com/posts/accessible-data-tables/">How-to: Create accessible data tables</a> - <cite>The A11Y Project (2016)</cite>
  </li>
</ul>
