import { Link } from "react-router-dom";
import apiConfig from "../../Api/apiConfig";

const MovieCard = ({ movie }) => {
  let posterUrl = apiConfig.w500image(movie.poster_path || movie.backdrop_path);
  let rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-claucous rounded-lg hover:bg-zeffre transition-colors duration-300 aspect-w-1 aspect-h-1">
        <div className="flex flex-col justify-between h-full p-4">
          <img
            src={posterUrl}
            alt={movie.title || movie.name}
            className="w-full h-72 object-cover rounded-md"
          />
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-ghatWhite line-clamp-2 overflow-hidden h-[48px]">
              {movie.title || movie.name}
            </h3>
          </div>
          <div className="flex justify-center mt-3">
            <span className="text-white w-12 h-12 flex items-center justify-center rounded-full border-2 border-white border-double bg-scarlet">
              {rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
