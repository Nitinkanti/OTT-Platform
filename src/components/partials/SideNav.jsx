import React from 'react';
import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <div className="w-[20%] h-full border-r border-zinc-700 p-8 bg-zinc-900">
      {/* Logo */}
      <h1 className="text-white text-3xl font-bold flex items-center gap-2">
        <i className="text-[#DD4343] ri-tv-fill"></i>
        <span>Nitflix</span>
      </h1>

      {/* New Feeds */}
      <div className="mt-12">
        <h2 className="text-white font-semibold text-lg mb-4 uppercase tracking-wide">New Feeds</h2>
        <nav className="flex flex-col gap-2 text-zinc-400 text-base">
          <Link
            to="/trending"
            className="flex items-center gap-2 hover:bg-[#DD4343] hover:text-white duration-300 rounded-lg px-4 py-3"
          >
            <i className="ri-fire-fill"></i> Trending
          </Link>

          <Link
            to="/popular"
            className="flex items-center gap-2 hover:bg-[#DD4343] hover:text-white duration-300 rounded-lg px-4 py-3"
          >
            <i className="ri-bard-fill"></i> Popular
          </Link>

          <Link
            to="/movie"
            className="flex items-center gap-2 hover:bg-[#DD4343] hover:text-white duration-300 rounded-lg px-4 py-3"
          >
            <i className="ri-movie-2-fill"></i> Movies
          </Link>

          <Link
            to="/tvshow"
            className="flex items-center gap-2 hover:bg-[#DD4343] hover:text-white duration-300 rounded-lg px-4 py-3"
          >
            <i className="ri-tv-2-fill"></i> TV Shows
          </Link>

          <Link
            to="/people"
            className="flex items-center gap-2 hover:bg-[#DD4343] hover:text-white duration-300 rounded-lg px-4 py-3"
          >
            <i className="ri-team-fill"></i> People
          </Link>
        </nav>
      </div>

      <hr className="my-8 border-zinc-700" />

      {/* Website Info */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-4 uppercase tracking-wide">Website Info</h2>
        <nav className="flex flex-col gap-2 text-zinc-400 text-base">
          <Link
            to="#"
            className="flex items-center gap-2 hover:bg-[#DD4343] hover:text-white duration-300 rounded-lg px-4 py-3"
          >
            <i className="ri-information-fill"></i> About Us
          </Link>

          <Link
            to="#"
            className="flex items-center gap-2 hover:bg-[#DD4343] hover:text-white duration-300 rounded-lg px-4 py-3"
          >
            <i className="ri-contacts-fill"></i> Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default SideNav;
