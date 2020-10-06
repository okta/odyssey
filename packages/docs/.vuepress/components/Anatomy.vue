<template>
  <figure class="docskit-figure-anatomy" v-if="img">
    <img :src="img" :alt="alt" />
    <figcaption>
      <h4 v-if="figureTitle">{figureTitle}</h4>
      <h4 v-if="figureMetadata">{figureMetadata}</h4>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'Anatomy',
  props: {
    img: {
      type: String,
      required: true
    }
  }
}
</script>
