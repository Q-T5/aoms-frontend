<template>
  <div class="flex flex-col h-screen justify-center p-1 space-y-4 w-fit shadow-md">
    <div class="flex flex-col">
      <div class="daisyui-tooltip daisyui-tooltip-right" data-tip="manage animals">
        <router-link :to="{ 'name': 'Management' }"><font-awesome-icon icon="fa-regular fa-compass" 
        class="sidebar-buttons" /></router-link>
      </div>
      <div class="daisyui-tooltip daisyui-tooltip-right" data-tip="user settings">
        <router-link :to="{ 'name': 'UserSettings' }" ><font-awesome-icon icon="fa-regular fa-user-circle" class="sidebar-buttons" /></router-link>
      </div>
      <div class="daisyui-tooltip daisyui-tooltip-right" data-tip="logout">
        <router-link :to="{ 'name': 'Login' }"
        @click="$store.commit('displayNotification', ['successfully logged out', 'daisyui-alert-success', 'success.svg'])">
        <font-awesome-icon icon="fa-regular fa-arrow-alt-circle-right" class="sidebar-buttons" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  "name": "DashboardSidebar"
}
</script>