<template>
  <div
    :class="{
      'docskit-visual': true,
      'with-fade': fade,
      [`layout-${layout}`]: layout,
      [`theme-${theme}`]: theme,
      [`is-docskit-visual-${variant}`]: variant
    }"
  >
    <h6
      v-if="variant === 'positive' || variant === 'negative'"
      class="docskit-visual--title"
    >
      {{ variant === "positive" ? "Do" : `Don't` }}
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
    fade: {
      type: Boolean,
      required: false
    }
  }
};
</script>
