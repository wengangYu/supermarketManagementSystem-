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
    },
    {
    
      path: '/',
      name: 'index',
      component: ()=>import('./views/index/index.vue'),
      children:[
        // 默认子组件
        {
          name:'home',
          path:'',
          component:()=>import('./views/Home/Home.vue')
        },
        // 添加账号
        {
          name:'useradd',
          path:'/useradd',
          component:()=>import('./views/UserAdd/UserAdd.vue')
        },
        // 账号管理
        {
          name:'userlist',
          path:'/usermanage',
          component:()=>import('./views//UserManage/UserManage.vue')
        },
        // 密码修改
        {
          name:'editpassword',
          path:'/editpassword',
          component:()=>import('./views/EditPassword/EditPassword.vue')
        },
        // 商品管理
        {
          name:'goodsmanage',
          path:'/goodsmanage',
          component:()=>import('./views/GoodsManage/GoodsManage.vue')
        },
        // 添加商品
        {
          name:'goodsadd',
          path:'/goodsadd',
          component:()=>import('./views/GoodsAdd/GoodsAdd.vue')
        },
        // 销售统计表
        {
          name:'salescharts',
          path:'/salescharts',
          component:()=>import('./views/SalesCharts/SalesCharts.vue')
        },
      ]
    }]
  })
