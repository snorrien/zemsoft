import './assets/main.css'
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { vMaska } from "maska"

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const store = createStore({
  state: {
    lastId: 0,
    contacts: [],
    contactSaving: false,
    message: null
  },
  mutations: {
    addContact(state, contact) {
      state.lastId++

      contact.id = state.lastId

      state.contacts = [
        ...state.contacts,
        contact
      ]
    },
    contactSaving(state) {
      state.contactSaving = true
    },
    contactSaved(state) {
      state.contactSaving = false
    },
    updateContact(state, contact) {
      state.contacts = [
        ...state.contacts.filter(element => element.id !== contact.id),
        contact
      ]
    },
    removeContact(state, contactId) {
      state.contacts = [
        ...state.contacts.filter(element => element.id !== contactId)
      ]
    },
    showMessage(state, message) {
      state.message = message;
    },
    hideMessage(state) {
      state.message = null;
    }
  },
  actions: {
    async addContactAsync({ commit }, contact) {
      commit('contactSaving')
      await timeout(2000)
      commit('addContact', contact)
      commit('contactSaved')
      commit('showMessage', 'Контакт успешно создан')
      await timeout(3000)
      commit('hideMessage')
    },
    async updateContactAsync({ commit }, contact) {
      commit('contactSaving')
      await timeout(2000)
      commit('updateContact', contact)
      commit('contactSaved')
      commit('showMessage', 'Контакт успешно изменён')
      await timeout(3000)
      commit('hideMessage')
    },
    async removeContactAsync({ commit }, contactId) {
      commit('removeContact', contactId)
      commit('showMessage', 'Контакт удален')
      await timeout(3000)
      commit('hideMessage')
    }
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

const app = createApp(App).directive("maska", vMaska)
app.use(router);
app.use(store)
app.mount('#app')