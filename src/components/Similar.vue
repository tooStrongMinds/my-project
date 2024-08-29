<template>
  <div class="lg:mt-12 mt-5">
    <h1 class="lg:text-3xl text-center font-light text-xl">You might also like</h1>
    <div class="flex flex-row overflow-y-auto scrollbar-custom lg:mt-8 mt-3">
      <ShowTrending
        v-for="show in store.shows.slice(0, 10)"
        :key="show.id"
        :show="show"
        :isTrending="true"
        @click="redirectToShow(show)"
      />
    </div>
  </div>
</template>

<script setup>
import { useShowStore } from '@/stores/myStore';
import { onMounted } from 'vue';
import ShowTrending from './ShowTrending.vue';

const store = useShowStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  }
});

onMounted(() => {
  store.getSimilar(props.id, props.mediaType);
});

function redirectToShow(show) {
  const mediaType = show.media_type || 'movie'; // Assuming media_type is available
  const url = mediaType === 'movie'
    ? `/movies/${show.id}`
    : `/tvseries/${show.id}`;
  window.location.href = url; // This will force a full page reload
}
</script>
