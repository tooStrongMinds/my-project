import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Movie from '../views/Movies.vue'
import TvSeries from '../views/TvSeries.vue'
import Bookmarked from '../views/Bookmarked.vue'
import Videos from '../views/Videos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movie
    },
    {
      path: '/tv-series',
      name: 'tv-series',
      component: TvSeries
    },
    {
      path: '/bookmarked',
      name: 'bookmarked',
      component: Bookmarked
    },
    {
      path: '/videos/:id',
      name: 'videos',
      component: Videos
    },
  ]
})

export default router
