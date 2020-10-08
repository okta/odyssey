<template>
<div :class="'docskit-example is-docskit-example-' + type">
    <h6 class="docskit-example--title" v-if=" type === 'positive' || type === 'negative' ">
      {{ type === 'positive' ? 'Do' : `Don't` }}
    </h6>
    <figure class="docskit-example--figure">
      <slot />
    </figure>
  </div>
</template>

<script>
export default {
  name: 'Example',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    layout: {
      type: String,
      default: 'default'
    },
  }
}
</script>
