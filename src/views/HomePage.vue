<template>
  <Loader v-if="jobStore.apiStatus" />
  <div v-if="!jobStore.apiStatus">
    <div class="home-container">
      <div v-if="searchResult.length >= 0" class="home-card-container">
        <Card v-for="(item, index) in (searchResult.reverse().slice(0, 4))" :key="index"
          :item="item" :index="index" />
        <NoJobs v-if="searchResult.length == 0" />
      </div>
    </div>
    <div class="home-button-container">
      <IonButton expand="block" color="dark" class="all-job-see-btn" router-link="/job-list">See All jobs</IonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { ref, computed } from 'vue';
import Card from '@/components/Card.vue';
import { useJobs } from '@/store/jobList.js';
import NoJobs from '@/components/NoJobs.vue';
import Loader from '@/components/Loader.vue';

const searchInput = ref('');
const jobStore = useJobs();
const jobList = jobStore.getJobList();

const searchResult = computed(() => {
  return jobList?.value?.filter((item) => {
    return item.title.toLowerCase().includes(searchInput.value.toLowerCase())
  }) || [];
})

</script>

<style scoped>
.home-container {
  overflow: auto;
  height: calc(100vh - 126px);
  padding-bottom: 10rem;
  padding-top: 10px;
}

.home-card-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 0px 10px;
  gap: 1rem;
}

.card-text-details {
  flex: 1;
}

.home-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
}

.all-job-see-btn {
  width: 30%;
}

@media screen and (max-width: 600px) {
  .all-job-see-btn {
    width: 80%;
  }
}
</style>