import Vue from  'vue';
import Router from 'vue-router';
import signup from './views/signup';
import home from './views/home';
import catalog from './views/catalog';
import issue from './components/issue';
import personcenter from './views/personcenter';

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
            redirect: '/catalog',
            children: [{
                path: '/catalog', component: catalog,
                redirect: '/issue',
                children: [{
                    path: '/issue', component: issue
                },{
                    path: '/person', component: personcenter
                }]
            }]
        }
    ]
})
