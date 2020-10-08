---
template: component
title: Tag
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

<span class="fpo">Descriptive content around **tag anatomy** should go here.</span>

</Description>

<Anatomy img="/images/fpo.svg" />

## Usage

<Description>

As stated above, Tags are used to describe an entity or object, not represent the object itself. One or many Tags may be applied to an entity or object.

For example, "Cat" may be an individual "Animal" object that has the Tags "Small", "Fuzzy", and "Quadruped".

</Description>

<Example>
  <ul class="ods-tag--list">
    <li class="ods-tag">Gluten free</li>
    <li class="ods-tag">Vegan</li>
    <li class="ods-tag">Healthyish</li>
  </ul>
</Example>

:::

::: slot html-scss
## HTML & CSS
:::
