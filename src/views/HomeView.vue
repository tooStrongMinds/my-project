<script setup>
import { useShowStore } from '@/stores/myStore';
import { onMounted } from 'vue';
import ShowCard from '../components/ShowCard.vue'

const store = useShowStore()

onMounted(() => {
    store.getTrendingShows()
    store.getRecommendedShows()
})
</script>

<template>
  <header class="mt-20">
    <div class="trending">
    <h1 class="text-style">Trending</h1>
    <div>
      <ShowCard 
      v-for="show in store.trendingShows" :key="show.id"
      :show="show"/>
    </div>
    </div>
    <!-- <div class="recommended">
    <h1 class="text-style">Recommended for you</h1>
    <div>
      <ShowCard />
    </div>
    </div> -->
  </header>
</template>
