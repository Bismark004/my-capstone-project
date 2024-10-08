import { Link } from "react-router-dom";
import apiConfig from "../../Api/apiConfig";

const MovieCard = ({ movie }) => {
  let posterUrl = apiConfig.w500image(movie.poster_path || movie.backdrop_path);
  let rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
        <div className="mt-2 text-center">
          <img
            src={posterUrl}
            alt={movie.title || movie.name}
            className="w-full h-72 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold text-white">
            {movie.title || movie.name}
          </h3>
          <p className="text-sm text-gray-400 mt-3">Rating: {rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
