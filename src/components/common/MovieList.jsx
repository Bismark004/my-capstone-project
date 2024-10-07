import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";
import tmdbApi from "../../Api/tmdbApi";

const MovieList = ({ title, type, category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const params = {};
      const response = await tmdbApi.getMovieList(type, { params });
      setMovies(response.results);
    };
    fetchMovies();
  }, [type]);

  return (
    <div className="movie-list">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Swiper spaceBetween={10} slidesPerView={"auto"}>
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
