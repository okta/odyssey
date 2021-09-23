<template>
  <nav
    :class="{
      'docs-nav': true,
      [`is-docs-nav-${variant}`]: variant
    }"
  >
    <ul class="docs-nav--list">
      <li
        v-for="(item, index) in nav"
        :key="item.name"
        :class="{
          'docs-nav--item': true,
          'docs-nav--item-with-subnav': item.children
        }"
      >
        <Component
          :is="item.children ? 'div' : 'fragment'"
          :class="{
            'docs-nav--item-content': item.children
          }"
        >
          <DocsLink
            :id="'nav-' + variant + '-subhead-' + index"
            :class="{
              'docs-nav-link': true,
              'is-docs-nav-link--active': isCurrentRoute(item.link)
            }"
            :href="item.link"
            :aria-expanded="isSubmenuExpanded(index)"
            @click.native="() => resetSubmenus(index)"
          >
            {{ item.title }}
          </DocsLink>
          <button
            v-if="item.children && !forceExpand"
            :class="{
              'ods-button is-ods-button-clear with-docs-subnav-indicator': true,
              'with-docs-subnav-indicator--expanded': isSubmenuExpanded(index)
            }"
            @click="event => toggleSubmenu(event, index, item)"
          />
        </Component>
        <ul
          v-if="item.children"
          :id="'nav-' + variant + '-subhead-' + index"
          :class="{
            'docs-nav--subnav': true,
            'is-visible': forceExpand || isSubmenuExpanded(index)
          }"
        >
          <li
            v-for="subitem in item.children"
            :key="subitem.title"
            :class="{
              'docs-nav--item': true,
              'is-docs-nav--item-selected':
                subitem.title === $page.frontmatter.title
            }"
          >
            <DocsLink
              :href="subitem.link"
              :class="{
                'docs-nav-link': true,
                'is-docs-nav-link--active': isCurrentRoute(subitem.link)
              }"
            >
              {{ subitem.title }}
            </DocsLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Fragment } from "vue-fragment";

export default {
  name: "DocsNav",
  components: {
    Fragment,
    DocsLink: () => import("./DocsLink.vue")
  },
  props: {
    nav: {
      type: Array, // TODO: figure out if theres a way to better 'type' this with vue
      required: true
    },
    forceExpand: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "primary",
      validator: value => ["primary", "secondary"].includes(value)
    }
  },
  data: () => ({
    selected: []
  }),
  mounted() {
    const currentRoute = this.nav.find((item, index) => {
      return (
        item.link === this.$route.path || this.$route.path.includes(item.link)
      );
    });

    this.selected = [this.nav.indexOf(currentRoute)];
  },
  methods: {
    isSubmenuExpanded: function(index) {
      return this.selected.includes(index);
    },
    isCurrentRoute: function(path) {
      return this.$route.path.includes(path);
    },
    toggleSubmenu: function(event, index, { children: subList }) {
      const sublistActive = this.selected.includes(index);
      if (subList && !sublistActive) {
        this.selected.push(index);
      } else {
        this.selected.splice(this.selected.indexOf(index), 1);
      }
    },
    resetSubmenus: function(index) {
      this.selected = [index];
    }
  }
};
</script>
