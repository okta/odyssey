---
template: component
title: Status
lead: Status is used to keep users informed, by providing appropriate feedback on particular concepts or entities. For Okta, status can be used to display overall operational status all the way down to very granular concepts, like user status.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/radio-button.md
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_status.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/rBPRx3GCZ1DHNmFCwZNJ8f/Status?node-id=25%3A2
---

::: slot overview

## Anatomy

<Description>

Like other smaller components, Status is quite simple. Below you can see there are two versions. One with a label, and one without. Beyond that, there is a Status and Status Descriptor.

</Description>

<Anatomy img="/images/anatomy-status-1.svg" />

<Anatomy img="/images/anatomy-status-2.svg" />

## Usage

<Description>

Status should be used to communicate the state of a discrete item, such as a server or individual process. Both labeled and unlabeled variants are acceptable, but should follow the associated guidelines below.

</Description>

<Example>
  <dl class="ods-status is-ods-status-success">
    <dt class="ods-status--label">
      Server status
    </dt>
    <dd class="ods-status--value">
      System operational
    </dd>
  </dl>
</Example>

## Variants

<Description>

There are four variants of Status available: Neutral, Success, Caution, and Danger.

</Description>

### Neutral

<Description>

Neutral Statuses are gray and should be used to indicate states like Paused, Not started, or Queued.

This variant is our default.

</Description>

<Example>
  <dl class="ods-status">
    <dt class="ods-status--label">
      Server status
    </dt>
    <dd class="ods-status--value">
      System inactive
    </dd>
  </dl>
</Example>

### Success

<Description>

Success Statuses are green and should be used to indicate states like Complete, Active, Available, Service operational.

</Description>

<Example>
  <dl class="ods-status is-ods-status-success">
    <dt class="ods-status--label">
      Server status
    </dt>
    <dd class="ods-status--value">
      System operational
    </dd>
  </dl>
</Example>

### Caution

<Description>

Caution Statuses are yellow and should be used to indicate states like Attention suggested or Service degradation.

</Description>

<Example>
  <dl class="ods-status is-ods-status-caution">
    <dt class="ods-status--label">
      Server status
    </dt>
    <dd class="ods-status--value">
      Service degradation
    </dd>
  </dl>
</Example>

### Danger

<Description>

Danger Statuses are red and should be used to indicate states like Error, Failure, or Service disruption.

</Description>

<Example>
  <dl class="ods-status is-ods-status-danger">
    <dt class="ods-status--label">
      Server status
    </dt>
    <dd class="ods-status--value">
      Service disruption
    </dd>
  </dl>
</Example>

## Content guidelines
  
Status is intended to be both succinct and easily understood; limit label and description to one to two words. As with other components, use sentence casing for both.
:::

::: slot html-scss

### Neutral

<figure class="odo-example">
  <div class="odo-example--rendered">
    <dl class="ods-status">
      <dt class="ods-status--label">
        Server status
      </dt> 
      <dd class="ods-status--value">
        System inactive
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status">
    <dt class="ods-status--label">
      Server status
    </dt> 
    <dd class="ods-status--value">
      System inactive
    </dd>
  </dl>
  ```
</figure>

### Success

<figure class="odo-example">
  <div class="odo-example--rendered">
    <dl class="ods-status is-ods-status-success">
      <dt class="ods-status--label">
        Server status
      </dt> 
      <dd class="ods-status--value">
        System operational
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-success">
    <dt class="ods-status--label">
      Server status
    </dt> 
    <dd class="ods-status--value">
      System operational
    </dd>
  </dl>
  ```
</figure>

### Caution

<figure class="odo-example">
  <div class="odo-example--rendered">
    <dl class="ods-status is-ods-status-caution">
      <dt class="ods-status--label">
        Server status
      </dt> 
      <dd class="ods-status--value">
        Service degredation
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-caution">
    <dt class="ods-status--label">
      Server status
    </dt> 
    <dd class="ods-status--value">
      Service degredation
    </dd>
  </dl>
  ```
</figure>

### Caution

<figure class="odo-example">
  <div class="odo-example--rendered">
    <dl class="ods-status is-ods-status-danger">
      <dt class="ods-status--label">
        Server status
      </dt> 
      <dd class="ods-status--value">
        Service disruption
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-danger">
    <dt class="ods-status--label">
      Server status
    </dt> 
    <dd class="ods-status--value">
      Service disruption
    </dd>
  </dl>
  ```
</figure>

## Accessibility

In addition to including copy for assistive technologies, consider whether your Status may change while the user is on the page.

If the current state of Status may change asynchronously while a user is visiting the page, utilize the `role="status"` attribute to ensure that assistive technologies correctly indicate this change.

<strong>Note:</strong> This attribute must be present <em>before</em> the change occurs.

<figure class="odo-example">
  <div class="odo-example--rendered">
    <dl class="ods-status is-ods-status-danger" role="status">
      <dt class="ods-status--label">
        Server status
      </dt>
      <dd class="ods-status--value">
        Service disruption
      </dd>
    </dl>
  </div>

  ```html
    <dl class="ods-status is-ods-status-danger" role="status">
      <dt class="ods-status--label">
        Server status
      </dt>
      <dd class="ods-status--value">
        Service disruption
      </dd>
    </dl>
  ```
</figure>


### Assistive labels

Labels may be hidden by applying the `.is-ods-status-label-hidden` class. If a label is not visually present, ensure that appropriate context is communicated by the Status itself and close proximity to the content that it’s supporting.

Even if the label is hidden, it must be populated to ensure appropriate context for users of assistive technology.

<figure class="odo-example">
  <div class="odo-example--rendered">
    <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
      <dt class="ods-status--label">
        Server status
      </dt>
      <dd class="ods-status--value">
        System operational
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
    <dt class="ods-status--label">
      Server status
    </dt>
    <dd class="ods-status--value">
      System operational
    </dd>
  </dl>
  ```
</figure>

:::
