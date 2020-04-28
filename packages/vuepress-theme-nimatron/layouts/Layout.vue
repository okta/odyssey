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
        <transition name="fade">
            <Content />
        </transition>
      </article>
    </main>
  </div>
</template>


<script>
import { resolveSidebarItems } from '../utils'

export default {
  components: {
    Sidebar: () => import('../components/Sidebar.vue'),
    Example: () => import('../global-components/Example.vue'),
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
