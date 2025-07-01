<template>
  <div class="home-spinner">
    <IonSpinner name="circular"></IonSpinner>
  </div>
</template>

<script setup>
import { IonSpinner } from '@ionic/vue';

</script>

<style scoped>
.home-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>