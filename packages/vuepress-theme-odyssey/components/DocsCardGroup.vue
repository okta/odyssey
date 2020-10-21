<template>
  <div
    :class="{
      'docs-card--group': true,
      'is-2col': variant === '2col'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DocsCardGroup",
  props: {
    variant: {
      type: String,
      default: null,
      validator: value => ["2col"].includes(value)
    }
  }
};
</script>
