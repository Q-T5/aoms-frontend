import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'
import router from './router'
import mitt from 'mitt'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faJava, faVuejs } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faHome, faPowerOff, faUser, faSun, faMoon, faPencil, faTrash, faAdd, faRepeat, faEye,
    faAngleDoubleLeft, faAngleDoubleRight
 } from '@fortawesome/free-solid-svg-icons'
import store from './store'

const emitter = mitt();
const app = createApp(App);

library.add(
    faMoon, faSun, faJava, faVuejs,faHome, faPowerOff, faUser, faPencil, faTrash, faAdd, faRepeat, faEye,
    faAngleDoubleLeft, faAngleDoubleRight
);

app.config.globalProperties.emitter = emitter;
app .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
.mount('#app');
