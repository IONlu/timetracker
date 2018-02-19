import * as types from '../mutation-types'

const state = {
  settings: {}
}

const mutations = {
  [types.UPDATE_SETTING] (state, data) {
    state.settings = {
      ...state.settings,
      [data.name]: data.value
    }
  }
}

export default {
  state,
  mutations
}
