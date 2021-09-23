<template>
  <header class="docs-topbar">
    <slot name="left"></slot>
    <DocsLink class="docs-site-title" href="/">{{ title }}</DocsLink>
  </header>
</template>

<script>
export default {
  name: "DocsTopbar",
  components: {
    DocsLink: () => import("./DocsLink.vue")
  },
  props: {
    title: {
      type: String,
      default: "default"
    }
  }
};
</script>
