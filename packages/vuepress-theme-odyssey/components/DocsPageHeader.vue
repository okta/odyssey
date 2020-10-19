<template>
  <header
    :class="{
      'docs-page-header': true,
      [`is-page-header-${variant}`]: true
    }"
  >
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
    },
    variant: {
      type: String,
      required: false,
      default: "default",
      validator: value =>
        ["default", "base", "components", "icon"].includes(value)
    }
  }
};
</script>
