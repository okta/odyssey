<template>
  <Component
    :is="tag"
    :class="{
      'docs-card--group': true,
      'is-2col': variant === '2col'
    }"
  >
    <slot></slot>
  </Component>
</template>

<script>
export default {
  name: "DocsCardGroup",
  props: {
    variant: {
      type: String,
      required: false,
      default: null
    },
    tag: {
      type: String,
      default: "div"
    }
  }
};
</script>
