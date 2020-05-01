import { request, apiServer} from '../../utils/request'
import {getCookie} from "../../utils/cookie";

const state = {
  path: 'api/globalfile/list',
  _format: 'hal_json',
  downloadList: []
}

const mutations = {
  processDownloadList(state, payload) {
    state.downloadList = payload.map(item => {
      item.field_global_file = apiServer + item.field_global_file
      return item
    })

    console.log(state.downloadList, 'state.downloadList')
  },
}

const actions = {
  getDownloadList({commit, state}, options) {
    let requestPath = state.path
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.path
    }

    return request().get(requestPath, {
      params: options
    })
      .then(function (response) {
        commit('processDownloadList', response.data.results)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },
}

export default {
  state,
  mutations,
  actions
}
