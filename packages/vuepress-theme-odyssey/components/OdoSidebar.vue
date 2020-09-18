<template>
  <header class="odo-sidebar">
    <div class="odo-sidebar--content">
      <div class="odo-sidebar--header">
        <OdoLink class="odo-site--title" href="/">{{ $site.title }}</OdoLink>
        <fieldset v-if="$site.themeConfig.flags.hasSearch" class="ods-fieldset">
          <div class="ods-fieldset-flex">
            <input
              id="search"
              class="ods-text-input"
              type="text"
              name="search"
            />
            <label class="ods-label u-visually-hidden" for="name">Name</label>
          </div>
        </fieldset>
      </div>
      <div
        :class="{
          'odo-sidebar--main': true,
          'is-odo-sidebar-overflowing': isOverflowing
        }"
      >
        <OdoNav type="primary" :nav="Nav.primary" />
      </div>
      <div class="odo-sidebar--footer">
        <OdoNav type="secondary" :nav="Nav.secondary" />
      </div>
    </div>
  </header>
</template>

<script>
import { resolveNav } from "../utils";

export default {
  name: "OdoSidebar",
  components: {
    OdoLink: () => import("./OdoLink.vue"),
    OdoNav: () => import("../components/OdoNav.vue")
  },
  props: ["nav"],
  data: () => ({
    isOverflowing: null
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
  mounted() {
    // TODO: this has to be re-thought out.
    if ("IntersectionObserver" in window) {
      const el = this.$el.querySelector(".odo-sidebar--content");
      // TODO: setTimeout is a hack, since the child vue component
      // hasnt yet mounted. Figure out how to do this right way.
      // perhaps using emit?
      setTimeout(() => {
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

        observer.observe(el.querySelectorAll(".odo-nav")[0]);
      }, 100);
    }
  }
};
</script>
