<template>
  <nav 
    :class="{
      'ods-nav-vertical': true, 
      [`is-ods-nav-${type}`]: type
    }"
  >
    <ul class="ods-nav-vertical--list">
      <li
        class="ods-nav-vertical--list-item"
        v-for="(item, index) in nav" 
        v-bind:key="item.name"
        @click="click(item.children)"
      >
        <odo-link 
          :id="'nav-subhead-' + index" 
          class="ods-nav-vertical--heading" 
          :href="item.link"
        >
          {{item.title}}
          <div v-if="item.children" class="ods-nav-vertical--list-sub-indicator" />
        </odo-link>

        <ul 
          class="ods-nav-vertical--list-sub" 
          :aria-describedby="'nav-subhead-' + index" v-if="item.children"
        >
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
  a,
  a:visited {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-xs;
    padding: 0 $spacing-xs;
    color: $text-heading;
    font-size: $size-body-sentence;
    text-decoration: none;
  }

  .ods-nav-vertical--list >
  .ods-nav-vertical--list-item {
    &:last-child a {
      margin-bottom: 0;
    }
  }

  .ods-nav-vertical--list-sub-indicator {
    width: 1em;
    height: 1em;
    margin-right: $spacing-xs;
    background-image: get-icon('caret', $text-body);
  }

  .ods-nav-vertical--list-sub {
    display: none;
    margin-bottom: $spacing-s;

    .ods-nav-vertical--list-item a {
      padding: 0 $spacing-s;
    }
  }

  .router-link-active {
    font-weight: bold;

    & + .ods-nav-vertical--list-sub {
      display: block;

      .ods-nav-vertical--list-item .router-link-active {
        background: cv('gray', '000');
      }
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
  computed: {

  },
  methods: {
    click: (hasChildren) => {
      if (hasChildren) {
        // TODO: Switch attributes
      }
    }
  },
  components: {
    'odo-link': () => import('./odo-link.vue'),
    'ods-icon': () => import('../global-components/ods-icon.vue'),
  },
}
</script>
