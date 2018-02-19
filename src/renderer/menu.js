import { remote } from 'electron'
const defaultMenu = require('electron-default-menu')
const { app, shell } = remote

// Get template for default menu
const menu = defaultMenu(app, shell)

// Add custom menu
menu.splice(4, 0, {
  label: 'Time Tracker',
  submenu: [
    {
      label: 'Preferences',
      click () {
        window.location.href = '#/settings'
      }
    }
  ]
})

export default remote.Menu.buildFromTemplate(menu)
