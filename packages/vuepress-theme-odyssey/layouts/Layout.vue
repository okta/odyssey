<template>
  <Fragment>
    <a class="docs-skip-content" href="#main">Skip to main content</a>
    <DocsSidebar
      title="Odyssey Design System"
      :show-search="$site.themeConfig.flags.hasSearch"
      :nav="Nav"
    />
    <div class="main--container">
      <main id="main">
        <DocsTemplateHome v-if="$page.frontmatter.template === 'home'" />
        <DocsTemplateComponent
          v-else-if="$page.frontmatter.template === 'component'"
        />
        <DocsTemplateIndex v-else-if="$page.frontmatter.template === 'index'" />
        <DocsTemplatePlain v-else-if="$page.frontmatter.template === 'plain'" />
        <Content v-else />
      </main>
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { resolveNav } from "../utils";
import "../styles/index.scss";

export default {
  components: {
    Fragment,
    DocsSidebar: () => import("../components/DocsSidebar.vue"),
    DocsTemplateHome: () => import("../templates/DocsTemplateHome.vue"),
    DocsTemplateIndex: () => import("../templates/DocsTemplateIndex.vue"),
    DocsTemplatePlain: () => import("../templates/DocsTemplatePlain.vue"),
    DocsTemplateComponent: () =>
      import("../templates/DocsTemplateComponent.vue")
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
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforedestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    handleResize() {
      const el = document.documentElement;
      el.classList.add("is-animation-stopped");
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        el.classList.remove("is-animation-stopped");
      }, 400);
    }
  }
};
</script>
