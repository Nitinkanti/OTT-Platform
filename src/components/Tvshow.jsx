import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';
import DropDown from './partials/DropDown';
import Topnav from './partials/Topnav';
import axios from '/src/utils/Axios.jsx';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Tvshow() {
     const [Tvshow , setTvshow] = useState([])
      const [category, setcategory] = useState("airing_today")
      const [page, setpage] = useState(1)
      const [hasMore, sethasMore] = useState(true)
      document.title = "nitflix | Tvshow";
      const Navigate = useNavigate() 
      const GetTvshow = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}?page=${page}`);
          if(data.results.length > 0){
            setTvshow((prev)=>[...prev,...data.results]);
            console.log(data.results);
            
            setpage((prev)=>prev + 1);
          }
          else{
            sethasMore(false);
          }
          
        } catch (err) {
          console.error("Error fetching Tvshow data:", err);
        }
      };
    
      const refreshHandler = ()=>{
        if(Tvshow.length==0){
          GetTvshow();
        }
        else{
          setpage(1);
          setTvshow([]);
          GetTvshow();
        }
      }
      useEffect(()=>{
        refreshHandler();
      },[category])
      return Tvshow.length > 0 ?
      (
        <div className='text-white w-screen px-[5%]'>
          <div className='w-full flex items-center justify-between'>
           <h1 className='text-2xl font-semibold text-zinc-400'>
           <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#dd4343]"></i>
            Movie
           </h1>
          
           <div className='flex items-center w-[80%]'>
           <Topnav/>
           <DropDown title="category" options={["now_playing","popular","top_rated","upcoming"]} func={(e)=>setcategory(e.target.value)} />
           </div>
          </div>
        <InfiniteScroll
        dataLength={Tvshow.length}
        next={Tvshow}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
        >
        <Cards data={Tvshow} title="tv" />
          </InfiniteScroll>     
        </div>
      ) : <Loading/>
}

export default Tvshow