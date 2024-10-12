import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../Api/tmdbApi";
import apiConfig from "../../Api/apiConfig";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../common/MovieCard";

const MovieDetails = () => {
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
  return (
    <div className="container mx-auto px-4 py-6">
      {/*header*/}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          className="w-full md:w-1/3 rounded-lg"
          src={posterUrl}
          alt={movieDetails.title || movieDetails.name || "Movie poster"}
          loading="lazy"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-customDark">
            {movieDetails.title}
          </h1>
          <p className="text-gray-700">{movieDetails.overview}</p>

          <div className="flex gap-4 mt-4">
            <span className="bg-customDark text-white px-3 py-1 rounded">
              Rating: {movieDetails.vote_average.toFixed(1)}
            </span>
            <span className="bg-claucous text-white px-3 py-1 rounded">
              Release Date:{" "}
              {movieDetails.release_date || movieDetails.first_air_date}
            </span>
          </div>

          {/*Genres*/}
          <div className="flex flex-wrap gap-2 mt-4">
            {movieDetails.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-scarlet text-white px-2 py-1 rounded">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-customDark">Cast</h2>
        <div className="flex flex-wrap gap-4 mt-4">
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
              <p className="text-center text-gray-700 mt-2">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
