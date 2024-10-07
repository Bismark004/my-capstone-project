import Header from "../common/Header";
import HeroSection from "../common/HeroSection";
import MovieList from "../common/MovieList";

const HomePage = () => {
  try {
    return (
      <div className="w-full max-w-screen-xl mx-auto bg-slate-90">
        <Header />
        <HeroSection />
        {/* Try rendering one MovieList at a time to isolate the issue */}
        <MovieList category="movie" type="popular" />
        {/* Uncomment these one by one
        <MovieList category="movie" type="top_rated" />
        <MovieList category="movie" type="upcoming" />
        <MovieList category="tv" type="popular" />
        <MovieList category="tv" type="top_rated" />
        <MovieList category="tv" type="on_the_air" />
        */}
      </div>
    );
  } catch (error) {
    console.error("Error in HomePage:", error);
    return <div>An error occurred. Please check the console for details.</div>;
  }
};

export default HomePage;
