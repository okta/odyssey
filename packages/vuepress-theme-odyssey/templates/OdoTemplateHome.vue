<template>
  <article class="odo-main--content">
    <h1>{{ $page.frontmatter.headline }}</h1>
    <p>{{ $page.frontmatter.lead }}</p>

    <ul class="odo-grid--3col">
      <li
        v-for="(section, index) in $page.frontmatter.contentPrimary"
        :key="index"
      >
        <OdoCard class="odo-card--index">
          <img
            src="/images/illustration-fpo.svg"
            class="odo-card--index-icon"
            aria-hidden="true"
          />
          <h3>{{ section.title }}</h3>
          <p>{{ section.description }}</p>
          <div class="odo-card--index-cta">
            <OdoLink :href="section.href">{{ section.label }}</OdoLink>
          </div>
        </OdoCard>
      </li>
    </ul>

    <div>
      <h1>{{ $page.frontmatter.principle.title }}</h1>
      <p style="font-size: 2.00001rem; font-weight: normal;">
        {{ $page.frontmatter.principle.description }}
      </p>
      <OdoLink :href="$page.frontmatter.principle.href">{{
        $page.frontmatter.principle.label
      }}</OdoLink>
    </div>

    <ul class="odo-grid--2col">
      <li v-for="(resource, index) in $page.frontmatter.resources" :key="index">
        <OdoCard>
          <img
            src="/images/illustration-fpo.svg"
            class="odo-card--index-icon"
            aria-hidden="true"
          />
          <h3>{{ resource.title }}</h3>
          <p>{{ resource.description }}</p>
          <div class="odo-card--index-cta">
            <OdoLink :href="resource.href">{{ resource.label }}</OdoLink>
          </div>
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
