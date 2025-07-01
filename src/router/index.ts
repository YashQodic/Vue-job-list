import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import JobList from '../views/JobListPage.vue'
import CreateJob from '../views/CreateJobPage.vue'
import JobView from '../views/JobView.vue'
import EditJob from '../views/EditJobPage.vue'




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
  },
  {
    path: '/job/:id',
    name: 'Job details',
    component: JobView
  },
  {
    path: '/edit-job/:id',
    name: 'Edit job',
    component: EditJob
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
