<template>
  <article class="docs-main--home">
    <!-- TODO: Componentize "Hero" (large layout) -->
    <header class="docs-hero">
      <div class="docs-hero--content">
        <h1 class="docs-hero--title">{{ $page.frontmatter.headline }}</h1>
        <p class="docs-hero--desc">{{ $page.frontmatter.lead }}</p>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="docs-hero-moon"
        v-html="
          require(`!html-loader!../../docs/.vuepress/public/images/home-hero-moon.svg`)
        "
      ></div>
      <div
        class="docs-hero-rocket"
        v-html="
          require(`!html-loader!../../docs/.vuepress/public/images/home-hero-rocket.svg`)
        "
      ></div>
      <!-- eslint-enable vue/no-v-html -->
    </header>

    <DocsCardGroup tag="ul">
      <DocsCard
        v-for="(section, index) in $page.frontmatter.contentPrimary"
        :key="index"
        tag="li"
        variant="shadow"
        imageSize="large"
      >
        <template slot="header">
          <!-- eslint-disable -->
          <div
            aria-hidden="true"
            class="docs-card--header-image"
            v-html="
              require(`!html-loader!../../docs/.vuepress/public/images/coin-${section.coin || 'fpo'}.svg`)
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

    <div class="docs-principle">
      <h1 class="docs-principle--title">
        {{ $page.frontmatter.principle.title }}
      </h1>
      <p>
        {{ $page.frontmatter.principle.description }}
      </p>
    </div>

    <DocsCardGroup tag="ul">
      <DocsCard
        v-for="(resource, index) in $page.frontmatter.resources"
        :key="index"
        tag="li"
        variant="shadow"
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

    <DocsCardGroup tag="ul">
      <DocsCard
        v-for="(section, index) in $page.frontmatter.contentSecondary"
        :key="index"
        tag="li"
        variant="transparent"
      >
        <h3>{{ section.title }}</h3>
        <p>{{ section.description }}</p>
        <template slot="footer">
          <DocsLink :href="section.href">{{ section.label }}</DocsLink>
        </template>
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
