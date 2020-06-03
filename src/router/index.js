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
import ForgetPass from '../views/ForgetPass'
import ResetPass from '../views/ResetPass'
import Disclaimer from '../views/Disclaimer'
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心' : 'BASF Product Center for Dispersions and Resins',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心_行业' : 'BASF Product Center for Dispersions and Resins_Industry',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心_产品' : 'BASF Product Center for Dispersions and Resins_Products',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心_产品详情页' : 'BASF Product Center for Dispersions and Resins --- Product Details Page',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心_配方' : 'BASF Product Center for Dispersions and Resins_Formulations',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心_配方详情页' : 'BASF Product Center for Dispersions and Resins --- Formula Details Page',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心_样品订单' : 'BASF Product Center for Dispersions and Resins_Sample Order',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心--登录' : 'BASF Product Center for Dispersions and Resins --- Login',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心--注册' : 'BASF Product Center for Dispersions and Resins ---  Registration',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心_下载' : 'BASF Product Center for Dispersions and Resins_Download',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心--配方选择' : 'BASF Product Center for Dispersions and Resins ---  Select Formulation',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心--我的收藏' : 'BASF Product Center for Dispersions and Resins ---  My Collection',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心--订单历史' : 'BASF Product Center for Dispersions and Resins ---  Order History',
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
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心--账户设置' : 'BASF Product Center for Dispersions and Resins ---  Account Setting',
        keywords: defaultKeywords,
        description: defaultDescription,
        keepAlive: true
      }
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: Disclaimer,
      meta: {
        title: language === 'zh-hans' ? '巴斯夫分散体与树脂产品中心--免责声明' : 'BASF Product Center for Dispersions and Resins ---  Disclaimer',
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
      path: '/forget-pass',
      name: 'ForgetPass',
      component: ForgetPass
    },
    {
      path: '/reset-pass/:tempPass',
      name: 'ResetPass',
      component: ResetPass
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
