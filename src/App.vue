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

