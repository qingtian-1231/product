import { request, apiServer} from '../../utils/request'
import { convertUTCTimeBeforeTime, convertUTCTimeToLocalTimeShort} from '../../utils/convert-time-formate'

const state = {
  productPath: 'api/products/list',
  formulationPath: 'api/formulations/list',
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
    let parameter = {
      params: {
        title: keyWord,
        field_other_names: keyWord,
        body: keyWord,
        field_benefits: keyWord,
      }
    }
    let productsArr = []
    let formulationsArr = []

    return request().get(state.productPath, parameter)
      .then(function (products) {

        productsArr = products.data.results.map(item => {
          return {
            title: item.title,
            uuid: item.uuid,
            type: item.type
          }
        })

        dispatch('formulationSearch', keyWord).then(formulations => {
          formulationsArr = formulations.data.results.map(item => {
            return {
              title: item.title,
              uuid: item.uuid,
              type: item.type
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
    let parameter = {
      params: {
        title: keyWord
      }
    }
    return request().get(state.formulationPath, parameter)
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
