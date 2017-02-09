import ListPage from 'components/ListPage'

export default [
  {
    path: '/list',
    component: ListPage
  },
  {
    path: '*',
    redirect: '/list'
  }
]
