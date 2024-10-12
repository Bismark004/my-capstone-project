
import { create } from 'zustand';

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const useMovieStore = create((set) => ({
  favorites: getLocalStorage("favorites"),
  watchLater: getLocalStorage("watchLater"),

  addFavorite: (movie) =>
    set((state) => {
      const updatedFavorites = [...state.favorites, movie];
      setLocalStorage("favorites", updatedFavorites);
      return { favorites: updatedFavorites };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter(
        (movie) => movie.id !== id
      );
      setLocalStorage("favorites", updatedFavorites);
      return { favorites: updatedFavorites };
    }),

  addWatchLater: (movie) =>
    set((state) => {
      const updatedWatchLater = [...state.watchLater, movie];
      setLocalStorage("watchLater", updatedWatchLater);
      return { watchLater: updatedWatchLater };
    }),

  removeWatchLater: (id) =>
    set((state) => {
      const updatedWatchLater = state.watchLater.filter(
        (movie) => movie.id !== id
      );
      setLocalStorage("watchLater", updatedWatchLater);
      return { watchLater: updatedWatchLater };
    }),
}));

export default useMovieStore;
