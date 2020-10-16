<template>
  <article class="docs-main--content is-template-plain">
    <DocsPageHeader
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
  }
};
</script>
