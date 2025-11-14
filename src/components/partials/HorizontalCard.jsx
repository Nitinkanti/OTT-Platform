import React from 'react';
import { Link } from 'react-router-dom';

function HorizontalCard({ data }) {
  return (
    <div className='w-full px-4'>
      <div className='w-full flex gap-5 overflow-x-auto p-2'>
        {data.length > 0 ? (
          data.map((d, i) => (
            <Link to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className="min-w-[180px] sm:min-w-[25%] h-[45vh] bg-zinc-900 rounded-lg overflow-hidden shadow-lg relative cursor-pointer mb-2 transition-transform duration-300 hover:scale-105"
            >
              {/* Image */}
              <img
                className="w-full h-full object-cover"
                src={
                  d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`
                    : "/picture1.jpeg"
                }
                alt="movie"
              />

              {/* Text Overlay */}
              <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2'>
                <h1 className='text-sm font-bold truncate'>{d.title || d.name || d.original_title || d.original_name}</h1>
                <p className='text-xs'>{d.overview?.slice(0, 80)}...</p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-white">Nothing to show</h1>
        )}
      </div>
    </div>
  );
}

export default HorizontalCard;
