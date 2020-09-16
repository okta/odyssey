<template>
  <div class="theme-odyssey">
    <a class="odo-skip-content" href="#main">Skip to main content</a>
    <odo-sidebar />
    <main class="odo-main" id="main">
      <odo-template-home v-if="$page.frontmatter.template === 'home'" />
      <odo-template-component v-else-if="$page.frontmatter.template === 'component'" />
      <odo-template-index v-else-if="$page.frontmatter.template === 'index'" />
      <odo-template-plain v-else-if="$page.frontmatter.template === 'plain'" />
      <Content v-else />   
    </main>
  </div>
</template>

<script>
import '../styles/index.scss';

export default {
  components: {    
    'odo-sidebar': () => import('../components/odo-sidebar.vue'),
    'odo-link': () => import('../components/odo-link.vue'),
    'odo-template-home': () => import('../templates/odo-template-home.vue'),
    'odo-template-index': () => import('../templates/odo-template-index.vue'),
    'odo-template-plain': () => import('../templates/odo-template-plain.vue'),
    'odo-template-component': () => import('../templates/odo-template-component.vue'),
  }
}
</script>
