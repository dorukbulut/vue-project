import { createWebHistory, createRouter } from 'vue-router'

import About from './views/About.vue'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})

export default router
