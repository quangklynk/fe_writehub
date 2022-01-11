import Vue from 'vue'
import Router from 'vue-router'

// Error page
import Error from "./components/Error/404.vue";

// Login
import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';
import MenuLogin from './components/Auth/Index.vue';
import Forgot from './components/Auth/Forgot.vue';

// Menu
import Menu from './components/Menu/Index.vue';

// Teacher
import Teacher from './components/Menu/Teacher/Index.vue';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/', component: MenuLogin, children: [
                { path: '/', component: Login, },
                { path: '/forgot', component: Forgot, },
                { path: '/register', component: Register, },
            ]
        },

        {
            path: '/menu', component: Menu, children: [
                { path: '/menu/teacher', component: Teacher, },
            ]
        },

        { path: '/404', name: 'errorpage', component: Error },//token, user
        { path: '*', redirect: '/404' }
    ]
})

// router.beforeEach((to, from, next) => {
//     const loggedIn = localStorage.getItem('token');
//     if (to.path == '/forgot' || to.path == '/reset') {
//         next();
//     } else if (to.path != '/' && !loggedIn) {
//         next('/');
//     }
//     next();
// });

export default router