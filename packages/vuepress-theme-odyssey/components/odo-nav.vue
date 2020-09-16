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
            :class="{
              'odo-nav-link': true,
              'is-odo-nav-link--active': isCurrentRoute(item.link)
            }"
            :href="item.link"
            :aria-expanded="isSubmenuExpanded(index)"
            @click.native="() => resetSubmenus(index)"
          >
            {{item.title}}
          </odo-link>
          <button
            @click="(event) => toggleSubmenu(event, index, item)"
            :class="{
              'ods-button is-ods-button-clear with-odo-subnav-indicator': true,
              'with-odo-subnav-indicator--expanded': 
                isSubmenuExpanded(index),
            }"
            v-if="item.children"
          />
        </component>
        <ul
          v-if="item.children"
          :id="'nav-subhead-' + index" 
          :class="{
            'odo-nav--subnav': true, 
            'is-visible': isSubmenuExpanded(index)
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
            <odo-link 
              :href="subitem.link"
              :class="{
                'odo-nav-link': true,
                'is-odo-nav-link--active': isCurrentRoute(subitem.link)
              }"
            >
              {{subitem.title}}
            </odo-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  name: 'odo-nav',
  data: () => ({
    selected: []
  }),
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
  methods: {
    isSubmenuExpanded: function (index) {
      return this.selected.includes(index)
    },
    isCurrentRoute: function (path) {
      return this.$route.path.includes(path)
    },
    toggleSubmenu: function (event, index, { children: subList }) {
      const sublistActive = this.selected.includes(index)
      if (subList && !sublistActive) {
        this.selected.push(index)
      } else {
        this.selected.splice(this.selected.indexOf(index), 1)
      }
    },
    resetSubmenus: function (index) {
      this.selected = [ index ]
    }
  },
  components: {
    Fragment,
    'odo-link': () => import('./odo-link.vue')
  },
}
</script>
