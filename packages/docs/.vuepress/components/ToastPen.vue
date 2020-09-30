<template>
  <div class="ods-toast-pen">
    <Toast
      v-for="toast in toasts"
      :variant="toast.variant"
      :title="'This is the ' + toast.variant + ' toast title'"
      body="This is supplemental information."
    />
  </div>
</template>

<script>
export default {
  components: { Toast: () => import("./Toast.vue") },
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
