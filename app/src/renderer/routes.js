import MainPage from 'components/MainPage'

export default [
  {
    path: '/list',
    component: MainPage
  },
  {
    path: '*',
    redirect: '/list'
  }
]
