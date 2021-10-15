import { createRouter, createWebHistory } from 'vue-router'
import CreatePoll from '@/views/CreatePoll.vue'
import Vote from '@/views/Vote.vue'
import Results from '@/views/Results.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'CreatePoll',
    component: CreatePoll
  },
  {
    path: '/vote/:id',
    name: 'Vote',
    component: Vote
  },
  {
    path: '/results/:id',
    name: 'Results',
    component: Results
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router