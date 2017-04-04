import Koa from 'koa'
import KoaRouter from 'koa-router'
import store from '../vuex/store'

const app = new Koa()
const router = new KoaRouter()

router.get('/add/:text', ctx => {
  store.dispatch('createBreakpoint', {
    text: ctx.params.text
  })
  ctx.body = ctx.params
})

router.get('/all', ctx => {
  ctx.body = store.state.timeTracker.breakpoints
})

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
