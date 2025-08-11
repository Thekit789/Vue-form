import { createRouter, createWebHistory } from 'vue-router'
// 1. Import a component
import HomeView from '../pages/HomeView.vue'
import FormView from '../pages/FormView.vue'
import FollowView from '../pages/FollowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 2. เพิ่ม route
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/form',
      name: 'FormView',
      component: FormView,
    },
    {
      path: '/follow',
      name: 'FollowView',
      component: FollowView,
    },
  ],
})

export default router
