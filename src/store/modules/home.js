import { request, apiServer } from '../../utils/request'

const state = {
  path: 'api/products/features',
  _format: 'hal_json',
  featureProduct: []
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

    console.log(state.featureProduct, 'state.featureProduct')
  }
}

const actions = {
  getFeatureProducts({commit, state}) {
    return request().get(state.path)
      .then(function (response) {
        commit('processFeatureProducts', response.data)
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
