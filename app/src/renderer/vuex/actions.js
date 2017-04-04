import * as types from './mutation-types'
import { upload } from '../wisol'

// timeTracker
export const createBreakpoint = ({ commit, getters }, data) => {
  if (getters.currentBreakPoint && !getters.currentBreakPoint.stopTime) {
    commit(types.STOP_BREAKPOINT, {
      breakpoint: getters.currentBreakPoint
    })
  }
  commit(types.CREATE_BREAKPOINT, {
    text: (data && data.text) || ''
  })
}

export const setBreakpointTime = ({ commit, getters }, data) => {
  if (!data.breakpoint || data.startTime >= data.stopTime) {
    return
  }
  commit(types.SET_BREAKPOINT_START_TIME, {
    breakpoint: data.breakpoint,
    time: data.startTime
  })
  commit(types.SET_BREAKPOINT_STOP_TIME, {
    breakpoint: data.breakpoint,
    time: data.stopTime
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

export const updateBreakpointText = ({ commit }, data) => {
  if (!data.breakpoint) {
    return
  }
  commit(types.UPDATE_BREAKPOINT_TEXT, {
    breakpoint: data.breakpoint,
    text: data.text || ''
  })
}

export const uploadBreakpoint = ({ commit }, data) => {
  if (!data.breakpoint) {
    return
  }
  commit(types.UPDATE_UPLOAD_STATUS, {
    breakpoint: data.breakpoint,
    status: 'pending'
  })
  return upload(data.breakpoint.startTime, data.workTime || 0, data.breakpoint.text)
    .then(() => {
      commit(types.UPDATE_UPLOAD_STATUS, {
        breakpoint: data.breakpoint,
        status: 'success'
      })
    })
    .catch(() => {
      commit(types.UPDATE_UPLOAD_STATUS, {
        breakpoint: data.breakpoint,
        status: null
      })
    })
}

// settings
export const updateSetting = ({ commit }, data) => {
  if (!data.name) {
    return
  }
  commit(types.UPDATE_SETTING, {
    name: data.name,
    value: data.value || null
  })
}
