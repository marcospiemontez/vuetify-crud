import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Users/AuthUser.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Users/DashboardView.vue'),
    children: [
      { path: '/profile', name: 'profile', component: () => import('../views/Users/ProfileView.vue') },
      { path: '/products', name: 'products', component: () => import('../views/Products/RegistrationProducts.vue') },
      { path: '/category', name: 'category', component: () => import('../views/Categories/CategoryView.vue') },
      { path: '/registration-products', name: 'registrationProducts', component: () => import('../views/Products/RegistrationProducts.vue') },
      { path: '/entry-products', name: 'entryProducts', component: () => import('../views/Products/EntryProducts.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
