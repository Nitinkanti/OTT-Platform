import React, { useEffect, useState } from 'react';
import SideNav from './partials/SideNav';
import Topnav from './partials/Topnav';
import Header from './partials/Header';
import axios from "../utils/Axios";
import Loading from './Loading';
import HorizontalCard from './partials/HorizontalCard';
import DropDown from './partials/DropDown';

function Home() {
  document.title = "Nitflix | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [Category, setCategory] = useState("all")
  const GetHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomData = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (err) {
      console.error("Error fetching trending data:", err);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);
      settrending(data.results);
    } catch (err) {
      console.error("Error fetching trending data:", err);
    }
  };

  useEffect(() => {
    GetHeader();
    GetTrending();
  }, [Category]);

  return wallpaper ? (
    <div className="flex w-full h-screen bg-zinc-950 text-white">
      <SideNav /> 
      
      {/* MAIN CONTENT */}
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden scroll-smooth">
        <Topnav />
        <Header data={wallpaper} />

        <div className='p-4'>
  <div className="flex items-center justify-between mb-4">
    <h1 className='text-4xl font-bold text-white'>🔥 Trending Now</h1>

    <DropDown 
      title="filter" 
      options={["tv", "movie", "all"]} 
      func={(e) => setCategory(e.target.value)} 
    />
  </div>

  <HorizontalCard data={trending} />
</div>

      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-zinc-950 text-white">
      <Loading />
    </div>
  );
}

export default Home;
