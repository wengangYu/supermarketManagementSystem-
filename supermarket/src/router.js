import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:() => import('./views/Login/login.vue')
    }
  ]
})
