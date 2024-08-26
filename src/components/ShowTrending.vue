<template>
  <div>
    <div v-if="show && isTrending" class="relative m-1 w-60 lg:w-max lg:m-0">
      <div
        class="relative mb-5"
        @mouseover="store.showOverlay = show.id"
        @mouseleave="store.showOverlay = null"
      >
        <img
          v-if="show.backdrop_path || show.poster_path"
          :src="'https://image.tmdb.org/t/p/w500' + show.backdrop_path"
          alt="Movie Poster"
          class="max-w-full w-11/12 h-auto rounded-xl"
        />
        <router-link :to="getRouteLink(show)">
          <div
            v-if="store.showOverlay === show.id"
            class="absolute inset-0 flex items-center z-50 w-fit m-auto"
          >
            <p
              class="text-white flex gap-2 items-center bg-white bg-opacity-30 p-2 rounded-full cursor-pointer lg:text-2xl lg:gap-4"
            >
              <i class="fa-solid fa-circle-play text-xl lg:text-2xl"></i>
              <span>Play</span>
            </p>
          </div>
        </router-link>

        <div
          class="absolute inset-0 bg-black bg-opacity-35 flex items-end justify-center rounded-xl w-11/12"
        >
          <div class="w-11/12 px-2">
            <div class="flex gap-1">
              <p class="font-light text-sm">
                {{ show.release_date || show.first_air_date }}
              </p>
              &#xb7;
              <p class="font-light uppercase text-sm">{{ show.media_type }}</p>
            </div>
            <h2 class="font-bold text-lg lg:text-2xl">
              {{ show.original_title || show.original_name }}
            </h2>
          </div>
          <div
            class="self-start mx-3 my-2 cursor-pointer relative"
            @click="toggleLibrary"
          >
            <div class="bg-darkBlue w-8 h-8 rounded-full opacity-70"></div>
            <i
              :class="{
                'fa-regular fa-bookmark': !store.isBookmarked(show),
                'fa-solid fa-bookmark': store.isBookmarked(show),
              }"
              class="absolute inset-0 flex items-center justify-center hover:text-black hover:bg-white hover:opacity-100 rounded-full transition duration-300"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShowStore } from "@/stores/myStore";
import { computed, defineProps, onMounted } from "vue";

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
const store = useShowStore();

function toggleLibrary() {
  store.toggleBookmarked(props.show);
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
