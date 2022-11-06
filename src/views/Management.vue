<template>
  <router-view :key="componentRemount" v-slot="{ Component }" class="w-[80%] max-w-[80%] h-screen max-h-screen 
  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 relative">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
    <div class="daisyui-tooltip daisyui-tooltip-top absolute bottom-1 right-48" 
    :data-tip="$route.path === '/dashboard/management/list-view'? 'refresh list' : 'add new animal'">
      <button class="daisyui-btn daisyui-btn-square rounded-md" @click="componentRemount++" 
      :to="{ 'name': 'AnimalEditor' }" v-show="$route.path !== '/dashboard/management/general-view'">
      <font-awesome-icon 
      :icon="$route.path === '/dashboard/management/list-view'? 'fa-solid fa-repeat' : 'fa-solid fa-add'" 
      class="text-xl" />
      </button>
    </div>
  </router-view>
</template>

<script>
export default {
  "name": "Management",
  data() {
    return {
      "componentRemount": 0
    }
  },
  mounted() {
    this.$router.push({ name: 'GeneralView' });
  },
  activated() {
    this.$router.push({ name: 'GeneralView' });
  }
}
</script>