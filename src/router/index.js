import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Industry from '../views/Industry'
import Products from '../views/Products'
import Formulations from '../views/Formulations'
import SampleOrder from '../views/SampleOrder'

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
      path: '/formulations',
      name: 'Formulations',
      component: Formulations
    },
    {
      path: '/sample-order',
      name: 'SampleOrder',
      component: SampleOrder
    }
  ]
})
