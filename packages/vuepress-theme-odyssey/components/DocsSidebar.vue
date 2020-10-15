<template>
  <Fragment>
    <header class="docs-header">
      <button
        class="docs-header--action ods-button is-ods-button-overlay"
        @click="setSidebarState(true)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" />
          <rect x="3" y="10" width="18" height="3" rx="1.5" fill="#1D1D21" />
          <rect x="3" y="4" width="18" height="3" rx="1.5" fill="#1D1D21" />
          <rect x="3" y="16" width="18" height="3" rx="1.5" fill="#1D1D21" />
        </svg>
      </button>
      <DocsLink class="docs-site-title" href="/">{{ title }}</DocsLink>
    </header>
    <FocusTrap
      v-model="isExpanded"
      :return-focus-on-deactivate="true"
      :click-outside-deactivates="true"
      :initial-focus="() => $refs.closeButton"
    >
      <div class="docs-sidebar">
        <div class="docs-sidebar--content">
          <button
            ref="closeButton"
            class="docs-sidebar--action ods-button is-ods-button-clear"
            aria-label="Close Navigation"
            @click="setSidebarState(false)"
          >
            <OdsIcon icon="close" />
          </button>

          <div class="docs-sidebar--header">
            <DocsLink class="docs-site-title" href="/">{{ title }}</DocsLink>
            <fieldset v-if="showSearch" class="ods-fieldset">
              <div class="ods-fieldset-flex">
                <input
                  id="search"
                  class="ods-text-input"
                  type="search"
                  name="search"
                  autocomplete="search"
                  spellcheck="false"
                  placeholder="Search"
                  required
                />
                <label class="ods-label" for="search">Search</label>
              </div>
            </fieldset>
          </div>
          <div
            :class="{
              'docs-sidebar--main': true,
              'is-docs-sidebar--overflowing': isOverflowing
            }"
          >
            <div ref="mainContent" class="docs-sidebar--main-content">
              <DocsNav variant="primary" :nav="nav.primary" />
            </div>
          </div>
          <div class="docs-sidebar--footer">
            <DocsNav variant="secondary" :nav="nav.secondary" />
          </div>
        </div>
      </div>
    </FocusTrap>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { FocusTrap } from "focus-trap-vue";

export default {
  name: "DocsSidebar",
  components: {
    Fragment,
    FocusTrap,
    DocsLink: () => import("./DocsLink.vue"),
    DocsNav: () => import("../components/DocsNav.vue")
  },
  props: {
    showSearch: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "default"
    },
    nav: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isOverflowing: null,
    isExpanded: false
  }),
  watch: {
    isExpanded: function(isExpanded) {
      const el = document.documentElement;
      const className = "is-sidebar-expanded";

      if (isExpanded) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    $route: function(to, from) {
      this.setSidebarState(false);
    }
  },
  beforeMount() {
    this.setSidebarState(false);
  },
  mounted() {
    if ("IntersectionObserver" in window) {
      const el = this.$refs.mainContent;

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio !== 1) {
              this.isOverflowing = true;
            } else {
              this.isOverflowing = false;
            }
          });
        },
        { threshold: 1 }
      );

      observer.observe(el);
    }
  },
  methods: {
    setSidebarState(isExpanded) {
      this.isExpanded = isExpanded;
    }
  }
};
</script>
