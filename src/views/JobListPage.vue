<template>
    <IonSearchbar v-model="searchInput" placeholder="Search by title"></IonSearchbar>
    <div class="home-card-container">
        <div v-if="paginatedJobs.length >= 0" class="home-sub-card-container">
          <Card v-for="(item, index) in paginatedJobs" :key="index" :item="item"
              :index="index" />
        </div>
        <NoJobs v-else />
        <paginate
          v-if="totalPages > 1"
          :page-count="totalPages"
          :click-handler="handlePageClick"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
        />
    </div>
</template>

<script setup lang="ts">
import {IonSearchbar} from '@ionic/vue';
import { useJobs } from '@/store/jobList.js';
import Card from '@/components/Card.vue';
import { ref, computed } from 'vue';
import NoJobs from '@/components/NoJobs.vue';
import Paginate from "vuejs-paginate-next";

const jobStore = useJobs();
const searchInput = ref('');
const jobList = jobStore.getJobList();
let currentPage = ref(1);
let perPage = ref(8);

const searchResult = computed(()=>{
  return jobList?.value?.filter((item)=>{
    return item.title.toLowerCase().includes(searchInput.value.toLowerCase())
  }) || [];
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return searchResult.value.slice(start, end);
})

const totalPages=computed(() =>{
  return Math.ceil(searchResult.value.length / perPage.value);
})

const handlePageClick = (page) => {
      currentPage.value = page;
}
</script>

<style scoped>
::v-deep .pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
  flex-wrap: wrap;
  list-style: none;
}

::v-deep .pagination .page-item.active a{
  background: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
  color: white;
  font-weight: 600;
  border: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
}

::v-deep .pagination .page-item .page-link {
  display: block;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  background: white;
  transition: all 0.2s ease-in-out;
}

::v-deep .pagination .page-item .page-link:hover {
  background: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
  color: white;
  border: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
}

::v-deep .pagination .page-item.selected .page-link {
  background: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
  color: white;
  font-weight: 600;
  border: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
}

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