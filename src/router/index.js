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

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/industry',
      name: 'Industry',
      component: Industry
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: ProductView,
    },
    {
      path: '/formulations',
      name: 'Formulations',
      component: Formulations
    },
    {
      path: '/formulation/:id',
      name: 'Formulation',
      component: FormulationView,
    },
    {
      path: '/sample-order',
      name: 'SampleOrder',
      component: SampleOrder
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/notfound'
    }
  ]
})
