---
template: component
id: component-toast
title: Toast
lead: Toasts are transient, non-disruptive messages that provide at-a-glance, asynchronous feedback or updates.
description: Toasts are transient bits of messaging that provide quick, at-a-glance feedback.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_toast.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/da96Y9G5jD8TjpBp0bTAvB/Toast?node-id=25%3A2
---

::: slot overview

## Anatomy

<Description>

Each Toast is made up of up to four parts: Icon & Color, Title, Body, and a Dismiss Button.

</Description>

<Anatomy img="images/anatomy-toast.svg" />


<OdsToastPen ref="toastBox"/>

<Description>

<dl>
  <dt>Icon &amp; Color</dt>
  <dd>These are mapped to the different variants of Toast and shouldn't be mixed.</dd>
  <dt>Title</dt>
  <dd>Provides quick context; one line max</dd>
  <dt>Body (Optional)</dt>
  <dd>Supplemental information. Be concise - less than three lines of content - as your Toast will soon vanish!</dd>
  <dt>Dismiss "X"</dt>
  <dd>Included to ensure users are able to dismiss Toasts manually. Placement is handled automatically based on content.</dd>
</dl>

</Description>

<Visual>
  <div class="ods-toast-pen is-sample-static">
    <OdsToast
      class="is-sample-animation-off"
      title="Shuttle Endeavour has reached the hangar"
      body="No further action is necessary at this time."
    />
  </div>
</Visual>

## Behavior

<Description>

Toasts may be triggered by different types of events, but they are always transient. With this in mind, Toasts should not include any interactive or long-form content.

The Toast pen will take care of positioning and layout automatically. Toasts will appear in the bottom-right corner above all other content.

If multiple Toasts are triggered in a short time, they will stack in order of appearance. For visual consistency, Toasts will resize to match the largest Toast visible.

</Description>

## Variants

### Info

<Description>

Use Info Toasts to surface neutral information to users.

This is the default variant for this component.

<button class="ods-button" v-on:click="addToast('info')">Launch Toast</button>

</Description>


<Visual>
  <div class="ods-toast-pen is-sample-static">
    <OdsToast
      class="is-sample-animation-off"
      title="Shuttle Endeavour has reached the hangar"
    />
    <OdsToast
      class="is-sample-animation-off"
      title="Shuttle Endeavour has reached the hangar"
      body="No further action is necessary at this time."
    />
  </div>
</Visual>

### Success

<Description>

Use Success Toasts to inform users of successful or completed processes.

<button class="ods-button" v-on:click="addToast('success')">Launch Toast</button>

</Description>

<Visual>
  <div class="ods-toast-pen is-sample-static">
    <OdsToast
      class="is-sample-animation-off"
      variant="success"
      title="The lander has successfully docked"
    />
    <OdsToast
      class="is-sample-animation-off"
      variant="success"
      title="The lander has successfully docked"
      body="Operation was completed at 18:01 PST."
    />
  </div>
</Visual>

### Caution

<Description>

Use Caution Toasts to inform users of tasks or processes that may need their attention.

When using the Caution variant, ensure the user does not need more context than you can give in the space available.

<button class="ods-button" v-on:click="addToast('caution')">Launch Toast</button>

</Description>

<Visual>
  <div class="ods-toast-pen is-sample-static">
    <OdsToast
      class="is-sample-animation-off"
      variant="caution"
      title="T-minus thirty minutes til launch"
    />
    <OdsToast
      class="is-sample-animation-off"
      variant="caution"
      title="T-minus thirty minutes til launch"
      body="Please proceed to Mission Control."
    />
  </div>
</Visual>

### Danger

<Description>

Use Danger Toasts to inform users that an error has occurred.

When using a Danger Toast, be sure that the error is also logged elsewhere, so a user can refer to it later.

Do not use Danger Toasts for in-page errors such as invalid form fields. Instead, use static messaging the user can refer to while addressing their error.

<button class="ods-button" v-on:click="addToast('danger')">Launch Toast</button>

</Description>

<Visual>
  <div class="ods-toast-pen is-sample-static">
    <OdsToast
      class="is-sample-animation-off"
      variant="danger"
      title="Primary ignition cell is disconnected"
    />
    <OdsToast
      class="is-sample-animation-off"
      variant="danger"
      title="Primary ignition cell is disconnected"
      body="Shuttle is inoperable until repaired."
    />
  </div>
</Visual>

:::

::: slot html-scss
## Basic usage

### Info

<figure class="docs-example">
  <div class="docs-example--rendered">
    <OdsToast
      class="is-sample-animation-off"
      title="Title (optional)"
      body="Toast body text."
    />
  </div>

  ```html
  <aside role="status" class="is-sample-animation-off ods-toast is-ods-toast-info">
    <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="ods-icon">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"></path>
        </svg>
    </span>
    <h1 class="ods-toast--title">Title (optional)</h1>
    <p class="ods-toast--body">Toast body text.</p>
    <button aria-label="Dismiss toast" class="ods-toast--dismiss"></button>
  </aside>
  ```
</figure>

### Success

<figure class="docs-example">
  <div class="docs-example--rendered">
    <OdsToast
      class="is-sample-animation-off"
      variant="success"
      title="Title (optional)"
      body="Success Toast body text."
    />
  </div>

  ```html
  <aside role="status" class="is-sample-animation-off ods-toast is-ods-toast-success">
    <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="ods-icon">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM9.50016 3.42651L6.63849 8.8669L4.22481 7.07784C3.89245 6.83149 3.42613 6.89322 3.16837 7.21769C2.90629 7.5476 2.95548 8.02808 3.27889 8.29728L6.32704 10.8344C6.67432 11.1235 7.19733 11.0221 7.41313 10.6239L10.9026 4.18507C11.1185 3.78675 10.963 3.28766 10.5598 3.08475C10.173 2.89009 9.70251 3.04183 9.50016 3.42651Z" fill="currentColor"></path>
        </svg>
    </span>
    <h1 class="ods-toast--title">Title (optional)</h1>
    <p class="ods-toast--body">Success Toast body text.</p>
    <button aria-label="Dismiss toast" class="ods-toast--dismiss"></button>
  </aside>
  ```
</figure>

### Caution

<figure class="docs-example">
  <div class="docs-example--rendered">
    <OdsToast
      class="is-sample-animation-off"
      variant="caution"
      title="Title (optional)"
      body="Caution Toast body text."
    />
  </div>

  ```html
  <aside role="status" class="is-sample-animation-off ods-toast is-ods-toast-caution">
    <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="ods-icon">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.52856 1.29141L1.05633 12.2371C0.881095 12.5876 1.13594 13 1.52777 13H12.4722C12.8641 13 13.1189 12.5876 12.9437 12.2371L7.47144 1.29141C7.2772 0.902874 6.7228 0.902874 6.52856 1.29141ZM8 4.50001H6V9.00001H8V4.50001ZM7 12C7.55228 12 8 11.5523 8 11C8 10.4477 7.55228 10 7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12Z" fill="currentColor"></path>
        </svg>
    </span>
    <h1 class="ods-toast--title">Title (optional)</h1>
    <p class="ods-toast--body">Caution Toast body text.</p>
    <button aria-label="Dismiss toast" class="ods-toast--dismiss"></button>
  </aside>
  ```
</figure>

### Danger

<figure class="docs-example">
  <div class="docs-example--rendered">
    <OdsToast
      class="is-sample-animation-off"
      variant="danger"
      title="Title (optional)"
      body="Danger Toast body text."
    />
  </div>

  ```html
  <aside role="status" class="is-sample-animation-off ods-toast is-ods-toast-danger">
    <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="ods-icon">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.63381 1.15168L1.15168 6.63381C0.949439 6.83605 0.949439 7.16395 1.15168 7.36619L6.63381 12.8483C6.83605 13.0506 7.16395 13.0506 7.36619 12.8483L12.8483 7.36619C13.0506 7.16395 13.0506 6.83605 12.8483 6.63381L7.36619 1.15168C7.16395 0.949439 6.83605 0.949439 6.63381 1.15168ZM6 3.00001H8V8H6V3.00001ZM8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9C7.55228 9 8 9.44771 8 10Z" fill="currentColor"></path>
        </svg>
    </span>
    <h1 class="ods-toast--title">Title (optional)</h1>
    <p class="ods-toast--body">Danger Toast body text.</p>
    <button aria-label="Dismiss toast" class="ods-toast--dismiss"></button>
  </aside>
  ```
</figure>

## Toast pen

<Description>

`.ods-toast-pen` provides a container which is positioned fixed to the bottom right hand corner of a page. When a toast element is appended to it, motion is automatically handled for you using CSS animation.

</Description>

<figure class="docs-example">

<div class="docs-example--rendered is-docs-example--rendered-tall">
  <div class="ods-toast-pen is-sample-absolute">
    <aside role="status" class="is-sample-animation-off ods-toast is-ods-toast-danger">
      <span class="ods-toast--icon">
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="ods-icon">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.63381 1.15168L1.15168 6.63381C0.949439 6.83605 0.949439 7.16395 1.15168 7.36619L6.63381 12.8483C6.83605 13.0506 7.16395 13.0506 7.36619 12.8483L12.8483 7.36619C13.0506 7.16395 13.0506 6.83605 12.8483 6.63381L7.36619 1.15168C7.16395 0.949439 6.83605 0.949439 6.63381 1.15168ZM6 3.00001H8V8H6V3.00001ZM8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9C7.55228 9 8 9.44771 8 10Z" fill="currentColor"></path>
          </svg>
      </span>
      <h1 class="ods-toast--title">Title (optional)</h1>
      <p class="ods-toast--body">Danger Toast body text.</p>
      <button aria-label="Dismiss toast" class="ods-toast--dismiss"></button>
    </aside>
  </div>
</div>

</div>

```html
<div class="ods-toast-pen">
  <aside role="status" class="is-sample-animation-off ods-toast is-ods-toast-danger">
    <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="ods-icon">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.63381 1.15168L1.15168 6.63381C0.949439 6.83605 0.949439 7.16395 1.15168 7.36619L6.63381 12.8483C6.83605 13.0506 7.16395 13.0506 7.36619 12.8483L12.8483 7.36619C13.0506 7.16395 13.0506 6.83605 12.8483 6.63381L7.36619 1.15168C7.16395 0.949439 6.83605 0.949439 6.63381 1.15168ZM6 3.00001H8V8H6V3.00001ZM8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9C7.55228 9 8 9.44771 8 10Z" fill="currentColor"></path>
        </svg>
    </span>
    <h1 class="ods-toast--title">Title (optional)</h1>
    <p class="ods-toast--body">Danger Toast body text.</p>
    <button aria-label="Dismiss toast" class="ods-toast--dismiss"></button>
  </aside>
</div>
```

</figure>

:::


<script>
export default {
  data ()  {
    return { modalCount: 0 }
  },
  methods: {
    addToast(variant) {
      this.$refs.toastBox.addToast(variant)
    }
  }
}
</script>
