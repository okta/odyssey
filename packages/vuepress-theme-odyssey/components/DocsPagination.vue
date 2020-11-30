<template>
  <nav v-if="prev || next" class="page-footer">
    <ul class="pagination">
      <li v-if="prev" class="pagination--prev">
        <DocsLink
          variant="default"
          :href="prev.link"
          class="ods-icon--has-icon"
        >
          <OdsIcon role="presentation" icon="go-backward"></OdsIcon>
          <span class="u-visually-hidden">Previous page:</span> {{ prev.title }}
        </DocsLink>
      </li>
      <li v-if="next" class="pagination--next">
        <DocsLink
          variant="default"
          :href="next.link"
          class="ods-icon--has-icon"
        >
          <span class="u-visually-hidden"> Next page:</span> {{ next.title }}
          <OdsIcon role="presentation" icon="go-forward"></OdsIcon>
        </DocsLink>
      </li>
      <li v-if="this.$slots.default" class="pagination--slot">
        <slot></slot>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "DocsPagination",
  components: {
    DocsLink: () => import("./DocsLink.vue")
  },
  props: {
    sidebarItems: {
      type: Object,
      required: true,
      default: () => ({
        primary: [
          { title: "Item", link: "#" },
          {
            title: "Item with Children",
            link: "#",
            children: [{ title: "Child Item", link: "#" }]
          }
        ],
        secondary: [{ title: "Updates", link: "/updates/" }]
      })
    }
  },
  computed: {
    prev() {
      return resolvePageLink(this).prev;
    },
    next() {
      return resolvePageLink(this).next;
    }
  }
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function resolvePageLink({ $page, sidebarItems }) {
  return {
    next: resolveNext($page, sidebarItems.primary[1].children),
    prev: resolvePrev($page, sidebarItems.primary[1].children)
  };
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);

  for (let i = 0; i < res.length; i++) {
    const cur = res[i];

    if (cur.link === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>
