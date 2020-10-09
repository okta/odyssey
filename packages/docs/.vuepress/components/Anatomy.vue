<template>
  <figure class="docskit-figure-anatomy" v-if="img">
    <img :src="img" :alt="alt" />
    <figcaption>
      <h4 v-if="title">{{title}}</h4>
      <h4 v-if="metadata">{{metadata}}</h4>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'Anatomy',
  props: {
    title: {
      type: String,
      required: false
    },
    meta: {
      type: String,
      required: false
    },
    img: {
      type: String,
      required: true
    }
  }
}
</script>
