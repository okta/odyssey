<template>
  <header
    :class="{
      'docs-page-header': true,
      [`is-page-header-${variant}`]: true
    }"
  >
    <h1 class="docs-page-header--title">{{ title }}</h1>
    <p v-if="lede" class="docs-page-header--lede">{{ lede }}</p>
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
    lede: {
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
