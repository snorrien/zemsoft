import './assets/main.css'
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const store = createStore({
  state: {
    contacts: [],
    contactSaving: false,
    contact: {}
  },
  mutations: {
    addContact(state, payload) {
      console.log(payload)
      state.contacts.push(payload)
    },
    contactSaving(state) {
      state.contactSaving = true
    },
    contactSaved(state) {
      state.contactSaving = false
    },
    contactOpened(state, payload) {
      state.contact = payload ?? {
        name: '',
        email: '',
        phone: '',
        group: ''
      }
    },
    contactClosed(state) {
      state.contact = {
        name: '',
        email: '',
        phone: '',
        group: ''
      }
    }
  },
  actions: {
    addContactAsync({ commit }, payload) {
      commit('contactSaving')
      setTimeout(() => {
        commit('addContact', payload)
        commit('contactSaved')
      }, 2000)
    },
    openContact({ commit }, payload) {
      commit('contactOpened', payload)
    },
    closeContact({ commit }, payload) {
      commit('contactClosed', payload)
    }

  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
  ]
});

const app = createApp(App)
app.use(router);
app.use(store)
app.mount('#app')