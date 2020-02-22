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
  formulationProperties: {}
}

const mutations = {
  processFormulationList(state, payload) {
    state.formulationList = payload.result.map(item => {
      let hasFavorite = globalUtils.findElementInArray(payload.favorite, item.uuid, 'value')

      if (hasFavorite) {
        item.isFeature = true
      } else {
        item.isFeature = false
      }
      return item
    })
  },

  processFormulationDetails(state, payload) {
    for (let field in payload) {
      if (field === 'body') {
        state.formulationBasicInformation.description = payload.body
        continue
      }
      if (field === 'field_formulationbenefits') {
        state.formulationBasicInformation.benefits = payload.field_formulationbenefits
        continue
      }
      if (field === 'field_formulation_name') {
        state.formulationBasicInformation.name = payload.field_formulation_name
        continue
      }
      if (field === 'field_industry_of_formula') {
        state.formulationBasicInformation.industry = payload.field_industry_of_formula
        continue
      }
      if (field === 'field_formulation_number') {
        state.formulationBasicInformation.formulation_number = payload.field_formulation_number
        continue
      }

      if (field === 'field_formulation_cluster') {
        state.formulationBasicInformation.formulation_cluster = payload.field_formulation_cluster
        continue
      }

      if (field === 'field_formulation_file') {
        if (payload.field_formulation_file.value.length > 0) {
          state.formulationFiles = payload.field_formulation_file.value.map(item => {
            item.field_entity_file.changed = convertUTCTimeToLocalTime(item.field_entity_file.changed);

            return item
          })
        }
        continue
      }

      if (field === 'field_formula_composition') {
        state.formulationDetails = payload.field_formula_composition.value
        continue
      }
      state.formulationProperties[field] = payload[field]
    }
  },

  processFormulationFieldsDefinition(state, payload) {
    state.formulationFieldsDefinition = payload
  }
}

const actions = {
  getFormulationList({commit, state, rootState}, options) {
    let requestPath = state.path
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.path
    }

    return request().get(requestPath, {
      params: options
    })
      .then(function (response) {
        let payload = {
          favorite: '',
          result: ''
        }

        payload.favorite = rootState.user.favoriteFormulationList
        payload.result = response.data.results
        commit('processFormulationList', payload)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getFormulationDetails({dispatch, commit, state}, payload) {
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
        commit('processFormulationDetails', response.data)
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
