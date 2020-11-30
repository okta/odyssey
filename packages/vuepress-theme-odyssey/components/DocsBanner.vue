<template>
  <aside
    v-if="visible && !dismissed"
    role="alert"
    :class="{
      'docs-banner': true,
      'is-docs-banner-visible': visible
    }"
  >
    <div class="docs-banner--content">
      <slot></slot>
    </div>
    <button
      v-if="onDismiss"
      aria-label="Dismiss alert"
      class="ods-button is-ods-button-clear"
      @click="dismiss"
    >
      <OdsIcon icon="close"></OdsIcon>
    </button>
  </aside>
</template>

<script>
export default {
  name: "DocsBanner",
  props: {
    onDismiss: {
      type: Function,
      required: false,
      default: () => undefined
    },
    visible: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: () => ({
    dismissed: false
  }),
  methods: {
    dismiss() {
      this.dismissed = true;

      this.onDismiss();
    }
  }
};
</script>
