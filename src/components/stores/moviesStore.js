// src/store/movieStore.js
import { create } from 'zustand';

const useMovieStore = create((set) => ({
  favorites: [],
  watchLater: [],
  
  addFavorite: (movie) =>
    set((state) => ({
      favorites: [...state.favorites, movie],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== id),
    })),

  addWatchLater: (movie) =>
    set((state) => ({
      watchLater: [...state.watchLater, movie],
    })),

  removeWatchLater: (id) =>
    set((state) => ({
      watchLater: state.watchLater.filter((movie) => movie.id !== id),
    })),
}));
export default useMovieStore;
