<template>
  <article class="docs-main--content is-template-plain">
    <DocsPageHeader
      :variant="$page.frontmatter.pageHeaderVariant || 'default'"
      :title="$page.frontmatter.headline"
      :lead="$page.frontmatter.lead"
    />

    <hr />

    <Content />

    <footer class="page-footer">
      <p>
        Have questions? <span class="u-visually-hidden">Ask us on slack!</span>
        <span class="has-ods-tooltip">
          <a
            :href="$site.themeConfig.links.slack"
            target="_blank"
            aria-describedby="component-slack"
            >#odyssey</a
          >
          <aside
            id="component-slack"
            class="ods-tooltip is-ods-tooltip-top"
            role="tooltip"
          >
            Oktanauts-only for now
          </aside>
        </span>
      </p>
    </footer>
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
