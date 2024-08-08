<template>
  <div>
    <h1 class="text-style mb-3">Movies</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
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
  store.getMovies()
})
</script>
<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
