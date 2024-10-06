import { create } from 'zustand';
import tmdbApi from '../../Api/tmdbApi';

const useMoviesStore = create((set) => ({
    popularMovies: [],
    loading: false,

    fetchPopularMovies: async (page = 1) => {
        set({ loading: true });
        try {
            const response = await tmdbApi.getPopularMovies(page);
            set({ popularMovies: response.results, loading: false });
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            set({ loading: false });
        }
    },
}));

export default useMoviesStore;
