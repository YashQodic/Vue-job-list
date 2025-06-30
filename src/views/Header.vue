<template>
    <ion-header class="header-container">
        <ion-toolbar class="header-toolbar-container">
            <IonImg :src="logo" class="header-logo"></IonImg>
        </ion-toolbar>
        <div class="header-list-container">
            <RouterLink to="/" class="home-link-container text-style">
                <p :class="['header-link-text', { active: route.currentRoute.value.name == 'Home' }]">Home</p>
            </RouterLink>
            <RouterLink to="/job-list" class="job-list-link-container text-style">
                <p :class="['header-link-text', { active: route.currentRoute.value.name == 'Job list' }]">Jobs</p>
            </RouterLink>
            <RouterLink to="/create-job" class="create-job-link-container text-style">
                <p :class="['header-link-text', { active: route.currentRoute.value.name == 'Create job' }]">Create Job</p>
            </RouterLink>
        </div>
    </ion-header>
</template>

<script setup>
import { IonImg }  from '@ionic/vue';
import logo from '../assets/logo.svg'
import { useRouter , RouterLink } from 'vue-router';

const route = useRouter()
console.log(route.currentRoute.value.name);

</script>

<style scoped>
.header-logo{
    width: 40px;
    height: 40px;
}

.header-container{
    display: flex;
    background-color: cadetblue;
}

.header-toolbar-container{
    --background: cadetblue;
    --color:white;
    padding-left: 20px;
}

.header-list-container {
    display: flex;
    gap: 1rem;
    padding-right: 20px;
}

.text-style {
    text-decoration: none;
}

.job-list-link-container{
    width: 4rem;
    min-width: 4rem;
}

.create-job-link-container{
    width: 5rem;
    min-width: 5rem;
}

.header-link-text{
    text-align: center;
    color:white;
}

.header-link-text:hover{
    cursor: pointer;
    color: black;
    text-shadow: 0px 0px 3px #474242;
}

.active{
    color: black;
}

</style>