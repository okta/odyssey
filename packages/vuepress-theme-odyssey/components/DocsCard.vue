<template>
  <Component
    :is="tag"
    :class="{
      'docs-card': true,
      [`is-docs-card-${variant}`]: true,
      [`is-docs-card-image-${imageSize}`]: true
    }"
  >
    <header v-if="hasSlotHeader" class="docs-card--header">
      <slot name="header" />
    </header>
    <div v-if="hasDefaultSlot" class="docs-card--main">
      <slot></slot>
    </div>
    <footer v-if="hasSlotFooter" class="docs-card--footer">
      <slot name="footer" />
    </footer>
  </Component>
</template>

<script>
export default {
  name: "DocsCard",
  props: {
    tag: {
      default: "div",
      type: String
    },
    variant: {
      type: String,
      default: "default",
      validator: value => ["default", "shadow", "transparent"].includes(value)
    },
    imageSize: {
      type: String,
      default: "medium",
      validator: value => ["medium", "large"].includes(value)
    }
  },
  computed: {
    hasSlotHeader() {
      return this.$slots.header;
    },
    hasDefaultSlot() {
      return this.$slots.default;
    },
    hasSlotFooter() {
      return this.$slots.footer;
    }
  }
};
</script>
