import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import Transactions from '@/components/Transactions'
import Users from '@/components/Users'
import BlankStock from '@/components/BlankStock'
import NewSale from '@/components/NewSale'
import Customers from '@/components/Customers'
import Commission from '@/components/Commission'
import ReportBlank from '@/components/Reports/BlankStockReport'
import ReportDomInd from '@/components/Reports/IndDomesticReport'
import ReportInterInd from '@/components/Reports/IndInterReport'
import ReportInterGl from '@/components/Reports/GlInterReport'
import ReportDomGl from '@/components/Reports/GlDomesticReport'

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
    },
    {
      path: '/commission',
      name: 'commission',
      component: Commission
    },
    {
      path: '/reportBlank',
      name: 'reportBlank',
      component: ReportBlank
    },
    {
      path: '/reportDomInd',
      name: 'reportDomInd',
      component: ReportDomInd,
    },
    {
      path: '/reportInterInd',
      name: 'reportInterInd',
      component: ReportInterInd,
    },
    {
      path: '/reportInterGl',
      name: 'reportInterGl',
      component: ReportInterGl,
    }
    ,
    {
      path: '/reportDomGl',
      name: 'reportDomGl',
      component: ReportDomGl,
    }
  ]
})
