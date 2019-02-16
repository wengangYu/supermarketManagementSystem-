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
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
