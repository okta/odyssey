<template>
  <figure class="odo-figure--anatomy" v-if="img">
    <img :src="img" />
  </figure>
</template>

<style lang="scss">
  @import '@okta/odyssey';

  .odo-figure--anatomy {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: $spacing-l $spacing-l $spacing-xl;
    border: 1px solid $border-color-ui;
    border-radius: $base-border-radius;

    img {
      user-select: none;
    }
  }
</style>
<script>
export default {
  name: 'FigureAnatomy',
  props: {
    img: {
      type: String,
      required: true
    }
  }
}
</script>
