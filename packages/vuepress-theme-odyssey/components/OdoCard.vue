<template>
  <div
    :class="{
      'odo-card': true,
      [`is-odo-card-${theme}`]: true
    }"
  >
    <header v-if="hasSlotHeader" class="odo-card--header">
      <slot name="header" />
    </header>
    <div v-if="hasDefaultSlot" class="odo-card--main">
      <slot></slot>
    </div>
    <footer v-if="hasSlotFooter" class="odo-card--footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: "OdoCard",
  props: {
    theme: {
      type: String,
      default: "default",
      validator: value => ["default", "plain"].includes(value)
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
