<template>
  <nav
    v-if="prev || next"
    class="page-nav"
  >
  <ul class="pagination">
    <li v-if="prev" class="pagination--prev">
      <DocsLink variant="default" :href="prev.link" class="ods-icon--has-icon">
        <svg role="presentation" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path d="M4.51059 6.00121L6.92796 3.72595C7.34572 3.33275 7.34132 2.67278 6.92356 2.27958C6.52128 1.90095 5.87952 1.90683 5.4895 2.29763L1.14535 6.65043C0.95155 6.84461 0.95155 7.15539 1.14535 7.34957L5.4895 11.7024C5.87952 12.0932 6.52128 12.099 6.92356 11.7204C7.34132 11.3272 7.34572 10.6672 6.92796 10.274L4.51059 7.99879H12.4915C12.7723 7.99879 13 7.7752 13 7.49939V6.50061C13 6.2248 12.7723 6.00121 12.4915 6.00121H4.51059Z" fill="currentColor"/></svg>
        <span class="u-visually-hidden">Previous page:</span> {{ prev.title }}
      </DocsLink>
    </li>
    <li v-if="next" class="pagination--next">
      <DocsLink variant="default" :href="next.link" class="ods-icon--has-icon">
        <span class="u-visually-hidden"> Next page:</span> {{ next.title }}
        <svg role="presentation" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path d="M9.48941 6.00121L7.07204 3.72595C6.65428 3.33275 6.65868 2.67278 7.07644 2.27958C7.47872 1.90095 8.12048 1.90683 8.5105 2.29763L12.8546 6.65043C13.0484 6.84461 13.0484 7.15539 12.8546 7.34957L8.5105 11.7024C8.12048 12.0932 7.47872 12.099 7.07644 11.7204C6.65868 11.3272 6.65428 10.6672 7.07204 10.274L9.48941 7.99879H1.50848C1.22765 7.99879 1 7.7752 1 7.4994V6.5006C1 6.2248 1.22765 6.00121 1.50848 6.00121H9.48941Z" fill="currentColor"/></svg>
      </DocsLink>
    </li>
    <li class="pagination--slot" v-if="this.$slots.default">
      <slot></slot>
    </li>
  </ul>
  </nav>
</template>

<script>
export default {
  name: 'PageNav',
  props: ['sidebarItems'],
  components: {
    DocsLink: () => import("./DocsLink.vue")
  },
  computed: {
    prev () {
      return resolvePageLink(this).prev
    },
    next () {
      return resolvePageLink(this).next
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function resolvePageLink ({ $page, sidebarItems }) {
  return {
    next: resolveNext($page, sidebarItems.primary[1].children),
    prev: resolvePrev($page, sidebarItems.primary[1].children)
  }
}

function find (page, items, offset) {
  const res = []
  flatten(items, res)

  for (let i = 0; i < res.length; i++) {
    const cur = res[i]

    if (cur.link === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}
</script>
