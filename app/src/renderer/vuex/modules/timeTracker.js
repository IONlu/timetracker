import * as types from '../mutation-types'

const state = {
  breakpoints: []
}

const mutations = {
  [types.SET_BREAKPOINT_START_TIME] (state, data) {
    data.breakpoint.startTime = data.time
  },
  [types.SET_BREAKPOINT_STOP_TIME] (state, data) {
    data.breakpoint.stopTime = data.time
  },
  [types.STOP_BREAKPOINT] (state, data) {
    data.breakpoint.stopTime = Date.now()
  },
  [types.CREATE_BREAKPOINT] (state, data) {
    state.breakpoints.push({
      startTime: Date.now(),
      stopTime: null,
      text: data.text,
      uploadStatus: null
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
  },
  [types.UPDATE_UPLOAD_STATUS] (state, data) {
    data.breakpoint.uploadStatus = data.status || null
  }
}

export default {
  state,
  mutations
}
