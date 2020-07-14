import Vue from  'vue';
import VueRouter from 'vue-router'

import signup from './views/signup';
import home from './views/home';
import personcenter from './views/personcenter';

Vue.use(VueRouter);

const routes= [

        {
            path: '/signup',
            name:"signup",
            component: signup,
        },
        {
            path: '/home',
            name:"home",
            component: home
        },
        {
            path: '/person',
            name:'person',
            component: personcenter
        },
        // {
        //     path: '/home',
        //     component: home,
        //     children: [{
        //         path: '/catalog', component: catalog,
        //         children: [{
        //             path: '/issue', component: issue
        //         },{
        //             path: '/person', component: personcenter
        //         }]
        //     }]
        // }
        {
            path: '/*',
            redirect: '/home'
        },

    ]
var router =  new VueRouter({
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