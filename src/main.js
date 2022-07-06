import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import store from './store'
const app = createApp(App)
import router from './router'

app.use(store)
app.use(Antd)
app.use(router)
app.mount('#app')
