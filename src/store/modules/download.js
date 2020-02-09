import { request, apiServer} from '../../utils/request'

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
  },
}

const actions = {
  getDownloadList({commit, state}) {
    return request().get(state.path)
      .then(function (response) {
        commit('processDownloadList', response.data)
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
