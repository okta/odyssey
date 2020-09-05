<template>
  <div class="theme-odyssey">
    <a class="odo-skip-content" href="#main">Skip to main content</a>

    <odo-sidebar>
      <template v-slot:header>
        <a class="odo-sidebar--title" href="/">{{$site.title}}</a>
        <fieldset class="ods-fieldset" v-if="$site.themeConfig.flags.hasSearch">
          <div class="ods-fieldset-flex">
            <input class="ods-text-input" type="text" name="search" id="search">
            <label class="ods-label u-visually-hidden" for="name">Name</label>
          </div>
        </fieldset>
      </template>
      <template v-slot:main>
        <odo-nav-vertical type="primary" :nav="Nav.primary" />
      </template>
      <template v-slot:footer>
        <odo-nav-vertical type="secondary" :nav="Nav.secondary" />
      </template>
    </odo-sidebar>

    <main class="odyssey--main" id="main">
      <article class="odo--article">
        <odo-template-component v-if="$page.frontmatter.template === 'component'" />
        <odo-template-index v-else-if="$page.frontmatter.template === 'index'" />
        <Content v-else />
      </article>
    </main>
  </div>
</template>

<style lang="scss">
.odo-skip-content {
  position: absolute;
  top: auto;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;

  &:focus {
    left: 0;
    width: auto;
    height: auto;
  }
}
</style>

<script>
export default {
  name: 'FigureAnatomy',
  props: {
    img: {
      type: String,
      required: true
    }
  }
}
</script>

<script>
import { resolveNav } from '../utils'

export default {
  components: {    
    'odo-sidebar': () => import('../components/odo-sidebar.vue'),
    'odo-link': () => import('../components/odo-link.vue'),
    'odo-nav-vertical': () => import('../components/odo-nav-vertical.vue'),
    'odo-template-index': () => import('../templates/odo-template-index.vue'),
    'odo-template-component': () => import('../templates/odo-template-component.vue'),
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

<style lang="scss">
@import '../styles/index.scss';
</style>
