<script setup>
import { useShowStore } from '@/stores/myStore';
import { onMounted } from 'vue';
import ShowUpcoming from './ShowUpcoming.vue';

const store = useShowStore()
onMounted(() => {
    store.getUpcoming()
})

</script>

<template>
  <div>
    <h1 class="text-style mb-3">Upcoming Movies</h1>
    
    <div class="overflow-y-auto">
        <ShowUpcoming />
    </div>
  </div>
</template>
