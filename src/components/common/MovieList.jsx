import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";
import useMovieStore from "../stores/useMovieStores";
const MovieList = () => {
  const { popularMovies, fetchPopularMovies, loading } = useMovieStore();

  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
      <Swiper spaceBetween={20} slidesPerView={3} navigation>
        {popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
