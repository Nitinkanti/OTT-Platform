import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';
import DropDown from './partials/DropDown';
import Topnav from './partials/Topnav';
import axios from '/src/utils/Axios.jsx';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Movie() {
     const [Movie , setMovie] = useState([])
      const [category, setcategory] = useState("now_playing")
      const [duration, setduration] = useState("day")
      const [page, setpage] = useState(1)
      const [hasMore, sethasMore] = useState(true)
      document.title = "nitflix | Movie";
      const Navigate = useNavigate() 
      const GetMovie = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
          if(data.results.length > 0){
            setMovie((prev)=>[...prev,...data.results]);
            setpage((prev)=>prev + 1);
          }
          else{
            sethasMore(false);
          }
          
        } catch (err) {
          console.error("Error fetching Movie data:", err);
        }
      };
    
      const refreshHandler = ()=>{
        if(Movie.length==0){
          GetMovie();
        }
        else{
          setpage(1);
          setMovie([]);
          GetMovie();
        }
      }
      useEffect(()=>{
        refreshHandler();
      },[category])
      return Movie.length > 0 ?
      (
        <div className='text-white w-screen px-[5%]'>
          <div className='w-full flex items-center justify-between'>
           <h1 className='text-2xl font-semibold text-zinc-400'>
           <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#dd4343]"></i>
            Movies <small className='ml-1 text-sm text-zinc-500'>({category})</small>
           </h1>
          
           <div className='flex items-center w-[80%]'>
           <Topnav/>
           <DropDown title="category" options={["now_playing","popular","top_rated","upcoming"]} func={(e)=>setcategory(e.target.value)} />
           </div>
          </div>
        <InfiniteScroll
        dataLength={Movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
        >
        <Cards data={Movie} title="movie" />
          </InfiniteScroll>     
        </div>
      ) : <Loading/>
}

export default Movie