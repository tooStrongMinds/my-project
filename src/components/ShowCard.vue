<template>
    <div>
      <div v-if="show" :class="cardClass" class="relative">
        <div class="relative mb-5">
          <img
            v-if="show.backdrop_path || show.poster_path"
            :src="'https://image.tmdb.org/t/p/w500' + show.backdrop_path"
            alt="Movie Poster"
            class="max-w-full w-11/12 h-auto rounded-xl"
          />
          <div class="absolute inset-0 bg-black bg-opacity-35 flex items-end justify-center rounded-xl w-11/12">
            <div class="w-11/12">
              <h2>{{ show.original_title || show.original_name }}</h2>
              <p>{{ show.release_date || show.first_air_date }}</p>
              <p>{{ show.media_type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { computed, defineProps } from 'vue';

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
const cardClass = computed(() => {
    return props.isTrending ? 'm-1 w-60' : 'w-78'
  })

</script>

<style>

</style>