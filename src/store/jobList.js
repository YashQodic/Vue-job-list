import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue';
export const useJobs = defineStore('jobs', () => {
    const jobList = ref([]);
    const apiStatus = ref(true);
    const getAllJobList = async () => {
        try {
            const response = await fetch('http://localhost:8000/jobs');
            jobList.value = await response.json();
            setTimeout(() => {
                apiStatus.value = false
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    }
    onMounted(async () => {
        await getAllJobList();
    })
    const getJobList = () => {
        return jobList;
    }
    return {
        jobList,
        apiStatus,
        getJobList,
        getAllJobList
    }
})