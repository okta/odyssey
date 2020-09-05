<template>
  <div class="odo-card">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>

</template>
<style lang="scss">
@import '@okta/odyssey';

.odo-card {
  padding: $spacing-m $spacing-l;
  border-radius: 0 32px;
  background: cv('gray', '000');
}

</style>
<script>
export default {
  name: 'odo-card'
}
</script>
