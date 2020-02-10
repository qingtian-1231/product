import { request, apiServer} from '../../utils/request'
import { convertUTCTimeBeforeTime, convertUTCTimeToLocalTimeShort} from '../../utils/convert-time-formate'

const state = {
  productPath: 'api/products/list',
  formulationPath: 'api/formulations/list',
  searchResult: []
}

const mutations = {
  processSearchResult(state, payload) {
    state.searchResult = payload
  },

  clearSearchResult(state, payload) {
    state.searchResult = []
  }
}

const actions = {
  productSearch ({dispatch, commit, state}, keyWord) {
    let parameter = {
      params: {
        title: keyWord
      }
    }
    let productsArr = []
    let formulationsArr = []

    console.log(keyWord, 'keyWord')
    return request().get(state.productPath, parameter)
      .then(function (products) {

        productsArr = products.data.map(item => {
          return {
            title: item.title,
            uuid: item.uuid,
            type: item.type
          }
        })

        dispatch('formulationSearch', keyWord).then(formulations => {
          formulationsArr = formulations.data.map(item => {
            return {
              title: item.title,
              uuid: item.uuid,
              type: item.type
            }
          })

          console.log(productsArr, formulationsArr, formulationsArr.concat(productsArr), 'formulationsArrformulationsArr')
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
