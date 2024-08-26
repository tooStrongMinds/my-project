<template>
  <div v-if="video && showDetails" class="mt-6 lg:flex ">
    <div class="lg:w-full">
      <div class="lg:flex lg:flex-col-reverse">
        <iframe
          v-if="video.site === 'YouTube'"
          :src="`https://www.youtube.com/embed/${video.key}`"
          frameborder="0"
          allowfullscreen
          class="w-full h-96 m-auto"
        ></iframe>
        <h1 class="text-style mb-3 !text-3xl lg:text-center">
          {{ showDetails.original_title || showDetails.original_name }} |
          {{ video.name }}
        </h1>
      </div>
      <div class="cursor-pointer">
        <div class="flex justify-around items-center">
          <div class="flex flex-col items-center  text-center" @click="toggleLibrary(showDetails)">
            <i :class="{
                      'fa-solid fa-heart-circle-plus text-redHover' : !store.isBookmarked(showDetails),
                      'fa-solid fa-heart-circle-minus' : store.isBookmarked(showDetails)
                    }"
                    class=" text-2xl"
                    ></i>
                    <p class="text-sm text-textHover">Save to Watchlist</p>
          </div>
          <div class="flex flex-col items-center">
            <i class="fa-solid fa-share text-2xl"></i>
            <p class="text-sm text-textHover">Share</p>
          </div>
          <div class="flex flex-col items-center">
            <i class="fa-solid fa-download text-2xl"></i>
            <p class="text-sm text-textHover">Download</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1 max-h-full h-auto bg-white"></div>

    <div class="mt-4 lg:w-10/12 lg:mt-0 lg:px-4">
      <h2 class="text-style !font-medium uppercase">Description</h2>
      <p class="text-xl font-light">{{ showDetails.overview }}</p>
      <p>
        <span>GENRE:</span
        >{{ showDetails.genres.map((genre) => genre.name).join(", ") }}
      </p>

      <span class="flex gap-2">
        <p><span>Seasons:</span>{{ showDetails.number_of_seasons }}</p>
        <p><span>Episodes:</span>{{ showDetails.number_of_episodes }}</p>
      </span>

      <div v-if="showDetails.in_production === false">
        <p>Status: Completed</p>
      </div>
      <div v-else>
        <p>Status: Ongoing</p>
      </div>
      
    </div>
  </div>
  <div v-else class="mt-7">
    <p class="text-style mb-3">Loading video...</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useShowStore } from "@/stores/myStore";
import axios from "axios";

const route = useRoute();
const mediaType =
  route.meta.mediaType || route.params.mediaType || route.name === "MoviePlayer"
    ? "movie"
    : "tv";
const store = useShowStore();
const video = ref(null);
const showDetails = ref(null);

onMounted(async () => {
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
});
function toggleLibrary(showDetails) {
store.toggleBookmarked(showDetails)
}
</script>
