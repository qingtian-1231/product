import { request, apiServer} from '../../utils/request'
import { convertUTCTimeBeforeTime, convertUTCTimeToLocalTimeShort} from '../../utils/convert-time-formate'

const state = {
  path: 'api/products/list',
  _format: 'hal_json',
  productList: [],
  productDetails: {},
  productBasicInformation: {},
  productProperties: {},
  productRelationFormulation: {},
  productRelationFile: {},
}

const mutations = {
  processProductList(state, payload) {
    state.productList = payload
  },

  processProductDetails(state, payload) {
    console.log(payload, 'payload')
    for (let field in payload) {
      if (field === 'body') {
        state.productBasicInformation.description = payload.body
        continue
      }

      if (field === 'title') {
        state.productDetails.title = payload.title.value
        state.productBasicInformation.title = payload.title
        continue
      }

      if (field === 'field_benefits') {
        state.productBasicInformation.benefits = payload.field_benefits
        continue
      }

      if (field === 'field_product_cluster') {
        state.productBasicInformation.product_cluster = payload.field_product_cluster
        continue
      }

      if (field === 'field_product_group') {
        state.productBasicInformation.product_group = payload.field_product_group
        continue
      }

      if (field === 'field_recommended_application') {
        state.productBasicInformation.recommended_application = payload.field_recommended_application
        continue
      }

      if (field === 'field_country_registration_group') {
        state.productBasicInformation.country_registration_group = payload.field_country_registration_group
        continue
      }

      if (field === 'field_suitable_application') {
        state.productBasicInformation.suitable_application = payload.field_suitable_application
        continue
      }

      if (field === 'field_formulation') {
        state.productRelationFormulation = payload.field_formulation
        continue
      }

      if (field === 'field_product_file') {
        state.productRelationFile = payload.field_product_file
        continue
      }
      /**
       * 保存product detail for basket cart.
       *
       */
      if (field === 'product_id') {
        state.productDetails.product_id = payload.product_id.value
      }
      if (field === 'uuid') {
        state.productDetails.uuid = payload.uuid.value
      }

      if (field === 'variations') {
        state.productDetails.variations = payload.variations.value
      }

      /**
       * 构建产品属性值字段.
       *
       */
      if (field.indexOf('field_') !== -1) {
        state.productProperties[field] = payload[field]
      }
    }
  },

  processProductRelationCountry(state, payload) {
    state.productRelationCountry = payload
  },

  processProductRelationApplication(state, payload) {
    state.productRelationApplication = payload
  }
}

const actions = {
  getProductList({commit, state}) {
    return request().get(state.path)
      .then(function (response) {
        commit('processProductList', response.data)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getProductDetails({dispatch, commit, state, rootState}, payload) {
    let apiUrl = 'api/product_detail_resource/' + payload.id

    return request().get(apiUrl, {
      params: {
        _format: state._format
      }
    })
      .then(function (response) {
        commit('processProductDetails', response.data)
        return Promise.resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getProductRelationCountry({commit}, payload) {
    let returnValue = []
    let fieldConfig = payload.fieldConfig.product
    return request().get(payload.relation.links.related.href).then(response => {
      returnValue = response.data.data.map(field => {
        let country = {}
        let countryDescription = {}
        if (field.attributes.hasOwnProperty('field_country_registration')) {
          country = {
            label: fieldConfig.hasOwnProperty('field_country_registration') ? fieldConfig.field_country_registration : '未命名',
            value: field.attributes.field_country_registration,
          }
        }

        if (field.attributes.hasOwnProperty('field_country_registration_descr')) {
          countryDescription = {
            label: fieldConfig.hasOwnProperty('field_country_registration_descr') ? fieldConfig.field_country_registration_descr : '未命名',
            value: field.attributes.field_country_registration_descr,
          }
        }

        return {
          'country': country,
          'description': countryDescription,
        }
      })

      commit('processProductRelationCountry', returnValue)
      return Promise.resolve(returnValue)
    }).catch(error => {
      console.log(error)
    })
  },

  getProductRelationApplication({commit}, payload) {
    let returnValue = []
    let fieldConfig = payload.fieldConfig.product
    return request().get(payload.relation.links.related.href).then(response => {
      returnValue = response.data.data.map(field => {
        let application = {}
        if (field.attributes.hasOwnProperty('name')) {
          application = {
            label: fieldConfig.hasOwnProperty('name') ? fieldConfig.name : '未命名',
            value: field.attributes.name,
          }
        }

        return {
          'application': application,
        }
      })
      commit('processProductRelationApplication', returnValue)
      return Promise.resolve(returnValue)
    }).catch(error => {
      console.log(error)
    })
  },

  getProductFormulation({commit, state, rootState}, payload) {
    let returnValue = []
    let fieldConfig = rootState.core.fieldConfig.product
    if (payload.relation.data.length <= 0) {
      return []
    }

    return request().get(payload.relation.links.related.href).then(response => {

      returnValue = response.data.data.map(field => {
        let formulation = {}
        if (field.attributes.hasOwnProperty('field_formulation_name')) {
          formulation = {
            label: fieldConfig.hasOwnProperty('field_formulation_name') ? fieldConfig.field_formulation_name : '未命名',
            value: field.attributes.field_formulation_name,
            id: field.id,
          }
        }

        return {
          'formulation': formulation,
        }
      })

      console.log(returnValue, 'returnValue')
      return Promise.resolve(returnValue)
    }).catch(error => {
      console.log(error)
    })
  },

  getProductFile({commit, state, rootState}, payload) {
    let returnValue = []
    let fieldConfig = rootState.core.fieldConfig.product
    if (payload.relation.data.length <= 0) {
      return []
    }

    return request().get(payload.relation.links.related.href).then(response => {

      returnValue = response.data.data.map(field => {
        let file = {}

        console.log(field, 'field')
        if (field.attributes.hasOwnProperty('uri')) {
          file = {
            label: fieldConfig.hasOwnProperty('uri') ? fieldConfig.uri : '未命名',
            value: apiServer + field.attributes.uri.url,
            date: convertUTCTimeToLocalTimeShort(field.attributes.changed)
          }
        }

        return {
          'file': file,
        }
      })
      return Promise.resolve(returnValue)
    }).catch(error => {
      console.log(error)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
