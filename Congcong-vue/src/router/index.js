import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'imooc',
    component: Main
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    // vue-router提供的懒加载方式，
    // 只有使用goodsList的时候才会使用goodsList组件的内容
    component: () => import('../views/GoodsList.vue')
  },
  {
    path: '/GoodsDetail',
    name: 'GoodsDetail',
    component: () => import('../views/GoodsDetail.vue')
  },
  {
    path: '/Buy',
    name: 'Buy',
    component: () => import('../views/Buy.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
