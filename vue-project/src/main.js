import './assets/main.css'
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
    contacts: [],
    count: 0
  },
  mutations: {
    addContact(state, payload) {
      state.contacts.push(payload);
      console.log(payload)
    },
    increment(state, payload) {
      state.count+=payload.amount;
      console.log(state.count)
    }

  },
  actions: {
    addContactAsync({ commit }, payload) {
      setTimeout(() => {
        commit('addContact', payload)
        console.log(payload)
      }, 1000)
    },
    increment({ commit }, payload) {
      commit('increment', payload);
      console.log(payload)
    }

  }
})




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
app.use(store)
app.mount('#app')



