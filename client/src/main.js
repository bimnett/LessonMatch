// import App from './App.vue'

import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'
import router from './router'
import eventBus from './eventBus'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
app.config.globalProperties.$eventBus = eventBus
app.use(createBootstrap())
app.use(router)
app.mount('#app')
