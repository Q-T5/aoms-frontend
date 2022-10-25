<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <router-view v-slot="{ Component }" class="h-screen max-h-screen">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  "name": "DashboardMainPanel",
  data() {
    return {
      
    }
  },
  "methods": {
      
  }
}
</script>