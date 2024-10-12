import useMovieStore from "../stores/moviesStore";
import MovieCard from "../common/MovieCard";

const Favourites = () => {
  const { favorites } = useMovieStore();

  if (favorites.length === 0) return <p>No favorite movies yet!</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-4">Your Favorites</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
