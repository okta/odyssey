<template>
  <article class="odo-main--content odo-home">
    <div class="odo-hero">
      <div class="odo-hero--content">
        <h1>{{ $page.frontmatter.headline }}</h1>
        <p>{{ $page.frontmatter.lead }}</p>
      </div>
    </div>
    <ul class="odo-grid--3col">
      <li
        v-for="(section, index) in $page.frontmatter.contentPrimary"
        :key="index"
      >
        <OdoCard>
          <template slot="header">
            <!-- eslint-disable -->
            <div
              aria-hidden="true"
              class="odo-card--header-image"
              v-html="
                require(`!html-loader!../../docs/.vuepress/public/images/illustration-fpo.svg`)
              "
            />
            <!-- eslint-enable -->

            <h3>{{ section.title }}</h3>
          </template>
          <p>{{ section.description }}</p>
          <template slot="footer">
            <OdoLink :href="section.href">{{ section.label }}</OdoLink>
          </template>
        </OdoCard>
      </li>
    </ul>

    <div class="odo-principle">
      <h1>{{ $page.frontmatter.principle.title }}</h1>
      <p>
        {{ $page.frontmatter.principle.description }}
      </p>
      <OdoLink :href="$page.frontmatter.principle.href">{{
        $page.frontmatter.principle.label
      }}</OdoLink>
    </div>

    <ul class="odo-grid--2col">
      <li v-for="(resource, index) in $page.frontmatter.resources" :key="index">
        <OdoCard>
          <template slot="header">
            <!-- eslint-disable -->
            <div
              aria-hidden="true"
              class="odo-card--header-image"
              v-html="
                require(`!html-loader!../../docs/.vuepress/public/images/icon-${resource.illustration}.svg`)
              "
            />
            <!-- eslint-enable -->
            <h3>{{ resource.title }}</h3>
          </template>
          <p>{{ resource.description }}</p>
          <template slot="footer">
            <OdoLink :href="resource.href">{{ resource.label }}</OdoLink>
          </template>
        </OdoCard>
      </li>
    </ul>

    <ul class="odo-grid--3col">
      <li
        v-for="(section, index) in $page.frontmatter.contentSecondary"
        :key="index"
      >
        <h3>{{ section.title }}</h3>
        <p>{{ section.description }}</p>
        <div class="odo-card--index-cta">
          <OdoLink :href="section.href">{{ section.label }}</OdoLink>
        </div>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "OdoTemplateHome",
  components: {
    OdoLink: () => import("../components/OdoLink.vue"),
    OdoCard: () => import("../components/OdoCard.vue")
  }
};
</script>
