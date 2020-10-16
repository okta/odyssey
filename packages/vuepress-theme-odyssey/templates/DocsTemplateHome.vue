<template>
  <article class="docs-main--home">
    <!-- TODO: Componentize "Hero" (large layout) -->
    <header class="docs-hero docs-hero--layout-l">
      <div class="docs-hero--content">
        <h1>{{ $page.frontmatter.headline }}</h1>
        <p>{{ $page.frontmatter.lead }}</p>
      </div>
    </header>

    <DocsCardGroup>
      <DocsCard
        v-for="(section, index) in $page.frontmatter.contentPrimary"
        :key="index"
      >
        <template slot="header">
          <!-- eslint-disable -->
          <div
            aria-hidden="true"
            class="docs-card--header-image"
            v-html="
              require(`!html-loader!../../docs/.vuepress/public/images/coin-component-fpo.svg`)
            "
          />
          <!-- eslint-enable -->

          <h3>{{ section.title }}</h3>
        </template>
        <p>{{ section.description }}</p>
        <template slot="footer">
          <DocsLink :href="section.href">{{ section.label }}</DocsLink>
        </template>
      </DocsCard>
    </DocsCardGroup>

    <!-- TODO: Componentize Principle -->
    <div class="docs-principle">
      <h1>{{ $page.frontmatter.principle.title }}</h1>
      <p>
        {{ $page.frontmatter.principle.description }}
      </p>
      <DocsLink :href="$page.frontmatter.principle.href">{{
        $page.frontmatter.principle.label
      }}</DocsLink>
    </div>

    <DocsCardGroup>
      <DocsCard
        v-for="(resource, index) in $page.frontmatter.resources"
        :key="index"
      >
        <template slot="header">
          <!-- eslint-disable -->
          <div
            aria-hidden="true"
            class="docs-card--header-image"
            v-html="require(`!html-loader!../public/images/icon-${resource.illustration}.svg`)"
          />
          <!-- eslint-enable -->
          <h3>{{ resource.title }}</h3>
        </template>
        <p>{{ resource.description }}</p>
        <template slot="footer">
          <DocsLink :href="resource.href">{{ resource.label }}</DocsLink>
        </template>
      </DocsCard>
    </DocsCardGroup>

    <DocsCardGroup>
      <DocsCard
        v-for="(section, index) in $page.frontmatter.contentSecondary"
        :key="index"
        variant="plain"
      >
        <h3>{{ section.title }}</h3>
        <p>{{ section.description }}</p>
        <DocsLink :href="section.href">{{ section.label }}</DocsLink>
      </DocsCard>
    </DocsCardGroup>
  </article>
</template>

<script>
export default {
  name: "DocsTemplateHome",
  components: {
    DocsLink: () => import("../components/DocsLink.vue"),
    DocsCard: () => import("../components/DocsCard.vue"),
    DocsCardGroup: () => import("../components/DocsCardGroup.vue")
  }
};
</script>
