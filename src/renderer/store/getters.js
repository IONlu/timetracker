// timeTracker
export const breakpoints = state => state.timeTracker.breakpoints
export const currentBreakPoint = state => state.timeTracker.breakpoints[state.timeTracker.breakpoints.length - 1]

// settings
export const setting = state => name => state.settings.settings[name] || null
