<template>
  <div
    :class="{
      'docskit-visual': true,
      'docskit-visual--wide': wide,
      [`is-docskit-visual-${variant}`]: variant
    }"
  >
    <h6
      v-if="variant"
      class="docskit-visual--title"
    >
      {{labels[variant]}}
    </h6>
    <figure class="docskit-visual--figure">
      <slot />
    </figure>
  </div>
</template>

<script>
export default {
  name: "Visual",
  props: {
    variant: {
      type: String,
      required: false
    },
    wide: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      labels: {
        'positive': 'Do',
        'negative': `Don't`,
        'smiley-positive': 'Best!',
        'smiley-neutral': 'Good',
        'smiley-negative': 'Bad'
      }
    }
  },
};
</script>
