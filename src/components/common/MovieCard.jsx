import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../Api/apiConfig";

const MovieCard = ({ movie }) => {
  if (!movie) {
    console.error("MovieCard received undefined movie prop");
    return null;
  }

  let posterUrl;
  try {
    // Note the lowercase 'i' in w500image
    posterUrl = apiConfig.w500image(movie.poster_path || movie.backdrop_path);
  } catch (error) {
    console.error("Error generating poster URL:", error);
    posterUrl = ""; // Fallback to empty string if there's an error
  }

  console.log(
    "Rendering MovieCard for:",
    movie.title || movie.name,
    "Poster URL:",
    posterUrl
  );

  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${posterUrl})` }}>
        <div className="h-40">
          <h3>{movie.title || movie.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
