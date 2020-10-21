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
      default: null,
      validator: value => ["2col"].includes(value)
    },
    tag: {
      type: String,
      default: "div"
    }
  }
};
</script>
