<template>
  <div class="ods-toast-pen">
    <OdsToast
      v-for="(toast, index) in toasts"
      :key="index"
      :variant="toast.variant"
      :title="'This is the ' + toast.variant + ' toast title'"
      body="This is supplemental information."
    />
  </div>
</template>

<script>
export default {
  components: { OdsToast: () => import("./OdsToast.vue") },
  data: () => ({
    toasts: []
  }),
  methods: {
    addToast(variant) {
      this.toasts.push({
        variant
      });
    }
  }
};
</script>
