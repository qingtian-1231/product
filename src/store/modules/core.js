import request from '../../utils/request.js'

const state = {
  path: 'api/menu_items/vue-app-menu',
  _format: 'hal_json',
  globalSnackbar: false,
  snackbarMessage: '',
  menuItems: [],
  loginStatus: false,
  hiddenTopAppBar: false,
  requestDialog: false,
  requestProductDialog: false,
  requestFormulationDialog: false,
}

const mutations = {
  processMenuItems(state, payload) {

    state.menuItems = payload.map(function (menuItem) {
      menuItem.dialog = false
      switch (menuItem.uri.toLowerCase()) {
        case '':
          menuItem.options.icon = 'home'
          menuItem.relative = '/'
          console.log(menuItem, 'menuItem');
          break

        case 'base:products':
          menuItem.options.icon = 'crop_portrait'
          break

        case 'base:formulations':
          menuItem.options.icon = 'colorize'
          break

        case 'base:industry':
          menuItem.options.icon = 'business'
          break

        case 'base:online-request':
          menuItem.options.icon = 'send'
          menuItem.dialog = true
          break

        case 'base:sample-order':
          menuItem.options.icon = 'shopping_basket'
          break
        default:
          menuItem.options.icon = 'account_balance'
      }

      return menuItem
    })
  },

  SWITCH_ENGLISH(state, payload) {
    state.path = payload.path
  },

  SET_SNACKBAR(state, payload) {
    state.globalSnackbar = payload.globalSnackbar
    state.snackbarMessage = payload.snackbarMessage

    setTimeout(() => {
      state.globalSnackbar = false
      state.snackbarMessage = ''
    }, 3100)
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
