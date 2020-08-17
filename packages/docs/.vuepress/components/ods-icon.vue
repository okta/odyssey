<!-- Usage: <ods-icon icon="complete" /> -->

<template>
  <div class="ods-icon" v-html="require(`!html-loader!@okta/odyssey-icons/src/${icon}.svg`)" />
</template>

<style lang="scss">
.ods-icon {
  display: inline-block;

  svg {
    fill: currentColor;
    height: 24px;
    width: 24px;
  }
}
</style>

<script>
import html from '@okta/odyssey-icons/src/back.svg';

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
