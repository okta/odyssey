<!-- Usage: <ods-icon icon="complete" /> -->

<template>
  <div class="ods-icon" v-html="require(`!html-loader!@okta/odyssey-icons/src/${icon}.svg`)" />
</template>

<style lang="scss">
.ods-icon {
  display: inline-block;

  svg {
    width: 24px;
    height: 24px;
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
            default: null
        }
    }
}
</script>
