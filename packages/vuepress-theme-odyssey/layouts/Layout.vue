<template>
  <div class="theme-odyssey">
    <header class="odo-nav">
      <Sidebar
        :items="SidebarItems"
      >
        <template slot="Sidebar-top"><h3>Odyssey UI</h3></template>
        <template #bottom>
          <slot name="Sidebar-bottom" />
        </template>
      </Sidebar>
    </header>
    <main class="odyssey--main">
      <article class="odo--article">
        <TemplateComponent v-if="$page.frontmatter.template === 'component'" />
        <Content v-if="$page.frontmatter.template !== 'component'" />
      </article>
    </main>
  </div>
</template>

<script>
import { resolveSidebarItems } from '../utils'

export default {
  components: {    
    Sidebar: () => import('../components/Sidebar.vue'),
    TemplateComponent: () => import('../templates/TemplateComponent.vue'),
  },
  computed: {
    SidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
  }
}
</script>

<style lang="scss">
@import '../styles/index.scss'
</style>
