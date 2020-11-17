<template>
  <Component
    :is="tag"
    :class="{
      'docskit--desc': true,
      [`is-docskit-desc-${variant}`]: variant
    }"
  >
    <slot />
  </Component>
</template>
<script>
export default {
  name: "Description",
  props: {
    variant: {
      type: String,
      required: false,
      default: null
    },
    tag: {
      default: "div",
      type: String
    }
  }
};
</script>
