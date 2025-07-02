<template>
  <Header />
  <SideBar/>
  <RouterView/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/views/Header.vue';
import SideBar from '@/views/SidebarPage.vue';

</script>
