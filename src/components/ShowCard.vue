<template>
    <div>
      <div v-if="show && !isTrending" class="relative">
        <div class="relative mb-5" @mouseover="store.showOverlay = show.id" @mouseleave="store.showOverlay = null">
          <span>
            <div class="relative">
              <img
                v-if="show.backdrop_path || show.poster_path"
                :src="'https://image.tmdb.org/t/p/w500' + show.backdrop_path"
                alt="Movie Poster"
                class="max-w-full w-11/12 h-auto rounded-xl"
              />
              <router-link :to="getRouteLink(show)">
                <div v-if="store.showOverlay === show.id" class="absolute inset-0 flex items-center justify-center z-50 w-fit m-auto bg-black bg-opacity-50 h-fit rounded-full">
                <p class="text-white flex gap-2 items-center bg-white bg-opacity-50 p-2 rounded-full cursor-pointer lg:text-xl lg:gap-3">
                        <i class="fa-solid fa-circle-play text-xl"></i>
                        <span>Play</span>
                    </p>
                           </div>
              </router-link>
            </div>
            <div class="absolute inset-0 flex items-start justify-end mx-10 my-2 "  >
              <div class="relative cursor-pointer" @click="toggleLibrary" >
                <div class="bg-darkBlue opacity-70 w-10 h-10 rounded-full "></div>
                <i :class="{
                  'fa-regular fa-bookmark' : !store.isBookmarked(show),
                  'fa-solid fa-bookmark' : store.isBookmarked(show)
                }"
                
                class=" absolute inset-0 flex items-center justify-center hover:bg-white hover:text-black rounded-full transition duration-300"></i>
              </div>
            </div>
          </span>
            <div class="rounded w-11/12 p-2">
              <span class="flex gap-1">
                <p class="font-light text-sm">{{ show.release_date || show.first_air_date }}</p> &#xb7;
                <p class="font-light uppercase text-sm">{{ show.media_type }}</p>
              </span>
              <h2 class="font-bold text-lg">{{ show.original_title || show.original_name }}</h2>
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

function toggleLibrary() {
  store.toggleBookmarked(props.show)
}

function getRouteLink(show) {
  // Check if it's a movie or a TV show and return the appropriate route
  if (show.media_type === 'movie' || show.title) {
    return { name: 'MoviePlayer', params: { id: show.id } };
  } else if (show.media_type === 'tv' || show.original_name) {
    return { name: 'TvPlayer', params: { id: show.id } };
  }
}
</script>
