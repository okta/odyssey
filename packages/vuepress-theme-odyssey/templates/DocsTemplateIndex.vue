<template>
  <article class="docs-index">
    <DocsPageHeader
      :title="$page.frontmatter.title"
      :lead="$page.frontmatter.lead"
      :variant="$page.frontmatter.id"
    />
    <DocsCardGroup
      tag="ul"
      :variant="$page.frontmatter.id === 'base' && '2col'"
    >
      <DocsCard
        v-for="(page, index) in content"
        :key="index"
        tag="li"
        variant="shadow"
        class="docs-index--card"
      >
        <template slot="header">
          <!-- eslint-disable -->
        <div
          aria-hidden
          class="docs-card--header-image"
          v-html="
            require(`!html-loader!../../docs/.vuepress/public/images/coin-${page.id || 'fpo'}.svg`)
          "
        />
          <!-- eslint-enable -->
          <h2>{{ page.title }}</h2>
        </template>
        <div class="docs-index--card-description">
          <p>
            {{ page.description }}
          </p>
        </div>
        <template slot="footer">
          <DocsLink :href="page.link">
            Learn more
            <span class="u-visually-hidden">about {{ page.title }}</span>
          </DocsLink>
        </template>
      </DocsCard>
    </DocsCardGroup>
  </article>
</template>

<script>
export default {
  name: "DocsTemplateIndex",
  components: {
    DocsPageHeader: () => import("../components/DocsPageHeader.vue"),
    DocsLink: () => import("../components/DocsLink.vue"),
    DocsCard: () => import("../components/DocsCard.vue"),
    DocsCardGroup: () => import("../components/DocsCardGroup.vue")
  },
  computed: {
    content() {
      const pages = this.$site.pages;
      const sectionId = this.$page.frontmatter.id;

      const content = pages.reduce((result, page) => {
        if (
          page.relativePath.split("/")[0] === sectionId &&
          sectionId !== page.frontmatter.id
        ) {
          result.push({
            ...page.frontmatter,
            link: page.path
          });
        }

        return result.sort((a, b) => a.title.localeCompare(b.title));
      }, []);

      return content;
    }
  }
};
</script>
