<template>
  <aside
    v-if="visible && !dismissed"
    role="alert"
    :class="{
      'ods-banner is-ods-banner-info is-ods-banner-dismissable': true,
      'is-docs-banner-visible': visible,
    }"
  >
    <span class="ods-banner--icon">
      <OdsIcon icon="get-info"></OdsIcon>
    </span>
    <p class="ods-banner--content">
      <slot></slot>
    </p>
    <section class="ods-banner--actions">
      <a href="/beta">Learn more</a>
    </section>
    <span class="ods-banner--dismiss">
      <button
        v-if="onDismiss"
        aria-label="Dismiss alert"
        class="ods-button is-ods-button-dismiss"
        @click="dismiss"
      >
        <OdsIcon icon="close"></OdsIcon>
      </button>
    </span>
  </aside>
</template>

<script>
export default {
  name: "DocsBanner",
  props: {
    onDismiss: {
      type: Function,
      required: false,
      default: () => undefined,
    },
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    dismissed: false,
  }),
  methods: {
    dismiss() {
      this.dismissed = true;

      this.onDismiss();
    },
  },
};
</script>
