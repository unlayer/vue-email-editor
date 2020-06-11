import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: App },
]

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

new Vue({
  router
}).$mount('#app')
