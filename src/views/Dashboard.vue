<template>
  <div class="flex">
    <dashboard-sidebar class="relative left-0" />
    <dashboard-main-panel />
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