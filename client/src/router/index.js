import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Menu from '@/components/Menu'

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
    }
  ]
})
