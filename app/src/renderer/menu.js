import { remote } from 'electron'

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Preferences',
        click () {
          window.location.href = '#/settings'
        }
      }
    ]
  }
]

export default remote.Menu.buildFromTemplate(template)
