import { request, apiServer} from '../../utils/request'
import { convertUTCTimeToLocalTime } from '../../utils/convert-time-formate'

const state = {
  path: 'api/formulations/list',
  _format: 'hal_json',
  formulationList: [],
  formulationDetails: [],
  formulationFiles: [],
  formulationBasicInformation: {},
  formulationProperties: {}
}

const mutations = {
  processFormulationList(state, payload) {
    state.formulationList = payload
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
          continue
        }
      }

      if (field === 'field_formula_composition') {
        state.formulationDetails = payload.field_formula_composition.value
        continue
      }
      state.formulationProperties[field] = payload[field]
    }
  }
}

const actions = {
  getFormulationList({commit, state}) {
    return request().get(state.path)
      .then(function (response) {
        console.log(response.data, 'response.data')
        commit('processFormulationList', response.data)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getFormulationDetails({dispatch, commit, state}, payload) {
    let apiUrl = 'api/formulation_detail_resource/' + payload.id
    return request().get(apiUrl, {
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
  }
}

export default {
  state,
  mutations,
  actions
}
