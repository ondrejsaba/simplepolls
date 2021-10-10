import { createRouter, createWebHistory } from 'vue-router'
import CreatePoll from '../views/CreatePoll.vue'

const routes = [
  {
    path: '/',
    name: 'CreatePoll',
    component: CreatePoll
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
