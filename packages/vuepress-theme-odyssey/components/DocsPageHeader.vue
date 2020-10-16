<template>
  <header class="docs-page-header">
    <h1 class="docs-page-header--title">{{ title }}</h1>
    <p v-if="lead" class="docs-page-header--lead">{{ lead }}</p>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  name: "DocsPageHeader",
  props: {
    title: {
      type: String,
      default: "default"
    },
    lead: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>
