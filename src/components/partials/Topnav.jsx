import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/Axios";
import pic from "/picture1.jpeg";

function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (err) {
      console.log("error not found", err);
    }
  };

  useEffect(() => {
    if (query.trim() !== "") {
      getSearches();
    } else {
      setsearches([]);
    }
  }, [query]);

  return (
    <div className="relative w-[75%] mx-auto flex items-center h-[10vh]">
      {/* Search Icon */}
      <i className="ri-search-line text-2xl text-zinc-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

      {/* Input Box */}
      <input
        type="text"
        value={query}
        onChange={(e) => setquery(e.target.value)}
        placeholder="Search anything..."
        className="w-full pl-10 pr-10 py-3 rounded-lg bg-zinc-800 text-zinc-200 text-base outline-none placeholder:text-zinc-500"
      />

      {/* Clear (X) Icon */}
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="ri-close-line text-xl text-zinc-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-white z-50 bg-zinc-800 rounded-full p-1"
        />
      )}

      {/* Search Results Dropdown */}
      {searches.length > 0 && (
        <div className="absolute z-40 top-full mt-2 w-full max-h-[60vh] bg-zinc-100 rounded-lg overflow-auto shadow-xl">
          {searches.map((item, index) => (
            <Link
              key={index}
              to=""
              className="flex items-center gap-4 p-4 border-b border-zinc-300 hover:bg-zinc-200 transition duration-200"
            >
              <img
                className="w-16 h-16 object-cover rounded shadow"
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.backdrop_path || item.profile_path
                      }`
                    : pic
                }
                alt="media"
              />
              <span className="text-zinc-800 font-medium">
                {item.original_name ||
                  item.name ||
                  item.original_title ||
                  item.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
