---
template: component
title: Link
lead: Links are navigation elements displayed as text. A link can open another page or jump to a section of a page.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/checkbox.md
  - icon: github
    label: View code
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/base/_typography-link.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/JW50oK4VDmN6M8cQcx5dPh6g/Typography?node-id=4124%3A15
---

::: slot overview

## Anatomy

<div class="docskit--desc fpo">

Descriptive content around **link anatomy** should go here.

</div>

<Anatomy img="/images/fpo.svg" />

## Specialty cases

### Mailto

<div class="docskit--desc">

If a direct email link is required, display the whole address (e.g. lauren.ipsum@okta.com). Avoid colloquial text that might obfuscate the presence of a mailto link (e.g., "Contact Us").

</div>

<Example>

  <a href="mailto:lauren.ipsum@okta.com">lauren.ipsum@okta.com</a>

</Example>

### External links

<div class="docskit--desc">

An external link opens in a separate tab and can be identified by the <span class="sample--external-link-icon" aria-label="External link icon"></span> icon appended to the link.

Use an external link when:

- The destination of the link aids in the completion of a task on the current tab (e.g. additional information such as help documentation)
- Opening the link in the current tab would result in a significant loss of data or interruption of flow (e.g. while filling out a long form)

(See [Google Developer Documentation](https://developers.google.com/web/tools/lighthouse/audits/noopener) for security and performance considerations when using external links)

</div>

<Example>

  <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
 
</Example>

## Guidelines

<div class="docskit--desc">

Use a link when the URL is expected to change, either to an internal page (or route), an anchor link to content on the current page or an external site or resource.

</div>

#### Max length

<div class="docskit--desc">

Try to limit a link to at most 3 words.

</div>

<Example type="positive">

  <a href="#">View reports</a>
  
</Example>

<Example type="negative">

  <a href="#">View all recent reports</a>
  
</Example>

### Context

<div class="docskit--desc">

Choose link text that describes the destination (e.g. "Settings"), rather than generic text (e.g. "Click here" or a URL)
. This is particularly important for assistive technologies like screen readers.

If you must have brief link text, ensure that additional context is provided by using the `.u-visually-hidden` class.

</div>

<Example type="positive">

  <a href="#">View all reports</a>
  
</Example>

<Example type="negative">

  <a href="#">View</a>
  
</Example>

### Semantics

<div class="docskit--desc">

Avoid using a link <code>&lt;a&gt;</code> for actions; use a button <code>&lt;button&gt;</code> instead

</div>

<Example type="positive">

  <a href="#">View all reports</a>
  
</Example>

<Example type="negative">

  <a href="#">View</a>
  
</Example>

</div>

### Accessibility

<div class="docskit--desc">

Links in Odyssey are not underlined, but do maintain a minimum 3:1 contrast ratio with our body text color and a 4.5:1 contrast ratio with our available background colors. If you deviate from these standards via overrides, please ensure that your links have a non-color indicator, e.g. an underline.

Links should display a visible `:focus` state when users interact via keyboard. Odyssey preserves the default `:focus` state for each browser.

</div>

:::

::: slot html-scss

## Basic example

<figure class="odo-example">
  <div class="odo-example--rendered">
    <a href="mailto:lauren.ipsum@okta.com">lauren.ipsum@okta.com</a>
  </div>

  ```html
  <a href="mailto:lauren.ipsum@okta.com">lauren.ipsum@okta.com</a>
  ```
</figure>

## External link

<figure class="odo-example">
  <div class="odo-example--rendered">
    <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  </div>

  ```html
  <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  ```
</figure>

## Visited Links

Odyssey has removed unique styling for `:visited` links. This is an intentional compromise that preferences user security and ease of maintenance over the `:visited` affordance.

:::
