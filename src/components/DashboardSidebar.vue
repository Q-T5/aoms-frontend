<template>
  <div class="flex flex-col justify-between shadow-xl shadow-gray-700 items-center py-1">
    <img src="../assets/feather-svgrepo-com.svg" alt="app-icon" class="w-8 ml-2" />
    <div class="flex flex-col w-[95%] rounded-md space-y-3">
      <router-link :to="{ name: 'GeneralView' }" class="active-tab">General View</router-link>
      <router-link :to="{ name: 'ListView' }" class="active-tab">List View</router-link>
      <router-link :to="{ name: 'EditorView' }" class="active-tab">Editor View</router-link>
      <router-link :to="{ name: 'UserSettings' }" class="navbar-buttons mb-2">Users</router-link>
    </div>
    <div>
      <router-link :to="{ 'name': 'Login' }"
      @click="$store.commit('LOGOUT_USER', {}),$store.commit('displayNotification', ['successfully logged out', 
      'daisyui-alert-success', 'success.svg'])" class="logout-button">Logout</router-link>
    </div>
  </div>
</template>

<script>
export default {
  "name": "DashboardSidebar"
}
</script>