import Header from "../common/Header";
import HeroSection from "../common/HeroSection";
import MovieList from "../common/MovieList";
const HomePage = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-slate-90">
      <Header />
      <HeroSection />

      <MovieList category="movie" type="popular" />
      <MovieList category="movie" type="top_rated" />
      <MovieList category="movie" type="upcoming" />
      <MovieList category="tv" type="popular" />
      <MovieList category="tv" type="top_rated" />
      <MovieList category="tv" type="on_the_air" />
    </div>
  );
};
export default HomePage;
