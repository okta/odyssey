<template>
  <nav 
    :class="{
      'odo-nav': true, 
      [`is-odo-nav-${type}`]: type
    }"
  >
    <ul class="odo-nav--list">
      
      <li
        :class="{
          'odo-nav--item': true,
          'odo-nav--item-with-subnav': item.children,
        }"
        v-for="(item, index) in nav" 
        v-bind:key="item.name"
      >
        <component 
          :is="item.children ? 'div' : 'fragment'"
          :class="{
            'odo-nav--item-content': item.children,
          }"
        >
          <odo-link
            :id="'nav-subhead-' + index" 
            :href="item.link"
            :role="item.children ? 'button' : false"
            :aria-expanded="selected.includes(index)"
          >
            {{item.title}}
          </odo-link>
          <button
            @click="(event) => toggleSublist(event, index, item)"
            class="odo-nav--action-button"
            v-if="item.children"
          >
            <span class="odo-nav--item-subnav-indicator" />
          </button>
        </component>
        <ul
          v-if="item.children"
          :id="'nav-subhead-' + index" 
          :class="{
            'odo-nav--subnav': true, 
            'is-visible': selected.includes(index),
          }"
        >
          <li 
            v-for="subitem in item.children" 
            v-bind:key="subitem.title"
            :class="{
              'odo-nav--item': true, 
              'is-odo-nav--item-selected': subitem.title === $page.frontmatter.title,
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

.odo-nav--action-button {
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0 $spacing-s-em;
  transition-property: color, background-color, border-color, box-shadow;
  transition-duration: 100ms;
  transition-timing-function: linear;
  border: none;
  border-radius: $base-border-radius;
  background-color: transparent;
  box-shadow: 0 0 0 0 $color-primary-light;
  color: $white;
  font-family: $body-font-family;
  font-size: ms(0);
  font-weight: 600;
  line-height: $base-line-height;
  white-space: nowrap;

  &:hover {
    border-color: transparent;
    background-color: cv('blue', '000');
    color: $color-primary-dark;
  }

  &:focus,
  &.is-ods-button-focus {
    background-color: $white;
    color: $color-primary-base;
  }
}

.odo-nav {
  a,
  a:visited {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-xs;
    color: $text-heading;
    font-size: $size-body-sentence;
    text-decoration: none;
  }

  &.is-odo-nav-secondary {
    font-weight: 600;

    a {
      font-size: $size-body-base;
    }
  }
}

.odo-nav--item {
  margin-bottom: $spacing-xs;

  &.odo-nav--item-with-subnav {
    border: 1px solid red;

    .odo-nav--item-content {
      display: flex;

      a {
        flex: 1;
        align-items: center;
      }
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.odo-nav--item-subnav-indicator {
  display: block;
  width: 1em;
  height: 1em;
  margin: 0 auto;
  background-image: get-icon('caret', $text-body);
  appearance: none;
}

.odo-nav--subnav {
  display: none;
  margin-bottom: $spacing-s;

  a {
    margin-left: $spacing-s;
    padding: 0 $spacing-s;
  }

  &.is-visible {
    display: block;
  }
}

</style>

<script>
import { Fragment } from 'vue-fragment'

export default {
  name: 'odo-nav-vertical',
  data: () => ({
    selected: []
  }),
    mounted () { 
      console.log(this.$route)
    },
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
  isExpanded (subListIndex) {
    return this.selected.contains(subListIndex)
  },
  methods: {
    toggleSublist: function (event, index, { children: subList }) {
      const sublistActive = this.selected.includes(index)
      if (subList && ! sublistActive) {
        this.selected.push(index)
      } else {
        this.selected.splice(this.selected.indexOf(index), 1)
      }
    }
  },
  components: {Fragment,
    'odo-link': () => import('./odo-link.vue'),
    'ods-icon': () => import('../global-components/ods-icon.vue'),
  },
}
</script>
