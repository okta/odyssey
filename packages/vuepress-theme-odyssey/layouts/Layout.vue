<template>
  <Fragment>
    <a class="docs-skip-content" href="#main">Skip to main content</a>
    <DocsBanner class="docs-banner--beta" :visible="showBetaBanner && this.$route.path !== '/beta/'" :onDismiss="onBetaBannerDismiss">
      <OdsIcon icon="get-info"></OdsIcon> Odyssey is currently in Beta. <DocsLink href="/beta">Learn more</DocsLink>
    </DocsBanner>
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
    DocsBanner: () => import("../components/DocsBanner.vue"),
    DocsSidebar: () => import("../components/DocsSidebar.vue"),
    DocsLink: () => import("../components/DocsLink.vue"),
    DocsTemplateHome: () => import("../templates/DocsTemplateHome.vue"),
    DocsTemplateIndex: () => import("../templates/DocsTemplateIndex.vue"),
    DocsTemplatePlain: () => import("../templates/DocsTemplatePlain.vue"),
    DocsTemplateComponent: () =>
      import("../templates/DocsTemplateComponent.vue")
  },
  data: () => ({
    showBetaBanner: true,
  }),
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
  beforeMount () {
    const betaFlagSeen = window.localStorage.getItem('ods-beta-banner') === 'false';

    if (!betaFlagSeen) {
      window.localStorage.setItem('ods-beta-banner', 'true')
    }

    this.showBetaBanner = window.localStorage.getItem('ods-beta-banner') === 'true'
  },
  updated () {
    const el = document.documentElement;

    if (this.showBetaBanner) {
      el.classList.add("has-beta-banner");
    } else {
      el.classList.remove("has-beta-banner");
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforedestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onBetaBannerDismiss () {
      window.localStorage.setItem('ods-beta-banner', 'false');
      this.showBetaBanner = false
    },
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
