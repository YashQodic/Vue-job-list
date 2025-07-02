  <template>
    <ion-app>
      <!-- Sidebar -->
      <ion-menu content-id="main-content">
        <ion-header>
          <ion-toolbar color="dark">
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item @click="handleNavigation('/')" class="sidebar-text">
              <ion-icon slot="start" :icon="homeOutline"></ion-icon>
              Home
            </ion-item>

            <ion-item @click="handleNavigation('/job-list')" class="sidebar-text">
              <ion-icon slot="start" :icon="briefcaseOutline"></ion-icon>
              Jobs
            </ion-item>

            <ion-item @click="handleNavigation('/create-job')" class="sidebar-text">
              <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>
              Create Job
            </ion-item>
          </ion-list>

        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-app>
  </template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { menuController } from '@ionic/vue';
import { homeOutline, briefcaseOutline, addCircleOutline } from 'ionicons/icons'
const router = useRouter();
const handleNavigation = (path: string) => {
  router.push(path);
  menuController.close();
}
// nothing needed here
</script>

<style scoped>
/* optional: style tweaks */
.sidebar-text {
  cursor: pointer;
}

.sidebar-text {
  --border-style: none;
  gap: 10px;
}
</style>
