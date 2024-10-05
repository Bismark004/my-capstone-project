import {create} from 'zustand';
import tmdbApi from '../Api/tmdbApi';

const useMoviesStore = create((set) =>({
    movies : [],
    loading: false,
    currentPage: 1,
    totalPages: 1,

    fetchMovies: async (category, genreId, page = 1) => {
        set({lading: true});
        try {
            const params = {page, with_genres: genreId};
            const response = await tmdbApi.getMovieList(category, {params});
            set({
                movies: response.results,
                currentPage: page,
                loading: false
            });
        }catch (error) {
            console.error('Error fetching movies:', error);
            set({loading: false});
        }
    },
    setPage : (page) => set({currentPage: page}),
}));
export default useMoviesStore;