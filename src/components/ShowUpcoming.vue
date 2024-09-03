<template>
  <div class="relative w-full max-w-4xl mx-auto overflow-hidden">
    <!-- Carousel Items -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="show in store.shows"
        :key="show.id"
        class="relative w-full flex-shrink-0"
        @mouseover="store.showOverlay = show.id"
        @mouseleave="store.showOverlay = null"
      >
        <img
          v-if="show.backdrop_path || show.poster_path"
          :src="'https://image.tmdb.org/t/p/w500' + show.backdrop_path"
          alt="Movie Poster"
          class="max-w-full w-full h-auto rounded-xl"
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
          class="absolute inset-0 bg-black bg-opacity-35 flex items-end justify-center rounded-xl"
        >
          <div class="w-11/12 pb-5">
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
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="hidden lg:block">
      <button
        class="absolute top-1/2 left-0 transform -translate-y-1/2 text-3xl text-white p-2 rounded-full hover:bg-greyishBlue transition duration-100 ease-linear"
        @click="prevSlide"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <button
        class="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl text-white p-2 rounded-full hover:bg-greyishBlue transition duration-100 ease-linear"
        @click="nextSlide"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Indicators -->
    <div
      class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <span
        v-for="(show, index) in store.shows"
        :key="show.id"
        class="block w-3 h-3 bg-white rounded-full cursor-pointer"
        :class="{
          'bg-opacity-100': currentSlide === index,
          'bg-opacity-50': currentSlide !== index,
        }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { useShowStore } from "@/stores/myStore";
import { defineProps, onBeforeMount, onMounted, ref } from "vue";

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

function toggleLibrary(show) {
  // Validate the show object before proceeding
  if (!show || !show.id) {
    console.error('Invalid show object:', show);
    return;
  }
  store.toggleBookmarked(show);
}

function getRouteLink(show) {
  // Check if it's a movie or a TV show and return the appropriate route
  if (show.media_type === "movie" || show.title) {
    return { name: "MoviePlayer", params: { id: show.id } };
  } else if (show.media_type === "tv" || show.original_name) {
    return { name: "TvPlayer", params: { id: show.id } };
  }
}
const currentSlide = ref(0);

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % store.shows.length;
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + store.shows.length) % store.shows.length;
}

function goToSlide(index) {
  currentSlide.value = index;
}

onMounted(() => {
  const slideInterval = setInterval(() => {
    nextSlide();
  }, 7000);
  onBeforeMount(() => {
    clearInterval(slideInterval);
  });
});
</script>
