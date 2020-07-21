import Vue from  'vue';
import VueRouter from 'vue-router'

import signup from './views/signup';
import home from './views/home';
import personcenter from './views/personcenter';
import userTable from "./components/userTable";
import manager from "./views/manager";

Vue.use(VueRouter);

const routes= [

    {
        path: '/signup',
        name: "signup",
        component: signup
    },
    {
        path: '/home',
        name: "home",
        component: home
    },
    {
        path: '/person',
        name: 'person',
        component: personcenter
    },
    {
        path: '/userTable',
        name: 'userTable',
        component: userTable
    },
    {
        path: '/manager',
        name: 'manager',
        component: manager
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
