import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Industry from '../views/Industry'
import Products from '../views/Products'
import ProductView from '../views/ProductView'
import Formulations from '../views/Formulations'
import FormulationView from '../views/FormulationView'
import SampleOrder from '../views/SampleOrder'
import Register from '../views/Register'
import NotFound from '../views/NotFound'
import Login from '../views/Login'
import Download from '../views/Download'
import FormulationsFilter from '../views/FormulationsFilter'
import Unauthorized from '../views/Unauthorized'

Vue.use(Router)

const defaultKeywords = '巴斯夫,化工产品,配方,巴斯夫产品'
const defaultDescription = '巴斯夫产品,巴斯夫配方'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '巴斯夫产品助手首页',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/industry',
      name: 'Industry',
      component: Industry,
      meta: {
        title: '行业',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        title: '巴斯夫产品',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: ProductView,
      meta: {
        title: '产品详情页',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/formulations',
      name: 'Formulations',
      component: Formulations,
      meta: {
        title: '配方',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/formulation/:id',
      name: 'Formulation',
      component: FormulationView,
      meta: {
        title: '配方详情页',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/sample-order',
      name: 'SampleOrder',
      component: SampleOrder,
      meta: {
        title: '样品订单',
        auth: 'user-login',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '登录',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/download',
      name: 'Download',
      component: Download,
      meta: {
        title: '下载',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/formulations-filter',
      name: 'FormulationsFilter',
      component: FormulationsFilter,
      meta: {
        title: '配方全局过滤页',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '404',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '*',
      redirect: '/notfound'
    }
  ]
})
