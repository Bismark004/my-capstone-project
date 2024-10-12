import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/Homepage";
import MovieDetails from "./components/pages/MovieDetails";
import SearchResults from "./components/pages/SearchResults";
import Favourites from "./components/pages/Favourites";
import WatchLater from "./components/pages/WatchLater";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/watchlater" element={<WatchLater />} />
      </Routes>
    </Router>
  );
};

export default App;
