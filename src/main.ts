import { createApp } from 'vue'
import App from './App.vue'
import vant from 'vant'
import { Toast } from 'vant';
import 'vant/lib/index.css'
import  router from './router/index'
import { createPinia } from 'pinia'
import mitt from 'mitt' 
const bus = mitt()
const app = createApp(App)
app.config.globalProperties.$bus = bus
app.use(Toast)
app.use(router)
app.use(vant)
app.use(createPinia())
app.mount('#app')
