import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import "swiper/css";
import useMovieStore from "../stores/useMovieStore";
import MovieCard from "./MovieCard";

const MovieList = ({ category, type }) => {
  const movies = useMovieStore((state) => state.movies[category] || []);
  const fetchMovies = useMovieStore((state) => state.fetchMovies);

  useEffect(() => {
    fetchMovies(category, type);
  }, [category, type, fetchMovies]);

  return (
    <div className="movie-list my-6">
      <h2 className="text-2xl font-semibold mb-4">{type} Movies</h2>
      <Swiper spaceBetween={20} slidesPerView={4} grabCursor={true}>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
