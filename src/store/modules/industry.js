import { request } from '../../utils/request.js'
import {getCookie, setCookie} from "../../utils/cookie";

const state = {
  taxonomyDetailPath: 'api/term_details/resource/',
  _format: 'json',
  termDetail: []
}

const mutations = {
  processTermDetail(state, payload) {
    state.termDetail = payload
  }

}

const actions = {
  getTaxonomyDetail({commit, state}, payload) {
    let requestPath = state.taxonomyDetailPath
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.taxonomyDetailPath
    }

    return request().get(requestPath + payload.term_type + '/' + payload.term_id, {
      params: {
        _format: state._format
      }
    })
      .then(function (response) {
        commit('processTermDetail', response.data)
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
