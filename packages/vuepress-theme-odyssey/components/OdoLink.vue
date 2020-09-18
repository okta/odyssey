<template>
  <RouterLink
    v-if="isInternal"
    :to="link"
    :exact="exact"
    :role="role"
    class="odo-link"
  >
    <slot></slot>
  </RouterLink>
  <a
    v-else
    :href="link"
    :target="hasTarget"
    :rel="hasRel"
    :role="role"
    class="odo-link"
  >
    <slot></slot>
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from "../utils";

export default {
  name: "OdoLink",
  props: {
    href: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "",
      required: false
    }
  },
  computed: {
    link() {
      return ensureExt(this.href);
    },
    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          rootLink => rootLink === this.link
        );
      }
      return this.link === "/";
    },
    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link);
    },
    isBlankTarget() {
      return this.target === "_blank";
    },
    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget;
    },
    hasTarget() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.target) {
        return this.target;
      }
      return isExternal(this.link) ? "_blank" : "";
    },
    hasRel() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.rel) {
        return this.rel;
      }
      return this.isBlankTarget ? "noopener noreferrer" : "";
    }
  }
};
</script>
