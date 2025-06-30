import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue';
export const useJobs = defineStore('jobs', ()=>{
    const jobList = ref([]);
    const apiStatus = ref(true);
    onMounted(async () => {
        try {
            const response = await fetch('http://localhost:8000/jobs');
            jobList.value = await response.json();
            setTimeout(() => {
             apiStatus.value = false   
            },2000)
        } catch (error) {
            console.log(error);
        }
    })
    const getJobList  = () => {
        return jobList;
    }
    return {
        jobList,
        apiStatus,
        getJobList
    }
})