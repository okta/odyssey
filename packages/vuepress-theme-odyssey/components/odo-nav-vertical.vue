<template>
  <nav 
    :class="{
      'ods-nav-vertical': true, 
      [`is-ods-nav-${type}`]: type
    }"
  >
    <ul
      class="ods-nav-vertical--list"
      v-for="(item, index) in nav" 
      v-bind:key="item.name"
    >
      <li>
        <odo-link 
          :id="'nav-subhead-' + index" class="ods-nav-vertical--heading" 
          :href="item.link"
        >
          {{item.title}}
        </odo-link>
        <ul class="ods-nav-vertical--list-sub" :aria-describedby="'nav-subhead-' + index" v-if="item.children">
          <li 
            v-for="subitem in item.children" 
            v-bind:key="subitem.title"
            :class="{
              'ods-nav-vertical--list-item': true, 
              'is-ods-nav-vertical--list-item-selected': subitem.title === $page.frontmatter.title
            }"
          >
            <odo-link :href="subitem.link">{{subitem.title}}</odo-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import '@okta/odyssey';

.ods-nav-vertical {
  display: grid;

  a,
  a:visited {
    display: block;
    margin-bottom: $spacing-xs;
    color: $text-heading;
    font-size: $size-body-sentence;
    text-decoration: none;
  }

  .ods-nav-vertical--heading {
  }

  .ods-nav-vertical--list-sub {
    display: none;
    margin-bottom: $spacing-s;

    .ods-nav-vertical--list-item {
      padding: 0 $spacing-xs;
    }
  }

  &.is-ods-nav-secondary {
    font-weight: bold;

    a {
      font-size: $size-body-base;
    }
  }
}

</style>

<script>
export default {
  name: 'odo-nav-vertical',
  props: {
    nav: {
      required: true
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary'].includes(value)
    }
  },
  components: {
    'odo-link': () => import('./odo-link.vue'),
  },
}
</script>
