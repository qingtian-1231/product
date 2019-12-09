import request from '../../utils/request.js'

const state = {
  path: 'api/menu_items/vue-app-menu',
  _format: 'hal_json',
  menuItems: [],
  loginStatus: false
}

const mutations = {
  processMenuItems(state, payload) {
    state.menuItems = payload
  }
}

const actions = {
  getApiMenu({commit, state}) {
    return request().get(state.path, {
      params: {
        _format: state._format
      }
    })
      .then(function (response) {
        console.log(response, 'response')
        commit('processMenuItems', response.data)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
