<template>
  <figure
    v-if="img"
    :class="{
      'docskit-figure-anatomy': true,
      [`is-figure-anatomy-filled`]: fill
    }"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-html="require(`!html-loader!../../docs/.vuepress/public/${img}`)"
      class="docskit-figure-anatomy--shrinkwrap"
    />
    <!-- eslint-enable vue/no-v-html -->
    <figcaption>
      <h4 v-if="metadata">{{ metadata }}</h4>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "Anatomy",
  props: {
    metadata: {
      type: String,
      required: false,
      default: null
    },
    fill: {
      type: Boolean,
      required: false
    },
    img: {
      type: String,
      required: true
    }
  }
};
</script>
