<template>
  <div class="filter-container">
    <IonSearchbar class="search-bar" v-model="searchInput" placeholder="Search by title"></IonSearchbar>
    <div class="filter-one">
      <div class="filter-one-title">
        Job Type:
      </div>
      <div class="type-container" @click="updateFilterStatus('filterOne')">
        <p class="type-text">All</p>
        <IonIcon :icon="arrowDownCircleOutline"></IonIcon>
      </div>
      <ul class="type-list" :style="`display:${filterStatus.filterOne}`">
        <li value="All">All</li>
        <li value="Full-Time">Full-Time</li>
        <li value="Part-Time">Part-Time</li>
        <li value="Remote">Remote</li>
        <li value="Internship">Internship</li>
      </ul>
    </div>
    <div class="filter-one">
      <div class="filter-two-title">
        Salary:
      </div>
      <div class="type-container" @click="updateFilterStatus('filterTwo')">
        <p class="type-text">All</p>
        <IonIcon :icon="arrowDownCircleOutline"></IonIcon>
      </div>
      <ul class="type-list" :style="`display:${filterStatus.filterTwo}`">
        <li value="All">All</li>
        <li value="Under $50K">under $50K</li>
        <li value="$50K - $60K">$50 - $60K</li>
        <li value="$60K - $70K">$60 - $70K</li>
        <li value="$70K - $80K">$70 - $80K</li>
        <li value="$80K - $90K">$80 - $90K</li>
        <li value="$90K - $100K">$90 - $100K</li>
        <li value="$100K - $125K">$100 - $125K</li>
        <li value="$125K - $150K">$125 - $150K</li>
        <li value="$150K - $175K">$150 - $175K</li>
        <li value="$175K - $200K">$175 - $200K</li>
        <li value="Over $200K">Over $200K</li>
      </ul>
    </div>
  </div>
  <div class="home-card-container">
    <div v-if="paginatedJobs.length >= 0" class="home-sub-card-container">
      <Card v-for="(item, index) in paginatedJobs" :key="index" :item="item" :index="index" />
    </div>
    <NoJobs v-else />
    <paginate v-if="totalPages > 1" :page-count="totalPages" :click-handler="handlePageClick" :prev-text="'Prev'"
      :next-text="'Next'" :container-class="'pagination'" />
  </div>
</template>

<script setup lang="ts">
import { IonSearchbar, IonIcon } from '@ionic/vue';
import { useJobs } from '@/store/jobList.js';
import Card from '@/components/Card.vue';
import { ref, computed, reactive } from 'vue';
import NoJobs from '@/components/NoJobs.vue';
import Paginate from "vuejs-paginate-next";
import { arrowDownCircleOutline } from 'ionicons/icons'

const jobStore = useJobs();
const searchInput = ref('');
const jobList = jobStore.getJobList();
let currentPage = ref(1);
let perPage = ref(8);
let filterStatus = reactive({
  filterOne: "none",
  filterTwo: "none"
})

const updateFilterStatus = (toggleFiled: string) => {
  filterStatus[toggleFiled] = filterStatus[toggleFiled] === 'none' ? 'block' : 'none';
}
const searchResult = computed(() => {
  return jobList?.value?.filter((item: any) => {
    return item.title.toLowerCase().includes(searchInput.value.toLowerCase())
  }) || [];
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return searchResult.value.slice(start, end);
})

const totalPages = computed(() => {
  return Math.ceil(searchResult.value.length / perPage.value);
})

const handlePageClick = (page: number) => {
  currentPage.value = page;
}
</script>

<style scoped>
.filter-one-title{
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.filter-one {
  position: relative;
}

.filter-two-title{
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.search-bar {
  width: 50%;
  margin-top: 18px;
}

.type-list {
  list-style: none;
  background: white;
  padding: 5px 5px;
  box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 33%);
  border-radius: 4px;
  margin-top: 0px;
  width: 133px;
  position: fixed;
  z-index: 3;
  margin-top: 5px;
  margin-left: 10px;
}

.type-list li {
  padding: 5px;
  cursor: pointer;
}

.type-list li:hover {
  background: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
  color: white;
  border-radius: 4px;
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  cursor: pointer;
  padding: 7px 0px;
}

.type-container {
  background: white;
  box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 33%);
  border-radius: 4px;
  width: 133px;
  margin-top: 9px;
  height: 42px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-left: 10px;
}

.type-text {
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 97px;
}

::v-deep .pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
  flex-wrap: wrap;
  list-style: none;
}

::v-deep .pagination .page-item.active a {
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
  height: calc(100vh - 130px);
}

.home-sub-card-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 10px;
  gap: 1rem;
}

@media screen and (max-width: 600px) {
  .search-bar {
    width: 100%;
    margin-top: 0px;
  }
}
</style>