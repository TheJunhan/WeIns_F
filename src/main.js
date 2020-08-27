import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css';
import axios from 'axios';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Message);
Vue.prototype.$message = Message;
Vue.prototype.$http = axios;
Vue.prototype.logout = function () {
    this.$root.logged = false;

    this.$root.auth_user_manager = false;
    this.$root.auth_blog_manager = false;
    this.$root.auth_comment_manger = false;

    this.$root.my_person_center_info = true;
    this.$root.my_person_center_blogs = false;
    this.$root.my_person_center_follower = false;
    this.$root.my_person_center_following = false;
    this.$root.my_person_center = true;
};
Vue.prototype.parseAuth = function (auth) {
    if (auth % 2 === 1 || auth === 8) // 001
        this.$root.auth_comment_manager = true;

    if ((auth/2) % 2 === 1 || auth === 8) // 010
        this.$root.auth_blog_manager = true;

    if (auth >= 4) // 100
        this.$root.auth_user_manager = true;
}

new Vue({

  data:function(){
      return{
          logged: false,

          auth_user_manager: false,
          auth_blog_manager: false,
          auth_comment_manager: false,

          my_person_center: true,
          my_person_center_info: true,
          my_person_center_blogs: false,
          my_person_center_follower: false,
          my_person_center_following: false,
      }
  },

    render: h => h(App),
    router,

}).$mount('#app');
