import Vue from  'vue';
import VueRouter from 'vue-router'

import signup from './views/signup';
import home from './views/home';

// person center router
import personcenter from './views/personcenter';
import myblogs from "./components/myblogs";
import information from "./components/information";
import follow from "./components/follow";


Vue.use(VueRouter);

const routes= [

    {
        path: '/signup',
        name: "signup",
        component: signup,
    },
    {
        path: '/home',
        name: "home",
        component: home
    },
    {
        path: '/person',
        name: 'person',
        component: personcenter,
        children: [
            {
                path: '/info', components: information
            },
            {
                path: '/myblogs', components: myblogs
            },
            {
                path: '/follow', components: follow
            }
        ]
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
