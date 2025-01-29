import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const vuetify = createVuetify({
    components,
    directives,

})
createApp(App)
    .use(store) // Store kullanımı
    .use(router) // Router'ı ekledik
    .use(vuetify)
    .use(Toast,{
        position: POSITION.TOP_RIGHT, // Mesaj konumu (ör. TOP_LEFT, BOTTOM_RIGHT)
        timeout: 3000, // Mesajın kaybolma süresi (ms)
        closeOnClick: true,
    })// Vuetify'ı ekledik
    .mount('#app') // Uygulamayı #app'e monte ettik