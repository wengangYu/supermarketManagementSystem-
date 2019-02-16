import Vue from 'vue'

//引入axios
import axios from 'axios'

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
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
