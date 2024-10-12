import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tmdbApi from "../../Api/tmdbApi";
import MovieCard from "../common/MovieCard";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const category = queryParams.get("category") || "multi";
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { results, total_pages } = await tmdbApi.search(category, {
          query,
          page,
        });
        setResults(results);
        setTotalPages(total_pages);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) fetchSearchResults();
  }, [query, category, page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      navigate(`/search?query=${query}&category=${category}&page=${newPage}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for: "{query}"
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((item) => (
          <MovieCard key={item.id} movie={item} category={item.media_type} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          disabled={page === 1}>
          Previous
        </button>
        <span className="text-lg">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
