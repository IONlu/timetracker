import ListPage from 'components/ListPage'
import SettingsPage from 'components/SettingsPage'

export default [
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
