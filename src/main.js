import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.prototype.$vuetify.theme = {
  // orange
  primary: '#CBAA5C',
  // sliver
  secondary: '#083759',
  // cyan
  accent: '#8c9eff',
  // blue '#2196F3'
  info: '#3b7fc4',
  // green '#4CAF50' is the default value
  success: '#42c02e',
  // red
  error: '#b71c1c',
  // yellow
  warning: '#FFC107'
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
