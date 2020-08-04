import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: () => import('@/views/pages/Index'),
      children: [{
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock')
        },
        {
          name: 'home',
          path: '',
          component: () => import('@/views/pages/home')
        },
        {
          name: 'section',
          path: 'section/:id',
          props: true,
          component: () => import('@/views/pages/section')
        },
        {
          name: 'onePost',
          path: 'onePost/:id',
          props: true,
          component: () => import('@/views/pages/onePost')
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login')
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/dashboard/Index'),
      beforeEnter: (to, from, next) => {
        // console.log(store.state.idToken)
        if (localStorage.getItem('tokin')) {
          next()
        } else {
          next('login');
        }
      },
      children: [
        // Dashboard
        {
          name: 'الاحصائيات',
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard')
        },
        {
          name: 'المستخدمين',
          path: 'users',
          component: () => import('@/views/dashboard/users')
        },
        {
          name: 'الاخبار',
          path: 'posts',
          component: () => import('@/views/dashboard/posts')
        },
        {
          name: 'التعليقات',
          path: 'comment',
          component: () => import('@/views/dashboard/comment')
        },
        {
          name: 'التواصل',
          path: 'profile',
          component: () => import('@/views/dashboard/profile')
        },
      ]
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [{
        name: '404 Error',
        path: '',
        component: () => import('@/views/pages/Error')
      }]
    }
  ]
})
