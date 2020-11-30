<template>
  <Fragment>
    <a class="docs-skip-content" href="#main">Skip to main content</a>
    <DocsBanner
      class="docs-banner--beta"
      :visible="showBanner"
      :on-dismiss="onBetaBannerDismiss"
    >
      <OdsIcon icon="get-info"></OdsIcon> Odyssey is currently in Beta.
      <DocsLink href="/beta">Learn more</DocsLink>
    </DocsBanner>
    <div class="docs-layout">
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
          <DocsTemplateIndex
            v-else-if="$page.frontmatter.template === 'index'"
          />
          <DocsTemplatePlain
            v-else-if="$page.frontmatter.template === 'plain'"
          />
          <Content v-else />
        </main>
      </div>
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { resolveNav } from "../utils";
import "../styles/index.scss";

const BANNER_ID = "ods-beta-banner";

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
    showBanner: false
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
  beforeMount() {
    const showBanner = !window.localStorage.getItem(BANNER_ID);

    if (showBanner) {
      window.localStorage.setItem(BANNER_ID, "true");
    }
  },
  updated() {
    const el = document.documentElement;
    const showBanner = window.localStorage.getItem(BANNER_ID) !== "false";

    this.showBanner = showBanner && this.$route.path !== "/beta/";

    if (this.showBanner) {
      el.classList.add("has-ods-beta-banner");
    } else {
      el.classList.remove("has-ods-beta-banner");
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforedestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onBetaBannerDismiss() {
      window.localStorage.setItem(BANNER_ID, "false");
      this.showBanner = false;
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
