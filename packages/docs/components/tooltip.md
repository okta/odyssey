---
template: component
id: component-tooltip
title: Tooltip
description: A contextual pop-up that provides a label for or description of an element.
lead: A transient element that provides additional context for an element when it receives hover or focus.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_tooltip.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/9wQUMt72muf6mEGuHhHRZM/Tooltips?node-id=25%3A2
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-tooltip.svg" />

## Behavior

<Description>

Tooltips activate when a cursor hovers over an element, or an element receives focus. They can be triggered both by a parent container or a paired sibling.

Tooltips vanish when a user stops hovering or changes focus. To maintain parity with the browser's tooltip behavior, they will not disappear otherwise.

The cursor displayed when hovering UI is determined by the element, not the Tooltip.

</Description>

<Visual>
  <p>
    Be sure to check the
    <span class="has-ods-tooltip">
      <abbr tabindex="0" aria-describedby="aocs-tip">AOCS</abbr>
      <span id="aocs-tip" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Attitude and Orbit Control System
      </span>
    </span>
    before liftoff.
  </p>
</Visual>

## Usage

<Description>

Use Tooltips to help users understand unfamiliar objects or states that aren’t described by the visible UI.

Well-placed tooltips provide info when needed and need minimal user effort to trigger.

</Description>

### Use when...

#### No text label is present

<Description>

Use Tooltips with all controls that rely solely on iconography for communicating meaning.

This is especially important to distinguish between visually or contextually similar UI. Tooltips are also helpful with rarely-used features or features with variant interpretations.

Our <a href="/components/button/">Button</a> component offers more guidance if needed.

</Description>

<Visual variant="positive">
  <template>
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <OdsIcon icon="edit"></OdsIcon>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Edit
      </aside>
    </span>
  </template>
</Visual>

#### An element benefits from supplemental information

<Description>

This may be the case for disabled controls or inline content like abbreviations.

</Description>

<Visual variant="positive">
  <template>
    <span class="has-ods-tooltip sample--tip">
      <button class="ods-button" aria-describedby="launch-description" disabled>
        Launch
      </button>
      <aside id="launch-description" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
        Unable to launch before countdown completes.
      </aside>
    </span>
  </template>
</Visual>

### Don't use when...

#### Users need to interact with the content

<Description>

Tooltips are transient by design, which makes them a bad candidate for interactive content. Do not include links, buttons, or other controls within a Tooltip.

</Description>

<Visual variant="negative">
  <span class="has-ods-tooltip sample--tip">
    <button class="ods-button" aria-describedby="download-description-link" disabled>
      Launch
    </button>
    <aside id="download-description-link" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
      Enable launch by <a href="#">initiating the countdown</a>.
    </aside>
  </span>
</Visual>

#### Rich content or imagery is required

<Description>

Tooltips should provide simple, textual descriptions. If your content requires formatting or imagery, users may have difficulty parsing them.

</Description>

<Visual variant="negative">
  <span class="has-ods-tooltip sample--tip">
    <button class="ods-button" aria-describedby="download-description-image" disabled>
      Launch
    </button>
    <aside id="download-description-image" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
      There is <del data-a11y-start=" [deletion start] "  data-a11y-end=" [deletion end] ">nothing</del> <ins data-a11y-start=" [insertion start] "  data-a11y-end=" [insertion end] ">a serious issue</ins> preventing the launch.
    </aside>
  </span>
</Visual>

### Positioning Tooltips

<Description>

When positioning a Tooltip, ensure:

* The Tooltip is paired with the element being described.
* You plan for responsive web design concerns.
* Placement doesn't interfere with the object of interest or relevant information.
* The Tooltip is always visible when activated, not cropped or off-page.

</Description>

<Visual>
  <div>
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-top">Top</abbr>
      <aside id="tip-top" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        A top tip.
      </aside>
    </span>
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-right">Right</abbr>
      <aside id="tip-right" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
        A right-hand tip.
      </aside>
    </span>
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-bottom">Bottom</abbr>
      <aside id="tip-bottom" class="ods-tooltip is-ods-tooltip-bottom" role="tooltip">
        A bottom tip.
      </aside>
    </span>
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-left">Left</abbr>
      <aside id="tip-left" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
        A left-hand tip.
      </aside>
    </span>
  </div>
</Visual>

## Content

### Succinct

<Description>

Tooltips should contain short, descriptive text. A single sentence or even a sentence fragment is ideal.

The content should be new information. Tooltips should not repeat copy from visible UI.

</Description>

### Static

<Description>

Tooltips should contain static content. Users don't expect, and are unlikely to notice, dynamic changes to Tooltip contents.

**Exception:** Tooltips may contain dynamic content if two requirements are met:

* The tooltip is present at all times during the content change
* The tooltip is reporting real-time change (e.g. "Copy" changes to "Copied!" on a click-to-copy button)

</Description>

## Accessibility

### Animation

<Description>

Per <a href="https://www.w3.org/TR/wai-aria-1.1/#tooltip">ARIA guidelines</a>, our tooltips triggered by hovering or focusing UI and employ a short delay before animating.

</Description>

### Tooltip as a label

<Description>

When using tooltips as a label, assistive technologies will treat the Tooltip content as a name.

Assistive technologies will read out this example as "Edit".

</Description>

<Visual>
  <span class="has-ods-tooltip">
    <button class="ods-button" aria-labelledby="access-edit-label">
      <OdsIcon icon="edit"></OdsIcon>
    </button>
    <aside id="access-edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
      Edit
    </aside>
  </span>
</Visual>

## Responsive considerations

<Description>

Focusing and hovering are typically unavailable on touchscreen devices. Some devices may also trigger a "click" at the same time. For this reason, Tooltips may be completely invisible for users of these devices.

Consider fallback alternatives on a case-by-case basis.

When possible, provide inline text that becomes visible on touchscreen devices. Otherwise, a fixed-position fallback is provided for mobile devices.

</Description>

:::

::: slot html-scss


## Position top

<figure class="docs-example" data-optional>
  <div class="docs-example--rendered">
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <OdsIcon icon="edit"></OdsIcon>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        <OdsIcon icon="edit"></OdsIcon>
      </aside>
    </span>
  </div>

  ```html
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <svg role="presentation" focusable="false" class="ods-icon">...</svg>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Tooltip label
      </aside>
    </span>
  ```
</figure>

## Position right

<figure class="docs-example" data-optional>
  <div class="docs-example--rendered">
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <OdsIcon icon="edit"></OdsIcon>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
        Tooltip label
      </aside>
    </span>
  </div>

  ```html
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <svg role="presentation" focusable="false" class="ods-icon">...</svg>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
        Tooltip label
      </aside>
    </span>
  ```
</figure>

## Position bottom

<figure class="docs-example" data-optional>
  <div class="docs-example--rendered">
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <OdsIcon icon="edit"></OdsIcon>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-bottom" role="tooltip">
        Tooltip label
      </aside>
    </span>
  </div>

  ```html
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <svg role="presentation" focusable="false" class="ods-icon">...</svg>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-bottom" role="tooltip">
        Tooltip label
      </aside>
    </span>
  ```
</figure>

## Position left

<figure class="docs-example" data-optional>
  <div class="docs-example--rendered">
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <OdsIcon icon="edit"></OdsIcon>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
        Tooltip label
      </aside>
    </span>
  </div>

  ```html
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        <svg role="presentation" focusable="false" class="ods-icon">...</svg>
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
        Tooltip label
      </aside>
    </span>
  ```
</figure>

:::
