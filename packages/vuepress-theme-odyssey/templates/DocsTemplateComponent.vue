<template>
  <article class="docs-main--content">
    <DocsPageHeader
      :title="$page.frontmatter.title"
      :lead="$page.frontmatter.lead"
    >
      <template v-slot:right>
        <ul v-if="$page.frontmatter.links" class="docs-page-header--links">
          <li v-for="link in $page.frontmatter.links" :key="link.label">
            <a :href="link.href">
              <!-- eslint-disable -->
              <span
              aria-hidden
              v-if="link.icon"
              v-html="require(`!html-loader!../public/images/icon-${link.icon}.svg`)"
              />
              <!-- eslint-disable -->
              {{ link.label }}
            </a>
          </li>
        </ul>
      </template>
    </DocsPageHeader>

    <OdsTabs
      id="tabs-doc-sections"
      class="docs-main--content-tabs"
      :label="$page.frontmatter.name + ' documentation sections'"
      :active="$page.frontmatter.tabs[0].id"
      :tablist="$page.frontmatter.tabs"
    >
      <template v-for="slot in $page.frontmatter.tabs" :slot="slot.id">
        <Content :key="slot.id" :slot-key="slot.id" class="docskit-container" />
      </template>
    </OdsTabs>
    <footer>
      <DocsPagination :sidebarItems="$site.themeConfig.nav">
        Have questions? <span class="u-visually-hidden">Ask us on slack!</span>
        <div class="has-ods-tooltip">
          <a :href="$site.themeConfig.links.slack" target="_blank" aria-describedby="component-slack">#odyssey</a>
          <aside id="component-slack" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
            Oktanauts-only for now
          </aside>
        </div>
      </DocsPagination>
    </footer>
  </article>
</template>

<script>
export default {
  name: "DocsTemplateComponent",
  components: {
    DocsPageHeader: () => import("../components/DocsPageHeader.vue"),
    DocsPagination: () => import("../components/DocsPagination.vue"),
    OdsTabs: () => import("../global-components/OdsTabs.vue")
  }
};
</script>
