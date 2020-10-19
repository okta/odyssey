<template>
  <div
    :class="{
      'docs-card': true,
      [`is-docs-card-${variant}`]: true
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
  </div>
</template>

<script>
export default {
  name: "DocsCard",
  props: {
    variant: {
      type: String,
      default: "default",
      validator: value => ["default", "shadow"].includes(value)
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
