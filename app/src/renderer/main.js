import Vue from 'vue'
import Electron from 'vue-electron'
import VueRouter from 'vue-router'

Vue.use(Electron)
Vue.use(VueRouter)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
