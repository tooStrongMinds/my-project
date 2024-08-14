<template>
    <span class="flex items-center gap-4 mb-5 w-11/12 lg:mt-3">
      <i class="fa-solid fa-magnifying-glass text-xl"></i>
      <input
        type="search"
        placeholder="Search Bookmarked"
        v-model="store.searchMovieQuery"
        @input="store.fetchSearchMovieResults"
        class="bg-transparent outline-none p-3 font-customFont w-full text-lg focus:border-b focus:border-b-white"
      />
    </span>
  <section>
    <h1 class="text-style mb-3">Bookmarked Movies</h1>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4">
      <ShowCard v-for="show in store.bookmarks" :key="show.id" :show="show"/>
    </div>
  </section>
  <!-- <section>
    <h1 class="text-style mb-3">Bookmarked Series</h1>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4">
      <ShowCard v-for="show in store.bookmarkedSeries" :key="show.id" :show="show"/>
    </div>
  </section> -->
</template>

<script setup>
import ShowCard from '@/components/ShowCard.vue';
import { useShowStore } from '@/stores/myStore';


const store = useShowStore()
</script>

<style>

</style>

