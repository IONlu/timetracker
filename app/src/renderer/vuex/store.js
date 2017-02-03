import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'

import createPersistedState from 'vuex-persistedstate'
import electron from 'electron'
import fs from 'fs'

Vue.use(Vuex)

const dataFolder = electron.remote.app.getPath('appData') + '/timetracker'

const path = key => {
  return dataFolder + '/data.' + key + '.json'
}

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: (key) => {
        if (path(key)) {
          if (!fs.existsSync(dataFolder)) {
            fs.mkdirSync(dataFolder)
          }
          if (!fs.existsSync(path(key))) {
            fs.openSync(path(key), 'w')
          }
          return null
        }
        try {
          return JSON.parse(fs.readFileSync(path(key)))
        } catch (err) {
          return null
        }
      },
      setState: (key, state) => {
        fs.writeFileSync(path(key), JSON.stringify(state))
      }
    })
  ],
  actions,
  getters,
  modules,
  strict: true
})
