<template>
    <div class="form-container">
        <section class="form-section">
            <div class="form-wrapper">
                <form @submit.prevent="handleSubmit">
                    <h2 class="form-title">Add Job</h2>

                    <div class="form-group">
                        <label class="form-label">Job Type</label>
                        <select v-model="form.type" class="form-select" required>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Job Listing Name</label>
                        <input type="text" v-model="form.title" class="form-input"
                            placeholder="e.g. Beautiful Apartment In Miami" required />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea v-model="form.description" class="form-textarea" rows="4"
                            placeholder="Add any job duties, expectations, requirements, etc"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Salary</label>
                        <select v-model="form.salary" class="form-select" required>
                            <option value="Under $50K">under $50K</option>
                            <option value="$50K - $60K">$50 - $60K</option>
                            <option value="$60K - $70K">$60 - $70K</option>
                            <option value="$70K - $80K">$70 - $80K</option>
                            <option value="$80K - $90K">$80 - $90K</option>
                            <option value="$90K - $100K">$90 - $100K</option>
                            <option value="$100K - $125K">$100 - $125K</option>
                            <option value="$125K - $150K">$125 - $150K</option>
                            <option value="$150K - $175K">$150 - $175K</option>
                            <option value="$175K - $200K">$175 - $200K</option>
                            <option value="Over $200K">Over $200K</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" v-model="form.location" class="form-input" placeholder="Company Location"
                            required />
                    </div>

                    <h3 class="form-subtitle">Company Info</h3>

                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" v-model="form.company.name" class="form-input" placeholder="Company Name" />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Company Description</label>
                        <textarea v-model="form.company.description" class="form-textarea" rows="4"
                            placeholder="What does your company do?"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Contact Email</label>
                        <input type="email" v-model="form.company.contactEmail" class="form-input"
                            placeholder="Email address for applicants" required />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Contact Phone</label>
                        <input type="tel" v-model="form.company.contactPhone" class="form-input"
                            placeholder="Optional phone for applicants" />
                    </div>

                    <div class="add-job">
                        <button type="submit" class="form-submit">Add Job</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup>
import { reactive, } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import { toast } from 'vue3-toastify';
import { useJobs } from '@/store/jobList.js';

const router = useRouter()
const jobStore = useJobs();
const form = reactive({
    type: 'Full-Time',
    title: '',
    description: '',
    salary: 'Under $50K',
    location: '',
    company: {
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: ''
    }
})

async function handleSubmit() {
    const newJob = {
        title: form.title,
        type: form.type,
        location: form.location,
        description: form.description,
        salary: form.salary,
        company: {
            name: form.company.name,
            description: form.company.description,
            contactEmail: form.company.contactEmail,
            contactPhone: form.company.contactPhone,
        },
    };
    try {
        await axios.post('/api/jobs', newJob);
        jobStore.getAllJobList().then(() => {
            toast.success("Job Was Added!");
            setTimeout(() => {
                router.push(`/job-list`);
            }, 500);
        });
    } catch (error) {
        console.error('Error fetching job', error);
        toast.error('Job Was Not Added');
    }
    // You could also use axios.post('/api/jobs', form.value) here
}
</script>



<style scoped>
.form-container {
    height: calc(100vh - 57px);
    overflow-y: scroll;
}

.form-section {
    background-color: #f0fdf4;
    padding: 6rem 1rem;
}

.form-wrapper {
    background-color: #fff;
    padding: 2rem 1.5rem;
    margin: 1rem auto;
    max-width: 42rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    border: 1px solid #ddd;
}

.form-title {
    font-size: 1.875rem;
    text-align: center;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.add-job {
    display: flex;
    justify-content: center;
}

.form-subtitle {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-label {
    display: block;
    font-weight: bold;
    color: #4a5568;
    margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
}

.form-submit {
    background-color: #5f9ea0;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    width: 8rem;
    cursor: pointer;
    font-size: 17px;
    transition: background-color 0.3s;
}

.form-submit:hover {
    background-color: #16a34a;
}
</style>