---
template: component
id: component-table
title: Table
description: Tables provide structure for displaying sets of data across rows and columns.
lead: Tables provide structure for displaying sets of data across rows and columns. They support multiple content types and some internal actions.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_table.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/Utu5kj6tW2JK0emuWsQfFK/Table?node-id=25%3A2
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-table.svg" />

## Behavior

### Sorting tables

<Description>

Sorting Table columns is a common interaction for users. Following standard conventions will ensure a consistent experience:

Any sortable column should display the appropriate icon for its state: ascending, descending, or unsorted.

When an unsorted heading is clicked, the column should sort in ascending (A to Z) order.

When an ascending heading is clicked, it should swap to descending (Z to A) order.

Finally, when a descending heading is clicked, it should swap to unsorted.

When any column becomes sorted, the previously active column should return to an unsorted state.

</Description>

<Visual>
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">
            <button class="ods-table--sort is-ods-table-unsorted">Planet</button>
          </th>
          <th scope="column" class="is-ods-table-num">
            <button class="ods-table--sort is-ods-table-desc">Radius (km)</button>
          </th>
          <th scope="column">
            <button class="ods-table--sort is-ods-table-unsorted">Type</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jupiter</td>
          <td class="is-ods-table-num">69,911</td>
          <td>Gas giant</td>
        </tr>
        <tr>
          <td>Earth</td>
          <td class="is-ods-table-num">6,371</td>
          <td>Terrestrial</td>
        </tr>
        <tr>
          <td>Mercury</td>
          <td class="is-ods-table-num">1,737</td>
          <td>Terrestrial</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

## States

### Empty tables

<Description>

If no data is returned - whether due to filtering or an empty data set - be sure to provide a null state for your users. If you can detect why no data was returned, make that clear in the tfoot.
The data-null attribute will ensure the table styling is adjusted.

</Description>

<Visual>
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table" data-null>
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Type</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            Aw beans. This set of filters didn't return any results.
          </td>
        </tr>
      </tfoot>
    </table>
  </figure>
</Visual>

## Usage

<Description>

Note that tables should not have a fixed width, nor should their columns. Browsers divide space based on content and forced white-space will hurt readability. To ensure rogue strings don't cause visual wonk, we limit cells widths to ~45 characters.

</Description>

### Row headings

<Description>

If your data set has keys on two axes, we also support setting the left-most column as a row heading. This is helpful when you expect the user tuseze a known value for data lookup (e.g. "Which missions went to Mars?").

Be sure to identify your row heading column as well. That is, don't leave a blank cell in the upper left. Our secondary headings need context too!

</Description>

<Visual>
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Type</th>
          <th scope="column">Descriptor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Jupiter</th>
          <td class="is-ods-table-num">69,911</td>
          <td>Gas giant</td>
          <td>Jovian</td>
        </tr>
        <tr>
          <th scope="row">Earth</th>
          <td class="is-ods-table-num">6,371</td>
          <td>Terrestrial</td>
          <td>Terran</td>
        </tr>
        <tr>
          <th scope="row">Mercury</th>
          <td class="is-ods-table-num">1,737</td>
          <td>Terrestrial</td>
          <td>Mercurial</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

### Row groupings

<Description>

If you need to group rows by a shared data point, we also support using rowspan to do so. Otherwise, follow the same implementation guidelines as above.

Note: spanning multiple rows or columns may cause issues for assistive technologies.

</Description>

<Visual>
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about some of the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">Type</th>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Descriptor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowspan="2">Gas giants</th>
          <td>Jupiter</td>
          <td class="is-ods-table-num">69,991</td>
          <td>Jovian</td>
        </tr>
        <tr>
          <td>Saturn</td>
          <td class="is-ods-table-num">58,232</td>
          <td>Saturnian</td>
        </tr>
        <tr>
          <th scope="row" rowspan="3">Terrestrial</th>
          <td>Earth</td>
          <td class="is-ods-table-num">6,371</td>
          <td>Terran</td>
        </tr>
        <tr>
          <td>Venus</td>
          <td class="is-ods-table-num">6,052</td>
          <td>Venusian</td>
        </tr>
        <tr>
          <td>Mars</td>
          <td class="is-ods-table-num">3,389</td>
          <td>Martian</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

## Content guidelines

<Description>

Titles & captions should describe the table the user is viewing. They are not abstractions.

Reserve the left-hand column for your most important data. Cascade lower priority data to the right.

Don't use long column headings. Try to keep them as short as or shorter than your column content.

Don’t create complex interactions that change the state of the row. Tables are primarily for reviewing data, not interacting with it.

</Description>

### Supported content types

<Description>

The basic Table cell styling is based on what is most legible and scannable for a normal string of text. However, different data types may need alternate styling.

Currently, we provide extra support for numerical data, dates, Buttons, Statuses, and Checkboxes.

</Description>

<Visual layout="wide">
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            <input class="ods-checkbox is-ods-checkbox-indeterminate" type="checkbox" name="overview-checkbox-all[all]" id="overview-checkbox-all" value="check-all" checked>
            <label class="ods-checkbox--label" for="overview-checkbox-all">
              <span class="u-visually-hidden">Select all rows</span>
            </label>
          </th>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Type</th>
          <th scope="column" class="is-ods-table-num">Gravity (g)</th>
          <th scope="column" class="is-ods-table-date">Perihelion date</th>
          <th scope="column">Base status</th>
          <th scope="column">Travel</th>
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
          <td>Jupiter</td>
          <td class="is-ods-table-num"><span class="docskit-marker" data-marker-count="2">69,911</span></td>
          <td>Gas giant</td>
          <td class="is-ods-table-num">27.94</td>
          <td class="is-ods-table-date">January 21, 2023</td>
          <td>
            <dl class="ods-status is-ods-status-caution is-ods-status-label-hidden">
              <dt class="ods-status--label">
                Base status
              </dt>
              <dd class="ods-status--value">
                <span class="docskit-marker" data-marker-count="3">Storm approaching</span>
              </dd>
            </dl>
          </td>
          <td>
            <button class="ods-button is-ods-button-secondary">Plot course</button>
          </td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <span class="docskit-marker" data-marker-count="1">
              <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
              <label class="ods-checkbox--label" for="checkbox-1">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </span>
          </td>
          <td>Earth</td>
          <td class="is-ods-table-num">6,371</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-num">1.00</td>
          <td class="is-ods-table-date"><span class="docskit-marker" data-marker-count="4">January 2, 2021</span></td>
          <td>
            <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
              <dt class="ods-status--label">
                Base status
              </dt>
              <dd class="ods-status--value">
                Operational
              </dd>
            </dl>
          </td>
          <td>
            <button class="ods-button is-ods-button-secondary">Plot course</button>
          </td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2" checked>
            <label class="ods-checkbox--label" for="checkbox-2">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Mercury</td>
          <td class="is-ods-table-num">1,737</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-num">0.37</td>
          <td class="is-ods-table-date"><span class="docskit-marker" data-marker-count="5">&ndash;</span></td>
          <td>
            <dl class="ods-status is-ods-status-neutral is-ods-status-label-hidden">
              <dt class="ods-status--label">
                Base status
              </dt>
              <dd class="ods-status--value">
                Planned
              </dd>
            </dl>
          </td>
          <td>
            <span class="docskit-marker" data-marker-count="6"><button class="ods-button is-ods-button-secondary">Plot course</button></span>
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

<Description tag="ol" variant="counter">
<li class="desc-counter--item">

<h4 class="desc-counter--title">Checkboxes</h4>

Include checkboxes in the first column. The heading checkbox should check/uncheck all rows when clicked.

If mixed, the heading checkbox should be set to Indeterminate.

</li>
<li class="desc-counter--item">

<h4 class="desc-counter--title">Numerical data</h4>

We use tabular numbers and right-align figures for quick scanning.

Leave off any units. Instead, specify them in the column's header.

</li>
<li class="desc-counter--item">

<h4 class="desc-counter--title">Statuses</h4>

No extra styling is required when adding Statuses to your table. Ensure their labels are hidden and their column has an appropriate heading.

</li>
<li class="desc-counter--item">

<h4 class="desc-counter--title">Dates</h4>

To maintain ease of reading, dates should not be line-broken. White-space is preserved throughout the column. This applies to all date formats.

</li>
<li class="desc-counter--item">

<h4 class="desc-counter--title">Empty cells</h4>

If a cell is empty, use an en dash (–) to indicate this.

</li>
<li class="desc-counter--item">

<h4 class="desc-counter--title">Buttons</h4>

No extra styling is required when adding Buttons to a table. They will resize to the "Small" variant and align to the baseline of other type in the row.

</li>
</Description>

## Accessibility

### Titles and captions

<Description>

Each Table should have both a title and a caption.

The title is the visible heading for your table. A concise, descriptive title will provide users with a direct context for your data. The needed context may be missing if you rely on page headings or surrounding body copy.

Captions are visually hidden. Providing a caption will give users of assistive technologies context for the table before it is accessed.

</Description>

### Complicated tables

<Description>

Try to refrain from using complicated table layouts that rely on colspan or rowspan.

This same advice applies to nested tables or hidden rows as well. They can introduce problems that make your table inaccessible for some users.

</Description>

:::

::: slot html-scss

## Basic usage

<figure class="docs-example">
  <div class="docs-example--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small planets
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest planets.</caption>
        <thead>
          <tr>
            <th scope="column">Planet</th>
            <th scope="column" class="is-ods-table-num">Radius (km)</th>
            <th scope="column">Type</th>
            <th scope="column" class="is-ods-table-date">Perihelion date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jupiter</td>
            <td class="is-ods-table-num">69,911</td>
            <td>Gas giant</td>
            <td class="is-ods-table-date">January 21, 2023</td>
          </tr>
          <tr>
            <td>Earth</td>
            <td class="is-ods-table-num">6,371</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">January 2, 2021</td>
          </tr>
          <tr>
            <td>Mercury</td>
            <td class="is-ods-table-num">1,737</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">&ndash;</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Type</th>
          <th scope="column" class="is-ods-table-date">Perihelion date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jupiter</td>
          <td class="is-ods-table-num">69,911</td>
          <td>Gas giant</td>
          <td class="is-ods-table-date">January 21, 2023</td>
        </tr>
        <tr>
          <td>Earth</td>
          <td class="is-ods-table-num">6,371</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">January 2, 2021</td>
        </tr>
        <tr>
          <td>Mercury</td>
          <td class="is-ods-table-num">1,737</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">&ndash;</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Row headings

<figure class="docs-example">
  <div class="docs-example--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small planets
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest planets.</caption>
        <thead>
          <tr>
            <th scope="column">Planet</th>
            <th scope="column" class="is-ods-table-num">Radius (km)</th>
            <th scope="column">Type</th>
            <th scope="column" class="is-ods-table-date">Perihelion date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Jupiter</th>
            <td class="is-ods-table-num">69,911</td>
            <td>Gas giant</td>
            <td class="is-ods-table-date">January 21, 2023</td>
          </tr>
          <tr>
            <th scope="row">Earth</th>
            <td class="is-ods-table-num">6,371</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">January 2, 2021</td>
          </tr>
          <tr>
            <th scope="row">Mercury</th>
            <td class="is-ods-table-num">1,737</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">&ndash;</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Type</th>
          <th scope="column" class="is-ods-table-date">Perihelion date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Jupiter</th>
          <td class="is-ods-table-num">69,911</td>
          <td>Gas giant</td>
          <td class="is-ods-table-date">January 21, 2023</td>
        </tr>
        <tr>
          <th scope="row">Earth</th>
          <td class="is-ods-table-num">6,371</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">January 2, 2021</td>
        </tr>
        <tr>
          <th scope="row">Mercury</th>
          <td class="is-ods-table-num">1,737</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">&ndash;</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Row grouping

<figure class="docs-example">
  <div class="docs-example--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small planets
      </figcaption>
      <table class="ods-table">
        <caption>Information about some of the largest and smallest planets.</caption>
        <thead>
          <tr>
            <th scope="column">Type</th>
            <th scope="column">Planet</th>
            <th scope="column" class="is-ods-table-num">Radius (km)</th>
            <th scope="column">Descriptor</th>
            <th scope="column" class="is-ods-table-date">Perihelion date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" rowspan="2">Gas giants</th>
            <td>Jupiter</td>
            <td class="is-ods-table-num">69,991</td>
            <td>Jovian</td>
            <td class="is-ods-table-date">January 21, 2023</td>
          </tr>
          <tr>
            <td>Saturn</td>
            <td class="is-ods-table-num">58,232</td>
            <td>Saturnian</td>
            <td class="is-ods-table-date">November 29, 2032</td>
          </tr>
          <tr>
            <th scope="row" rowspan="3">Terrestrial</th>
            <td>Earth</td>
            <td class="is-ods-table-num">6,371</td>
            <td>Terran</td>
            <td class="is-ods-table-date">January 2, 2021</td>
          </tr>
          <tr>
            <td>Venus</td>
            <td class="is-ods-table-num">6,052</td>
            <td>Venusian</td>
            <td class="is-ods-table-date">&ndash;</td>
          </tr>
          <tr>
            <td>Mars</td>
            <td class="is-ods-table-num">3,389</td>
            <td>Martian</td>
            <td class="is-ods-table-date">August 3, 2020</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about some of the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">Type</th>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Descriptor</th>
          <th scope="column" class="is-ods-table-date">Perihelion date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowspan="2">Gas giants</th>
          <td>Jupiter</td>
          <td class="is-ods-table-num">69,991</td>
          <td>Jovian</td>
          <td class="is-ods-table-date">January 21, 2023</td>
        </tr>
        <tr>
          <td>Saturn</td>
          <td class="is-ods-table-num">58,232</td>
          <td>Saturnian</td>
          <td class="is-ods-table-date">November 29, 2032</td>
        </tr>
        <tr>
          <th scope="row" rowspan="3">Terrestrial</th>
          <td>Earth</td>
          <td class="is-ods-table-num">6,371</td>
          <td>Terran</td>
          <td class="is-ods-table-date">January 2, 2021</td>
        </tr>
        <tr>
          <td>Venus</td>
          <td class="is-ods-table-num">6,052</td>
          <td>Venusian</td>
          <td class="is-ods-table-date">&ndash;</td>
        </tr>
        <tr>
          <td>Mars</td>
          <td class="is-ods-table-num">3,389</td>
          <td>Martian</td>
          <td class="is-ods-table-date">August 3, 2020</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Empty tables

<figure class="docs-example">
  <div class="docs-example--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small planets
      </figcaption>
      <table class="ods-table" data-null>
        <caption>Information about the largest and smallest planets.</caption>
        <thead>
          <tr>
            <th scope="column">Planet</th>
            <th scope="column" class="is-ods-table-num">Radius (km)</th>
            <th scope="column">Type</th>
            <th scope="column" class="is-ods-table-date">Perihelion date</th>
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
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table" data-null>
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Type</th>
          <th scope="column" class="is-ods-table-date">Perihelion date</th>
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

## Checkboxes

<figure class="docs-example">
  <div class="docs-example--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small planets
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest planets.</caption>
        <thead>
          <tr>
            <th scope="column" class="is-ods-table-checkbox">
              <input class="ods-checkbox is-ods-checkbox-indeterminate" type="checkbox" name="row[all]" id="checkbox-all" value="check-all" checked>
              <label class="ods-checkbox--label" for="checkbox-all">
                <span class="u-visually-hidden">Select all rows</span>
              </label>
            </th>
            <th scope="column">Planet</th>
            <th scope="column" class="is-ods-table-num">Radius (km)</th>
            <th scope="column">Type</th>
            <th scope="column" class="is-ods-table-date">Perihelion date</th>
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
            <td>Jupiter</td>
            <td class="is-ods-table-num">69,911</td>
            <td>Gas giant</td>
            <td class="is-ods-table-date">January 21, 2023</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
              <label class="ods-checkbox--label" for="checkbox-1">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Earth</td>
            <td class="is-ods-table-num">6,371</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">January 2, 2021</td>
          </tr>
          <tr>
            <td class="is-ods-table-checkbox">
              <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2" checked>
              <label class="ods-checkbox--label" for="checkbox-2">
                <span class="u-visually-hidden">Select this row</span>
              </label>
            </td>
            <td>Mercury</td>
            <td class="is-ods-table-num">1,737</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">&ndash;</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            <input class="ods-checkbox is-ods-checkbox-indeterminate" type="checkbox" name="row[all]" id="checkbox-all" value="check-all" checked>
            <label class="ods-checkbox--label" for="checkbox-all">
              <span class="u-visually-hidden">Select all rows</span>
            </label>
          </th>
          <th scope="column">Planet</th>
          <th scope="column" class="is-ods-table-num">Radius (km)</th>
          <th scope="column">Type</th>
          <th scope="column" class="is-ods-table-date">Perihelion date</th>
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
          <td>Jupiter</td>
          <td class="is-ods-table-num">69,911</td>
          <td>Gas giant</td>
          <td class="is-ods-table-date">January 21, 2023</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[1]" id="checkbox-1" value="check-1">
            <label class="ods-checkbox--label" for="checkbox-1">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Earth</td>
          <td class="is-ods-table-num">6,371</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">January 2, 2021</td>
        </tr>
        <tr>
          <td class="is-ods-table-checkbox">
            <input class="ods-checkbox" type="checkbox" name="row[2]" id="checkbox-2" value="check-2" checked>
            <label class="ods-checkbox--label" for="checkbox-2">
              <span class="u-visually-hidden">Select this row</span>
            </label>
          </td>
          <td>Mercury</td>
          <td class="is-ods-table-num">1,737</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">&ndash;</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

## Sorting Table

<figure class="docs-example">
  <div class="docs-example--rendered">
    <figure class="ods-table--figure">
      <figcaption class="ods-table--figcaption">
        Big and small planets
      </figcaption>
      <table class="ods-table">
        <caption>Information about the largest and smallest planets.</caption>
        <thead>
          <tr>
            <th scope="column">
              <button class="ods-table--sort is-ods-table-unsorted">Planet</button>
            </th>
            <th scope="column" class="is-ods-table-num">
              <button class="ods-table--sort is-ods-table-desc">Radius (km)</button>
            </th>
            <th scope="column">
              <button class="ods-table--sort is-ods-table-unsorted">Type</button>
            </th>
            <th scope="column" class="is-ods-table-num">
              <button class="ods-table--sort is-ods-table-unsorted">Perihelion date</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jupiter</td>
            <td class="is-ods-table-num">69,911</td>
            <td>Gas giant</td>
            <td class="is-ods-table-date">January 21, 2023</td>
          </tr>
          <tr>
            <td>Earth</td>
            <td class="is-ods-table-num">6,371</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">January 2, 2021</td>
          </tr>
          <tr>
            <td>Mercury</td>
            <td class="is-ods-table-num">1,737</td>
            <td>Terrestrial</td>
            <td class="is-ods-table-date">&ndash;</td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>

  ```html
  <figure class="ods-table--figure">
    <figcaption class="ods-table--figcaption">
      Big and small planets
    </figcaption>
    <table class="ods-table">
      <caption>Information about the largest and smallest planets.</caption>
      <thead>
        <tr>
          <th scope="column">
            <button class="ods-table--sort is-ods-table-unsorted">Planet</button>
          </th>
          <th scope="column" class="is-ods-table-num">
            <button class="ods-table--sort is-ods-table-desc">Radius (km)</button>
          </th>
          <th scope="column">
            <button class="ods-table--sort is-ods-table-unsorted">Type</button>
          </th>
          <th scope="column" class="is-ods-table-num">
            <button class="ods-table--sort is-ods-table-unsorted">Perihelion date</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jupiter</td>
          <td class="is-ods-table-num">69,911</td>
          <td>Gas giant</td>
          <td class="is-ods-table-date">January 21, 2023</td>
        </tr>
        <tr>
          <td>Earth</td>
          <td class="is-ods-table-num">6,371</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">January 2, 2021</td>
        </tr>
        <tr>
          <td>Mercury</td>
          <td class="is-ods-table-num">1,737</td>
          <td>Terrestrial</td>
          <td class="is-ods-table-date">&ndash;</td>
        </tr>
      </tbody>
    </table>
  </figure>
  ```
</figure>

:::
