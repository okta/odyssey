<template>
  <header class="odo-sidebar">
    <div class="odo-sidebar--content">
      <div class="odo-sidebar--header">
        <OdoLink class="odo-site--title" href="/">{{ title }}</OdoLink>
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
          'odo-sidebar--main': true,
          'is-odo-sidebar--overflowing': isOverflowing
        }"
      >
        <div class="odo-sidebar--main-content" ref="mainContent">
          <OdoNav type="primary" :nav="nav.primary" />
        </div>
      </div>
      <div class="odo-sidebar--footer">
        <OdoNav type="secondary" :nav="nav.secondary" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "OdoSidebar",
  components: {
    OdoLink: () => import("./OdoLink.vue"),
    OdoNav: () => import("../components/OdoNav.vue")
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
  }
};
</script>
