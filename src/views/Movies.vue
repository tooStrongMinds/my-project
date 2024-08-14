<template>
  <span class="flex items-center gap-4 mb-5 w-11/12 lg:mt-3">
      <i class="fa-solid fa-magnifying-glass text-xl"></i>
      <input
        type="search"
        placeholder="Search by movies"
        v-model="store.searchMovieQuery"
        @input="store.fetchSearchMovieResults"
        class="bg-transparent outline-none p-3 font-customFont w-full text-lg focus:border-b focus:border-b-white"
      />
    </span>
  <div class="mb-4" v-if="!store.searchMovieQuery">
    <h1 class="text-style mb-3">Movies</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
      <ShowCard v-for="show in store.shows" :key="show.id" :show="show" />
    </div>
    <button v-if="!store.searchMovieQuery && !isAllMoviesLoaded" @click="loadMore" class="bg-redHover p-2 rounded-lg active:bg-greyishBlue transition duration-300">Load More</button>
  </div>
  <div v-else>
    <h1 class="text-style mb-3">Search results for "{{ store.searchMovieQuery }}"</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
      <ShowCard v-for="show in store.searchedShows" :key="show.id" :show="show"/>
    </div>
  </div>
</template>

<script setup>
import { useShowStore } from '@/stores/myStore';
import { ref, onMounted } from 'vue';
import axios from 'axios'
import ShowCard from '@/components/ShowCard.vue';

const store = useShowStore()

onMounted(() => {
  store.getMovies()
  store.fetchSearchMovieResults()
})

const searchQuery = ref('')

const isAllMoviesLoaded = ref(false);
const currentPage = ref(2)
const totalPages = ref(2)

const loadMore = async () => {
  if (currentPage.value > totalPages.value) {
    isAllMoviesLoaded.value = true;
    return;
  }
  try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=b5549b7208a29cf5e4d8e62819aa403e&page=${currentPage.value}`
        );
        store.shows.push(...response.data.results);
        totalPages.value = response.data.total_pages;
        currentPage.value++;
        console.log('movie',store.shows)
      } catch (error) {
        console.log("Error fetching movies", error.message);
      }
}
</script>
