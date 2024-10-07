import { Link } from "react-router-dom";
import apiConfig from "../../Api/apiConfig";

const MovieCard = ({ movie }) => {
  const posterUrl = apiConfig.w500Image(
    movie.poster_path || movie.backdrop_path
  );

  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${posterUrl})` }}>
        <div className="movie-card-info">
          <h3>{movie.title || movie.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
