<template>
  <article class="odo-main--content">
    <header class="odo-doc-header">
      <div>
        <h1 class="odo-doc-header--title">{{$page.frontmatter.title}}</h1>
        <p class="odo-doc-header--lead">{{$page.frontmatter.lead}}</p>
      </div>
      <div>
        <ul v-if="$page.frontmatter.links" class="odo-doc-header--links">
          <li v-bind:key="link.label" v-for="link in $page.frontmatter.links">
            <a :href="link.href" class="ods-button is-odo-button-shadow" >
              {{ link.label }}
              <div class="odo-button-icon" v-html="require(`!html-loader!../../docs/.vuepress/public/images/icon-${link.icon}.svg`)" />
            </a> 
          </li>
        </ul>
      </div>
    </header>

    <ods-tabs :label="$page.frontmatter.name + ' documentation sections'" active="odyssey-overview" :tablist="$page.frontmatter.tabs" id="tabs-doc-sections">
      <template v-for="slot in $page.frontmatter.tabs" :slot="slot.id">
          <Content :key="slot.id" :slot-key="slot.id" />
      </template>
    </ods-tabs>
  </article>
</template>

<script>
export default {
  name: 'odo-template-component',
  components: {
    'ods-tabs': () => import('../global-components/ods-tabs.vue'),
  }
}
</script>
