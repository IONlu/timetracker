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

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: (key) => {
        try {
          return JSON.parse(fs.readFileSync(dataFolder + '/data.' + key + '.json'))
        } catch (err) {
          return null
        }
      },
      setState: (key, state) => {
        fs.writeFileSync(dataFolder + '/data.' + key + '.json', JSON.stringify(state))
      }
    })
  ],
  actions,
  getters,
  modules,
  strict: true
})
