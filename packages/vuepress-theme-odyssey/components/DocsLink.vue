<template>
  <RouterLink
    v-if="isInternal"
    :to="link"
    :exact="exact"
    :role="role"
    :class="{
      'docs-link': true,
      [`docs-link--${variant}`]: variant
    }"
  >
    <slot></slot>
  </RouterLink>
  <a
    v-else
    :href="link"
    :target="hasTarget"
    :rel="hasRel"
    :role="role"
    :class="{
      'docs-link': true,
      [`docs-link--${variant}`]: variant
    }"
  >
    <slot></slot>
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from "../utils";

export default {
  name: "DocsLink",
  props: {
    href: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "",
      required: false
    },
    variant: {
      type: String,
      default: "underlined",
      required: false
    }
  },
  computed: {
    link() {
      return ensureExt(this.href);
    },
    exact() {
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
