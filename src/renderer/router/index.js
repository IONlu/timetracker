import Vue from 'vue'
import Router from 'vue-router'
import ListPage from '../components/ListPage'
import SettingsPage from '../components/SettingsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'list',
      path: '/list',
      component: ListPage
    },
    {
      name: 'settings',
      path: '/settings',
      component: SettingsPage
    },
    {
      path: '*',
      redirect: '/list'
    }
  ]
})
