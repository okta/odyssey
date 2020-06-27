<template>
  <div class="ods-tabs" :id="id">     
    <div class="ods-tabs--tablist" ref="tablist" role="tablist" aria-label="" :style="indicatorStyle" @keydown.left.right.end.home.prevent="handleTabFocus">
      <button 
        class="ods-tabs--tab"
        role="tab"
        v-for="tab in tablist"
        v-on:click="tabSelect"
        :id="tab.id"
        :key="'tab-button-' + tab.id"
        :aria-selected="tab.id === active" 
        :tabindex="tab.id !== active ? -1 : 0" 
        :aria-controls="tab.id + '-tabpanel'"
      >
        {{tab.label}}
      </button>
      </div>
      <div class="ods-tabs--tabpanel">
        <div 
          role="tabpanel"
          v-for="tab in tablist" 
          v-bind:id="tab.id + '-tabpanel'"
          :aria-labelledby="tab.id" :hidden="tab.id !== active" tabindex="0"
          :key="'tabpanel-' + tab.id"
        >
          <slot :name="tab.id" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OdsTabs',
  props: {
    active: {
      type: String,
      required: false,
      default: "tab-0",
    },
    id: {
      type: String,
      required: true,
      default: "component-tabs-0",
    },
    tablist: {
      type: Array,
      required: true,
      default: () => [
        { id: "tab-0", label: 'Tab 0' },
        { id: "tab-1", label: 'Tab 1' },
        { id: "tab-2", label: 'Tab 2' }
      ]
    }
  },
  data() {
     return {
      indicator: { width: 0, x: 0 },
      focusIndex: 0,
      focusCount: 0
     }
  },
  computed: {
    indicatorStyle() {
      return `
        --ods-tabs-indicator-width: ${this.indicator.width}px;
        --ods-tabs-indicator-pos-x: ${this.indicator.x}px;
      ` 
    },
  },
  methods: {
    tabSelect (event) {
      const tab = event.target
      
      this.active = tab.id
      this.focusIndex = [...tab.parentElement.children].indexOf(tab)
      this.indicator = {
        width: tab.offsetWidth,
        x: tab.offsetLeft
      }
    },
    handleTabFocus ({ key }) {
      if (key === 'ArrowLeft') {
        this.tabPrev()
      }
      else if (key === 'ArrowRight') {
        this.tabNext()
      }
      else if (key === 'End') {
        this.tabLast()
      }
      else if (key === 'Home') {
        this.tabFirst()
      }
      
      this.focusItem()
    },
    tabPrev () {
      const isFirst = this.focusIndex ===  0
      if (isFirst) {
        this.tabLast()
      } else {
        this.focusIndex = this.focusIndex - 1
      }
    },
    tabNext () {
      const isLast = this.focusIndex === this.focusCount
      if (isLast) {
        this.tabFirst()
      } else {
        this.focusIndex = this.focusIndex + 1
      }
    },
    tabFirst () {
      this.focusIndex = 0
    },
    tabLast () {
      this.focusIndex = this.focusCount
    },
    focusItem() {
      this.$refs.tablist.children[this.focusIndex].focus()
    }
  }, 
  mounted() {
    const el = this.$el
    console.log(this.$el)
    const tablist = el.querySelectorAll('.ods-tabs--tablist')[0]
    const activeTab = tablist.querySelectorAll('.ods-tabs--tab[aria-selected="true"')[0]
    
    this.active = activeTab.id

    this.focusCount = this.tablist.length - 1 // use zero index
    this.focusIndex = 1
    
    this.indicator = {
      width: activeTab.offsetWidth,
      x: activeTab.offsetLeft
    }
  },
}
</script>
