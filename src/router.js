import { createRouter, createWebHistory } from "vue-router";
import Login from "/src/views/Login.vue"
import Dashboard from "/src/views/Dashboard.vue"
import NotFound from "/src/views/NotFound.vue"
import store from "./store";

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
                    "path": "/dashboard/animals/general-view",
                    "component": () => import("/src/views/GeneralView.vue"),
                    "name": "GeneralView"
                },
                {
                    "path": "/dashboard/animals/list-view",
                    "component": () => import("/src/views/ListView.vue"),
                    "name": "ListView"
                },
                {
                    "path": "/dashboard/animals/editor-view",
                    "component": () => import("/src/views/EditorView.vue"),
                    "name": "EditorView"
                },
                {
                    "path": "/dashboard/users",
                    "component": () => import("/src/views/UserManagement.vue"),
                    "name": "UserSettings"
                },
            ]
        },
        {
            "path": "/:catchAll(.*)",
            "component": NotFound
        }
    ]
});

router.beforeEach(async (to, from) => {
    if(to.name === "GeneralView")  {
        if(store.getters.getLoggedInState === false) {
            return { name: "Login" }
        }
    }
});

export default router;