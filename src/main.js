import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios';
import qs from 'qs';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Antd);
Vue.prototype.$http = axios;
Vue.prototype.$qs=qs;
axios.defaults.baseURL = '/api/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
