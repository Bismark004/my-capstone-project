// src/pages/WatchLaterPage.js
import useMovieStore from "../store/movieStore";
import MovieCard from "../common/MovieCard";

const WatchLaterPage = () => {
  const { watchLater } = useMovieStore();

  if (watchLater.length === 0)
    return <p>No movies in your Watch Later list!</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-4">Watch Later</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watchLater.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchLaterPage;
