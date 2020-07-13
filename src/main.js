import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Message);
Vue.prototype.$message = Message;
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App),
  data:function(){
      return{
          logged:false,
          is_superuser:false
      }

  }
}).$mount('#app');
