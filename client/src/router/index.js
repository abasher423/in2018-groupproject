import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import Transactions from '@/components/Transactions'
import Users from '@/components/Users'
import BlankStock from '@/components/BlankStock'
import NewSale from '@/components/NewSale'
import Customers from '@/components/Customers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, 
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/blanks',
      name: 'blanks',
      component: BlankStock
    },
    {
      path: '/newsale',
      name: 'newsale',
      component: NewSale,

    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    }
  ]
})
