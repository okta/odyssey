<template>
  <header>
    <slot name="Sidebar-top"></slot>
    <nav class="ods-nav-vertical">
      <section class="ods-nav-vertical--section" v-for="(item, index) in items">
        <h2 v-if="item.title" id="nav-subhead-1" class="ods-vertical-nav--heading">{{item.title}}</h2>
        <ul class="ods-vertical-nav--list" aria-describedby="nav-subhead-1" v-if="item.children">
          <li v-for="subitem in item.children" v-if="subitem.isVisible" :class="{'ods-vertical-nav--list-item': true, 'is-ods-vertical-nav--list-item-selected': subitem.title === $page.title}">
            <SidebarLink :item="subitem" />
          </li>
        </ul>
      </section>
    </nav>
  </header>
</template>


<script>
export default {
  name: 'Sidebar',
  props: ['items'],
  components: {
    SidebarLink: () => import('./SidebarLink.vue'),
  },
}
</script>
