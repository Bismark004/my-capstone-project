import { useEffect, useState } from "react";
import tmdbApi from "../../Api/tmdbApi";
import { useParams } from "react-router-dom";
import apiConfig from "../../Api/apiConfig";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../common/MovieCard";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMovieData = async () => {
      try {
        const category = window.location.pathname.startsWith("/movie")
          ? "movie"
          : "tv";

        // Fetch movie details
        const movieResponse = await tmdbApi.details(category, id);
        if (isMounted) {
          setMovieDetails(movieResponse);
        }

        // Fetch cast
        const castResponse = await tmdbApi.getVideos(category, id);
        if (isMounted && castResponse.cast) {
          setCasts(castResponse.cast);
        }

        // Fetch similar movies
        const similarMoviesResponse = await tmdbApi.similar(category, id);
        if (isMounted && similarMoviesResponse.results) {
          setSimilarMovies(similarMoviesResponse.results);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchMovieData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>Movie details not found</div>;
  }

  const posterUrl = apiConfig.w500image(
    movieDetails.poster_path || movieDetails.backdrop_path
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Movie Header */}
      <div className="flex flex-col md:flex-row items-start gap-8">
        <img
          className="w-full md:w-1/3 rounded-lg"
          src={posterUrl}
          alt={movieDetails.title}
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-customDark">
            {movieDetails.title}
          </h1>
          <p className="text-gray-700">{movieDetails.overview}</p>

          <div className="flex gap-4 mt-4">
            <span className="bg-customDark text-white px-3 py-1 rounded">
              Rating: {movieDetails.vote_average}
            </span>
            <span className="bg-claucous text-white px-3 py-1 rounded">
              Release Date: {movieDetails.release_date}
            </span>
          </div>

          {/* Genres */}
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
        <div className="flex gap-4 mt-4">
          {casts.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full"
                src={apiConfig.w500image(member.profile_path)}
                alt={member.name}
              />
              <p className="text-center text-gray-700 mt-2">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-customDark mb-4">
          Similar Movies
        </h2>
        <Swiper spaceBetween={10} slidesPerView={"auto"} grabCursor={true}>
          {similarMovies.map((similarMovie) => (
            <SwiperSlide key={similarMovie.id}>
              <MovieCard item={similarMovie} category="movie" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetails;
