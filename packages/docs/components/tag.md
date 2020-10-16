---
template: component
id: tag
title: Tag
description: TODO
lead: Tags are used to help describe and differentiate an entity or object. Think of them as “adjectives” in your UI toolbox that make navigating and parsing content easier.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/tag.md
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

<span class="is-fpo">Descriptive content around **tag anatomy** should go here.</span>

</Description>

<Anatomy img="/images/anatomy-tag.svg" />

## Usage

<Description>

As stated above, Tags are used to describe an entity or object, not represent the object itself. One or many Tags may be applied to an entity or object.

For example, "Cat" may be an individual "Animal" object that has the Tags "Small", "Fuzzy", and "Quadruped".

</Description>

<Visual>
  <ul class="ods-tag--list">
    <li class="ods-tag">Gluten free</li>
    <li class="ods-tag">Vegan</li>
    <li class="ods-tag">Healthyish</li>
  </ul>
</Visual>

## Guidelines

<Description>

<span class="is-fpo">Using tags is simple. Look below for guidelines, best practices, and use cases.</span>

</Description>

### Describe an object, don’t be the object

<Description>

As stated above, Tags are used to describe an entity or object, not physically represent the object.

</Description>

<Visual variant="positive">
  <figure class="ods-table--figure docskit-visual--wide">
    <table class="ods-table docskit-visual--wide">
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            Item
          </th>
          <th scope="column" class="is-ods-table-num">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Glazed 
            <ul class="ods-tag--list">
                <li class="ods-tag">Gluten free</li>
            </ul>
          </td>
          <td class="is-ods-table-num">$0.75</td>
        </tr> 
        <tr>
          <td>
            Chocolate glazed 
            <ul class="ods-tag--list">
                <li class="ods-tag">Vegan</li>
            </ul>
          </td>
          <td class="is-ods-table-num">$0.90</td>
        </tr> 
        <tr>
          <td>
            Homer sprinkle 
            <ul class="ods-tag--list">
              <li class="ods-tag">Healthyish</li>
            </ul>
          </td>
          <td class="is-ods-table-num">$3.99</td>
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
            Item
          </th>
          <th scope="column" class="is-ods-table-num">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <ul class="ods-tag--list">
              <li class="ods-tag">Glazed</li>
            </ul>
          </td>
          <td class="is-ods-table-num">$0.75</td>
        </tr> 
        <tr>
          <td>
            <ul class="ods-tag--list">
              <li class="ods-tag">Chocolate glazed</li>
            </ul>
          </td>
          <td class="is-ods-table-num">$0.90</td>
        </tr> 
        <tr>
          <td>
            <ul class="ods-tag--list">
              <li class="ods-tag">Homer sprinkle</li>
            </ul>
          </td>
          <td class="is-ods-table-num">$3.99</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

### One or more

<Description class="is-fpo">

<span class="is-fpo is-fpo-negative">The following is figma guidance and needs to be re-written</span>

If you need more than one Tag in your design, you can option drag the one you have for a duplicate (like anything else).

Take a look at the anatomy section on the overview page. Keep in mind that they have a Small Spacing unit (6px) in between them.

</Description>

<Visual variant="positive">
  <figure class="ods-table--figure docskit-visual--wide">
    <table class="ods-table docskit-visual--wide">
      <thead>
        <tr>
          <th scope="column" class="is-ods-table-checkbox">
            Item
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Glazed
            <ul class="ods-tag--list">
              <li class="ods-tag">Gluten free</li>
              <li class="ods-tag">Healthyish</li>
            </ul>
          </td>
        </tr> 
        <tr>
          <td>
            Chocolate glazed
            <ul class="ods-tag--list">
              <li class="ods-tag">Gluten free</li>
              <li class="ods-tag">Organic</li>
            </ul>
          </td>
        </tr> 
        <tr>
          <td>
            Homer sprinkle
            <ul class="ods-tag--list">
              <li class="ods-tag">Organic</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
</Visual>

:::

::: slot html-scss
## HTML & CSS
:::
