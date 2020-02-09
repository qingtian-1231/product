
import Vue from 'vue'
import Vuex from 'vuex'

import core from './modules/core'
import user from './modules/user'
import home from './modules/home'
import product from './modules/product'
import formulation from './modules/formulation'
import download from './modules/download'
import basket from './modules/basket'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    core,
    user,
    home,
    product,
    formulation,
    download,
    basket
  }
})
