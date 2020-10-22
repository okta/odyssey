<template>
  <figure v-if="img" class="docskit-figure-anatomy">
    <img :src="img" :alt="alt" />
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
    img: {
      type: String,
      required: true
    }
  }
};
</script>
