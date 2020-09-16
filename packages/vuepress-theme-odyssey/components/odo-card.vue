<template>
  <div :class='{
    "odo-card": true,
    [`is-odo-card-${type}`]: true,
  }'>
    <header class="odo-card--header" v-if="hasSlotHeader">
      <slot name="header" />
    </header>
    <div class="odo-card--main">
      <slot></slot>
    </div>
    <footer class="odo-card--footer" v-if="hasSlotFooter">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'odo-card',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'plain'].includes(value)
    }
  },
  computed: {
    hasSlotHeader() {
      return this.$slots.header
    },
    hasSlotFooter() {
      return this.$slots.footer
    }
  }
}
</script>
