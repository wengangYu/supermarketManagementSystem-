import Vue from 'vue'

//引入axios
import axios from 'axios'
import moment from 'moment/moment'
// 引入顶级组件
import App from './App.vue'
import router from './router'
// 引入elementUi组件 
import ElementUI from 'element-ui';
// 组件样式
import 'element-ui/lib/theme-chalk/index.css';
//把axios挂在vue的原型上
Vue.prototype.axios = axios;
//阻止生产提示
Vue.config.productionTip = false
// 注册elementui
Vue.use(ElementUI);

//时间过滤
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString); // value可以是普通日期 20170723
  // return moment.unix(value).format(formatString); // 这是时间戳转时间
});

//全局路由配置--路由前置守卫

router.beforeEach((to, from, next) => {
  //获取当前请求的路径
  let toPath = to.path
  console.log(toPath)
  //登陆页面路径
  let loginpath = '/login'
  console.log(loginpath)
  //首先获取token看是否存在
  let usertoken = window.localStorage.getItem('token')
  console.log(usertoken)
  //如果当前路径不是登陆页面就去检查token,如果token存在继续,否则跳转到登陆页面
  if(toPath!==loginpath){
    if(usertoken){
      next()
    }else{
      next({
        path:loginpath
      })
    }
  }else{
    next()
  }
  //默认跳转到根
  // next({
  //   path:loginpath
  // })

})

// 获取当前请求的路径

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')