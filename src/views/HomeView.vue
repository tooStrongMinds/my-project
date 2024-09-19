<script setup>
import { useShowStore } from "@/stores/myStore";
import { computed, onMounted } from "vue";
import ShowCard from "../components/ShowCard.vue";
import ShowTrending from "@/components/ShowTrending.vue";
import Upcoming from "@/components/Upcoming.vue";

const store = useShowStore();

const searchQuery = computed({
  get() {
    return store.searchMovieQuery || store.searchSeriesQuery
  },
  set(value) {
    store.searchMovieQuery = value;
    store.searchSeriesQuery = value;
  }
})

onMounted(() => {
  store.getTrendingShows();
  store.getRecommendedShows();
  store.fetchSearchMovieResults()
  store.fetchSearchSeriesResults()
});
</script>

<template>
  <span class="flex items-center gap-4 mb-5 w-11/12 lg:mt-6">
      <i class="fa-solid fa-magnifying-glass text-xl"></i>
      <input
        type="search"
        placeholder="Search for Movies and TV Series"
        v-model="searchQuery"
        @input="() => {store.fetchSearchMovieResults(); store.fetchSearchSeriesResults(); }"
        class="bg-transparent outline-none p-3 font-customFont w-full text-lg focus:border-b focus:border-b-white"
      />
    </span>
  <header class="mt-6">
    <div v-if="!searchQuery">
      <div class="mb-3">
        <Upcoming />
      </div>
      <div>
        <h1 class="text-style mb-3">Trending</h1>
        <div class="flex flex-row overflow-y-auto scrollbar-custom">
          <ShowTrending
            v-for="show in store.trendingShows.slice(0, 10)"
            :key="show.id"
            :show="show"
            :isTrending="true"
          />
        </div>
      </div>
      <div class="mt-5">
        <h1 class="text-style mb-3">Recommended for you</h1>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-4">
          <ShowCard
            v-for="show in store.recommendedShows"
            :key="show.id"
            :show="show"
            :isTrending="false"
          />
        </div>
      </div>
    </div>
    <div v-else>
    <h1 class="text-style mb-3">Search results for "{{ searchQuery }}"</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      <ShowCard v-for="show in store.searchedShows" :key="show.id" :show="show"/>
    </div>
  </div>
  </header>
</template>
