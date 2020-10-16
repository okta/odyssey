---
template: component
id: link
title: Link
description: Links are navigation elements displayed as text. A link can open another page or jump to a section of a page.
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

<Description class="is-fpo">

Descriptive content around **link anatomy** should go here.

</Description>

<Anatomy img="/images/fpo.svg" />

## Specialty cases

### Icons

<Description>
  
Icons may be included in standalone links, but are not supported within paragraph content or longer copy. Add the `.ods-link--has-icon` class to ensure proper layout.

</Description>

<Visual>

<a href="#icons" class="ods-link--has-icon"><svg aria-hidden viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>Visit our Link docs</a>

</Visual>

### Mailto

<Description>

If a direct email link is required, display the whole address (e.g. lauren.ipsum@okta.com). Avoid colloquial text that might obfuscate the presence of a mailto link (e.g., "Contact Us").

</Description>

<Visual>
  <template>
    <a href="mailto:donuts@okta.com">donuts@okta.com</a>
  </template>
</Visual>

### External links

<Description>

An external link opens in a separate tab and can be identified by the <span class="sample--external-link-icon" aria-label="External link icon"></span> icon appended to the link.

Use an external link when:

- The destination of the link aids in the completion of a task on the current tab (e.g. additional information such as help documentation)
- Opening the link in the current tab would result in a significant loss of data or interruption of flow (e.g. while filling out a long form)

(See [Google Developer Documentation](https://developers.google.com/web/tools/lighthouse/audits/noopener) for security and performance considerations when using external links)

</Description>

<Visual>
  <template>
    <a href="https://okta.com" target="_blank" rel="noopener">okta.com/donuts</a>
  </template>
</Visual>

## Guidelines

<Description>

Use a link when the URL is expected to change, either to an internal page (or route), an anchor link to content on the current page or an external site or resource.

</Description>

#### Max length

<Description>

Try to limit a link to at most 3 words.

</Description>

<Visual variant="positive">
  <template>
    <a href="#">View menu</a>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <a href="#">View all available donuts</a>
  </template>
</Visual>

### Context

<Description>

Choose link text that describes the destination (e.g. "Settings"), rather than generic text (e.g. "Click here" or a URL)
. This is particularly important for assistive technologies like screen readers.

If you must have brief link text, ensure that additional context is provided by using the `.u-visually-hidden` class.

</Description>

<Visual variant="positive">
  <template>
    <a href="#">View all reports</a>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <a href="#">View</a>
  </template>
</Visual>

### Semantics

<Description>

Avoid using a link <code>&lt;a&gt;</code> for actions; use a button <code>&lt;button&gt;</code> instead

</Description>

<Visual variant="positive">
  <template>
    <a href="#">View all reports</a>
  </template>
</Visual>

<Visual variant="negative">
  <template>
    <a href="#">View</a>
  </template>
</Visual>

</Description>

### Accessibility

<Description>

Links in Odyssey are not underlined, but do maintain a minimum 3:1 contrast ratio with our body text color and a 4.5:1 contrast ratio with our available background colors. If you deviate from these standards via overrides, please ensure that your links have a non-color indicator, e.g. an underline.

Links should display a visible `:focus` state when users interact via keyboard. Odyssey preserves the default `:focus` state for each browser.

</Description>

:::

::: slot html-scss

## Basic example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <a href="mailto:lauren.ipsum@okta.com">lauren.ipsum@okta.com</a>
  </div>

  ```html
  <a href="mailto:lauren.ipsum@okta.com">lauren.ipsum@okta.com</a>
  ```
</figure>

## External link

<figure class="docs-example">
  <div class="docs-example--rendered">
    <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  </div>

  ```html
  <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  ```
</figure>

## Visited Links

Odyssey has removed unique styling for `:visited` links. This is an intentional compromise that preferences user security and ease of maintenance over the `:visited` affordance.

:::
