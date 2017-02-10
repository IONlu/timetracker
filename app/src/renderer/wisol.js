import axios from 'axios'
import store from './vuex/store'

export const APPLICATION_KEY = 'b8ff874e-ffe9-4338-9991-e73f58f73e66'

const getEndpoint = () => {
  return store.getters.setting('wisolServerUrl') + '/api/w_prestations'
}

const getHeaders = () => {
  return {
    headers: {
      appKey: APPLICATION_KEY,
      deviceKey: store.getters.setting('wisolDeviceKey')
    }
  }
}

const getAuth = () => {
  return {
    auth: {
      username: store.getters.setting('wisolUsername'),
      password: store.getters.setting('wisolPassword')
    }
  }
}

export const upload = (text, time) => {
  return axios.post(getEndpoint(), {
    client: '0000000000',
    designation: text,
    qte_totale: time / (1000 * 60 * 60),
    vendeur: store.getters.setting('wisolVendeur')
  }, {
    ...getAuth(),
    ...getHeaders()
  })
}
