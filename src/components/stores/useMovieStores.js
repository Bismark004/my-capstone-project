
import { create } from 'zustand';
import tmdbApi from '../Api/tmdbApi';

const useMovieStore = create((set) => ({
  movies: {},
  loading: false,

  fetchMovies: async (category, type) => {
    set({ loading: true });
    try {
      const response = await tmdbApi.getMoviesList(type);
      set((state) => ({
        movies: {
          ...state.movies,
          [category]: response.data.results,
        },
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      set({ loading: false });
    }
  },

  fetchTvShows: async (category, type) => {
    set({ loading: true });
    try {
      const response = await tmdbApi.getTvList(type);
      set((state) => ({
        movies: {
          ...state.movies,
          [category]: response.data.results,
        },
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      set({ loading: false });
    }
  },
}));

export default useMovieStore;
