<!-- Usage: <ods-icon icon="complete" /> -->

<template>
  <!-- eslint-disable -->
  <svg
    class="ods-icon"
    v-html="require(`!html-loader!@okta/odyssey-icons/src/${icon}.svg`)"
  />
  <!-- eslint-enable -->
</template>

<style lang="scss">
.ods-icon {
  display: inline-block;

  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
}
</style>

<script>
export default {
  name: "OdsIcon",
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
