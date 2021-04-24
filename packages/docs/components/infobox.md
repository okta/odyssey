---
template: component
id: component-infobox
title: Infobox
description: An infobox is a type of alert that provides feedback in response to a user action or system activity.
lead: An infobox is a type of alert that provides feedback in response to a user action or system activity.
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

This component may be present on load or triggered by different types of events, but they are not transient or dismissable.

</Description>

## Variants

### Info

<Description>

Use Infoboxes for communicating important guidance to the user. When using the Info variant, consider if plain copy will suffice on the page itself first. Reserve this component for "can’t miss" instructions.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-info" role="status">
      <span class="ods-infobox--icon">
        <OdsIcon icon="get-info"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Moonbase Alpha-6</h1>
      <section class="ods-infobox--content">
        <p>You are currently logged in from Moonbase Alpha-6, located on Luna.</p>
      </section>
    </aside>
  </template>
</Visual>

### Danger

<Description>

Use Danger Infoboxes to inform users that an error has occurred. You may also inform a user when specific processes are particularly destructive.

Include guidance to make sure users know what steps to take to address the error or avoid data loss.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-danger" role="alert">
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

Use Caution Infoboxes to inform users of tasks or processes that need their attention.

When using the Caution variant, ensure the user does not need more context than you can give in the space available.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-caution" role="status">
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
    <aside class="ods-infobox is-ods-infobox-success" role="status">
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

Infoboxes can be present when the page loads or appear dynamically. For instance, a Form may include a Caution message if the user should be aware of particular requirements up front. Alternately, the Danger variant may be used on Form submission to surface an error.

Avoid overusing Infobox within the same view. They are intended to draw the eye, and multiple visible Infoboxes may overwhelm users.

</Description>

### Actions

<Description>

It is ideal to direct users toward an appropriate action, especially for addressing errors. Infoboxes allow for both inline and separated actions. To preserve clarity, limit Infoboxes to one link.

</Description>

<Visual content="full">
  <template>
    <aside class="ods-infobox is-ods-infobox-danger" role="alert">
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
    <aside class="ods-infobox is-ods-infobox-danger" role="alert">
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
      <aside class="ods-infobox is-ods-infobox-danger" role="alert">
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

Stay away from nesting Infoboxes within information-dense UI like Tables. If you need to convey something about an individual data point, consider another design solution.

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
              <aside class="ods-infobox is-ods-infobox-danger" role="alert">
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

Do not include images or other UIs within Infobox.

</Description>

<Visual content="full" variant="negative">
  <template>
    <aside class="ods-infobox is-ods-infobox-caution" role="alert">
      <span class="ods-infobox--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Solar winds are high today</h1>
      <section class="ods-infobox--content">
        <p>Solar winds may be affecting real time communications between Shuttle 14 and launch control.</p>
      </section>
      <section class="ods-infobox--actions">
        <button class="ods-button">Warn them!</button>
      </section>
    </aside>
  </template>
</Visual>

### Content Areas

<Description>

Both Title and Content are optional, but at least one of them is required.

</Description>

## Accessibility

<Description>

When deploying Infoboxes, two `role`s may apply. Danger variants should utilize the `alert` role, as their contents represent immediate risk or failure. Success and Caution variants are better suited to the `status` role, which provides a less urgent announcement on appearance. The Info variant does not require a `role`, as it represents plain content.

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
        <td>Info, Success, Caution, Danger</td>
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

## Info

<figure class="docs-example">
  <div class="docs-example--rendered">
    <aside class="ods-infobox is-ods-infobox-info">
      <span class="ods-infobox--icon">
        <OdsIcon icon="get-info"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Moonbase Alpha-6</h1>
      <section class="ods-infobox--content">
        <p>You are currently logged in from Moonbase Alpha-6, located on Luna.</p>
      </section>
    </aside>
  </div>

  ```html
  <aside class="ods-infobox is-ods-infobox-info" role="status">
    <span class="ods-infobox--icon">
      <svg class="ods-icon">[...]</svg>
    </span>
    <h1 class="ods-infobox--title">Moonbase Alpha-6</h1>
    <section class="ods-infobox--content">
      <p>You are currently logged in from Moonbase Alpha-6, located on Luna.</p>
    </section>
  </aside>
  ```
</figure>

## Danger

<figure class="docs-example">
  <div class="docs-example--rendered">
    <aside class="ods-infobox is-ods-infobox-danger" role="alert">
      <span class="ods-infobox--icon">
        <OdsIcon icon="error"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Safety checks have failed</h1>
      <section class="ods-infobox--content">
        <p>An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.</p>
      </section>
    </aside>
  </div>

  ```html
  <aside class="ods-infobox is-ods-infobox-danger" role="alert">
    <span class="ods-infobox--icon">
      <svg class="ods-icon">[...]</svg>
    </span>
    <h1 class="ods-infobox--title">Safety checks have failed</h1>
    <section class="ods-infobox--content">
      <p>An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.</p>
    </section>
  </aside>
  ```
</figure>

## Caution

<figure class="docs-example">
  <div class="docs-example--rendered">
    <aside class="ods-infobox is-ods-infobox-caution" role="status">
      <span class="ods-infobox--icon">
        <OdsIcon icon="caution"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Safety checks incomplete</h1>
      <section class="ods-infobox--content">
        <p>Safety checks must be completed before this mission as been approved for launch.</p>
      </section>
    </aside>
  </div>

  ```html
  <aside class="ods-infobox is-ods-infobox-caution" role="status">
    <span class="ods-infobox--icon">
      <svg class="ods-icon">[...]</svg>
    </span>
    <h1 class="ods-infobox--title">Safety checks incomplete</h1>
    <section class="ods-infobox--content">
      <p>Safety checks must be completed before this mission as been approved for launch.</p>
    </section>
  </aside>
  ```
</figure>

## Success

<figure class="docs-example">
  <div class="docs-example--rendered">
    <aside class="ods-infobox is-ods-infobox-success" role="status">
      <span class="ods-infobox--icon">
        <OdsIcon icon="complete"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Ready for lift-off</h1>
      <section class="ods-infobox--content">
        <p>Safety checks are complete, and this mission as been approved for launch.</p>
      </section>
    </aside>
  </div>

  ```html
  <aside class="ods-infobox is-ods-infobox-success" role="status">
    <span class="ods-infobox--icon">
      <svg class="ods-icon">[...]</svg>
    </span>
    <h1 class="ods-infobox--title">Ready for lift-off</h1>
    <section class="ods-infobox--content">
      <p>Safety checks are complete, and this mission as been approved for launch.</p>
    </section>
  </aside>
  ```
</figure>

## Inline Actions

<figure class="docs-example">
  <div class="docs-example--rendered">
    <aside class="ods-infobox is-ods-infobox-danger" role="alert">
      <span class="ods-infobox--icon">
        <OdsIcon icon="error"></OdsIcon>
      </span>
      <h1 class="ods-infobox--title">Safety checks have failed</h1>
      <section class="ods-infobox--content">
        <p>An issue has been discovered with your fuel mixture ratios. Please <a href="#">reconfigure your fuel mixture</a> and perform safety checks again.</p>
      </section>
    </aside>
  </div>

  ```html
  <aside class="ods-infobox is-ods-infobox-danger" role="alert">
    <span class="ods-infobox--icon">
      <svg class="ods-icon">[...]</svg>
    </span>
    <h1 class="ods-infobox--title">Safety checks have failed</h1>
    <section class="ods-infobox--content">
      <p>An issue has been discovered with your fuel mixture ratios. Please <a href="#">reconfigure your fuel mixture</a> and perform safety checks again.</p>
    </section>
  </aside>
  ```
</figure>

## Block Actions

<figure class="docs-example">
  <div class="docs-example--rendered">
    <aside class="ods-infobox is-ods-infobox-danger" role="alert">
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
  </div>

  ```html
  <aside class="ods-infobox is-ods-infobox-danger" role="alert">
    <span class="ods-infobox--icon">
      <svg class="ods-icon">[...]</svg>
    </span>
    <h1 class="ods-infobox--title">Safety checks have failed</h1>
    <section class="ods-infobox--content">
      <p>An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.</p>
    </section>
    <section class="ods-infobox--actions">
      <a href="#">Visit fueling console</a>
    </section>
  </aside>
  ```
</figure>

:::
