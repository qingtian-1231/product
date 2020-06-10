import { request, apiServer} from '../../utils/request'
import { convertUTCTimeToLocalTime } from '../../utils/convert-time-formate'
import { globalUtils } from "../../utils/globalUtils";
import {getCookie} from "../../utils/cookie";

const state = {
  path: 'api/formulations/list',
  _format: 'hal_json',
  formulationFieldsDefinition: {},
  formulationList: [],
  formulationDetails: [],
  formulationFiles: [],
  formulationBasicInformation: {},
  formulationProperties: {},
  formulationListCount: 0,
}

const mutations = {
  processFormulationList(state, payload) {
    let favorite = []

    if (payload.favorite) {
      favorite = payload.favorite
    }

    state.formulationList = payload.result.map(item => {
      let hasFavorite = globalUtils.findElementInArray(favorite, item.uuid, 'value')

      if (hasFavorite) {
        item.isFeature = true
      } else {
        item.isFeature = false
      }
      return item
    })
  },

  processFormulationListMeta(state, payload) {
    state.formulationListCount = payload.count
  },

  processFormulationDetails(state, payload) {
    let result = payload.result
    let favorite = []

    for (let field in result) {
      if (field === 'body') {
        state.formulationBasicInformation.description = result.body
        continue
      }
      if (field === 'field_formulationbenefits') {
        state.formulationBasicInformation.benefits = result.field_formulationbenefits

        if (state.formulationBasicInformation.benefits.value) {
          state.formulationBasicInformation.benefits.value = state.formulationBasicInformation.benefits.value.replace(/#/g, '<br>')
        }
        continue
      }
      if (field === 'field_formulation_name') {
        state.formulationBasicInformation.name = result.field_formulation_name
        continue
      }
      if (field === 'field_formulation_industry') {
        state.formulationBasicInformation.industry = result.field_formulation_industry
        continue
      }
      if (field === 'field_formulation_number') {
        state.formulationBasicInformation.formulation_number = result.field_formulation_number
        continue
      }

      if (field === 'field_formulation_cluster') {
        state.formulationBasicInformation.formulation_cluster = result.field_formulation_cluster
        continue
      }

      if (field === 'field_formulation_file') {
        if (result.field_formulation_file.value.length > 0) {
          state.formulationFiles = result.field_formulation_file.value.map(item => {
            item.field_entity_file.changed = convertUTCTimeToLocalTime(item.field_entity_file.changed);

            return item
          })
        }
        continue
      }

      if (field === 'uuid') {
        state.formulationBasicInformation.uuid = result.uuid.value
        continue
      }

      if (field === 'field_formula_composition') {
        state.formulationDetails = result.field_formula_composition.value
        continue
      }
      state.formulationProperties[field] = result[field]
    }

    if (payload.favorite) {
      favorite = payload.favorite
    }

    let hasFavorite = globalUtils.findElementInArray(favorite, state.formulationBasicInformation.uuid, 'value')

    if (hasFavorite) {
      state.formulationBasicInformation.isFeature = true
    } else {
      state.formulationBasicInformation.isFeature = false
    }
  },

  processFormulationFieldsDefinition(state, payload) {
    state.formulationFieldsDefinition = payload
  }
}

const actions = {
  getFormulationList({commit, state, rootState}, payload) {
    let requestPath = state.path
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.path
    }

    return request().get(`${requestPath}/${payload.filter.formulation_application_ids}`, {
      params: payload.options
    })
      .then(function (response) {
        let payload = {
          favorite: '',
          result: ''
        }

        payload.favorite = rootState.user.favoriteFormulationList
        payload.result = response.data.results

        commit('processFormulationListMeta', response.data.pager)
        commit('processFormulationList', payload)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getFormulationWithoutList({commit, state, rootState}, payload) {
    let requestPath = 'api/formulations/without-filter-list'
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/api/formulations/without-filter-list'
    }

    return request().get(`${requestPath}`, {
      params: payload.options
    })
      .then(function (response) {
        let payload = {
          favorite: '',
          result: ''
        }

        payload.favorite = rootState.user.favoriteFormulationList
        payload.result = response.data.results

        commit('processFormulationListMeta', response.data.pager)
        commit('processFormulationList', payload)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getFormulationDetails({dispatch, commit, state, rootState}, payload) {
    let requestPath = 'api/formulation_detail_resource/' + payload.id
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/api/formulation_detail_resource/' + payload.id
    }

    return request().get(requestPath, {
      params: {
        _format: state._format
      }
    })
      .then(function (response) {
        let payload = {
          favorite: '',
          result: ''
        }

        payload.favorite = rootState.user.favoriteFormulationList
        payload.result = response.data
        commit('processFormulationDetails', payload)
        return Promise.resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getFormulationFieldsDefinition({commit, state}) {
    let requestPath = 'api/formulation_fields_definition'
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/api/formulation_fields_definition'
    }
    return request().get(requestPath, {
      params: {
        _format: state._format
      }
    })
      .then(function (response) {
        commit('processFormulationFieldsDefinition', response.data)
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
