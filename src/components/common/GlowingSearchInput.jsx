import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GlowingSearchInput = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("multi");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/search?query=${query}&category=${category}`);
  };

  return (
    <div className="relative p-12 w-full sm:max-w-2xl sm:mx-auto">
      <div className="overflow-hidden rounded-full p-3">
        <form
          onSubmit={handleSearch}
          className="relative flex bg-white rounded-full">
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-4 rounded-full focus:outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mx-2 px-4 rounded-md">
            <option value="multi">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
          <button
            type="submit"
            className="px-8 py-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-400">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlowingSearchInput;
