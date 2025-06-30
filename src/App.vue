<template>
  <Header />
  <RouterView/>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { RouterView } from 'vue-router';
import Header from '@/views/Header.vue';
</script>
