<!-- Usage: <ods-icon icon="complete" /> -->

<template>
  <div class="ods-icon" v-html="require(`!html-loader!@okta/odyssey-icons/src/${icon}.svg`)" />
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
  name: 'ods-icon',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
