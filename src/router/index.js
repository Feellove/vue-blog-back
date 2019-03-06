import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import blogList from '@/components/blogList'
import blogAdd from '@/components/blogAdd.vue';
import blogComment from '@/components/blogComment.vue';
import blogLogin from '@/components/blogLogin.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/blogList'
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/blogList',
          name: 'blogList',
          component: blogList
        },
        {
          path: '/blogAdd',
          name: 'blogAdd',
          component: blogAdd
        },
        {
          path: '/blogComment',
          name: 'blogComment',
          component: blogComment
        }
      ]
    },
    {
      path: '/login',
      name: 'blogLogin',
      component: blogLogin
    },
  ]
})
