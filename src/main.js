import Vue from 'vue'
import Vuetify from 'vuetify'
import InfiniteLoading from 'vue-infinite-loading'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
// import { messages } from './lang'
import { getCookie, setCookie } from "./utils/cookie.js";
import loading from './utils/loading.js' // 引入loading
// For Nprogress 页面加载动画.
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import SvgIcon from 'vue-svgicon'
import './icons'   //引入svg-icon

// 复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true

const isDev = process.env.NODE_ENV !== 'production'
let language = getCookie('drupal:session:language')

if (!language) {
  const expireTime = 30 * 24 * 3600 * 1000;
  language = 'en'

  setCookie(
    'drupal:session:language',
    'en',
    expireTime,
    "/"
  )
}

if (isDev) {
  Vue.config.debug = true
  Vue.config.devtools = true
}

Vue.config.productionTip = false
/**
 * 关于NProgress 更多设置和用法.
 * @see https://github.com/rstacruz/nprogress/
 */

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: true })

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 每个路由跳转时都将其跳转的路由推给百度
  if (!isDev && window._hmt) {
    // console.log(window._hmt)
    if (to.path) {
      // console.log(to.path)
      window._hmt.push(['_trackPageview', to.fullPath])
    }
  }

  let meta

  // 使title在vue-router中可配置
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.keywords) {
    meta = document.getElementsByTagName('meta')
    meta['keywords'].setAttribute('content', to.meta.keywords)
  }

  if (to.meta.description) {
    meta = document.getElementsByTagName('meta')
    meta['description'].setAttribute('content', to.meta.description)
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

Vue.use(loading) // 全局使用loading加载动画
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})
Vue.use(VueClipboard)
Vue.use(InfiniteLoading);
Vue.use(VueI18n)

import en from './lang/en'
import zh from './lang/zh'

const messages = {
  "zh-hans": zh,
  "en": en
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: language, // set locale
  messages, // set locale messages
})

store.dispatch('getApiMenu').then(() => {
  store.dispatch('getTaxonomyList').then(() => {
    store.dispatch('getCurrentUser').then(() => {
      store.dispatch('getCSRFToken').then(() => {
        new Vue({
          i18n,
          store,
          router,
          vuetify: new Vuetify({
            theme: {
              themes: {
                light: {
                  primary: '#2196f3',
                  secondary: '#00793a',
                  accent: '#8c9eff',
                  error: '#b71c1c',
                },
                dark: {
                  primary: '#4caf50',
                },
              },
            },
            breakpoint: {
              thresholds: {
                xs: 340,
                sm: 540,
                md: 800,
                lg: 1460,
              },
              scrollBarWidth: 24,
            }
          }),
          render: h => h(App),
          mounted () {
            document.dispatchEvent(new Event('render-event'))
          }
        }).$mount('#app')
      })
    })
  })
})
