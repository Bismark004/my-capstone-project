import Header from "../common/Header";
import HeroSection from "../common/HeroSection";
import MovieList from "../common/MovieList";
const HomePage = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-slate-90">
      <Header />
      <HeroSection />

      <div className="container mx-auto px-4">
        <MovieList title="Popular Movies" category="movie" type="popular" />
        <MovieList title="Top Rated Movies" category="movie" type="top_rated" />
        <MovieList title="Upcoming Movies" category="movie" type="upcoming" />

        <MovieList title="Popular TV Shows" category="tv" type="popular" />
        <MovieList title="Top Rated TV Shows" category="tv" type="top_rated" />
        <MovieList
          title="On The Air TV Shows"
          category="tv"
          type="on_the_air"
        />
      </div>
    </div>
  );
};
export default HomePage;
