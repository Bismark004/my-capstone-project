import { Link } from "react-router-dom";
import apiConfig from "../../Api/apiConfig";

const MovieCard = ({ movie }) => {
  let posterUrl = apiConfig.w500image(movie.poster_path || movie.backdrop_path);
  let rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-claucous  rounded-lg hover:bg-zeffre transition-colors duration-300 aspectRatio-1/2">
        <div className="mt-2 text-center">
          <img
            src={posterUrl}
            alt={movie.title || movie.name}
            className="w-full h-72 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold text-ghatWhite">
            {movie.title || movie.name}
          </h3>
          <span className="text-white w-12 flex justify-center rounded-full border-2 border-white border-double bg-scarlet mt-3">
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
