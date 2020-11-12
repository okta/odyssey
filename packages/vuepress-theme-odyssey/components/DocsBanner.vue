<template>
  <aside
    role="alert"
    v-if="visible"
    :class="[
      'docs-banner'
    ]"
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
      type: Function,
      required: false,
      default: true
    }
  },
  data: () => ({
    dismissed: false,
    visible: true
  }),
  mounted() {
    this.$el.addEventListener("animationend", ({ animationName }) => {
      if (animationName === "docs-banner-out") {
        this.visible = false;
      }
    });
  },
  methods: {
    dismiss() {
      this.dismissed = true;

      this.onDismiss();
    }
  }
};
</script>
