import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/404-empty',
      name: 'empty-project',
      component: () => import('../views/EmptyProjectView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!document.startViewTransition) {
    next()
    return
  }

  document.startViewTransition(() => {
    next()
  })
})

export default router
