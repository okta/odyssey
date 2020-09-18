<template>
  <article class="odo-main--content">
    <header class="odo-doc-header">
      <div>
        <h1 class="odo-doc-header--title">{{ $page.frontmatter.title }}</h1>
        <p class="odo-doc-header--lead">{{ $page.frontmatter.lead }}</p>
      </div>
      <div>
        <ul v-if="$page.frontmatter.links" class="odo-doc-header--links">
          <li v-for="link in $page.frontmatter.links" :key="link.label">
            <a :href="link.href" class="ods-button is-odo-button-shadow">
              {{ link.label }}
              <!-- eslint-disable -->
              <div
                class="odo-button-icon"
                v-html="
                  require(`!html-loader!../../docs/.vuepress/public/images/icon-${link.icon}.svg`)
                "
              />
              <!-- eslint-enable -->
            </a>
          </li>
        </ul>
      </div>
    </header>

    <OdsTabs
      id="tabs-doc-sections"
      :label="$page.frontmatter.name + ' documentation sections'"
      active="odyssey-overview"
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
