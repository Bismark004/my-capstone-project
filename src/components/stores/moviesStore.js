import { create } from "zustand";

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const useMovieStore = create((set) => ({
  favourites: getLocalStorage("favourites"),
  watchLater: getLocalStorage("watchLater"),

  addFavourite: (movie) =>
    set((state) => {
      const updatedFavourites = [...state.favourites, movie];
      setLocalStorage("favourites", updatedFavourites);
      return { favourites: updatedFavourites };
    }),

  removeFavourite: (id) =>
    set((state) => {
      const updatedFavourites = state.favourites.filter(
        (movie) => movie.id !== id
      );
      setLocalStorage("favourites", updatedFavourites);
      return { favourites: updatedFavourites };
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
