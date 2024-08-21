<template>
  <iframe
            :src="'https://www.youtube.com/embed/' + show.key"
            frameborder="0"
            allowfullscreen
          ></iframe>
</template>

<script setup>
import { useShowStore } from '@/stores/myStore';
import { onMounted, defineProps } from 'vue';


const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
})
const store = useShowStore()

onMounted(() => {
    store.fetchVideos(props.show)
})
</script>