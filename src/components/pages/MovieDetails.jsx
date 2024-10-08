import { useEffect, useState } from "react";
import tmdbApi from "../../Api/tmdbApi";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fecthMovieDetails = async () => {
      try {
        const category = window.location.pathname.startsWith("/movie")
          ? "movie"
          : "tv";
        const response = await tmdbApi.details(category, id);
        if (isMounted) setCasts(castResponse.cast);

        const similarMoviesResponse = await tmdbApi.similar(category, id);
        if (isMounted) setSimilarMovies(similarMoviesResponse.results || []);
      } catch (error) {
        console.error(
          `Error whilw fetching ${category} details, cast, or similar movies:`,
          error
        );
      }
    };

    fecthMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);
};
