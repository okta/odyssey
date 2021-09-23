<template>
  <div :id="id" class="ods-tabs">
    <div
      ref="tablist"
      class="ods-tabs--tablist"
      role="tablist"
      aria-label=""
      @keydown.left.right.end.home.prevent="handleTabFocus"
    >
      <button
        v-for="tab in tablist"
        :id="tab.id"
        :key="'tab-button-' + tab.id"
        class="ods-tabs--tab"
        role="tab"
        :aria-selected="tab.id === active"
        :tabindex="tab.id !== active ? -1 : 0"
        :aria-controls="tab.id + '-tabpanel'"
        @click="tabSelect"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="ods-tabs--tabpanel">
      <div
        v-for="tab in tablist"
        :id="tab.id + '-tabpanel'"
        :key="'tabpanel-' + tab.id"
        role="tabpanel"
        :aria-labelledby="tab.id"
        :hidden="tab.id !== active"
        tabindex="0"
      >
        <slot :name="tab.id" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OdsTabs",
  props: {
    active: {
      type: String,
      required: false,
      default: "tab-0"
    },
    id: {
      type: String,
      required: true,
      default: "component-tabs-0"
    },
    tablist: {
      type: Array,
      required: true,
      default: () => [
        { id: "tab-0", label: "Tab 0" },
        { id: "tab-1", label: "Tab 1" },
        { id: "tab-2", label: "Tab 2" }
      ]
    }
  },
  data() {
    return {
      focusIndex: 0,
      focusCount: 0
    };
  },
  mounted() {
    const el = this.$el;

    const tablist = el.querySelectorAll(".ods-tabs--tablist")[0];
    const activeTab = tablist.querySelectorAll(
      '.ods-tabs--tab[aria-selected="true"'
    )[0];

    this.active = activeTab.id;

    this.focusCount = this.tablist.length - 1; // use zero index
    this.focusIndex = 1;
  },
  methods: {
    tabSelect(event) {
      const tab = event.target;

      this.active = tab.id;
      this.focusIndex = [...tab.parentElement.children].indexOf(tab);
    },
    handleTabFocus({ key }) {
      switch (key) {
        case "ArrowLeft":
          this.tabPrev();
          break;
        case "ArrowRight":
          this.tabNext();
          break;
        case "End":
          this.tabLast();
          break;
        case "Home":
          this.tabFirst();
          break;
        default:
          break;
      }

      this.focusItem();
    },
    tabPrev() {
      const isFirst = this.focusIndex === 0;
      if (isFirst) {
        this.tabLast();
      } else {
        this.focusIndex = this.focusIndex - 1;
      }
    },
    tabNext() {
      const isLast = this.focusIndex === this.focusCount;
      if (isLast) {
        this.tabFirst();
      } else {
        this.focusIndex = this.focusIndex + 1;
      }
    },
    tabFirst() {
      this.focusIndex = 0;
    },
    tabLast() {
      this.focusIndex = this.focusCount;
    },
    focusItem() {
      this.$refs.tablist.children[this.focusIndex].focus();
    }
  }
};
</script>
