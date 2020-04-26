import { getCookie } from "../utils/cookie"
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
import MyFavorites from '../views/MyFavorites'
import OrderHistory from '../views/OrderHistory'
import AccountSetting from '../views/AccountSetting'
import Unauthorized from '../views/Unauthorized'

Vue.use(Router)

const defaultKeywords = '巴斯夫, 化工产品, 配方, 巴斯夫产品'
const defaultDescription = '巴斯夫产品, 巴斯夫配方'

let language = getCookie('drupal:session:language') || 'zh-hans'

console.log(language, 'language')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: language === 'zh-hans' ? '巴斯夫产品中心' : 'BASF Product Center',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--行业介绍' : 'BASF Product Center --- Industry Introduce',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--产品介绍' : 'BASF Product Center --- Product Introduce',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--产品详情页' : 'BASF Product Center --- Product Details Page',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--推荐配方' : 'BASF Product Center --- Recommended Formula',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--配方详情页' : 'BASF Product Center --- Formula Details Page',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--样品订单' : 'BASF Product Center --- Sample Order',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--登录' : 'BASF Product Center --- Login',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--注册' : 'BASF Product Center ---  Registration',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--资料下载' : 'BASF Product Center ---  Data Download',
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
        title: language === 'zh-hans' ? '巴斯夫产品中心--配方选择' : 'BASF Product Center ---  Select Formulation',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/my-favorites',
      name: 'MyFavorites',
      component: MyFavorites,
      meta: {
        title: language === 'zh-hans' ? '巴斯夫产品中心--我的收藏' : 'BASF Product Center ---  My Collection',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/order-history',
      name: 'OrderHistory',
      component: OrderHistory,
      meta: {
        title: language === 'zh-hans' ? '巴斯夫产品中心--订单历史' : 'BASF Product Center ---  Order History',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/account-setting',
      name: 'AccountSetting',
      component: AccountSetting,
      meta: {
        title: language === 'zh-hans' ? '巴斯夫产品中心--账户设置' : 'BASF Product Center ---  Account Setting',
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
