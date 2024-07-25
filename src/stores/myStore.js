import { defineStore } from "pinia";
import axios from "axios";

export const useShowStore = defineStore("show", {
  state: () => ({
    shows: [],
    // show: {},
    trendingShows: [],
    recommendedShows: [],
  }),
  actions: {
    async getMovies() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b5549b7208a29cf5e4d8e62819aa403e`)
        this.shows = response.data.results
      } catch (error) {
        console.log(error);
      }
    },
    async getSeries() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=b5549b7208a29cf5e4d8e62819aa403e`)
        this.shows = response.data.results
      } catch (error) {
        console.log(error);
      }
    },
    async getTrendingShows() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        this.trendingShows = response.data.results;
        console.log(this.trendingShows);
      } catch (error) {
        console.log(error);
      }
    },
    async getRecommendedShows() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        this.recommendedShows = response.data.results;
        console.log(this.recommendedShows);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
