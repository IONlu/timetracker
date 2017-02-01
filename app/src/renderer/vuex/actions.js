import * as types from './mutation-types'

export const createBreakpoint = ({ commit, getters }, data) => {
  if (!getters.currentBreakPoint.stopTime) {
    commit(types.STOP_BREAKPOINT, {
      breakpoint: getters.currentBreakPoint
    })
  }
  commit(types.CREATE_BREAKPOINT, {
    text: (data && data.text) || ''
  })
}

export const stopBreakpoint = ({ commit }, data) => {
  if (!data.breakpoint) {
    return
  }
  commit(types.STOP_BREAKPOINT, {
    breakpoint: data.breakpoint
  })
}

export const removeBreakpoint = ({ commit }, data) => {
  if (!data.breakpoint) {
    return
  }
  commit(types.REMOVE_BREAKPOINT, {
    breakpoint: data.breakpoint
  })
}
