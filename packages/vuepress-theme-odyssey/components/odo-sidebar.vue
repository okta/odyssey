<template>
  <header class="odo-sidebar">
    <div class="odo-sidebar--content">
      <div class="odo-sidebar--primary">
        <slot name="header"></slot>
        <slot name="main"></slot>
      </div>
      <div class="odo-sidebar--secondary">
       <slot name="footer"></slot>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import '@okta/odyssey';

.odo-sidebar {
  padding: $spacing-l $spacing-m $spacing-l $spacing-l;

  .odo-sidebar--content {
    display: grid;
    position: sticky;
    top: $spacing-l;
    grid-template-areas: 'primary' 'secondary';
    grid-template-rows: 1fr auto;
    height: 100vh;
    max-height: calc(100vh - #{$spacing-l} * 2);
  }

  .odo-sidebar--main {
    grid-area: primary;
    padding-bottom: $spacing-m;
  }

  .odo-sidebar--secondary {
    grid-area: secondary;
  }

  header {
    top: $spacing-m;
  }

  .odo-sidebar--title {
    display: block;
    margin-bottom: $spacing-m;
    color: $text-heading;
    font-size: $size-title-4;
    font-weight: bold;
    text-decoration: none;
  }
}
</style>

<script>
export default {
  name: 'odo-sidebar',
  props: ['nav'],
  components: {
    'odo-link': () => import('./odo-link.vue'),
  },
}
</script>
