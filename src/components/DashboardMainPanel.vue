<template>
  <div class="w-full h-screen">
    <router-view :key="componentRemount" v-slot="{ Component }" class="h-screen max-h-screen 
    overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 relative">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
      <div class="daisyui-tooltip daisyui-tooltip-top absolute bottom-1 right-48" 
      :data-tip="$route.path === '/dashboard/animals/list-view' ? 'refresh list' : 'add new animals'">
        <button class="daisyui-btn daisyui-btn-square rounded-md" @click="componentRemount++" 
        :to="{ name: 'AnimalEditor' }" 
        v-show="$route.path !== '/dashboard/animals/general-view' && $route.path !== '/dashboard/users'">
        <font-awesome-icon :icon="$route.path === '/dashboard/animals/list-view'? 'fa-solid fa-repeat' : 'fa-solid fa-add'" 
        class="text-xl" />
        </button>
      </div>
    </router-view>
  </div>
</template>

<script>
export default {
  "name": "DashboardMainPanel",
  data() {
    return {
      "componentRemount": 0
    }
  },
  "methods": {
      
  },
  mounted() {
    this.$router.push({ name: "GeneralView" });
  },
  activated() {
    this.$router.push({ name: "GeneralView" });
  }
}
</script>