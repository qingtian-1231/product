import { request, apiServer} from '../../utils/request'
import { globalUtils } from '../../utils/globalUtils'
import {getCookie} from "../../utils/cookie";
// import { convertUTCTimeBeforeTime, convertUTCTimeToLocalTimeShort} from '../../utils/convert-time-formate'

const state = {
  path: 'api/products/list',
  _format: 'hal_json',
  productList: [],
  productDetails: {}, // 购物车使用的字段
  productInfo: {}, // 指定位置或特殊样式的字段
  productBasicInformation: {},
  productProperties: {},
  productRelationFormulation: {},
  productRelationFile: {},
}

const mutations = {
  processProductList(state, payload) {
    state.productList = payload.result.map(item => {
      let hasFavorite = globalUtils.findElementInArray(payload.favorite, item.uuid, 'value')

      if (hasFavorite) {
        item.isFeature = true
      } else {
        item.isFeature = false
      }
      return item
    })
  },

  processProductDetails(state, payload) {
    for (let field in payload) {
      if (field === 'body') {
        state.productInfo.description = payload.body
        continue
      }

      if (field === 'title') {
        state.productDetails.title = payload.title.value
        state.productInfo.title = payload.title
        continue
      }

      if (field === 'field_cas_number') {
        state.productBasicInformation.field_cas_number = payload.field_cas_number
        continue
      }

      if (field === 'field_product_name') {
        state.productBasicInformation.field_product_name = payload.field_product_name
        continue
      }

      if (field === 'field_product_type') {
        state.productBasicInformation.field_product_type = payload.field_product_type
        state.productBasicInformation.field_product_type.value = state.productBasicInformation.field_product_type.value[0]
        continue
      }

      if (field === 'field_benefits') {
        state.productBasicInformation.benefits = payload.field_benefits
        continue
      }

      if (field === 'field_product_brand') {
        state.productBasicInformation.brand = payload.field_product_brand.value.length > 0 ? payload.field_product_brand.value[0].name : {}
        state.productBasicInformation.brand.label = '产品品牌'
        continue
      }

      if (field === 'field_buy_link') {
        state.productInfo.field_buy_link = payload.field_buy_link
        continue
      }

      if (field === 'field_recommended_application') {
        state.productInfo.recommended_application = payload.field_recommended_application
        continue
      }

      if (field === 'field_country_registration_group') {
        state.productInfo.country_registration_group = payload.field_country_registration_group
        continue
      }

      if (field === 'field_suitable_application') {
        state.productInfo.suitable_application = payload.field_suitable_application
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
        state.productDetails.quantity = 1
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
  }
}

const actions = {
  getProductList({dispatch, commit, state, rootState}, options) {
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

        payload.favorite = rootState.user.favoriteProductList
        payload.result = response.data.results
        commit('processProductList', payload)

        return Promise.resolve(response)
      })
      .catch(function (error) {
        console.log(error)
        return Promise.resolve(error)
      })
  },

  getProductDetails({dispatch, commit, state, rootState}, payload) {
    let requestPath = 'api/product_detail_resource/' + payload.id
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/api/product_detail_resource/' + payload.id
    }
    return request().get(requestPath, {
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

  processFavoriteForUser({ commit, state }, favoriteInfo) {
    return request()
      .post('api/user_favorite/submit?_format=json', favoriteInfo)
      .then(result => {
        return Promise.resolve(result);
      })
      .catch(error => {
        console.log(error)
        return Promise.resolve(error);
      })
  }
}

export default {
  state,
  mutations,
  actions
}
