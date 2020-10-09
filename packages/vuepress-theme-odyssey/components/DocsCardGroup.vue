<template>
  <div
    :class="{
      'docs-card--group': true
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DocsCardGroup"
};
</script>
