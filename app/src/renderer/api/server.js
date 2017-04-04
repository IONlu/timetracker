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

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
