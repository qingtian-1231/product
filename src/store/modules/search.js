import { request, apiServer} from '../../utils/request'
import { convertUTCTimeBeforeTime, convertUTCTimeToLocalTimeShort} from '../../utils/convert-time-formate'
import { getCookie } from "../../utils/cookie";

const state = {
  productPath: 'api/searchProducts/list',
  formulationPath: 'api/searchFormulations/list',
  searchResult: [],
  searchFocus: false
}

const mutations = {
  processSearchResult(state, payload) {
    state.searchResult = payload
  },

  clearSearchResult(state, payload) {
    state.searchResult = []
  },

  changeSearchFocus (state, payload) {
    state.searchFocus = true
  }
}

const actions = {
  productSearch ({dispatch, commit, state}, keyWord) {
    let requestPath = state.productPath
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.productPath
    }

    let parameter = {
      params: {
        combine: keyWord
      }
    }
    let productsArr = []
    let formulationsArr = []

    return request().get(requestPath + '/all/all/all/', parameter)
      .then(function (products) {

        productsArr = products.data.results.map(item => {
          return {
            title: item.title,
            uuid: item.uuid,
            type: item.type,
            isPublic: parseInt(item.field_is_public)          }
        })

        console.log(productsArr, 'productsArr')
        dispatch('formulationSearch', keyWord).then(formulations => {
          formulationsArr = formulations.data.results.map(item => {
            return {
              title: item.field_formulation_name,
              uuid: item.uuid,
              type: item.type,
              isPublic: parseInt(item.field_is_public)
            }
          })

          commit('processSearchResult', formulationsArr.concat(productsArr))
          return Promise.resolve(formulationsArr.concat(productsArr))
        })
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  formulationSearch ({commit, state}, keyWord) {
    let requestPath = state.formulationPath
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.formulationPath
    }

    let parameter = {
      params: {
        combine: keyWord
      }
    }
    return request().get(requestPath + '/all/', parameter)
      .then(function (response) {
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
