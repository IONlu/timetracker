import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'

import createPersistedState from 'vuex-persistedstate'
import { remote } from 'electron'
const { app } = remote
import fs from 'fs'

Vue.use(Vuex)

const getDataFolder = () => {
  var folder = app.getPath('appData') + '/' + app.getName()
  if (process.env.NODE_ENV !== 'production') {
    folder += '-' + process.env.NODE_ENV
  }
  return folder
}
const getFilePath = key => getDataFolder() + '/data.' + key + '.json'

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: (key) => {
        const dataFolder = getDataFolder()
        if (!fs.existsSync(dataFolder)) {
          fs.mkdirSync(dataFolder)
        }

        try {
          return JSON.parse(fs.readFileSync(getFilePath(key)))
        } catch (err) {
          return null
        }
      },
      setState: (key, state) => {
        fs.writeFileSync(getFilePath(key), JSON.stringify(state))
      }
    })
  ],
  actions,
  getters,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
