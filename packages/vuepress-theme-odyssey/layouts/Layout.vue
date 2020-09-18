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
    OdoSidebar: () => import("../components/OdoSidebar.vue"),
    OdoTemplateHome: () => import("../templates/OdoTemplateHome.vue"),
    OdoTemplateIndex: () => import("../templates/OdoTemplateIndex.vue"),
    OdoTemplatePlain: () => import("../templates/OdoTemplatePlain.vue"),
    OdoTemplateComponent: () => import("../templates/OdoTemplateComponent.vue")
  }
};
</script>
