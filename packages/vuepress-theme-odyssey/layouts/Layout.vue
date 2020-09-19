<template>
  <div class="theme-odyssey">
    <a class="odo-skip-content" href="#main">Skip to main content</a>
    <OdoSidebar
      title="Odyssey Design System"
      :show-search="$site.themeConfig.flags.hasSearch"
      :nav="Nav"
    />
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
import { resolveNav } from "../utils";

export default {
  components: {
    OdoSidebar: () => import("../components/OdoSidebar.vue"),
    OdoTemplateHome: () => import("../templates/OdoTemplateHome.vue"),
    OdoTemplateIndex: () => import("../templates/OdoTemplateIndex.vue"),
    OdoTemplatePlain: () => import("../templates/OdoTemplatePlain.vue"),
    OdoTemplateComponent: () => import("../templates/OdoTemplateComponent.vue")
  },
  computed: {
    Nav() {
      return resolveNav(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    }
  }
};
</script>
