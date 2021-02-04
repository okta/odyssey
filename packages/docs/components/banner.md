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

<Anatomy img="images/anatomy-banner.svg" />

## Behavior

<Description>

Banners must be present on load and should not be trigged asynchronously, as they may not be visible. These alerts are not transient, but may be dismissed by the user.

They are best used to indicate global states or errors that effect an entire product.

</Description>

## Variants

### Info

<Description>

Use Info Banners to surface neutral information or broad announcements to users.

</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-info">
      <span class="ods-banner--icon">
        <OdsIcon icon="get-info"></OdsIcon>
      </span>
      <h1 class="ods-banner--title">New launch scheduled</h1>
      <p class="ods-banner--content">
        The mission to Sagitarius A has been set for January 7.
      </p>
      <section class="ods-banner--actions">
        <a href="#">View itinerary</a>
      </section>
      <span class="ods-banner--dismiss">
        <button class="ods-button is-ods-button-overlay" aria-label="Dismiss banner">
          <OdsIcon icon="close" />
        </button>
      </span>
    </aside>
  </template>
</Visual>

### Danger

<Description>

Use Danger Banners to inform users that a system-wide error has occurred. You may also inform a user when access is about to be lost.

Include guidance to make sure users know what steps to take to address the error or avoid the threat.

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
      <span class="ods-banner--dismiss">
        <button class="ods-button is-ods-button-overlay" aria-label="Dismiss banner">
          <OdsIcon icon="close" />
        </button>
      </span>
    </aside>
  </template>
</Visual>

### Caution

<Description>

Use Caution Banners to inform users of tasks or processes that may need their attention.

When using the Caution variant, ensure the user does not need more context than you can give in the space available.

</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-caution is-ods-banner-dismissable">
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
      <span class="ods-banner--dismiss">
        <button class="ods-button is-ods-button-overlay" aria-label="Dismiss banner">
          <OdsIcon icon="close" />
        </button>
      </span>
    </aside>
  </template>
</Visual>

## Usage

<Description>

In addition to the required content and placement, Banners have several optional features: Titles, Actions, and Dismissing.

</Description>

### Titles

<Description>

Banners can utilize an optional Title to give an at-a-glance lede.

</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-caution is-ods-banner-dismissable">
      <span class="ods-banner--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <h1 class="ods-banner--title">Safety checks incomplete</h1>
      <p class="ods-banner--content">
        Severe solar winds detected. Local system flights may be delayed.
      </p>
    </aside>
  </template>
</Visual>

### Actions

<Description>

It's often useful to direct users toward an appropriate action, especially for fixing errors.

</Description>

<Visual layout="wide" content="full" variant="positive">
  <template>
    <aside class="ods-banner is-ods-banner-caution">
      <span class="ods-banner--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <p class="ods-banner--content">
        Severe solar winds detected. Local system flights may be delayed.
      </p>
      <section class="ods-banner--actions">
        <a href="#">View reports</a>
      </section>
    </aside>
  </template>
</Visual>

<Description>

The actions section is limited to links. If it's necessary to provide the user with an action, please direct them to the appropriate flow instead of beginning a new process inline.

</Description>

<Visual layout="wide" content="full" variant="negative">
  <template>
    <aside class="ods-banner is-ods-banner-caution">
      <span class="ods-banner--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <p class="ods-banner--content">
        Severe solar winds detected. Local system flights may be delayed.
      </p>
      <section class="ods-banner--actions">
        <button class="ods-button">View reports</button>
      </section>
    </aside>
  </template>
</Visual>

### Dismissal

<Description>

Banners support dismissal for messages that do not persist or only require a one-time acknowledgement.

</Description>

<Visual layout="wide" content="full">
  <template>
    <aside class="ods-banner is-ods-banner-caution is-ods-banner-dismissable">
      <span class="ods-banner--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <p class="ods-banner--content">
        Severe solar winds detected. Local system flights may be delayed.
      </p>
      <span class="ods-banner--dismiss">
        <button class="ods-button is-ods-button-overlay" aria-label="Dismiss banner">
          <OdsIcon icon="close" />
        </button>
      </span>
    </aside>
  </template>
</Visual>

## Content Guidelines

<Description>

Banner content should be succinct and direct. When including an action, be sure the link text clearly indicates where it leads.

</Description>

## References

<Description layout="wide">

<figure class="ods-table--figure">
  <figcaption class="ods-table--figcaption">
    Related Components
  </figcaption>
  <table class="ods-table">
    <caption>Differences between the available alert components</caption>
    <thead>
      <tr>
        <th scope="column">Component</th>
        <th scope="column">Available Variants</th>
        <th scope="column">
          <span class="has-ods-tooltip">
            <abbr aria-describedby="tip-dynamic">Dynamic</abbr>
            <aside class="ods-tooltip is-ods-tooltip-top" id="tip-dynamic" role="tooltip">
              May be inserted after page load
            </aside>
          </span>
        </th>
        <th scope="column">
          <span class="has-ods-tooltip">
            <abbr aria-describedby="tip-transient">Transient</abbr>
            <aside class="ods-tooltip is-ods-tooltip-top" id="tip-transient" role="tooltip">
              Disappears without user interaction
            </aside>
          </span>
        </th>
        <th scope="column">
          <span class="has-ods-tooltip">
            <abbr aria-describedby="tip-dismissable">Dismissable</abbr>
            <aside class="ods-tooltip is-ods-tooltip-top" id="tip-dismissable" role="tooltip">
              May be dismissed by the user
            </aside>
          </span>
        </th>
        <th scope="column">
          <span class="has-ods-tooltip">
            <abbr aria-describedby="tip-actionable">Actionable</abbr>
            <aside class="ods-tooltip is-ods-tooltip-top" id="tip-actionable" role="tooltip">
              May include actions or links
            </aside>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><a href="/components/banner">Banner</a></th>
        <td>Info, Caution, Danger</td>
        <td>No</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes</td>
      </tr>
      <tr>
        <th scope="row">Infobox</th>
        <td>Success, Caution, Danger</td>
        <td>Yes</td>
        <td>No</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
      <tr>
        <th scope="row"><a href="/components/toast">Toast</a></th>
        <td>Info, Success, Caution, Danger</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
    </tbody>
  </table>
</figure>

</Description>

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
