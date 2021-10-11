import { createRouter, createWebHistory } from 'vue-router'
import CreatePoll from '../views/CreatePoll.vue'
import Results from '../views/Results.vue'

const routes = [
  {
    path: '/',
    name: 'CreatePoll',
    component: CreatePoll
  },
  {
    path: '/results/:id',
    name: 'Results',
    component: Results
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router