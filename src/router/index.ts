import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/rocket',
      name: 'rocket',
      redirect: '/rocket/myRocket',
      children: [
        {
          path: 'myRocket',
          name: 'myRocket',
          component: () => import('../views/Rocket/myRocket.vue')
        }
      ]
    },
    {
      path: '/transition',
      name: 'transition',
      redirect: '/transition/myTransition',
      children: [
        {
          path: 'myTransition',
          name: 'myTransition',
          component: () => import('../views/Transitions/myTransition.vue')
        },
        {
          path: 'secTransition',
          name: 'secTransition',
          component: () => import('../views/Transitions/secTransition.vue')
        }
      ]
    }
  ]
})

export default router
