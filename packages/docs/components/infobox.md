---
template: component
id: component-infobox
title: Infobox
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
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_infobox.scss
  - icon: figma
    label: View designs
    href:
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-infobox.svg" />

## Behavior

<Description>

This component may be present on load or triggered by different types of events, but they are not transient or dismissable. These messages are best used when additional in-page context is required.

</Description>

## Variants

### Danger

<Description>

Use Danger Infoboxes to inform users that an error has occurred. You may also inform a user when specific processes are particularly destructive.

Include guidance to make sure users know what steps to take to address the error or avoid data loss.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-danger">
      <span class="ods-infobox--icon">
        <OdsIcon icon="error"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Safety checks have failed</h1>
      <section class="ods-infobox--content">
        <p>An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.</p>
      </section>
    </aside>
  </template>
</Visual>

### Caution

<Description>

Use Caution Infoboxes to inform users of tasks or processes that may need their attention.

When using the Caution variant, ensure the user does not need more context than you can give in the space available.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-caution">
      <span class="ods-infobox--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Safety checks incomplete</h1>
      <section class="ods-infobox--content">
        <p>Safety checks must be completed before this mission as been approved for launch.</p>
      </section>
    </aside>
  </template>
</Visual>

### Success

<Description>

Use Success Infoboxes for reporting successful actions, processes, or states to the user.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-success">
      <span class="ods-infobox--icon">
        <OdsIcon icon="complete"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Ready for lift-off</h1>
      <section class="ods-infobox--content">
        <p>Safety checks are complete, and this mission as been approved for launch.</p>
      </section>
    </aside>
  </template>
</Visual>

## Usage

<Description>

These messages are designed for use both on page load and dynamically. For instance, a Form may include a Caution message if the user should be aware of specific context up front. Alternately, the Danger variant may be used on Form submission to surface an error.

</Description>

### Actions

<Description>

It's often useful to direct users toward an appropriate action, especially for fixing errors. Infoboxs allow for both inline and sectioned links. In order to preserve clarity for users, please do not combine them.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-danger">
      <span class="ods-infobox--icon">
        <OdsIcon icon="error"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Safety checks have failed</h1>
      <section class="ods-infobox--content">
        <p>An issue has been discovered with your fuel mixture ratios. Please <a href="#">reconfigure your fuel mixture</a> and perform safety checks again.</p>
      </section>
    </aside>
  </template>
</Visual>

<Description>

The actions section is limited to links. If it's necessary to provide the user with an action, please direct them to the appropriate flow instead of beginning a new process inline.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-danger">
      <span class="ods-infobox--icon">
        <OdsIcon icon="error"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Safety checks have failed</h1>
      <section class="ods-infobox--content">
        <p>An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.</p>
      </section>
      <section class="ods-infobox--actions">
        <a href="#">Visit fueling console</a>
      </section>
    </aside>
  </template>
</Visual>

### Placement

<Description>

Infoboxes should be displayed above the content they apply to but not higher than their scope.

For example, a Form error should be displayed above all Fieldsets, but below the Form title.

</Description>

<Visual variant="positive">
  <template>
    <form>
      <h1 class="ods-form--title">Sign In</h1>
      <aside class="ods-infobox is-ods-infobox-danger">
        <span class="ods-infobox--icon">
          <OdsIcon icon="error"></OdsIcon>
        </span>
        <h1 class="ods-infobox--title">Espionage detected!</h1>
        <section class="ods-infobox--content">
          <p>Your access has been disabled. Please contact a Site Director.</p>
        </section>
      </aside>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="text" name="form-example-user" id="form-example-user" spellcheck="false" value="" required>
          <label class="ods-label" for="form-example-user">Codename</label>
        </div>
      </fieldset>
    </form>
  </template>
</Visual>

<Description>

Stay away from nesting Infoboxes within information-dense UI like Tables. If you need to convey something about an individual data point, consider the <a href="/components/status/">Status</a> component instead.

</Description>

<Visual variant="negative" content="no-end">
  <template>
    <figure class="ods-table--figure">
      <table class="ods-table">
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
            <td>
              <span>Pluto</span>
              <aside class="ods-infobox is-ods-infobox-danger">
                <span class="ods-infobox--icon">
                  <OdsIcon icon="error"></OdsIcon>
                </span>
                <h1 class="ods-infobox--title">Too small!</h1>
                <section class="ods-infobox--content">
                  <p>This little guy has been reclassified.</p>
                </section>
              </aside>
            </td>
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
  </template>
</Visual>

## Content Guidelines

<Description>

These messages may be used for longer content than Toast or Banner, but shouldn't go beyond two paragraphs. When including an inline link or action, be sure the link text clearly indicates where it leads.

</Description>

## Accessibility

## References

### Related components

<Visual layout="wide">

<figure class="ods-table--figure">
  <figcaption class="ods-table--figcaption">
    Odyssey Alerts
  </figcaption>
  <table class="ods-table">
    <caption>Differences between the available alert components</caption>
    <thead>
      <tr>
        <th scope="column">Component</th>
        <th scope="column">Variants</th>
        <th scope="column">Async/Dynamic</th>
        <th scope="column">Transient</th>
        <th scope="column">Dismissable</th>
        <th scope="column">Actionable</th>
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

</Visual>

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
