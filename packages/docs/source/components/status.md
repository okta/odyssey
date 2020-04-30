# Status

Status is used to keep users informed, by providing appropriate feedback on particular concepts or entities. For Okta, status can be used to display overall operational status all the way down to very granular concepts, like user status.

## Usage

Status should be used to communicate the state of a discrete item, such as a server or individual process. Both labeled and unlabeled variants are acceptable, but should follow the associated guidelines below.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

Labels may be hidden by applying the `.is-ods-status-label-hidden` class. If a label is not visually present, ensure that appropriate context is communicated by the Status itself and close proximity to the content that it’s supporting.

Even if the label is hidden, it must be populated to ensure appropriate context for users of assistive technology.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

## Variants

There are four variants of Status available: Neutral, Success, Caution, and Danger.

### Neutral

Neutral Statuses are gray and should be used to indicate states like Paused, Not started, or Queued.

This variant is our default.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

Success Statuses are green and should be used to indicate states like Complete, Active, Available, Service operational.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

Caution Statuses are yellow and should be used to indicate states like Attention suggested or Service degradation.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <dl class="ods-status is-ods-status-caution">
      <dt class="ods-status--label">
        Server status
      </dt>
      <dd class="ods-status--value">
        Service degradation
      </dd>
    </dl>
  </div>

  ```html
  <dl class="ods-status is-ods-status-caution">
    <dt class="ods-status--label">
      Server status
    </dt>
    <dd class="ods-status--value">
      Service degradation
    </dd>
  </dl>
  ```
</figure>

### Danger

Danger Statuses are red and should be used to indicate states like Error, Failure, or Service disruption.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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

## Content guidelines

Status is intended to be both succinct and easily understood; limit label and description to one to two words. As with other components, use sentence casing for both.

## Accessibility

In addition to including copy for assistive technologies, consider whether your Status may change while the user is on the page.

If the current state of Status may change asynchronously while a user is visiting the page, utilize the `role="status"` attribute to ensure that assistive technologies correctly indicate this change.

<strong>Note:</strong> This attribute must be present <em>before</em> the change occurs.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
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
