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
