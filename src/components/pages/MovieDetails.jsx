import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../Api/tmdbApi";
import apiConfig from "../../Api/apiConfig";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../common/MovieCard";
import useMovieStore from "../stores/moviesStore";
import WatchLaterIcon from "../common/WatchLaterIcon";
import FavouriteIcon from "../common/FavouriteIcon";

const MovieDetails = () => {
  const {
    addFavorite,
    removeFavorite,
    addWatchLater,
    removeWatchLater,
    favorites,
    watchLater,
  } = useMovieStore();

  const isFavorite = favorites.some((movie) => movie.id === movieDetails.id);
  const isWatchLater = watchLater.some((movie) => movie.id === movieDetails.id);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(movieDetails.id) : addFavorite(movieDetails);
  };

  const toggleWatchLater = () => {
    isWatchLater
      ? removeWatchLater(movieDetails.id)
      : addWatchLater(movieDetails);
  };

  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const categoryType = window.location.pathname.includes("/movie")
          ? "movie"
          : "tv";
        setCategory(categoryType);

        const details = await tmdbApi.details(categoryType, id);
        setMovieDetails(details);

        const [similar, credits] = await Promise.all([
          tmdbApi.similar(categoryType, id),
          tmdbApi.getCredits(categoryType, id),
        ]);

        setSimilarMovies(similar.results);
        setCasts(credits.cast);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details", error);
        setError("Failed to load movie details. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading movie details...</div>; // Add spinner here
  }

  if (error) {
    return <div>{error}</div>;
  }

  const posterUrl = apiConfig.w500image(
    movieDetails.poster_path || movieDetails.backdrop_path
  );
  const backdropUrl = apiConfig.w500image(movieDetails.backdrop_path);

  return (
    <div className=" mx-auto">
      {/* Banner Section */}
      <div
        className="relative h-80 bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Movie Content */}
      <div className="relative flex flex-col md:flex-row items-start gap-6 -mt-32 max-w-[1260px] mx-auto px-8">
        {/* Poster */}
        <img
          className="flex-1 hidden md:block rounded-xl h-86 bg-cover bg-center"
          src={posterUrl}
          alt={movieDetails.title || "Movie poster"}
          loading="lazy"
        />

        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-6xl text-ghatWhite font-bold">
            {movieDetails.title}
          </h1>
          <p className="text-customDark mt-20">{movieDetails.overview}</p>

          <div className="flex gap-4 mt-4">
            <span className="bg-black text-white px-3 py-1 rounded">
              Rating: {movieDetails.vote_average.toFixed(1)}
            </span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded">
              Release Date:{" "}
              {movieDetails.release_date || movieDetails.first_air_date}
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movieDetails.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 border-2 border-black rounded text-sm font-semibold">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isFavorite ? "bg-red-500" : "bg-gray-500"
              }`}
              onClick={toggleFavorite}>
              <FavouriteIcon />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>

            <button
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isWatchLater ? "bg-blue-500" : "bg-gray-500"
              }`}
              onClick={toggleWatchLater}>
              <WatchLaterIcon />
              {isWatchLater ? "Remove from Watch Later" : "Add to Watch Later"}
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-12 mx-auto">
        <h2 className="text-2xl font-semibold text-customDark text-center">
          Cast
        </h2>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {casts.slice(0, 10).map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={apiConfig.w500image(member.profile_path)}
                alt={member.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/path/to/fallback/image.jpg";
                }}
              />
              <p className="text-center text-gray-300 mt-2">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="mt-12 ">
        <h2 className="text-2xl font-semibold text-customDark text-center mb-4">
          Similar Movies
        </h2>
        <Swiper spaceBetween={5} slidesPerView={4}>
          {similarMovies.map((similarMovie) => (
            <SwiperSlide key={similarMovie.id}>
              <MovieCard movie={similarMovie} category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetails;
