<template>
  <div
    :class="{
      'docskit-visual': true,
      'with-fade': fade,
      [`layout-${layout}`]: layout,
      [`theme-${theme}`]: theme,
      [`is-docskit-visual-${variant}`]: variant,
      [`is-docskit-visual-content-${content}`]: content
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
    layout: {
      type: String,
      required: false
    },
    theme: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    },
    fade: {
      type: Boolean,
      required: false
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
