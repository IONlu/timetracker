import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import ApiServer from './api/server'
import locale from 'element-ui/lib/locale/lang/en'

import App from './App'
import routes from './routes'

Vue.use(Electron)
Vue.use(Router)
Vue.use(ElementUI, { locale })
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')

ApiServer.listen(5000)
