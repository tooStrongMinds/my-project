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
    async getRecommendedShows(limit = 20) {
      const movieEndPoint = `https://api.themoviedb.org/3/movie/popular?api_key=b5549b7208a29cf5e4d8e62819aa403e`;
      const tvEndPoint = `https://api.themoviedb.org/3/tv/popular?api_key=b5549b7208a29cf5e4d8e62819aa403e`;

      try {
        const [moviesResponse, tvResponse] = await Promise.all([
          axios.get(movieEndPoint),
          axios.get(tvEndPoint),
        ]);

        const movies = moviesResponse.data.results;
        const tvShows = tvResponse.data.results;

        // Interleave movies and TV shows
        const interleaved = [];
        const maxLength = Math.min(movies.length, tvShows.length, limit);
        for (let i = 0; i < maxLength; i++) {
          interleaved.push(movies[i]);
          interleaved.push(tvShows[i]);
        }

        // If one array is longer, add remaining items
        if (movies.length > maxLength) {
          interleaved.push(...movies.slice(maxLength, limit));
        }
        if (tvShows.length > maxLength) {
          interleaved.push(...tvShows.slice(maxLength, limit));
        }

        // Ensure we don't exceed the limit
        this.recommendedShows = interleaved.slice(0, limit);
        console.log(this.recommendedShows);
      } catch (error) {
        console.log('Error fetching recommended shows', error.message);
      }
    },
  },
  getters: {},
});
