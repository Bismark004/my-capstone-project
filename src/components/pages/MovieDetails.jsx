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
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    addFavourite,
    removeFavourite,
    addWatchLater,
    removeWatchLater,
    favourites,
    watchLater,
  } = useMovieStore();

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

  const isFavourite = favourites.some((movie) => movie.id === movieDetails.id);
  const isWatchLater = watchLater.some((movie) => movie.id === movieDetails.id);

  const toggleFavorite = () => {
    isFavourite ? removeFavourite(movieDetails.id) : addFavourite(movieDetails);
  };

  const toggleWatchLater = () => {
    isWatchLater
      ? removeWatchLater(movieDetails.id)
      : addWatchLater(movieDetails);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      {/* Banner Section */}
      <div
        className="relative h-60 md:h-60 bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Movie Content */}
      <div className="relative flex flex-col md:flex-row items-start gap-8 -mt-32 max-w-[1200px] mx-auto px-8">
        {/* Poster Section (Smaller Poster) */}
        <div className="w-40 md:w-72 aspect-[2/3] rounded-xl overflow-hidden flex-shrink-0">
          <img
            className="object-cover w-full h-full"
            src={posterUrl}
            alt={movieDetails.title || "Movie poster"}
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-6 md:mt-8">
          <h1 className="text-4xl md:text-6xl text-scarlet font-bold leading-tight">
            {movieDetails.title}
          </h1>

          <p className="text-claucous mt-4 overflow-auto max-h-40 md:max-h-full">
            {movieDetails.overview}
          </p>

          {/* Rating & Release Date */}
          <div className="flex gap-4 mt-4">
            <span className="bg-zeffre text-white px-4 py-2 rounded shadow">
              Rating: {movieDetails.vote_average.toFixed(1)}
            </span>
            <span className="bg-claucous text-white px-4 py-2 rounded shadow">
              Release Date:{" "}
              {movieDetails.release_date || movieDetails.first_air_date}
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movieDetails.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 border-2 border-scarlet rounded-full text-sm font-semibold">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all hover:scale-105 focus:outline-none ${
                isFavourite ? "bg-scarlet" : "bg-claucous"
              }`}
              onClick={toggleFavorite}>
              <FavouriteIcon />
              {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            </button>

            <button
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all hover:scale-105 focus:outline-none ${
                isWatchLater ? "bg-scarlet" : "bg-claucous"
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
        <h2 className="text-xl font-bold mb-4 text-scarlet">Cast</h2>
        <div className="flex  gap-4 mt-4 overflow-x-scroll">
          {casts.slice(0, 10).map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <img
                className="rounded-full  aspect-square object-cover"
                src={apiConfig.w500image(member.profile_path)}
                alt={member.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/path/to/fallback/image.jpg";
                }}
              />
              <p className="text-center text-customDark mt-2">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="mt-12 ">
        <h2 className="text-xl font-bold mb-4 text-scarlet">Similar Movies</h2>
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
