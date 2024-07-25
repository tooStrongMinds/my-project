<template>
    <div>
      <div>
        <img
          v-if="show.poster_path"
          :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
          alt="Movie Poster"
        />
        <h2>{{ show.title || show.name }}</h2>
  
        <p>{{ show.release_date || show.first_air_date }}</p>
        <p>{{ show.media_type }}</p>
      </div>
    </div>
  </template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
});

</script>

<style>

</style>