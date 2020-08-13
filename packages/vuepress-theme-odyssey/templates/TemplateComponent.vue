<template>
  <article>
    <header class="odo-doc-header">
      <div>
        <h1 class="odo-doc-header--title">{{$page.frontmatter.name}}</h1>
        <p class="odo-doc-header--lead">{{$page.frontmatter.lead}}</p>
      </div>
      <div>
        <ul v-if="$page.frontmatter.links" class="odo-doc-header--links">
          <li v-bind:key="link.label" v-for="link in $page.frontmatter.links">
            <a :href="link.href" class="ods-button is-odo-button-shadow" >
              {{ link.label }}
              <div class="odo-button-icon" v-html="require(`!html-loader!../../docs/.vuepress/public/icons/${link.icon}.svg`)" />
            </a> 
          </li>
        </ul>
      </div>
    </header>

    <OdsTabs :label="$page.frontmatter.name + ' documentation sections'" active="odyssey-overview" :tablist="$page.frontmatter.tabs" id="tabs-doc-sections">
      <template v-for="slot in $page.frontmatter.tabs" :slot="slot.id">
          <Content :key="slot.id" :slot-key="slot.id" />
      </template>
    </OdsTabs>
  </article>
</template>

<script>
export default {
  name: 'TemplateComponent',
  components: {
    OdsTabs: () => import('../global-components/OdsTabs.vue'),
  }
}
</script>
