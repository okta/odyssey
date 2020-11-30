---
template: component
id: component-tag
title: Tag
description: Tags are used to help describe and differentiate an entity or object.
lead: Use Tags to help describe and differentiate an entity or object. Think of them as “adjectives” in your UI toolbox that make navigating  and parsing content easier.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_tag.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/AQcK0mLE4JHBm2Vci8ulAF/Tag?node-id=25%3A2
---

::: slot overview

## Anatomy

<Description>

Tag UI is simple. It consists of typography and spacing within a neutral container. Color, weight, and spacing help distinguish it from Button.

</Description>

<Anatomy img="images/anatomy-tag.svg" />

## Usage

<Description>

Tags are a great way for users to contextualize and understand the content they are looking at. They’re also helpful at organizing content across multiple experiences.

As stated above, Tags are for describing an entity or object, not representing one. You may associate one or many tags with an entity.

For example, "Shuttle" may be an individual type of spaceship that has the Tags "Winged", "Reusable", and "NASA".

</Description>

<Visual>
  <ul class="ods-tag--list">
    <li class="ods-tag">Winged</li>
    <li class="ods-tag">Reusable</li>
    <li class="ods-tag">NASA</li>
  </ul>
</Visual>

### Describe an object, don’t be the object

<Description>

Use Tags as descriptors paired with a particular object. These descriptors may be adjectives, categories, or other associations including proper nouns.

</Description>

<Visual variant="positive">
  <figure class="ods-table--figure docskit-visual--wide">
    <table class="ods-table docskit-visual--wide">
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            Operational Spacecraft
          </th>
          <th scope="column" class="is-ods-table-num">
            Constructed
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Soyuz
            <ul class="ods-tag--list">
                <li class="ods-tag">USSR</li>
                <li class="ods-tag">3-person</li>
            </ul>
          </td>
          <td class="is-ods-table-num">1966</td>
        </tr>
        <tr>
          <td>
            Saturn V
            <ul class="ods-tag--list">
                <li class="ods-tag">USA</li>
                <li class="ods-tag">3-person</li>
            </ul>
          </td>
          <td class="is-ods-table-num">1967</td>
        </tr>
        <tr>
          <td>
            CZ-2F
            <ul class="ods-tag--list">
                <li class="ods-tag">CN</li>
                <li class="ods-tag">3-person</li>
            </ul>
          </td>
          <td class="is-ods-table-num">1999</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

<Visual variant="negative">
  <figure class="ods-table--figure docskit-visual--wide">
    <table class="ods-table docskit-visual--wide">
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            Agency
          </th>
          <th scope="column" class="is-ods-table-num">
            Formed
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <ul class="ods-tag--list">
              <li class="ods-tag">NASA</li>
            </ul>
          </td>
          <td class="is-ods-table-num">
            1958
          </td>
        </tr>
        <tr>
          <td>
            <ul class="ods-tag--list">
              <li class="ods-tag">Roscosmos</li>
            </ul>
          </td>
          <td class="is-ods-table-num">
            1992
          </td>
        </tr>
        <tr>
          <td>
            <ul class="ods-tag--list">
              <li class="ods-tag">CNSA</li>
            </ul>
          </td>
          <td class="is-ods-table-num">
            1993
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

:::

::: slot html-scss

## Basic example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <ul class="ods-tag--list">
      <li class="ods-tag">Tag 1</li>
      <li class="ods-tag">Tag 2</li>
      <li class="ods-tag">Tag 3</li>
    </ul>
  </div>

  ```html
  <ul class="ods-tag--list">
    <li class="ods-tag">Tag 1</li>
    <li class="ods-tag">Tag 2</li>
    <li class="ods-tag">Tag 3</li>
  </ul>
  ```
</figure>

:::
