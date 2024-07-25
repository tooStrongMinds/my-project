<template>
    <div class="movies mt-20">
      <h1 class="text-style">TV Series</h1>
  
      <div>
        <ShowCard v-for="show in store.shows" :key="show.id" :show="show" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useShowStore } from '@/stores/myStore';
  import { onMounted } from 'vue';
  import ShowCard from '@/components/ShowCard.vue';
  
  const store = useShowStore()
  
  onMounted(() => {
    store.getSeries()
  })
  </script>