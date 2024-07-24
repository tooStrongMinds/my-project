<script setup>
import ShowCard from '../components/ShowCard.vue'
</script>

<template>
  <header class="mt-20">
    <div class="trending">
    <h1 class="text-style">Trending</h1>
    <div>
      <ShowCard />
    </div>
    </div>
    <div class="recommended">
    <h1 class="text-style">Recommended for you</h1>
    <div>
      <ShowCard />
    </div>
    </div>
  </header>
</template>
