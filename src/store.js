import { createStore } from 'vuex'

const notifModule = {
    state() {
        return {
            "message": "",
            "notifColor": "",
            "notifIcon": "",
            "showNotif": false
        }
    },
    "getters": {
        getMessage(state) {
            return state.message;
        },
        getnotifColor(state) {
            return state.notifColor;
        },
        getNotifIcon(state) {
            return state.notifIcon;
        },
        getShowNotif(state) {
            return state.showNotif;
        }
    },
    "mutations": {
        displayNotification(state, payload) {
            state.message = payload[0];
            state.notifColor = payload[1];
            state.notifIcon = payload[2];
            setTimeout(() => {
                state.showNotif = true;
            }, 200)

            setTimeout(() => {
                state.showNotif = false;
            }, 3000)
        }
    }
}

const animalMedicalRecordsModule = {
    "mutations": {
        deleteMedicalRecords(state, payload) {
            console.log(`deleting animal id: ${ payload }`);
            
            fetch(`/api/animals/deleteAnimalRecord/${ payload }`, {
                "method": "DELETE",
            });
        }
    }
}

const userManagementModule = {
    state() {
        return {
            "userLoggedIn": false,
            "userCredentials": {
                "token": "",
                "type": "",
                "staffId": "",
                "firstName": "",
                "roles": []
            }
        }
    },
    "mutations": {
        LOGIN_USER(state, loggedInUserCredentials) {
            state.userCredentials = loggedInUserCredentials;
            state.userLoggedIn = true;
        },
        LOGOUT_USER(state, loggedInUserCredentials) {
            state.userCredentials = loggedInUserCredentials;
            state.userLoggedIn = false;
        },
    },
    "getters": {
        getUserRoles(state) {
            return state.userCredentials.roles;
        },
        getLoggedInState(state) {
            return state.userLoggedIn;
        },
        getAuthToken(state) {
            return state.userCredentials.token;
        }
    },
}

const store = createStore({
    "modules": {
        notifModule, animalMedicalRecordsModule, themeModule, userManagementModule
    }
})

export default store;
