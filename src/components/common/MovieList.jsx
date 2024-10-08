import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";
import tmdbApi from "../../Api/tmdbApi";

const MovieList = ({ title, type, category }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log(`Fetching ${category} list of type: ${type}`);
        const params = {};
        const response =
          category === "movie"
            ? await tmdbApi.getMovieList(type, { params })
            : await tmdbApi.getTvList(type, { params });
        console.log(`Received ${category} list:`, response);
        setMovies(response.results);
      } catch (error) {
        console.error(`Error fetching ${category} list:`, error);
        setError(error.message);
        setMovies([]);
      }
    };
    fetchMovies();
  }, [type, category]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-list">
      <h2 className="text-xl font-bold mb-4">{title || `${category} List`}</h2>
      {movies.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Swiper spaceBetween={8} slidesPerView={"4"}>
          {movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard movie={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
