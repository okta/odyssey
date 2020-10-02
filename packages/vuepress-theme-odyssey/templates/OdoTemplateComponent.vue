<template>
  <article class="odo-main--content">
    <header class="odo-doc-header">
      <h1 class="odo-doc-header--title">{{ $page.frontmatter.title }}</h1>
      <p class="odo-doc-header--lead">{{ $page.frontmatter.lead }}</p>
      <ul v-if="$page.frontmatter.links" class="odo-doc-header--links">
        <li v-for="link in $page.frontmatter.links" :key="link.label">
          <a :href="link.href">
            {{ link.label }}
            <!-- eslint-disable -->
            <div
              class="odo-button-icon"
              v-html="
                require(`!html-loader!../../docs/.vuepress/public/images/icon-${link.icon}.svg`)
              "
            />
            <!-- eslint-disable -->
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
        <Content :key="slot.id" :slot-key="slot.id" />
      </template>
    </OdsTabs>
  </article>
</template>

<script>
export default {
  name: "OdoTemplateComponent",
  components: {
    OdsTabs: () => import("../global-components/OdsTabs.vue")
  }
};
</script>
