import * as types from '../mutation-types'

const state = {
  breakpoints: []
}

const mutations = {
  [types.STOP_BREAKPOINT] (state, data) {
    const index = state.breakpoints.indexOf(data.breakpoint)
    if (index < 0) {
      return
    }
    state.breakpoints = [
      ...state.breakpoints.slice(0, index),
      {
        ...data.breakpoint,
        stopTime: Date.now()
      },
      ...state.breakpoints.slice(index + 1)
    ]
  },
  [types.CREATE_BREAKPOINT] (state, data) {
    state.breakpoints.push({
      startTime: Date.now(),
      text: data.text
    })
  },
  [types.REMOVE_BREAKPOINT] (state, data) {
    const index = state.breakpoints.indexOf(data.breakpoint)
    if (index < 0) {
      return
    }
    state.breakpoints.splice(index, 1)
  },
  [types.UPDATE_BREAKPOINT_TEXT] (state, data) {
    data.breakpoint.text = data.text
  }
}

export default {
  state,
  mutations
}
