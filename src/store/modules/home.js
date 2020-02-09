import { request } from '../../utils/request'

const state = {
  path: 'api/products/features',
  _format: 'hal_json',
  featureProduct: []
}

const mutations = {
  processFeatureProducts(state, payload) {
    state.featureProduct = payload
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
