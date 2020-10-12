<template>
  <Fragment>
    <button
      class="sidebar-trigger ods-button is-ods-button-clear"
      @click="setSidebarState"
    >
      🍔 <span class="u-visually-hidden">Open navigation</span>
    </button>
    <header
      :class="{
        'docs-sidebar': true
      }"
    >
      <div class="docs-sidebar--content">
        <button
          class="sidebar-trigger ods-button is-ods-button-clear"
          @click="setSidebarState"
        >
          <OdsIcon icon="close" />
        </button>
        <div class="docs-sidebar--header">
          <DocsLink class="docs-site--title" href="/">{{ title }}</DocsLink>
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
    </header>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";

export default {
  name: "DocsSidebar",
  components: {
    Fragment,
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
    isOverflowing: null
  }),
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
    setSidebarState() {
      const el = document.body;
      const className = "is-sidebar-expanded";
      const isExpanded = el.classList.contains(className);

      if (isExpanded) {
        el.classList.remove(className);
      } else {
        el.classList.add(className);
      }
    }
  }
};
</script>
