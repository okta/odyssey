<template>
  <article class="docs-main--content">
    <header class="docs-doc-header">
      <h1 class="docs-doc-header--title">{{ $page.frontmatter.title }}</h1>
      <p class="docs-doc-header--lead">{{ $page.frontmatter.lead }}</p>
      <ul v-if="$page.frontmatter.links" class="docs-doc-header--links">
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
    </header>
    <OdsTabs
      id="tabs-doc-sections"
      :label="$page.frontmatter.name + ' documentation sections'"
      :active="$page.frontmatter.tabs[0].id"
      :tablist="$page.frontmatter.tabs"
    >
      <template v-for="slot in $page.frontmatter.tabs" :slot="slot.id">
        <Content :key="slot.id" :slot-key="slot.id" class="docskit-container" />
      </template>
    </OdsTabs>
    <footer class="docs-doc-footer"> 
      Need help? <a href="#">#odyssey</a>
    </footer>
  </article>
</template>

<script>
export default {
  name: "DocsTemplateComponent",
  components: {
    OdsTabs: () => import("../global-components/OdsTabs.vue")
  }
};
</script>
