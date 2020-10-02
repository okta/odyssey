---
template: component
title: Tag
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/tag.md
---

::: slot overview
## Overview
:::

::: slot html-scss
## HTML & CSS
:::

::: slot nimatron-all

# Tag

Tags are used to help describe and differentiate an entity or object. Think of them as “adjectives” in your UI toolbox that make navigating and parsing content easier.

## Usage

As stated above, Tags are used to describe an entity or object, not represent the object itself. One or many Tags may be applied to an entity or object.

For example, "Cat" may be an individual "Animal" object that has the Tags "Small", "Fuzzy", and "Quadruped".

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <ul class="ods-tag--list"><li class="ods-tag">Small</li><li class="ods-tag">Fuzzy</li><li class="ods-tag">Quadruped</li></ul>
  </div>

  ```html
  <ul class="ods-tag--list">
    <li class="ods-tag">Small</li>
    <li class="ods-tag">Fuzzy</li>
    <li class="ods-tag">Quadruped</li>
  </ul>
  ```
</figure>

:::
