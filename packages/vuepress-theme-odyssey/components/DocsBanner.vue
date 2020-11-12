<template>
  <aside
    role="alert"
    v-if="visible && !dismissed"
    :class="{
      'docs-banner': true,
      'is-docs-banner-visible': visible
    }"
  >
    <div class="docs-banner--content">
      <slot></slot>
    </div>
    <button v-if="onDismiss" @click="dismiss" aria-label="Dismiss alert" class="ods-button is-ods-button-clear">
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
      required: false
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
