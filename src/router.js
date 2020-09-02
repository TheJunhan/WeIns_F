import Vue from  'vue';
import VueRouter from 'vue-router'

import signup from './views/signup';
import home from './views/home';
import personcenter from './views/personcenter';
import otherpersoncenter from "./views/otherpersoncenter";
import manager from "./views/manager";
import discover from "./views/discover";

Vue.use(VueRouter);

const routes= [

    {
        path: '/signup',
        name: 'signup',
        component: signup
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/discover',
        name: 'discover',
        component: discover
    },
    {
        path: '/person',
        name: 'person',
        component: personcenter
    },
    {
        path: '/manager',
        name: 'manager',
        component: manager
    },
    {
        path: '/visit',
        name: 'visit',
        component: otherpersoncenter
    },
    {
        path: '/*',
        redirect: '/home'
    },
]

const router =  new VueRouter({
    routes,
    mode:"history"
})
// router.beforeEach((to, from, next) => {
//     console.log(1);
//     if(sessionStorage.getItem("user")!=null) next();
//     else if(to.path=="/home") {next()}
//     else{
//         next("/home");
//     }
//
// });

export default router;
