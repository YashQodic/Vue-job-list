import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import JobList from '../views/JobListPage.vue'
import CreateJob from '../views/CreateJobPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/job-list',
    name: 'Job list',
    component: JobList
  },
  {
    path: '/create-job',
    name: 'Create job',
    component: CreateJob
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
