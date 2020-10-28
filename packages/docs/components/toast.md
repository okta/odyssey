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

<Anatomy img="/images/anatomy-toast.svg" />


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
## HTML & CSS
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
