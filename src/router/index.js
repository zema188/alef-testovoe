import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'
import PreviewView from '../views/PreviewView.vue'

const routes = [
  {
    path: '/',
    name: 'form',
    component: FormView
  },
  {
    path: '/preview',
    name: 'preview',
    component: PreviewView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
