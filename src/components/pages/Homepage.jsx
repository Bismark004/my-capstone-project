import Header from "../common/Header";
import HeroSection from "../common/HeroSection";
import MovieList from "../common/MovieList";

const HomePage = () => {
  return (
    <div className="bg-ghatWhite w-full max-w-screen-xl mx-auto bg-slate-90">
      <Header />
      <HeroSection />
      <MovieList title="Trending Movies" category="movie" type="popular" />
      <MovieList title="Top-Rated Movies" category="movie" type="top_rated" />
      <MovieList title="Upcoming Movies" category="movie" type="upcoming" />
      <MovieList title="Trending TV-Shows" category="tv" type="popular" />
      <MovieList title="Top-Rated TV-Shows" category="tv" type="top_rated" />
      <MovieList title="On Air" category="tv" type="on_the_air" />
    </div>
  );
};

export default HomePage;
