import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, 
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')



