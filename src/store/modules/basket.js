import { request } from '../../utils/request'
import { globalUtils } from '../../utils/globalUtils'

const state = {
  _format: 'json',
  shoppingCartCount: 0,
  shoppingCartKey: 'shoppingAdd',
  shoppingCart: [],
  cart:[],
  orderID: null,
  orderInfo: [],
  countryList: [],
  provinceList: [],
  cityList: [],
  localityList: [],
  order_total_price: '',
  order_items: [],
  order_address: [],
  completeOrderStatus: false
}

const mutations = {
  processShoppingCart (state, payload) {
    state.shoppingCart = payload
    state.shoppingCartCount = payload.length
  },

  processCart (state, payload) {
    state.cart = payload
    state.cartCount = payload.length
  },

  /**
   *  清空购物车
   *
   */
  clearShoppingCart () {
    let shoppingCartKey = state.shoppingCartKey
    localStorage.removeItem(shoppingCartKey);
    state.shoppingCart = []
    state.shoppingCartCount = 0
  },

  initComputedShoppingCart () {
    let shoppingCartKey = state.shoppingCartKey
    let shoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey) || '[]')
    state.shoppingCart = shoppingCart
    state.shoppingCartCount = shoppingCart.length
  },

  processOrder (state, orderInfo) {
    state.orderInfo = orderInfo
    state.orderID = orderInfo.order_id
  },

  processCountries (state, payload) {
    state.countryList = payload
  },

  processProvince (state, payload) {
    state.provinceList = payload
  },

  processCity (state, payload) {
    state.cityList = payload
  },

  processLocality (state, payload) {
    state.localityList = payload
  },

  processShippingOrder (state, payload) {
    state.order_total_price = payload.order_total_price
    state.order_items = payload.order_items
    state.order_address = payload.order_address
  },

  processCompleteOrder (state, payload) {
    state.completeOrderStatus = payload.success
  }
}

const actions = {
  addShoppingCart ({commit, state}, payload) {
    let shoppingCartKey = state.shoppingCartKey
    let shoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey) || '[]')
    let product = payload.product

    /**
     * 构建购物车规格选择列表
     *
     */
    product.variationsItem = product.variations.map(variation => {
      return variation.attribute_product_amount.value
    })

    product.selectVariation = product.variationsItem[0]

    if (shoppingCart.length <= 0) {
      shoppingCart.push(product)
    }

    if (shoppingCart.length > 0 && globalUtils.noElementInArray(shoppingCart, product, 'uuid')) {
      shoppingCart.push(product)
    }

    commit('processShoppingCart', shoppingCart)
    localStorage.setItem(shoppingCartKey, JSON.stringify(shoppingCart));
  },

  removeShoppingCart ({commit, state}, productId) {
    let shoppingCartKey = state.shoppingCartKey
    let shoppingCart = JSON.parse(localStorage.getItem(shoppingCartKey) || '[]')

    shoppingCart = shoppingCart.filter(product => {
      if (product.uuid === productId) {
        return false
      } else {
        return true
      }
    })
    commit('processShoppingCart', shoppingCart)
    localStorage.setItem(shoppingCartKey, JSON.stringify(shoppingCart));
  },

  getCart ({commit, state}, productId) {
    return request()
      .get('cart', {
        params: {
          _format: state._format
        }
      })
      .then(result => {
        commit('processCart', result.data)
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },

  addCart ({commit, state}, orderInfo) {
    return request()
      .post('cart/add?_format=json', orderInfo)
      .then(result => {
        return Promise.resolve(result);
      }).catch(error => {
        console.log(error);
        return Promise.resolve(error);
      })
  },

  updateCart ({commit, state}, cartInfo) {
    return request()
      .patch(`cart/${cartInfo.order_id}/items?_format=json`, cartInfo.quantity)
      .then(result => {
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },

  getCountries ({commit, state}) {
    return request().get('api/order_address_field/resource/default/default/default', {
      params: {
        _format: state._format
      }
    })
      .then(result => {
        commit('processCountries', result.data)
        return Promise.resolve(result.data)
      })
      .catch(error => {
      console.log(error)
    })
  },

  getProvinces ({commit, state}, contryCode) {
    return request().get('api/order_address_field/resource/' + contryCode +'/default/default', {
      params: {
        _format: state._format
      }
    })
      .then(result => {
        commit('processProvince', result.data)
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },

  getCities ({commit, state}, payload) {
    return request().get(`api/order_address_field/resource/${payload.country_code}/${payload.province_code}/default`, {
      params: {
        _format: state._format
      }
    })
      .then(result => {
        console.log(result, 'result')
        commit('processCity', result.data)
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },

  getLocals ({commit, state}, payload) {
    return request().get(`api/order_address_field/resource/${payload.country_code}/${payload.province_code}/${payload.city_code}`, {
      params: {
        _format: state._format
      }
    })
      .then(result => {
        commit('processLocality', result.data)
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },

  updateOrderAddress ({commit, state}, address) {
    return request().post('/api/order_rest/submit?_format=hal_json', address)
      .then(result => {
        commit('processShippingOrder', result.data)
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },

  completeOrder ({commit, state}, orderId) {
    return request()
      .get(`api/complete_order/${orderId}`, {
        params: {
          _format: state._format
        }
      })
      .then(result => {
        commit('processCompleteOrder', result.data)
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  },

  cancelOrder ({commit, state}, orderId) {
    return request()
      .get(`api/cancel_order/${orderId}`, {
        params: {
          _format: state._format
        }
      })
      .then(result => {
        return Promise.resolve(result)
      })
      .catch(error => {
        console.log(error)
      })
  }

}

export default {
  state,
  mutations,
  actions
}
