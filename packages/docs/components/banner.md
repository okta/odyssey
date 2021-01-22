---
template: component
id: component-banner
title: Banner
description:
lead:
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_banner.scss
  - icon: figma
    label: View designs
    href:
---

::: slot overview

## Anatomy

## Behavior

## Variants

### Info

<Description>

Use Info Banners to surface neutral information to users.

</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-info">
      <span class="ods-banner--icon">
        <OdsIcon icon="complete"></OdsIcon>
      </span>
      <h1 class="ods-banner--title">New launch scheduled</h1>
      <p class="ods-banner--content">
        The mission to Sagitarius A has been set for January 7.
      </p>
      <section class="ods-banner--actions">
        <a href="#">View itinerary</a>
      </section>
    </aside>
  </template>
</Visual>

### Success

<Description>

Used for reporting successful actions, results, or states to the user.

</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-success">
      <span class="ods-banner--icon">
        <OdsIcon icon="complete"></OdsIcon>
      </span>
      <h1 class="ods-banner--title">Ready for lift-off</h1>
      <p class="ods-banner--content">
        The Galactica is prepped for departure at your leisure.
      </p>
      <section class="ods-banner--actions">
        <a href="#">View hangar controls</a>
      </section>
    </aside>
  </template>
</Visual>

### Caution

<Description>

Used to inform users of tasks or processes that may need their attention.

When using the Caution variant, ensure the user does not need more context than you can give in the space available.



</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-caution">
      <span class="ods-banner--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <h1 class="ods-banner--title">Safety checks incomplete</h1>
      <p class="ods-banner--content">
        Severe solar winds detected. Local system flights may be delayed.
      </p>
      <section class="ods-banner--actions">
        <a href="#">View reports</a>
      </section>
    </aside>
  </template>
</Visual>

### Danger

<Description>

Use Danger messages to inform users that an error has occurred.

</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-danger">
      <span class="ods-banner--icon">
        <OdsIcon icon="error"></OdsIcon>
      </span>
      <h1 class="ods-banner--title">Safety checks have failed</h1>
      <p class="ods-banner--content">
        Hangar 18 has been compromised.
      </p>
      <section class="ods-banner--actions">
        <a href="#">Seal bulkhead doors</a>
      </section>
    </aside>
  </template>
</Visual>

## Usage

## Content Guidelines

## Accessibility

## References

### Related components

<Description>

- <a href="/components/toast">Toast</a>

</Description>

### Further reading

:::

::: slot html-scss

## Primary

<figure class="docs-example">
  <div class="docs-example--rendered">
    <button class="ods-button">
      <span class="ods-button--label">Primary</span>
    </button>
    <button class="ods-button is-ods-button-hover">
      <span class="ods-button--label">Hover</span>
    </button>
    <button class="ods-button is-ods-button-focus">
      <span class="ods-button--label">Focus</span>
    </button>
    <button class="ods-button" disabled>
      <span class="ods-button--label">Disabled</span>
    </button>
  </div>

  ```html
  <button class="ods-button">
    <span class="ods-button--label">Primary</span>
  </button>
  <button class="ods-button" disabled>
    <span class="ods-button--label">Primary</span>
  </button>
  ```
</figure>

## Accessibility

<Description>

In addition to the above use-cases for Icon, consider using the `<button>` element instead of `<a>` whenever possible. The keyboard and screen reader interaction for these elements is different. Space will trigger a `<button>`; Enter will trigger an `<a>`.

</Description>
:::
