<template>
    <div class="cookieCard" :key="props.index">
        <div class="card-text-details">
            <p class="cookieHeading">{{ props.item.title }}</p>
            <p class="cookieDescription">{{ props.item.description }}</p>
            <p class="cookieDescription">
              <IonIcon :icon="locationSharp" color="white"></IonIcon> {{ props.item.location }}
            </p>
            <p class="cookieDescription">{{ props.item.salary }}</p>
        </div>
        <RouterLink class="acceptButton" :to="`/job/${props.item.id}`">Read More</RouterLink>
    </div>
</template>

<script setup>
import { IonIcon } from  '@ionic/vue';
import { locationSharp } from 'ionicons/icons';
import {defineProps} from 'vue'
import { RouterLink } from 'vue-router';

const props = defineProps({
    item: Object,
    index: Number
})
</script>

<style scoped>

.cookieCard {
  width: 320px;
  height: auto;
  background: linear-gradient(to right, rgb(0 0 0), rgb(73 73 73));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 56%);
}
.cookieCard:hover {
  box-shadow: inset 0px 1px 20px 1px rgb(26 255 219);
}
.cookieCard::before {
  width: 150px;
  height: 150px;
  content: "";
  background: linear-gradient(to right, rgb(85 85 85), rgb(0 0 0));
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  right: -25%;
  top: -25%;
}

.cookieHeading {
  font-size: 1.5em;
  font-weight: 600;
  color: rgb(241, 241, 241);
  z-index: 2;
}

.cookieDescription {
  font-size: 0.9em;
  color: rgb(241, 241, 241);
  z-index: 2;
}

.cookieDescription a {
  color: rgb(241, 241, 241);
}

.card-text-details {
  flex: 1;
}

.acceptButton {
  padding: 11px 20px;
  background-color: #5f9ea0;
  transition-duration: .2s;
  border: none;
  color: black;
  cursor: pointer;
  font-weight: 600;
  z-index: 2;
  border-radius: 6px;
  text-decoration: none;
}

.acceptButton:hover {
  background-color: #494949;
  transition-duration: .2s;
  color: wheat;
}

@media screen and (max-width: 600px) {
  .cookieCard {
    width: 100%;
  }
}
</style>