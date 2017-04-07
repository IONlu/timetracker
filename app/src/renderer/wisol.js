import axios from 'axios'
import store from './vuex/store'
import moment from 'moment'

export const APPLICATION_KEY = 'b8ff874e-ffe9-4338-9991-e73f58f73e66'

const getEndpoint = () => {
  return store.getters.setting('wisolServerUrl')
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

export const upload = (startTime, workTime, text) => {
  return axios.post(getEndpoint(), {
    client: '0000000000',
    commentaire: text,
    qte_totale: workTime / (1000 * 60 * 60),
    vendeur: store.getters.setting('wisolVendeur'),
    date_prestation: moment(startTime).format('YYYY-MM-DD')
  }, {
    ...getAuth(),
    ...getHeaders()
  })
}
