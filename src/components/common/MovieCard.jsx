import { Link } from "react-router-dom";
import apiConfig from "../Api/apiConfig";

const MovieCard = ({ movie }) => {
  const posterUrl = apiConfig.w500Image(movie.poster_path);
  const movieTitle = movie.title || movie.name;

  return (
    <div className="movie-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all hover:shadow-xl">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={posterUrl}
          alt={movieTitle}
          className="w-full h-auto rounded-lg"
        />
        <h3 className="mt-2 text-center text-lg font-semibold">{movieTitle}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;
