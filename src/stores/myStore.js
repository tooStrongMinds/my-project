import { defineStore } from "pinia";
import axios from "axios";

export const useShowStore = defineStore("show", {
  state: () => ({
    shows: [],
    // show: {},
    trendingShows: [],
    recommendedShows: [],
    searchedShows: [],
    searchMovieQuery: '',
    searchSeriesQuery: '',
    currentPage: 1,
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
    // bookmarkedSeries: JSON.parse(localStorage.getItem(bookmarkedSeries)) || [],
    // totalPages: 1,
    // isAllShowsLoaded: false,
  }),
  actions: {
    async getMovies() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b5549b7208a29cf5e4d8e62819aa403e&page=${this.currentPage}`)
        this.shows = response.data.results
      } catch (error) {
        console.log(error);
      }
    },
    async getSeries() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=b5549b7208a29cf5e4d8e62819aa403e&page=${this.currentPage}`)
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
        console.log('Error fetching recommended shows', error.message);
      }
    },
    async fetchSearchSeriesResults() {
      if (this.searchSeriesQuery.trim() === "") {
        this.searchedShows = []
        return
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/tv?query=${this.searchSeriesQuery}&api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        this.searchedShows = response.data.results;
      } catch(error) {
        console.log('Error fetching results', error.message)
      }
    },
    async fetchSearchMovieResults() {
      if (this.searchMovieQuery.trim() === "") {
        this.searchedShows = []
        return
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${this.searchMovieQuery}&api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        this.searchedShows = response.data.results;
      } catch(error) {
        console.log('Error fetching results', error.message)
      }
    },
    // toggleBookmark(show) {
    //   const index = this.bookmarks.findIndex((bookmark) => bookmark.id === show.id);
    //   if (index !== -1) {
    //     // If show is already bookmarked, remove it
    //     this.bookmarks.splice(index, 1);
    //   } else {
    //     // Otherwise, add it to the bookmarks
    //     this.bookmarks.push(show);
    //   }
    //   // Update local storage
    //   localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    // },
    // isBookmarked(id) {
    //   return this.bookmarks.some((bookmark) => bookmark.id === id);
    // },
},
  getters: {},
});
