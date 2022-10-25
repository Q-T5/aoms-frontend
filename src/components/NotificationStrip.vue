<template>
  <div>
    <img :src="`/src/assets/${ $store.getters.getNotifIcon }`" alt="success-icon" class="w-6" />
    <p>{{ $store.getters.getMessage }}</p>
  </div>
</template>

<script>
export default {
  "name": "NotificationStrip"
}
</script>