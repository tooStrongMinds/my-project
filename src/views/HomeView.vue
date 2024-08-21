<script setup>
import { useShowStore } from '@/stores/myStore';
import { onMounted } from 'vue';
import ShowCard from '../components/ShowCard.vue'
import ShowTrending from '@/components/ShowTrending.vue';

const store = useShowStore()

onMounted(() => {
    store.getTrendingShows()
    store.getRecommendedShows()
})
</script>

<template>
  <header>
    <div class="trending">
    <h1 class="text-style mb-3">Trending</h1>
    <div class="flex flex-row overflow-y-auto scrollbar-custom">
      <ShowTrending 
      v-for="show in store.trendingShows.slice(0, 10)" :key="show.id"
      :show="show"
      :isTrending="true"/>
    </div>
    </div>
    <div class="recommended mt-5">
    <h1 class="text-style mb-3">Recommended for you</h1>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4">
      <ShowCard v-for="show in store.recommendedShows" :key="show.id" :show="show"
      :isTrending="false"/>
    </div>
    </div>
  </header>
</template>
