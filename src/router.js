import Vue from  'vue';
import Router from 'vue-router';
import signup from './views/signup';
import home from './views/home';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/signup',
            component: signup,
        },
        {
            path: '/home',
            component: home,
        }
    ]
})
