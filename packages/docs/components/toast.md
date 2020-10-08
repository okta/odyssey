---
template: component
title: Toast
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: Legacy docs
    href: https://github.com/okta/odyssey/blob/master/packages/docs/components/toast.md
---

::: slot overview

## Anatomy

<Description>

Descriptive content around **toast anatomy** should go here.

</Description>

<Anatomy img="/images/fpo.svg" />

:::

::: slot html-scss
## HTML & CSS
:::

::: slot nimatron-all

<ToastPen ref="toastBox"/>

# Toast

Toasts are non-disruptive messaging UIs that appear at the bottom right of the interface to provide quick, at-a-glance feedback on the outcome of an action.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is an info toast
      </h1>
      <p class="ods-toast--body">This is the default variant. It provides the user with neutral information.</p>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon" aria-hidden="true">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is an info toast
  </h1>
  <p class="ods-toast--body">
    This is the default variant. It provides the user with neutral information.
  </p>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
  ></button>
</aside>
```

</figure>

## Behavior

Toasts may be triggered by many different kinds of events, but they are always transient (self-dismissing). With this in mind, Toasts should not include any interactive or long-form content.

The Toast pen, `.ods-toast-pen`, will take care of positioning and layout automatically. Toasts will appear in the bottom-right corner of the viewport in the topmost content layer. 

If multiple Toasts are triggered at once, they will stack in order of appearance. In addition, when multiple Toasts are present, they will resize to match the largest Toast onscreen, ensuring visual consistency.

## Anatomy

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

## Variants

### Info

Info Toasts should be used to surface neutral information to users. 

This is the fallback variant for this component.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('info')">See it live</button>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is an info toast
      </h1>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon" aria-hidden="true">...s</svg>
  </span>
  <h1 class="ods-toast--title">
    This is an info toast
  </h1>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
```

</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is an info toast
      </h1>
      <p class="ods-toast--body">This is the default variant. It provides the user with neutral information.</p>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon" aria-hidden="true">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is an info toast
  </h1>
  <p class="ods-toast--body">
    This is the default variant. It provides the user with neutral information.
  </p>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
```

</figure>

### Success

Success Toasts should be used to inform users of successful or completed processes.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('success')">See it live</button>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-success">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM9.50016 3.42651L6.63849 8.8669L4.22481 7.07784C3.89245 6.83149 3.42613 6.89322 3.16837 7.21769C2.90629 7.5476 2.95548 8.02808 3.27889 8.29728L6.32704 10.8344C6.67432 11.1235 7.19733 11.0221 7.41313 10.6239L10.9026 4.18507C11.1185 3.78675 10.963 3.28766 10.5598 3.08475C10.173 2.89009 9.70251 3.04183 9.50016 3.42651Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is a success toast
      </h1>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-success">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is a success toast
  </h1>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
```

</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-success">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM9.50016 3.42651L6.63849 8.8669L4.22481 7.07784C3.89245 6.83149 3.42613 6.89322 3.16837 7.21769C2.90629 7.5476 2.95548 8.02808 3.27889 8.29728L6.32704 10.8344C6.67432 11.1235 7.19733 11.0221 7.41313 10.6239L10.9026 4.18507C11.1185 3.78675 10.963 3.28766 10.5598 3.08475C10.173 2.89009 9.70251 3.04183 9.50016 3.42651Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is a success toast
      </h1>
      <p class="ods-toast--body">It informs the user of an async success state.</p>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-success">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is a success toast
  </h1>
  <p class="ods-toast--body">It informs the user of an async success state.</p>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
```

</figure>

### Caution

Caution Toasts should be used to inform users of tasks or processes that may require their attention.

When using a Caution Toast, be sure the user does not require more context or guidance than you can comfortable give.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('caution')">See it live</button>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-caution">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.52856 1.29141L1.05633 12.2371C0.881095 12.5876 1.13594 13 1.52777 13H12.4722C12.8641 13 13.1189 12.5876 12.9437 12.2371L7.47144 1.29141C7.2772 0.902874 6.7228 0.902874 6.52856 1.29141ZM8 4.50001H6V9.00001H8V4.50001ZM7 12C7.55228 12 8 11.5523 8 11C8 10.4477 7.55228 10 7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is a caution toast
      </h1>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-caution">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is a caution toast
  </h1>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
```

</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-caution">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.52856 1.29141L1.05633 12.2371C0.881095 12.5876 1.13594 13 1.52777 13H12.4722C12.8641 13 13.1189 12.5876 12.9437 12.2371L7.47144 1.29141C7.2772 0.902874 6.7228 0.902874 6.52856 1.29141ZM8 4.50001H6V9.00001H8V4.50001ZM7 12C7.55228 12 8 11.5523 8 11C8 10.4477 7.55228 10 7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is a caution toast
      </h1>
      <p class="ods-toast--body">It informs the user about a crucial decision-point.</p>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-caution">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is a caution toast
  </h1>
  <p class="ods-toast--body">
    It informs the user about a crucial decision-point.
  </p>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
```

</figure>

### Danger

Danger Toasts should be used to inform users that an error has occurred.

When using a Danger Toast, be sure that the error is also logged elsewhere, so a user can refer to it later.

Do not use Danger Toasts for in-page errors such as invalid form fields. Instead, use static messaging the user can refer to while addressing their error.

<button class="ods-button is-ods-button-secondary" v-on:click="addToast('danger')">See it live</button>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-danger">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.63381 1.15168L1.15168 6.63381C0.949439 6.83605 0.949439 7.16395 1.15168 7.36619L6.63381 12.8483C6.83605 13.0506 7.16395 13.0506 7.36619 12.8483L12.8483 7.36619C13.0506 7.16395 13.0506 6.83605 12.8483 6.63381L7.36619 1.15168C7.16395 0.949439 6.83605 0.949439 6.63381 1.15168ZM6 3.00001H8V8H6V3.00001ZM8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9C7.55228 9 8 9.44771 8 10Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is a danger toast
      </h1>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-danger">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is a danger toast
  </h1>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
```

</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-danger">
      <span class="ods-toast--icon">
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.63381 1.15168L1.15168 6.63381C0.949439 6.83605 0.949439 7.16395 1.15168 7.36619L6.63381 12.8483C6.83605 13.0506 7.16395 13.0506 7.36619 12.8483L12.8483 7.36619C13.0506 7.16395 13.0506 6.83605 12.8483 6.63381L7.36619 1.15168C7.16395 0.949439 6.83605 0.949439 6.63381 1.15168ZM6 3.00001H8V8H6V3.00001ZM8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9C7.55228 9 8 9.44771 8 10Z" fill="currentColor"/></svg>
      </span>
      <h1 class="ods-toast--title">
        This is a danger toast
      </h1>
      <p class="ods-toast--body">It warns the user about an error.</p>
      <button class="ods-toast--dismiss" aria-label="Dismiss toast" data-micromodal-close></button>
    </aside>
  </div>

```html
<aside role="status" class="ods-toast is-sample-animation-off is-ods-toast-danger">
  <span class="ods-toast--icon">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon">...</svg>
  </span>
  <h1 class="ods-toast--title">
    This is a danger toast
  </h1>
  <p class="ods-toast--body">It warns the user about an error.</p>
  <button
    class="ods-toast--dismiss"
    aria-label="Dismiss toast"
    data-micromodal-close
  ></button>
</aside>
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
      console.log(variant);
      this.$refs.toastBox.addToast(variant)
    }
  }
}
</script>
