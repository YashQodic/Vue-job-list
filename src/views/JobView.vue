<template>
  <Loader v-if="statusOfLoading" />

  <div v-else class="job-details-page">
    <div class="job-card">
      <div class="job-header">
        <h1>{{ job.title }}</h1>
        <div class="badges">
          <span class="badge type">{{ job.type }}</span>
          <span class="badge location">{{ job.location }}</span>
        </div>
      </div>
      <div class="job-body">
        <p class="job-description">{{ job.description }}</p>
        <p class="job-salary"><strong>Salary:</strong> {{ job.salary }}</p>
      </div>
    </div>

    <div class="company-card">
      <h2>{{ job.company.name }}</h2>
      <p class="company-description">{{ job.company.description }}</p>
      <div class="contact-info">
        <p><i class="fas fa-envelope"></i> {{ job.company.contactEmail }}</p>
        <p><i class="fas fa-phone"></i> {{ job.company.contactPhone }}</p>
      </div>
    </div>

    <div class="action-buttons">
      <button class="edit-btn" @click="editJob">Edit</button>
      <button class="delete-btn" @click="deleteJob">Delete</button>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import { useJobs } from '@/store/jobList.js';
const route = useRoute()
const jobId = route.params.id
const statusOfLoading = ref(true)
const jobStore = useJobs();
const job = ref({
  title: '',
  type: '',
  location: '',
  description: '',
  salary: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  }
})
const editJob = () => {
  router.push(`/edit-job/${jobId}`)
}
onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${jobId}`)
    job.value = response.data
  } catch (error) {
    console.error('Error fetching job', error)
  } finally {
    setTimeout(() => {
      statusOfLoading.value = false
    }, 500)
  }
})

const deleteJob = async () => {
  try {
      await axios.delete(`/api/jobs/${jobId}`)
      jobStore.getAllJobList().then(() => {
          statusOfLoading.value = true;
          toast.success('Job Was Deleted');
          setTimeout(() => {
              statusOfLoading.value = false;
              router.push('/job-list')
          },500)
      })
  } catch (error) {
      console.log(error);
  }
}
</script>

<style scoped>
.job-details-page {
    padding: 1rem 1rem;
    height: calc(100vh - 56px);
    overflow-y: auto;
}

.job-card, .company-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 2px 2px 24px rgb(0 0 0 / 46%);
    padding: 2rem;
    margin-bottom: 2rem;
    transition: transform 0.2s;
}

.job-card:hover, .company-card:hover {
    transform: translateY(-4px);
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;    
}

.job-header h1 {
    margin: 0;
    font-size: 2rem;
    color: #333;
}

.badges {
    display: flex;
    gap: 0.5rem;
}

.badge {
    background: #f0f0f0;
    color: #555;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
}

.badge.type {
    background: #d0ebff;
    color: #1971c2;
}

.badge.location {
    background: #e6fcf5;
    color: #087f5b;
}

.job-body {
    margin-top: 1.5rem;
}

.job-description {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 1rem;
}

.job-salary {
    font-weight: bold;
    font-size: 1rem;
    color: #444;
}

.company-card h2 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
}

.company-description {
    margin-bottom: 1rem;
    color: #666;
}

.contact-info p {
    margin: 0.3rem 0;
    color: #444;
    font-size: 0.95rem;
}

.contact-info i {
    margin-right: 0.6rem;
    color: #3498db;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.action-buttons button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s, box-shadow 0.3s;
}

.edit-btn {
    background: #3498db;
    color: white;
}

.edit-btn:hover {
    background: #2980b9;
    box-shadow: 0 4px 12px rgba(52,152,219,0.4);
}

.delete-btn {
    background: #e74c3c;
    color: white;
}

.delete-btn:hover {
    background: #c0392b;
    box-shadow: 0 4px 12px rgba(231,76,60,0.4);
}
</style>
