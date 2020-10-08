---
template: component
title: Toast
lead: Toasts are non-disruptive messaging UIs that appear at the bottom right of the interface to provide quick, at-a-glance feedback on the outcome of an action.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/toast.md
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

<span class="fpo">Descriptive content around **toast anatomy** should go here.</span>

</Description>

<Anatomy img="/images/fpo.svg" />


<ToastPen ref="toastBox"/>


## <span class="fpo">Anatomy</span>

<Description class="fpo">

<span class="fpo negative">This section is closely related to the above. Sort out how to best handle detailed anatomy.</span>

Each Toast is made of up to four components:

<dl>
  <dt>Icon &amp; color</dt>
  <dd>These are mapped to the different variants of Toast and shouldn't be mixed. See below for more details.</dd>
  <dt>Dismiss "X"</dt>
  <dd>Included to ensure users are able to dismiss Toasts manually. Placement is handled automatically based on content.</dd>
  <dt>Title</dt>
  <dd>Provides quick context; one line max</dd>
  <dt>Body (Optional)</dt>
  <dd>Supplemental information. Be concise - less than three lines of content - as your Toast will soon vanish!</dd>
</dl>

</Description>

<Example>
  <div class="ods-toast-pen is-sample-static">
    <Toast
      class="is-sample-animation-off"
      title="This is an info toast"
      body="This is the default variant. It provides the user with neutral information."
    />
  </div>
</Example>

## Behavior

<Description>

Toasts may be triggered by many different kinds of events, but they are always transient (self-dismissing). With this in mind, Toasts should not include any interactive or long-form content.

The Toast pen, `.ods-toast-pen`, will take care of positioning and layout automatically. Toasts will appear in the bottom-right corner of the viewport in the topmost content layer. 

If multiple Toasts are triggered at once, they will stack in order of appearance. In addition, when multiple Toasts are present, they will resize to match the largest Toast onscreen, ensuring visual consistency.

</Description>

## Variants

<Description>

<span class="fpo">Descriptive content around **toast variants** should go here.</span>

</Description>

### Info

<Description>

Info Toasts should be used to surface neutral information to users. 

This is the fallback variant for this component.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('info')">See it live</button>

</Description>


<Example>
  <div class="ods-toast-pen is-sample-static">
    <Toast
      class="is-sample-animation-off"
      title="This is an info toast"
    />
    <Toast
      class="is-sample-animation-off"
      title="This is an info toast"
      body="This is the default variant. It provides the user with neutral information."
    />
  </div>
</Example>

### Success

<Description>

Success Toasts should be used to inform users of successful or completed processes.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('success')">See it live</button>

</Description>

<Example>
  <div class="ods-toast-pen is-sample-static">
    <Toast
      class="is-sample-animation-off"
      variant="success"
      title="This is a success toast"
    />
    <Toast
      class="is-sample-animation-off"
      variant="success"
      title="This is a success toast"
      body="It informs the user of an async success state."
    />
  </div>
</Example>

### Caution

<Description>

Caution Toasts should be used to inform users of tasks or processes that may require their attention.

When using a Caution Toast, be sure the user does not require more context or guidance than you can comfortable give.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('caution')">See it live</button>

</Description>

<Example>
  <div class="ods-toast-pen is-sample-static">
    <Toast
      class="is-sample-animation-off"
      variant="caution"
      title="This is a caution toast"
    />
    <Toast
      class="is-sample-animation-off"
      variant="caution"
      title="This is a caution toast"
      body="It informs the user about a crucial decision-point."
    />
  </div>
</Example>

### Danger

<Description>

Danger Toasts should be used to inform users that an error has occurred.

When using a Danger Toast, be sure that the error is also logged elsewhere, so a user can refer to it later.

Do not use Danger Toasts for in-page errors such as invalid form fields. Instead, use static messaging the user can refer to while addressing their error.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('danger')">See it live</button>

</Description>

<Example>
  <div class="ods-toast-pen is-sample-static">
    <Toast
      class="is-sample-animation-off"
      variant="danger"
      title="This is a danger toast"
    />
    <Toast
      class="is-sample-animation-off"
      variant="danger"
      title="This is a danger toast"
      body="It warns the user about an async, or other error."
    />
  </div>
</Example>

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
