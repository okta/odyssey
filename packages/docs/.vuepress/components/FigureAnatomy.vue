<template>
  <figure class="odo-figure--anatomy" v-if="img">
    <img :src="img" :alt="alt" />
    <figcaption>
      <h4 v-if="figureTitle">{figureTitle}</h4>
      <h4 v-if="figureMetadata">{figureMetadata}</h4>
    </figcaption>
  </figure>
</template>

<style lang="scss">
  @import '@okta/odyssey';

  .odo-figure--anatomy {
    display: flex;
    grid-column: 1/3;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: $spacing-l;
    padding: $spacing-l $spacing-l $spacing-xl;
    border: 1px solid $border-color-display;
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
