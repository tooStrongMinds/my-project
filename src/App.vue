<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import logo from '@/assets/Movie-Logo.png'
import displayPic from '@/assets/display.jpg'
</script>

<template>
  <main>
    <header class="bg-semiDarkBlue flex" id="app-head">
      <div class="flex items-center justify-between p-5 w-11/12 m-auto" id="head">
        <img :src="logo" alt="App Logo" class="max-w-full w-8">
        <NavBar />
        <img :src="displayPic" alt="User Display picture" class="w-8 rounded-full border border-white">
      </div>
    </header>

    <div class="w-11/12 m-auto mt-6 lg:ml-28">
      <RouterView />
    </div>
  </main>
</template>

 <style scoped>
 @media screen and (min-width: 768px) and (max-width: 1023px) {
  #app-head {
    border-radius: 10px;
    margin: 20px auto;
    width: 95%;
  }
 }
 @media screen and (min-width: 1024px) {
    main {
      display: flex;
    }
    #app-head {
      position: fixed;

      border-radius: 10px;
      height: 95%;
      margin: 20px;
    }
    #head {
      margin-block: 10px;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
 </style>
