import { createRouter, createWebHistory } from 'vue-router'
// 1. Import a component ของคุณ
import FormView from '../pages/FormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 2. เพิ่ม route ของคุณลงใน routes array
  routes: [
    {
      path: '/form',
      name: 'FormView',
      component: FormView,
    },
    // คุณสามารถเพิ่ม routes อื่นๆ ได้ที่นี่ในอนาคต
  ],
})

export default router
