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
            }, 2700)
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

const themeModule = {
    "mutations": {
        changeAppTheme() {
            const targetElement = document.getElementById("theme-switcher");
            const attributeValue = targetElement.getAttribute("data-theme");

            if(attributeValue === "black") {
                targetElement.setAttribute("data-theme", "garden");
            } else if(attributeValue === "garden") {
                targetElement.setAttribute("data-theme", "black");
            }
        }
    }
}

const store = createStore({
    "modules": {
        notifModule, animalMedicalRecordsModule, themeModule
    }
})

export default store;
