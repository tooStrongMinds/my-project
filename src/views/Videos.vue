<template>
  <div v-if="video && showDetails" class="mt-6 mb-3">
    <div class="lg:flex lg:gap-5">
      <div class="lg:w-full">
        <div class="lg:flex lg:flex-col-reverse">
          <iframe
            v-if="video.site === 'YouTube'"
            :src="`https://www.youtube.com/embed/${video.key}`"
            frameborder="0"
            allowfullscreen
            class="w-full h-96 m-auto"
          ></iframe>
          <h1 class="text-style mb-3 lg:!text-3xl lg:text-center mt-2">
            {{ showDetails.original_title || showDetails.original_name }} |
            {{ video.name }}
          </h1>
        </div>
        <div class="cursor-pointer mt-5">
          <div class="flex justify-around items-center">
            <div
              class="flex flex-col items-center text-center"
              @click="toggleLibrary(showDetails)"
            >
              <i
                :class="{
                  'fa-solid fa-heart-circle-plus':
                    !store.isBookmarked(showDetails),
                  'fa-solid fa-heart-circle-minus text-redHover':
                    store.isBookmarked(showDetails),
                }"
                class="text-2xl"
              ></i>
              <p class="text-sm text-gray-400 font-light">Save to Watchlist</p>
            </div>
            <div class="flex flex-col items-center">
              <i class="fa-solid fa-share text-2xl"></i>
              <p class="text-sm text-gray-400 font-light">Share</p>
            </div>
            <div class="flex flex-col items-center">
              <i class="fa-solid fa-download text-2xl"></i>
              <p class="text-sm text-gray-400 font-light">Download</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-0.5 max-h-full h-auto bg-gray-400"></div>
      <div
        class="mt-4 lg:w-10/12 lg:mt-0 lg:self-center lg:flex lg:flex-col lg:gap-3"
      >
        <div class="flex gap-3 items-center">
          <span v-if="video.size === 1080" class="bg-semiDarkBlue p-1 rounded-lg"
            >HD</span
          >
          <span class="bg-semiDarkBlue p-1 rounded-lg">{{
            getYear(showDetails.release_date || showDetails.first_air_date)
          }}</span>
        </div>
        <p class="text-xl font-extralight text-gray-400">
          {{ showDetails.overview }}
        </p>
        <div class="mt-2 md:flex md:gap-2">
          <!-- Genre -->
          <p class="font-light">
            <span class="md:mr-2 mr-1">Genre:</span>
            {{ showDetails.genres.map((genre) => genre.name).join(", ") }}
          </p>
          <!-- Divider for larger screens -->
          <!-- TV show details (Seasons, Episodes, Status) -->
          <div class="md:flex md:gap-3 font-light" v-if="mediaType === 'tv'">
            <span class="hidden md:inline">|</span>
            <span class="flex gap-2">
              <!-- Seasons -->
              <p>
                <span class="mr-1">Seasons:</span
                >{{ showDetails.number_of_seasons }}
              </p>
              <!-- Divider for smaller screens -->
              <span class="inline md:hidden">|</span>
              <!-- Episodes -->
              <p>
                <span class="mr-1">Episodes:</span
                >{{ showDetails.number_of_episodes }}
              </p>
            </span>
            <!-- Divider for larger screens -->
            <span class="hidden md:inline">|</span>
            <!-- Status -->
            <div v-if="showDetails.in_production === false">
              <p>Status: Completed</p>
            </div>
            <div v-else>
              <p>Status: Ongoing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div >
      <Similar :id="showDetails.id" :mediaType="mediaType" />
    </div>
  </div>
  <div v-else class="mt-7">
    <p class="text-style mb-3">Loading video...</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useShowStore } from "@/stores/myStore";
import axios from "axios";
import Similar from "@/components/Similar.vue";


const route = useRoute();
const mediaType =
  route.meta.mediaType || route.params.mediaType || route.name === "MoviePlayer"
    ? "movie"
    : "tv";
const store = useShowStore();
const video = ref(null);
const showDetails = ref(null);

async function fetchData() {
  const id = route.params.id;

  // Fetch the show details directly
  try {
    const showDetailsResponse = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=b5549b7208a29cf5e4d8e62819aa403e`
    );
    showDetails.value = showDetailsResponse.data;
    console.log(showDetails);
  } catch (error) {
    console.error("Error fetching show details:", error);
  }

  // Fetch the videos for the show directly
  try {
    const videosResponse = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=b5549b7208a29cf5e4d8e62819aa403e`
    );
    video.value =
      videosResponse.data.results.find((v) => v.name === "Official Trailer") ||
      videosResponse.data.results[0];
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};
onMounted(() => {
  fetchData()
})
watch(route, () => {
  fetchData();
});

function toggleLibrary(showDetails) {
  store.toggleBookmarked(showDetails);
}
function getYear(dateString) {
  if (!dateString) return ""; // Handle cases where the date is undefined or null
  return dateString.split("-")[0]; // Split the date by '-' and return the first part (year)
}
</script>
