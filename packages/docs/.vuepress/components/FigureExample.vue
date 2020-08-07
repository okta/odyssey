<template>
  <div :class="'odo-example is-odo-example-' + type">
    <h6 class="odo-example--title">
      <OdsIcon :icon="type === 'positive' ? 'complete' : 'close'" /> 
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
    margin-bottom: $spacing-m;

    .odo-example--title {
      display: flex;
      align-items: center;
    }

    .ods-icon {
      margin-right: $spacing-s;
      border-radius: $base-border-radius;
      color: $white;
    }

    .ods-icon svg {
      content: '';
      display: block;
      width: 1.2857142857em;
      height: 1.2857142857em;
      
    }

    &.is-odo-example-positive {
      .ods-icon {
        background: $color-success-base;
      }
    }

    &.is-odo-example-negative {      
      .ods-icon {
        background: $color-danger-base;
      }
    }

    figure {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: $spacing-l;
      border: 1px solid $border-color-ui;
      border-radius: $base-border-radius;
      box-shadow: 4px 4px 0 #f5f5f6;
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
