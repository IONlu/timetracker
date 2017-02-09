import ListPage from 'components/ListPage'
import SettingsPage from 'components/SettingsPage'

export default [
  {
    path: '/list',
    component: ListPage
  },
  {
    path: '/settings',
    component: SettingsPage
  },
  {
    path: '*',
    redirect: '/list'
  }
]
