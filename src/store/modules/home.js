import { request, apiServer } from '../../utils/request'
import { getCookie } from "../../utils/cookie";

const state = {
  featureProductPath: 'api/products/features',
  carouselPath: 'api/front/carousel',
  _format: 'hal_json',
  featureProduct: [],
  carousels: [],
}

const mutations = {
  processFeatureProducts(state, payload) {
    let product_default_image = require('@/assets/home/default.png')

    state.featureProduct = payload.map(function (item) {
      if (item.field_media_image) {
        item.field_media_image = apiServer + item.field_media_image
      } else {
        item.field_media_image = product_default_image
      }

      return item
    })
  },

  processCarousel(state, payload) {
    state.carousels = payload.map(function (item, index) {
      if (index === 0) {
        item.color = 'green_dark1'
      }
      if (index === 1) {
        item.color = 'green_dark2'
      }
      if (index === 2) {
        item.color = 'blue1'
      }
      if (index === 3) {
        item.color = 'blue2'
      }
      if (index === 4) {
        item.color = 'red1'
      }
      if (index === 5) {
        item.color = 'red2'
      }
      if (index === 6) {
        item.color = 'orange1'
      }
      if (index === 7) {
        item.color = 'orange2'
      }
      if (item.field_media_image) {
        item.field_media_image = apiServer + item.field_media_image
      }

      return item
    })
  }
}

const actions = {
  getFeatureProducts({commit, state}) {
    let requestPath = state.featureProductPath
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.featureProductPath
    }

    return request().get(requestPath)
      .then(function (response) {
        commit('processFeatureProducts', response.data)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getCarousel({commit, state}) {
    let requestPath = state.carouselPath
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.carouselPath
    }

    return request().get(requestPath)
      .then(function (response) {
        commit('processCarousel', response.data)
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
