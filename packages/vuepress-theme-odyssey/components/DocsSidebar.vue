<template>
  <Fragment>
    <DocsTopbar :title="title">
      <template v-slot:left>
        <!-- eslint-disable -->
        <button
          class="docs-topbar--action ods-button is-ods-button-clear docs-sidebar--action"
          @click="setSidebarState(true)"
          v-html="require(`!html-loader!../public/images/icon-hamburger.svg`)"
        />
        <!-- eslint-enable -->
      </template>
    </DocsTopbar>

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
              'is-overflowing': isOverflowing
            }"
          >
            <div ref="mainContent" class="docs-sidebar--main-content">
              <DocsNav
                :force-expand="true"
                variant="primary"
                :nav="nav.primary"
              />
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
    DocsNav: () => import("../components/DocsNav.vue"),
    DocsTopbar: () => import("../components/DocsTopbar.vue")
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

        // TODO: Figure out a better solution here, this
        // is required because focus isnt always applied to
        // the close button when the element is expanded due to
        // `visibility:hidden;` being applied previously.
        setTimeout(() => this.$refs.closeButton.focus(), 100);
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
