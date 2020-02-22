import { request } from '../../utils/request.js'
import {getCookie, setCookie} from "../../utils/cookie";

const state = {
  path: 'api/menu_items/vue-app-menu',
  taxonomyListPath: 'demo_rest_api/demo_resource',
  CSRFTokenPath: 'rest/session/token',
  _format: 'hal_json',
  globalSnackbar: false,
  snackbarMessage: '',
  menuItems: [],
  loginStatus: false,
  hiddenTopAppBar: false,
  requestDialog: false,
  requestProductDialog: false,
  requestFormulationDialog: false,
  loginDialog: false,
  taxonomyProductType: {},
  taxonomyProductBrand: {},
  taxonomyProductApplication: {},
}

const mutations = {
  processMenuItems(state, payload) {

    state.menuItems = payload.map(function (menuItem) {
      menuItem.dialog = false
      switch (menuItem.uri.toLowerCase()) {
        case '':
          menuItem.options.icon = 'home'
          menuItem.relative = '/'
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

  processTaxonomyList(state, payload) {
    state.taxonomyProductType = payload.product_type
    state.taxonomyProductBrand = payload.prduct_brand
    state.taxonomyProductApplication = payload.applacation

    state.menuItems = state.menuItems.map((menuItem) => {
      if (menuItem.uri.toLowerCase() === 'base:industry') {
        menuItem.below = state.taxonomyProductApplication
        return menuItem
      } else {

        return menuItem
      }
    })
  },

  switch_Language(state, payload) {
    state.path = payload.path

    const expireTime = 30 * 24 * 3600 * 1000;
    setCookie(
      'drupal:session:language',
      payload.language,
      expireTime,
      "/"
    );
  },

  SET_SNACKBAR(state, payload) {
    state.globalSnackbar = payload.globalSnackbar
    state.snackbarMessage = payload.snackbarMessage

    setTimeout(() => {
      state.globalSnackbar = false
      state.snackbarMessage = ''
    }, 3100)
  },

  open_login_dialog(state, payload) {
    state.loginDialog = true
  },

  close_login_dialog(state, payload) {
    state.loginDialog = false
  }
}

const actions = {
  getApiMenu({commit, state}) {
    let requestPath = state.path
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.path
    }
    return request().get(requestPath, {
      params: {
        _format: state._format
      }
    })
      .then(function (response) {
        commit('processMenuItems', response.data)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getTaxonomyList({commit, state}) {
    let requestPath = state.taxonomyListPath
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.taxonomyListPath
    }

    return request().get(requestPath, {
      params: {
        _format: state._format
      }
    })
      .then(function (response) {
        commit('processTaxonomyList', response.data)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getCSRFToken ({commit, state}) {
    return request()
      .get(state.CSRFTokenPath)
      .then(result => {
        const expireTime = 7 * 24 * 3600 * 1000;

        setCookie(
          'drupal:session:token',
          result.data,
          expireTime,
          "/"
        );
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },
}

export default {
  state,
  mutations,
  actions
}
