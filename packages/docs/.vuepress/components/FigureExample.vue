<template>
  <div :class="'odo-example is-odo-example-' + type">
    <h6 class="odo-example--title">
      {{ type === 'positive' ? 'Do' : `Don't` }}
    </h6>
    <figure>
      <slot />
    </figure>
  </div>
</template>

<style lang="scss">
  @import '@okta/odyssey';

  .odo-example {
    grid-column: 2/3;
    margin-bottom: $spacing-m;

    .odo-example--title {
      display: flex;
      align-items: center;
      font-weight: normal;

      &::before {
        margin-right: $spacing-xs;
        font-size: $size-title-5;
      }
    }

    &.is-odo-example-positive .odo-example--title::before {
      content: '👍';
    }

    &.is-odo-example-negative .odo-example--title::before {      
      content: '👎';
    }

    figure {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: $spacing-l;
      border: 1px solid $border-color-display;
      border-radius: $base-border-radius;
    }
  }
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
  }
}
</script>
