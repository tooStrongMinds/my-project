import { defineStore } from "pinia";
import axios from "axios";

export const useShowStore = defineStore("show", {
  state: () => ({
    shows: [],
    trendingShows: [],
    recommendedShows: [],
    searchedShows: [],
    searchMovieQuery: "",
    searchSeriesQuery: "",
    currentPage: 1,
    showOverlay: null,
    bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
    videos: [],
    // loading: false,
    // error: null,
  }),
  actions: {
    async getMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=b5549b7208a29cf5e4d8e62819aa403e&page=${this.currentPage}`
        );
        this.shows = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async getSeries() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=b5549b7208a29cf5e4d8e62819aa403e&page=${this.currentPage}`
        );
        this.shows = response.data.results;
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
      } catch (error) {
        console.log("Error fetching recommended shows", error.message);
      }
    },
    async fetchSearchSeriesResults() {
      if (this.searchSeriesQuery.trim() === "") {
        this.searchedShows = [];
        return;
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/tv?query=${this.searchSeriesQuery}&api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        this.searchedShows = response.data.results;
      } catch (error) {
        console.log("Error fetching results", error.message);
      }
    },
    async fetchSearchMovieResults() {
      if (this.searchMovieQuery.trim() === "") {
        this.searchedShows = [];
        return;
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${this.searchMovieQuery}&api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        this.searchedShows = response.data.results;
      } catch (error) {
        console.log("Error fetching results", error.message);
      }
    },

    toggleBookmarked(show) {
      try {
        console.log("Show object:", show);
        if (!show || typeof show.id === "undefined") {
          console.error("Invalid show object:", show);
          return;
        }

        const index = this.bookmarks.findIndex((b) => b && b.id === show.id);
        console.log("Bookmark index:", index);
        if (index > -1) {
          this.bookmarks.splice(index, 1);
          // show.isBookmarked = false
        } else {
          this.bookmarks.push(show);
          // show.isBookmarked = true
        }

        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
        console.log("Updated bookmarks:", this.bookmarks);
      } catch (error) {
        console.log("Error:", error.message);
      }
    },
    isBookmarked(show) {
      return this.bookmarks.some((b) => b && b.id === show.id);
    },
    async fetchVideos(id, mediaType) {
      try {
        const endpoint =
          mediaType === "movie"
            ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b5549b7208a29cf5e4d8e62819aa403e`
            : `https://api.themoviedb.org/3/tv/${id}/videos?api_key=b5549b7208a29cf5e4d8e62819aa403e`;

        const response = await axios.get(endpoint);
        this.videos = response.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },

    async getSimilar(id, mediaType) {
      try {
        const endpoint =
          mediaType === "movie"
            ? `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=b5549b7208a29cf5e4d8e62819aa403e`
            : `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=b5549b7208a29cf5e4d8e62819aa403e`;

        const response = await axios.get(endpoint);
        this.shows = response.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getUpcoming() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        this.shows = response.data.results;
        const minDate = "2024-08-01";
        const maxDate = response.data.dates.maximum;
        const filteredShows = this.shows.filter((show) => {
          const releaseDate = new Date(show.release_date);
          return (
            releaseDate >= new Date(minDate) && releaseDate <= new Date(maxDate)
          );
        });

        // Update the state with the filtered movies
        this.shows = filteredShows;

        console.log("Filtered Shows:", this.shows);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  getters: {},
});
