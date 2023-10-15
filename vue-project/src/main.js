import './assets/main.css'
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'



const store = createStore({
  state: {
    lastId: 0,
    contacts: [],
    contactSaving: false
  },
  mutations: {
    addContact(state, payload) {
      state.lastId++

      payload.id = state.lastId

      state.contacts = [
        ...state.contacts,
        payload
      ]
    },
    contactSaving(state) {
      state.contactSaving = true
    },
    contactSaved(state) {
      state.contactSaving = false
    },
    updateContact(state, payload) {
      state.contacts = [
        ...state.contacts.filter(element => element.id !== payload.id),
        payload
      ]
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
    updateContactAsync({ commit }, payload) {
      commit('contactSaving')
      setTimeout(() => {
        commit('updateContact', payload)
        commit('contactSaved')
      }, 2000)
    },
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
    { path: '/contact/:contactName', component: Contact, props: true },
  ]
});

const app = createApp(App)
app.use(router);
app.use(store)
app.mount('#app')