<!-- <template>
  <div v-if="videos">
    <h2>Trailers</h2>
    <div v-for="video in videos" :key="video.id" class="video">
      <iframe
        v-if="video.site === 'YouTube' && video.name === 'Official Trailer'"
        :src="`https://www.youtube.com/embed/${video.key}`"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  <div v-else>
    <p>No videos available.</p>
  </div>
</template>

<script setup>
import { useShowStore } from '@/stores/myStore';
import { onMounted } from 'vue';

const store = useShowStore();

// Assume movieId is passed as a prop or from another part of the app
const movieId = 533535; // Replace with your movie ID
console.log(movieId)
onMounted(() => {
  store.fetchVideos(movieId);
});

const videos = store.videos;
</script>

<style>
.video {
  margin-bottom: 16px;
}
iframe {
  width: 100%;
  height: 315px;
}
</style> -->


<template>
  <div v-if="video">
    <h1>{{ video.name }}</h1>
    <iframe
      v-if="video.site === 'YouTube'"
      :src="`https://www.youtube.com/embed/${video.key}`"
      frameborder="0"
      allowfullscreen class="w-full h-96"
    ></iframe>
  </div>
  <div v-else>
    <p>Loading video...</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useShowStore } from '@/stores/myStore';

const route = useRoute();
const store = useShowStore();
const video = ref(null);

onMounted(async () => {
  const id = route.params.id;
  await store.fetchVideos(id);

  // Assuming you're looking for a trailer or first video
  if (store.videos.length > 0) {
    video.value = store.videos.find(v => v.name === 'Official Trailer') || store.videos[0];
  }
});
</script>
