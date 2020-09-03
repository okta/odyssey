<template>
  <div class="nimatron">
    <Sidebar
      :items="SidebarItems"
    >
      <template #top>
        <slot name="Sidebar-top" />
      </template>
      <template #bottom>
        <slot name="Sidebar-bottom" />
      </template>
    </Sidebar>
    <main class="nimatron--main">
      <article class="nimatron--article">
          <Content slot-key="nimatron-all" />
      </article>
    </main>
  </div>
</template>


<script>
import { resolveSidebarItems } from '../utils'

export default {
  components: {
    Sidebar: () => import('../components/Sidebar.vue'),
    // Odyssey Vue Components
    OdsTabs: () => import('../global-components/OdsTabs.vue'),
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
