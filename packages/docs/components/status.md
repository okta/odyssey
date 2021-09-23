---
template: component
id: component-status
title: Status
description: Status is used to inform users by providing feedback on system states.
lede: Status is used to inform users by providing feedback on system states. Status can display broad operational states as well as granular states like user status.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_status.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/rBPRx3GCZ1DHNmFCwZNJ8f/Status?node-id=25%3A2
---

::: slot overview

## Anatomy

<Anatomy img="images/anatomy-status.svg" />

## Behavior

<Description>

Status is not an interactive element. It is only intended to inform. If a Status indicates that a user should take action, be sure to provide the appropriate controls.

</Description>

## Variants

<Description>

There are four variants of Status available: Neutral, Success, Caution, and Danger.

</Description>

### Neutral

<Description>

Neutral Statuses are gray and should be used to indicate states like "Paused", "Not started", or "Queued".

This is the default variant.

</Description>

<Visual>
  <div class="ods-status">
    <span class="ods-status--label">
      Propulsion systems
    </span>
    <span class="ods-status--value">
      Engines offline
    </span>
  </div>
</Visual>

### Success

<Description>

Success Statuses are green and should be used to indicate states like "Complete", "Active", or "Service operational".

</Description>

<Visual>
  <div class="ods-status is-ods-status-success">
    <span class="ods-status--label">
      Propulsion systems
    </span>
    <span class="ods-status--value">
      Online
    </span>
  </div>
</Visual>

### Caution

<Description>

Caution Statuses are yellow and should be used to indicate states like "Attention suggested" or "Service degradation".

</Description>

<Visual>
  <div class="ods-status is-ods-status-caution">
    <span class="ods-status--label">
      Propulsion systems
    </span>
    <span class="ods-status--value">
      Check engine
    </span>
  </div>
</Visual>

### Danger

<Description>

Danger Statuses are red and should be used to indicate states like "Error", "Failure", or "Service disruption".

</Description>

<Visual>
  <div class="ods-status is-ods-status-danger">
    <span class="ods-status--label">
      Propulsion systems
    </span>
    <span class="ods-status--value">
      Warp core disruption
    </span>
  </div>
</Visual>

## Usage

<Description>

Use Status to communicate the state of a discrete item, such as a server or individual process. Both labeled and unlabeled variants are acceptable, but should follow the associated guidelines.

</Description>

<Visual>
  <div class="ods-status is-ods-status-success">
    <span class="ods-status--label">
      Engine performance
    </span>
    <span class="ods-status--value">
      Nominal
    </span>
  </div>
</Visual>

### Within Table

<Description>

Table supports Status as a content type. Status requires a distinct column and should not be mixed with other content types.

In this case the column heading acts as the Status label.

</Description>

## Content guidelines

<Description>

Statuses content should provide a quick overview. Limit Status descriptor and label text to three words or less. Use sentence casing for both.

</Description>

<Visual>
  <div class="ods-status is-ods-status-success">
    <span class="ods-status--label">
      Warp drive status
    </span>
    <span class="ods-status--value">
      Engaged
    </span>
  </div>
</Visual>

### Statuses without labels

<Description>

Where necessary, labels may be hidden. If a label is not present, ensure the Status copy communicates appropriate context. Even if the label is hidden, it must be populated to ensure context for users of assistive technology.

</Description>

<Visual>
  <div class="ods-status is-ods-status-success is-ods-status-label-hidden">
    <span class="ods-status--label">
      Warp drive status
    </span>
    <span class="ods-status--value">
      Warp drive engaged
    </span>
  </div>
</Visual>

:::

::: slot html-scss

## Variants

### Neutral

<figure class="docs-example">
  <div class="docs-example--rendered">
    <div class="ods-status">
      <span class="ods-status--label">
        Status label
      </span>
      <span class="ods-status--value">
        Neutral descriptor
      </span>
    </div>
  </div>

  ```html
  <div class="ods-status">
    <span class="ods-status--label">
      Status label
    </span>
    <span class="ods-status--value">
      Neutral descriptor
    </span>
  </div>
  ```
</figure>

### Success

<figure class="docs-example">
  <div class="docs-example--rendered">
    <div class="ods-status is-ods-status-success">
      <span class="ods-status--label">
        Status label
      </span>
      <span class="ods-status--value">
        Success descriptor
      </span>
    </div>
  </div>

  ```html
  <div class="ods-status is-ods-status-success">
    <span class="ods-status--label">
      Status label
    </span>
    <span class="ods-status--value">
      Success descriptor
    </span>
  </div>
  ```
</figure>

### Caution

<figure class="docs-example">
  <div class="docs-example--rendered">
    <div class="ods-status is-ods-status-caution">
      <span class="ods-status--label">
        Status label
      </span>
      <span class="ods-status--value">
        Caution descriptor
      </span>
    </div>
  </div>

  ```html
  <div class="ods-status is-ods-status-caution">
    <span class="ods-status--label">
      Status label
    </span>
    <span class="ods-status--value">
      Caution descriptor
    </span>
  </div>
  ```
</figure>

### Danger

<figure class="docs-example">
  <div class="docs-example--rendered">
    <div class="ods-status is-ods-status-danger">
      <span class="ods-status--label">
        Status label
      </span>
      <span class="ods-status--value">
        Danger descriptor
      </span>
    </div>
  </div>

  ```html
  <div class="ods-status is-ods-status-danger">
    <span class="ods-status--label">
      Status label
    </span>
    <span class="ods-status--value">
      Danger descriptor
    </span>
  </div>
  ```
</figure>

## Hiding labels

<Description>

Labels may be hidden by applying the `.is-ods-status-label-hidden` class.

Even if the label is hidden, it must be populated to ensure appropriate context for users of assistive technology.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <div class="ods-status is-ods-status-success is-ods-status-label-hidden">
      <span class="ods-status--label">
        Status label
      </span>
      <span class="ods-status--value">
        Status descriptor
      </span>
    </div>
  </div>

  ```html
  <div class="ods-status is-ods-status-success is-ods-status-label-hidden">
    <span class="ods-status--label">
      Status label
    </span>
    <span class="ods-status--value">
      Status descriptor
    </span>
  </div>
  ```
</figure>

:::
