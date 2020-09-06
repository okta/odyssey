<template>
  <header class="odo-sidebar">
    <div class="odo-sidebar--content">
      <div class="odo-sidebar--header">
        <slot name="header"></slot>
      </div>
      <div :class='{
        "odo-sidebar--main": true,
        "is-overflowing": isIntersecting,
      }'>
        <slot name="main"></slot>
      </div>
      <div class="odo-sidebar--footer">
       <slot name="footer"></slot>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import '@okta/odyssey';

.odo-sidebar {
  padding: $spacing-l $spacing-m 0 $spacing-l;

  .odo-sidebar--content {
    display: grid;
    position: sticky;
    top: $spacing-l;
    grid-row-gap: $spacing-s;
    grid-template-areas:
      'header'
      'main'
      'footer';
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    max-height: calc(100vh - #{$spacing-l});
  }

  .odo-sidebar--header {
    grid-area: header;
    padding: 0  $spacing-xs 0;
  }

  .odo-sidebar--main {
    grid-area: main;
    padding: $spacing-xs  $spacing-xs 0;
    overflow: scroll;

    &.is-overflowing {
      border-bottom: 1px solid $border-color-display;
    }
  }

  .odo-sidebar--footer {
    grid-area: footer;
    padding: $spacing-xs  $spacing-xs $spacing-m;
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
  data: () => ({
    isIntersecting: null,
  }),
  mounted () {
    // TODO: this has to be re-thought out.
    if('IntersectionObserver' in window) {
      const el = this.$el.querySelector('.odo-sidebar--content');
      // TODO: setTimeout is a hack, figure out how to do this the right way
      setTimeout(() => {
        let observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
                if(entry.intersectionRatio !== 1){
                 this.isIntersecting = true
                }
                else {
                  this.isIntersecting = false
                }
            });
        }, { threshold: 1 });

        observer.observe(el.querySelectorAll('.ods-nav-vertical')[0]) ;
      }, 500);

    }
  }
}
</script>
