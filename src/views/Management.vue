<template>
  <div class="w-3/4 max-w-[75%]">
    <h1 class="text-3xl font-roboto">AOMS Animal Management Dashboard</h1>
    <div class="grid grid-cols-2 h-10 items-end mb-1">
      <router-link :to="{ 'name': 'ListView' }" class="active-tab">List View</router-link>
      <router-link :to="{ 'name': 'AnimalEditor' }" class="active-tab">Editor</router-link>
    </div>
  </div>
  <router-view :key="componentRemount" v-slot="{ Component }" class="w-[85%] max-w-[85%] h-screen max-h-screen 
  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 relative">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
    <div class="daisyui-tooltip daisyui-tooltip-top absolute bottom-1 right-48" 
    :data-tip="$route.path === '/dashboard/management/list-view'? 'refresh list' : 'add new animal'">
      <button class="daisyui-btn daisyui-btn-circle " @click="componentRemount++" 
      :to="{ 'name': 'AnimalEditor' }">
      <font-awesome-icon 
      :icon="$route.path === '/dashboard/management/list-view'? 'fa-solid fa-repeat' : 'fa-solid fa-add'" 
      class="text-2xl" />
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
    this.$router.push({ name: 'ListView' });
  },
  activated() {
    this.$router.push({ name: 'ListView' });
  }
}
</script>