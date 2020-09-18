<template>
  <div class="theme-odyssey">
    <a class="odo-skip-content" href="#main">Skip to main content</a>
    <OdoSidebar />
    <main id="main" class="odo-main">
      <OdoTemplateHome v-if="$page.frontmatter.template === 'home'" />
      <OdoTemplateComponent
        v-else-if="$page.frontmatter.template === 'component'"
      />
      <OdoTemplateIndex v-else-if="$page.frontmatter.template === 'index'" />
      <OdoTemplatePlain v-else-if="$page.frontmatter.template === 'plain'" />
      <Content v-else />
    </main>
  </div>
</template>

<script>
import "../styles/index.scss";

export default {
  components: {
    OdoSidebar: () => import("../components/odo-sidebar.vue"),
    OdoTemplateHome: () => import("../templates/odo-template-home.vue"),
    OdoTemplateIndex: () => import("../templates/odo-template-index.vue"),
    OdoTemplatePlain: () => import("../templates/odo-template-plain.vue"),
    OdoTemplateComponent: () =>
      import("../templates/odo-template-component.vue")
  }
};
</script>
