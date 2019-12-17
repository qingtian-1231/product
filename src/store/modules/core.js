import request from '../../utils/request.js'

const state = {
  path: 'api/menu_items/vue-app-menu',
  _format: 'hal_json',
  menuItems: [],
  loginStatus: false,
  hiddenTopAppBar: false,
  requestDialog: false
}

const mutations = {
  processMenuItems(state, payload) {

    state.menuItems = payload.map(function (menuItem) {
      menuItem.dialog = false
      switch (menuItem.title.toLowerCase()) {
        case 'home':
          menuItem.options.icon = 'home'
          break

        case 'products':
          menuItem.options.icon = 'crop_portrait'
          break

        case 'formulations':
          menuItem.options.icon = 'colorize'
          break

        case 'industry':
          menuItem.options.icon = 'business'
          break

        case 'online request':
          menuItem.options.icon = 'send'
          menuItem.dialog = true
          break

        case 'sample order':
          menuItem.options.icon = 'shopping_basket'
          break
        default:
          menuItem.options.icon = 'account_balance'
      }

      return menuItem
    })
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
