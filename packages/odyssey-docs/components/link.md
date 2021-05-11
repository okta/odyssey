---
template: component
id: component-link
title: Link
description: Links are navigation elements displayed as text.
lead: Links are navigation elements displayed as text. Use a Link to bring a user to another page or start a download.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/base/_typography-link.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/JW50oK4VDmN6M8cQcx5dPh6g/Typography?node-id=4124%3A15
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-link.svg" />

## Variants

### External links

<Description>

External links open in a separate tab and are identified by the <span class="sample--external-link-icon" aria-label="External link icon"></span> icon appended to the link.

Use an external link when:

- The destination of the link aids in the completion of a task on the current tab (e.g. help documentation)
- Opening the link in the current tab would result in loss of data or task interruption (e.g. completing a long form)

</Description>

<Visual>
  <template>
    <a href="https://en.wikipedia.org/wiki/Cosmic_latte" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Cosmic_latte</a>
  </template>
</Visual>

## States

### Visited Links

Odyssey disables special styling for visited links. This is an  intentional compromise that preferences user security and ease of  maintenance.

## Usage

<Description>

Links may be used within content or as standalone UI. When using links within content - like a paragraph or list item - do not pair them with Icons.

Avoid using Links for actions, preferring Buttons instead.

</Description>

## Content guidelines

<Description>

Choose Link copy that describes the destination (e.g. "Settings"), rather than generic text (e.g. "Click here" or a URL).  Aim to keep this copy concise, three words at most.


Keep in mind that all users may not have the same visual context due to their device or other constraints.

</Description>

<Visual variant="smiley-positive">
  <template>
    <a href="#">View solar system</a>
  </template>
</Visual>

<Visual variant="smiley-neutral">
  <template>
    <a href="#">View system</a>
  </template>
</Visual>


<Visual variant="smiley-negative">
  <template>
    <a href="#">View all local stellar orbiters</a>
  </template>
</Visual>

### Icons

<Description>

Icons may be included in standalone links. They are not supported within paragraph content or longer copy.

Icon layout is automatic, based on language direction.

</Description>

<Visual>
<template>
  <a href="#icons" class="ods-link--has-icon"><svg aria-hidden viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>Learn about propulsion</a>
</template>
</Visual>

### Mailto

<Description>

If you need a direct email link, display the whole address (e.g. lauren.ipsum@okta.com).

Avoid colloquial text that hides the associated email (e.g. "Contact Us").

</Description>

<Visual>
  <template>
    <a href="mailto:odysseus@okta.com">odysseus@okta.com</a>
  </template>
</Visual>

### Accessibility

<Description>

Links in Odyssey are not underlined. They maintain a minimum 3:1 contrast ratio with our body text colors and a 4.5:1 ratio with our available background colors. If you  deviate from these standards via overrides, ensure that your links have a non-color indicator like an underline.

Links should display a visible affordance when users interact via keyboard. Odyssey preserves the default `:focus` state for each browser.

</Description>

## References

### Further reading

- [Google's Developer Documentation](https://developers.google.com/web/tools/lighthouse/audits/noopener) provides backgrounds on security and performance considerations when using external links

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
