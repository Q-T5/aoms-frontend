import { createRouter, createWebHistory } from "vue-router";
import Login from "/src/views/Login.vue"
import Dashboard from "/src/views/Dashboard.vue"
import NotFound from "/src/views/NotFound.vue"
import Management from "/src/views/Management.vue"
import AdminPanel from "/src/views/AdminPanel.vue"
import ManageUsers from "/src/views/ManageUsers.vue"
import Notes from "/src/views/Notes.vue"
import ManagerPanel from "/src/views/ManagerPanel.vue"
import Statistics from "/src/views/Statistics.vue"

const router = createRouter({
    "history": createWebHistory(),
    "routes": [
        {
            "path": "/",
            "component": Login,
            "name": "Login"
        },
        {
            "path": "/dashboard",
            "component": Dashboard,
            "name": "Dashboard",
            "children": [
                {
                    "path": "/dashboard/management",
                    "component": Management,
                    "name": "Management",
                    "children": [
                        {
                            "path": "/dashboard/management/general-view",
                            "component": () => import("/src/views/GeneralView.vue"),
                            "name": "GeneralView"
                        },
                        {
                            "path": "/dashboard/management/list-view",
                            "component": () => import("/src/views/ListView.vue"),
                            "name": "ListView"
                        },
                        {
                            "path": "/dashboard/management/new-animal",
                            "component": () => import("/src/views/AnimalEditor.vue"),
                            "name": "AnimalEditor"
                        }
                    ]
                },
                {
                    "path": "/dashboard/user-settings",
                    "component": () => import("/src/views/UserSettings.vue"),
                    "name": "UserSettings"
                },
                {
                    "path": "/dashboard/admin",
                    "component": AdminPanel,
                    "name": "AdminPanel",
                    "children": [
                        {
                            "path": "/dashboard/admin/manage-users",
                            "component": ManageUsers,
                            "name": "ManageUsers"
                        },
                        {
                            "path": "/dashboard/admin/notes",
                            "component": Notes,
                            "name": "Notes"
                        }
                    ]
                },
                {
                    "path": "/dashboard/manager",
                    "component": ManagerPanel,
                    "name": "ManagerPanel",
                    "children": [
                        {
                            "path": "/dashboard/manager/manage-users",
                            "component": ManageUsers,
                            "name": "ManageUsers"
                        },
                        {
                            "path": "/dashboard/manager/notes",
                            "component": Notes,
                            "name": "Notes"
                        },
                        {
                            "path": "/dashboard/manager/statistics",
                            "component": Statistics,
                            "name": "Statistics"
                        }
                    ]
                }
            ]
        },
        {
            "path": "/signup",
            "component": () => import("/src/views/Signup.vue"),
            "name": "Signup"
        },
        {
            "path": "/:catchAll(.*)",
            "component": NotFound
        }
    ]
})

export default router;