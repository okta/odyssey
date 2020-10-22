<template>
  <div
    :class="{
      'docskit-visual': true,
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
      required: false,
      default: null
    }
  }
};
</script>
