<template>
  <article class="docs-main--index">
    <!-- TODO: Componentize "Hero" -->
    <header class="docs-hero">
      <div class="docs-hero--content">
        <h1>{{ $page.frontmatter.title }}</h1>
        <p>{{ $page.frontmatter.lead }}</p>
      </div>
    </header>

    <DocsCardGroup>
      <DocsCard
        v-for="(item, index) in content"
        :key="index"
        variant="plain"
        class="docs-card--index"
      >
        <template slot="header">
          <!-- eslint-disable -->
          <div
            aria-hidden
            class="docs-card--header-image"
            v-html="
              require(`!html-loader!../../docs/.vuepress/public/images/illustration-fpo.svg`)
            "
          />
          <!-- eslint-enable -->
          <h2>{{ item.title }}</h2>
        </template>
        <div class="docs-card--index-description">
          <p>Et morbi eget at consectetur. Elit aenean mi phasellus.</p>
        </div>
        <template slot="footer">
          <DocsLink :href="item.link"
            >Learn more
            <span class="u-visually-hidden"
              >about {{ item.title }}</span
            ></DocsLink
          >
        </template>
      </DocsCard>
    </DocsCardGroup>
  </article>
</template>

<script>
export default {
  name: "DocsTemplateIndex",
  components: {
    DocsLink: () => import("../components/DocsLink.vue"),
    DocsCard: () => import("../components/DocsCard.vue"),
    DocsCardGroup: () => import("../components/DocsCardGroup.vue")
  },
  computed: {
    content() {
      const nav = this.$site.themeConfig.nav.primary;
      const sectionName = this.$page.frontmatter.title;

      return nav.filter(obj => obj.title === sectionName)[0].children;
    }
  }
};
</script>
