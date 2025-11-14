import React from 'react';
import { Link } from 'react-router-dom';

function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(0,0,0,0.3)),
          url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-full h-[60vh] flex flex-col justify-end p-[6.5%] text-white space-y-4"
    >
      <h1 className="text-4xl font-bold max-w-[70%] drop-shadow-md">
        {data.original_title || data.title || data.name || data.original_name}
      </h1>

      <p className="text-base max-w-[70%] text-zinc-300">
        {data.overview ? `${data.overview.slice(0, 200)}...` : "No description available."}
        <Link className="text-blue-400 hover:underline ml-1" to="/">
          more
        </Link>
      </p>

      <div className="flex items-center gap-10 text-sm font-medium text-zinc-400">
        <p>
          <i className="text-yellow-400 ri-megaphone-fill mr-1"></i>
          {data.release_date || "Unknown"}
        </p>
        <p>
          <i className="text-yellow-400 ri-album-line mr-1"></i>
          {data.media_type ? data.media_type.toUpperCase() : "MEDIA"}
        </p>
      </div>
    </div>
  );
}

export default Header;
