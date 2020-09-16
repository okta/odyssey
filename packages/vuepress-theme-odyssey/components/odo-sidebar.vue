<template>
  <header class="odo-sidebar">
    <div class="odo-sidebar--content">
      <div class="odo-sidebar--header">
        <odo-link class="odo-site--title" href="/">{{$site.title}}</odo-link>
        <fieldset class="ods-fieldset" v-if="$site.themeConfig.flags.hasSearch">
          <div class="ods-fieldset-flex">
            <input class="ods-text-input" type="text" name="search" id="search">
            <label class="ods-label u-visually-hidden" for="name">Name</label>
          </div>
        </fieldset>
      </div>
      <div :class='{
        "odo-sidebar--main": true,
        "is-odo-sidebar-overflowing": isOverflowing,
      }'>
        <odo-nav type="primary" :nav="Nav.primary" />
      </div>
      <div class="odo-sidebar--footer">
        <odo-nav type="secondary" :nav="Nav.secondary" />
      </div>
    </div>
  </header>
</template>

<script>
import { resolveNav } from '../utils'

export default {
  name: 'odo-sidebar',
  props: ['nav'],
  components: {
    'odo-link': () => import('./odo-link.vue'),
    'odo-nav': () => import('../components/odo-nav.vue'),
  },
  data: () => ({
    isOverflowing: null,
  }),
  mounted () {
    // TODO: this has to be re-thought out.
    if('IntersectionObserver' in window) {
      const el = this.$el.querySelector('.odo-sidebar--content');
      // TODO: setTimeout is a hack, since the child vue component 
      // hasnt yet mounted. Figure out how to do this right way.
      // perhaps using emit?
      setTimeout(() => {
        let observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
                if(entry.intersectionRatio !== 1){
                 this.isOverflowing = true
                }
                else {
                  this.isOverflowing = false
                }
            });
        }, { threshold: 1 });

        observer.observe(el.querySelectorAll('.odo-nav')[0]) ;
      }, 100);
    }
  },
  computed: {
    Nav () {
      return resolveNav(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
  }
}
</script>
