<template>
  <article>
    <odo-card>
      <h1>{{$page.frontmatter.title}}</h1>
      <p>{{$page.frontmatter.lead}}</p>
    </odo-card>
    <ul>
      <li v-for="item in this.content">
        <odo-link :href="item.link">{{item.title}}</odo-link>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'odo-template-index',
  components: {
    'odo-link': () => import('../components/odo-link.vue'),
    'odo-card': () => import('../components/odo-card.vue'),
  },
  computed: {
    content () {
      const nav = this.$site.themeConfig.nav.primary;
      const sectionName = this.$page.frontmatter.title;

      return nav.filter((obj) => obj['title'] === sectionName)[0].children;
    }
  }
}
</script>
