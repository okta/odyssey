---
template: component
id: component-status
title: Status
description: Status is used to inform users by providing feedback on system states.
lead: Status is used to inform users by providing feedback on system states. Status can display broad operational states as well as granular states like user status.
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
  <dl class="ods-status">
    <dt class="ods-status--label">
      Propulsion systems
    </dt>
    <dd class="ods-status--value">
      Engines offline
    </dd>
  </dl>
</Visual>

### Success

<Description>

Success Statuses are green and should be used to indicate states like "Complete", "Active", or "Service operational".

</Description>

<Visual>
  <dl class="ods-status is-ods-status-success">
    <dt class="ods-status--label">
      Propulsion systems
    </dt>
    <dd class="ods-status--value">
      Online
    </dd>
  </dl>
</Visual>

### Caution

<Description>

Caution Statuses are yellow and should be used to indicate states like "Attention suggested" or "Service degradation".

</Description>

<Visual>
  <dl class="ods-status is-ods-status-caution">
    <dt class="ods-status--label">
      Propulsion systems
    </dt>
    <dd class="ods-status--value">
      Check engine
    </dd>
  </dl>
</Visual>

### Danger

<Description>

Danger Statuses are red and should be used to indicate states like "Error", "Failure", or "Service disruption".

</Description>

<Visual>
  <dl class="ods-status is-ods-status-danger">
    <dt class="ods-status--label">
      Propulsion systems
    </dt>
    <dd class="ods-status--value">
      Warp core disruption
    </dd>
  </dl>
</Visual>

## Usage

<Description>

Use Status to communicate the state of a discrete item, such as a server or individual process. Both labeled and unlabeled variants are acceptable, but should follow the associated guidelines.

</Description>

<Visual>
  <dl class="ods-status is-ods-status-success">
    <dt class="ods-status--label">
      Engine performance
    </dt>
    <dd class="ods-status--value">
      Nominal
    </dd>
  </dl>
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
  <dl class="ods-status is-ods-status-success">
    <dt class="ods-status--label">
      Warp drive status
    </dt>
    <dd class="ods-status--value">
      Engaged
    </dd>
  </dl>
</Visual>

### Statuses without labels

<Description>

Where necessary, labels may be hidden. If a label is not present, ensure the Status copy communicates appropriate context. Even if the label is hidden, it must be populated to ensure context for users of assistive technology.

</Description>

<Visual>
  <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
    <dt class="ods-status--label">
      Warp drive status
    </dt>
    <dd class="ods-status--value">
      Warp drive engaged
    </dd>
  </dl>
</Visual>

:::

::: slot html-scss

## Variants

### Neutral

<figure class="docs-example">
  <div class="docs-example--rendered">
    <dl class="ods-status">
      <dt class="ods-status--label">
        Status label
      </dt>
      <dd class="ods-status--value">
        Neutral descriptor
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status">
    <dt class="ods-status--label">
      Status label
    </dt>
    <dd class="ods-status--value">
      Neutral descriptor
    </dd>
  </dl>
  ```
</figure>

### Success

<figure class="docs-example">
  <div class="docs-example--rendered">
    <dl class="ods-status is-ods-status-success">
      <dt class="ods-status--label">
        Status label
      </dt>
      <dd class="ods-status--value">
        Success descriptor
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-success">
    <dt class="ods-status--label">
      Status label
    </dt>
    <dd class="ods-status--value">
      Success descriptor
    </dd>
  </dl>
  ```
</figure>

### Caution

<figure class="docs-example">
  <div class="docs-example--rendered">
    <dl class="ods-status is-ods-status-caution">
      <dt class="ods-status--label">
        Status label
      </dt>
      <dd class="ods-status--value">
        Caution descriptor
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-caution">
    <dt class="ods-status--label">
      Status label
    </dt>
    <dd class="ods-status--value">
      Caution descriptor
    </dd>
  </dl>
  ```
</figure>

### Danger

<figure class="docs-example">
  <div class="docs-example--rendered">
    <dl class="ods-status is-ods-status-danger">
      <dt class="ods-status--label">
        Status label
      </dt>
      <dd class="ods-status--value">
        Danger descriptor
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-danger">
    <dt class="ods-status--label">
      Status label
    </dt>
    <dd class="ods-status--value">
      Danger descriptor
    </dd>
  </dl>
  ```
</figure>

## Hiding labels

<Description>

Labels may be hidden by applying the `.is-ods-status-label-hidden` class.

Even if the label is hidden, it must be populated to ensure appropriate context for users of assistive technology.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
      <dt class="ods-status--label">
        Status label
      </dt>
      <dd class="ods-status--value">
        Status descriptor
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
    <dt class="ods-status--label">
      Status label
    </dt>
    <dd class="ods-status--value">
      Status descriptor
    </dd>
  </dl>
  ```
</figure>

## Async Status changes

<Description>

If the current state of Status may change asynchronously while a user is visiting the page, utilize the `role="status"` attribute to ensure that assistive technologies correctly indicate this change.

<strong>Note:</strong> This attribute must be present <em>before</em> the change occurs.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <dl class="ods-status is-ods-status-caution" role="status">
      <dt class="ods-status--label">
        Status label
      </dt>
      <dd class="ods-status--value">
        Live Status descriptor
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-caution" role="status">
    <dt class="ods-status--label">
      Status label
    </dt>
    <dd class="ods-status--value">
      Live Status descriptor
    </dd>
  </dl>
  ```
</figure>

:::
