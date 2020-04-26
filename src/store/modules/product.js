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
      let favorite = []
      let parentProductType = globalUtils.findParentTid(payload.productType, item.field_product_type)

      if (parentProductType) {
        item.parentTid = parentProductType.tid
      }

      if (payload.favorite) {
        favorite = payload.favorite
      }
      let hasFavorite = globalUtils.findElementInArray(favorite, item.uuid, 'value')

      if (hasFavorite) {
        item.isFeature = true
      } else {
        item.isFeature = false
      }
      return item
    })
  },

  processProductDetails(state, payload) {
    let result = payload.result
    let favorite = []

    for (let field in result) {
      if (field === 'body') {
        state.productInfo.description = result.body
        continue
      }

      if (field === 'title') {
        state.productDetails.title = result.title.value
        state.productInfo.title = result.title
        continue
      }

      if (field === 'field_cas_number') {
        state.productBasicInformation.field_cas_number = result.field_cas_number
        continue
      }

      if (field === 'field_product_name') {
        state.productBasicInformation.field_product_name = result.field_product_name
        continue
      }

      if (field === 'field_product_type') {
        let tid = result.field_product_type.value.length > 0 ? result.field_product_type.value[0].tid.value : null
        let topParentProductType
        let parentProductType = globalUtils.findParentTid(payload.productType, tid)

        state.productBasicInformation.field_product_type = result.field_product_type.value.length > 0 ? result.field_product_type.value[0].name : {}
        if (parentProductType) {
          topParentProductType = globalUtils.findProductParentItem(payload.productType, parentProductType.parents[0])
          state.productBasicInformation.field_product_type.value = parentProductType.name + ' > ' + state.productBasicInformation.field_product_type.value
          state.productBasicInformation.field_product_type.parentTid = parentProductType.tid
        }
        if (topParentProductType) {
          state.productBasicInformation.field_product_type.value = topParentProductType.name + ' > ' + state.productBasicInformation.field_product_type.value
        }

        state.productBasicInformation.field_product_type.label = result.field_product_type.label
        // console.log(result.field_product_type.value[0].tid.value, 'result.field_product_type.value[0].name')
        // state.productBasicInformation.field_product_type.value = state.productBasicInformation.field_product_type.value[0].name
        continue
      }

      if (field === 'field_benefits') {
        state.productBasicInformation.benefits = result.field_benefits
        continue
      }

      if (field === 'field_product_brand') {
        state.productBasicInformation.brand = result.field_product_brand.value.length > 0 ? result.field_product_brand.value[0].name : {}
        state.productBasicInformation.brand.label = result.field_product_brand.label
        continue
      }

      if (field === 'field_buy_link') {
        state.productInfo.field_buy_link = result.field_buy_link
        continue
      }

      if (field === 'field_product_package') {
        state.productInfo.field_product_package = result.field_product_package
        continue
      }

      if (field === 'field_product_origin') {
        state.productInfo.field_product_origin = result.field_product_origin
        continue
      }

      if (field === 'field_recommended_application') {
        state.productInfo.recommended_application = result.field_recommended_application
        continue
      }

      if (field === 'field_country_registration_group') {
        state.productInfo.country_registration_group = result.field_country_registration_group
        continue
      }

      if (field === 'field_suitable_application') {
        state.productInfo.suitable_application = result.field_suitable_application
        continue
      }

      if (field === 'field_formulation') {
        state.productRelationFormulation = result.field_formulation
        continue
      }

      if (field === 'field_product_file') {
        state.productRelationFile = result.field_product_file
        continue
      }
      /**
       * 保存product detail for basket cart.
       *
       */
      if (field === 'product_id') {
        state.productDetails.product_id = result.product_id.value
        state.productDetails.quantity = 1
      }
      if (field === 'uuid') {
        state.productDetails.uuid = result.uuid.value
        state.productBasicInformation.uuid = result.uuid.value
      }

      if (field === 'variations') {
        state.productDetails.variations = result.variations.value
      }

      /**
       * 构建产品属性值字段.
       *
       */
      if (field.indexOf('field_') !== -1) {
        state.productProperties[field] = result[field]
      }
    }

    if (payload.favorite) {
      favorite = payload.favorite
    }
    let hasFavorite = globalUtils.findElementInArray(favorite, state.productDetails.uuid, 'value')

    if (hasFavorite) {
      state.productBasicInformation.isFeature = true
    } else {
      state.productBasicInformation.isFeature = false
    }
  }
}

const actions = {
  getProductList({dispatch, commit, state, rootState}, payload) {
    let requestPath = state.path
    let currentLanguage = getCookie('drupal:session:language')

    if (currentLanguage === 'en') {
      requestPath = 'en/' + state.path
    }

    return request().get(`${requestPath}/${payload.filter.product_type_ids}/${payload.filter.product_application_ids}/${payload.filter.product_brand_ids}`, {
      params: payload.options
    })
      .then(function (response) {
        let payload = {
          favorite: '',
          result: ''
        }

        payload.productType = rootState.core.taxonomyProductType
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
        let payload = {
          favorite: '',
          result: ''
        }

        payload.productType = rootState.core.taxonomyProductType
        payload.favorite = rootState.user.favoriteProductList
        payload.result = response.data
        commit('processProductDetails', payload)
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
