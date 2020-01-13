import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'
// For Nprogress 页面加载动画.
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import SvgIcon from 'vue-svgicon'
import './icons'   //引入svg-icon

const isDev = process.env.NODE_ENV !== 'production'

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

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

store.dispatch('getApiMenu').then(() => {
  new Vue({
    store,
    router,
    vuetify: new Vuetify({
      theme: {
        themes: {
          light: {
            primary: '#028fd2',
            secondary: '#78d3d3',
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
  }).$mount('#app')
})
