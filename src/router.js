import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
// import Login from './views/login'
// import UserInfo from './views/userInfo'
// import Contribute from './views/contribute'
import NotFound from './views/notFound'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    // {
    //   path: '/userInfo',
    //   name: 'userInfo',
    //   component: UserInfo
    // },
    // {
    //   path: '/contribute',
    //   name: 'contribute',
    //   component: Contribute
    // },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})
