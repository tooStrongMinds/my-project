<template>
    <div>
      <div v-if="show && isTrending" class="relative m-1 w-60 lg:w-80">
        <div class="relative mb-5">
          <img
            v-if="show.backdrop_path || show.poster_path"
            :src="'https://image.tmdb.org/t/p/w500' + show.backdrop_path"
            alt="Movie Poster"
            class="max-w-full w-11/12 h-auto rounded-xl"
          />
          <div class="absolute inset-0 bg-black bg-opacity-35 flex items-end justify-center rounded-xl w-11/12">
            <div class="w-11/12 p-2">
              <div class="flex gap-1">
                <p class="font-light text-sm">{{ show.release_date || show.first_air_date }}</p> &#xb7;
                <p class="font-light uppercase text-sm">{{ show.media_type }}</p>
              </div>
              <h2 class="font-bold text-lg">{{ show.original_title || show.original_name }}</h2>
            </div>
            <div class="self-start mx-3 my-2  cursor-pointer relative " >
              <div class="bg-darkBlue w-8 h-8 rounded-full opacity-70  "></div>
              <i class="fa-regular fa-bookmark absolute inset-0 flex items-center justify-center hover:text-black hover:bg-white hover:opacity-100 rounded-full transition duration-300"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-if="show && !isTrending" class="relative">
        <div class="relative mb-5">
          <span>
            <img
              v-if="show.backdrop_path || show.poster_path"
              :src="'https://image.tmdb.org/t/p/w500' + show.backdrop_path"
              alt="Movie Poster"
              class="max-w-full w-11/12 h-auto rounded-xl"
            />
            <div class="absolute inset-0 flex items-start justify-end mx-20 my-2 cursor-pointer lg:mx-10" >
              <div class="relative">
                <div class="bg-darkBlue opacity-70 w-10 h-10 rounded-full "></div>
                <i 
                
                class="fa-regular fa-bookmark absolute inset-0 flex items-center justify-center hover:bg-white hover:text-black rounded-full transition duration-300"></i>
              </div>
            </div>
          </span>
          <div class="rounded-xl w-11/12">
            <div class="w-11/12 p-2">
              <h2 class="font-bold text-lg">{{ show.original_title || show.original_name }}</h2>
              <p class="font-light">{{ show.release_date || show.first_air_date }}</p>
              <p class="font-light">{{ show.media_type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { useShowStore } from '@/stores/myStore';
import { computed, defineProps, onMounted } from 'vue';

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
});
const store = useShowStore()

// onMounted(() => {
//   store.isBookmarked()
// })

</script>

<style>

</style>