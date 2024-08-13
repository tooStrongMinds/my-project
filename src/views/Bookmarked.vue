<template>
  
</template>

<script>
export default {

}
</script>

<style>

</style>

<!-- <template>

    <span class="flex items-center gap-4 mb-5 w-11/12 lg:mt-3">
      <i class="fa-solid fa-magnifying-glass text-xl"></i>
      <input
        type="search"
        placeholder="Search Bookmarked"
        v-model="store.searchSeriesQuery"
        @input="store.fetchSearchSeriesResults"
        class="bg-transparent outline-none p-3 font-customFont w-full text-lg focus:border-b focus:border-b-white"
      />
    </span>
  <section>
    <h1 class="text-style mb-3">Bookmarked Movies</h1>
    <div v-if="store.bookmarks.length === 0">No bookmarks yet.</div>
  
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        <ShowCard v-for="show in store.bookmarks.filter(show => show !== null && show.media_type === 'movie')" :key="show.id" :show="show" />
        </div>
  </section>
  <section>
    <h1 class="text-style mb-3">Bookmarked TV Series</h1>
  
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        <ShowCard v-for="show in store.bookmarks" :key="show.id" :show="show" />
    </div>
    
  </section>
</template>

<script setup>
import { useShowStore } from '@/stores/myStore';
import { onMounted } from 'vue';
import ShowCard from '@/components/ShowCard.vue';
import axios from 'axios'

const store = useShowStore()



// onMounted(() => {
//     store.get
// })
</script> -->
