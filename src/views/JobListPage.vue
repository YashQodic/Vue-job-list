<template>
    <IonSearchbar v-model="searchInput" placeholder="Search by title"></IonSearchbar>
    <div class="home-card-container">
        <div v-if="searchResult.length >= 0" class="home-sub-card-container">
          <Card v-for="(item, index) in searchResult" :key="index" :item="item"
              :index="index" />
        </div>
        <NoJobs v-if="searchResult.length == 0" />
    </div>
</template>

<script setup lang="ts">
import {IonSearchbar} from '@ionic/vue';
import { useJobs } from '@/store/jobList.js';
import Card from '@/components/Card.vue';
import { ref, computed } from 'vue';
import NoJobs from '@/components/NoJobs.vue';



const jobStore = useJobs();
const searchInput = ref('');
const jobList = jobStore.getJobList();


const searchResult = computed(()=>{
  return jobList?.value?.filter((item)=>{
    return item.title.toLowerCase().includes(searchInput.value.toLowerCase())
  }) || [];
})
</script>

<style scoped>
.home-card-container {
    overflow: auto;
    height: calc(100vh - 114px);
}

.home-sub-card-container{
   display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 10px;
    gap: 1rem;
}
</style>