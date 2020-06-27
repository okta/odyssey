<template>
  <article class="odyssey--article">
    <OdsTabs :active="tabs.active" :tablist="tabs.tablist" :id="tabs.id">
      <template slot="tab-overview">
        <h1>Overview</h1>
      </template>
      <template slot="tab-scss">
        <slot></slot>
      </template>
    </OdsTabs>
  </article>
</template>

<script>

export default {
  name: 'TemplateComponent',
  data () {
     return {
       tabs: {
        id: 'example-0',
        active: "tab-overview",
        tablist: [
          { id: "tab-overview", label: 'Overview' },
          { id: "tab-scss", label: 'SCSS' },
        ]
      }
    }
  },
  components: {
    OdsTabs: () => import('../global-components/OdsTabs.vue'),
  }
}
</script>
