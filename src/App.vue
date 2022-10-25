<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>

  <teleport to="#notification">
    <div class="w-full flex justify-center">
      <notification-strip class="notif-style" v-show="$store.getters.getShowNotif" 
      :class="[$store.getters.getnotifColor, 'daisyui-alert']" />
    </div>
  </teleport>

  <teleport to="#switch-themes">
    <div class="theme-change">
      <font-awesome-icon :icon="darkThemeOff ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" />
      <div class="daisyui-tooltip daisyui-tooltip-left" data-tip="change theme">
        <input type="checkbox" class="daisyui-toggle rounded-full border-gray-500 outline-none" 
        @click="$store.commit('changeAppTheme')" v-model="darkThemeOff">
      </div>
    </div>
  </teleport>
</template>

<script>
import NotificationStrip from './components/NotificationStrip.vue'
export default {
  "name": "App",
  "components": {
    NotificationStrip
  },
  data() {
    return {
      "darkThemeOff": false
    }
  },
  "methods": {
  },
}
</script>

