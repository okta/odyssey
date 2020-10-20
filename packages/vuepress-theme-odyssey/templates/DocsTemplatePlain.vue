<template>
  <article class="docs-main--content is-template-plain">
    <DocsPageHeader
      :variant="$page.frontmatter.pageHeaderVariant || 'default'"
      :title="$page.frontmatter.title"
      :lead="$page.frontmatter.lead"
    />

    <hr />

    <Content />
  </article>
</template>

<script>
export default {
  name: "DocsTemplatePlain",
  components: {
    DocsPageHeader: () => import("../components/DocsPageHeader.vue")
  },
  props: {
    docsHeaderVariant: {
      type: String,
      required: false,
      default: "default",
      validator: value =>
        ["default", "base", "components", "icon"].includes(value)
    }
  }
};
</script>
