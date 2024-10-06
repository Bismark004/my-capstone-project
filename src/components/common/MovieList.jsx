import { useMoviesStore } from "./store";
import MovieCard from "./MovieCard";

const MovieList = ({ title, category, type }) => {
  const movies = useMoviesStore((state) => state.movies[category][type]);

  return (
    <div className="movie-list">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
