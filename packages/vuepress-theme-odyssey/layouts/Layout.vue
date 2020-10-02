<template>
  <Fragment>
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
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { resolveNav } from "../utils";
import "../styles/index.scss";

export default {
  components: {
    Fragment,
    OdoSidebar: () => import("../components/OdoSidebar.vue"),
    OdoTemplateHome: () => import("../templates/OdoTemplateHome.vue"),
    OdoTemplateIndex: () => import("../templates/OdoTemplateIndex.vue"),
    OdoTemplatePlain: () => import("../templates/OdoTemplatePlain.vue"),
    OdoTemplateComponent: () => import("../templates/OdoTemplateComponent.vue")
  },
  mounted() {
    const query = window.location.search.substring(1);
    const vars = query.split("&");

    vars.forEach(v => {
      const key = v.split("=")[0];
      const value = v.split("=")[1];

      if (key === "theme") {
        const htmlElement = document.getElementsByTagName("html")[0];
        htmlElement.setAttribute("data-odo-theme", value);
      }
    });
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
