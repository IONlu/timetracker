import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaCors from 'kcors'
import store from '../store'
import https from 'https'

const app = new Koa()
const router = new KoaRouter()
const cors = new KoaCors()

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
  .use(cors)
  .use(router.routes())
  .use(router.allowedMethods())

export default app

var server

const start = () => {
  const port = store.getters.setting('apiPort')
  const key = store.getters.setting('apiKey')
  const cert = store.getters.setting('apiCert')
  if (port) {
    const options = {}
    if (key && cert) {
      options.key = key
      options.cert = cert
    }

    try {
      server = https.createServer(options, app.callback())
      server.listen(port)
    } catch (e) {
      console.error('Could not start api server', e.message)
      stop()
    }
  }
}

const stop = () => {
  if (server) {
    server.close()
    server = null
  }
}

const restart = () => {
  stop()
  start()
}

store.watch(state => {
  return {
    apiPort: state.settings.settings.apiPort,
    apiKey: state.settings.settings.apiKey,
    apiCert: state.settings.settings.apiCert
  }
}, () => restart())

start()
