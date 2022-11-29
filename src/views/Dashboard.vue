<template>
  <div class="flex">
    <dashboard-sidebar class="w-[10%]" />
    <dashboard-main-panel class="w-[90%]" />
  </div>
</template>

<script>
import DashboardSidebar from '../components/DashboardSidebar.vue'
import DashboardMainPanel from '../components/DashboardMainPanel.vue'
export default {
  "name": "Users",
  "components": {
    DashboardSidebar, DashboardMainPanel
  }
}
</script>