<template>
  <article class="odo-main--content">
    <OdoCard class="index-card--header odo-grid--2col">
      <h1>{{ $page.frontmatter.title }}</h1>
      <p>{{ $page.frontmatter.lead }}</p>
    </OdoCard>
    <ul class="odo-grid--3col">
      <li v-for="(item, index) in content" :key="index">
        <OdoCard theme="plain" class="odo-card--index">
          <img
            src="/images/illustration-fpo.svg"
            class="odo-card--index-icon"
            aria-hidden="true"
          />
          <div class="odo-card--index-description">
            <h2>{{ item.title }}</h2>
            <p>Et morbi eget at consectetur. Elit aenean mi phasellus.</p>
          </div>
          <div class="odo-card--index-cta">
            <OdoLink :href="item.link"
              >Learn more
              <span class="u-visually-hidden"
                >about {{ item.title }}</span
              ></OdoLink
            >
          </div>
        </OdoCard>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "OdoTemplateIndex",
  components: {
    OdoLink: () => import("../components/OdoLink.vue"),
    OdoCard: () => import("../components/OdoCard.vue")
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
