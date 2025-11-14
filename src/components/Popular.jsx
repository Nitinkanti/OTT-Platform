import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';
import DropDown from './partials/DropDown';
import Topnav from './partials/Topnav';
import axios from '/src/utils/Axios.jsx';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Popular() {
     const [Popular, setPopular] = useState([])
      const [category, setcategory] = useState("movie")
      const [page, setpage] = useState(1)
      const [hasMore, sethasMore] = useState(true)
      document.title = "nitflix | Popular";
      const Navigate = useNavigate() 
      const GetPopular = async () => {
        try {
          const { data } = await axios.get(`/${category}/popular?page=${page}`);
          if(data.results.length > 0){
            setPopular((prev)=>[...prev,...data.results]);
            setpage((prev)=>prev + 1);
          }
          else{
            sethasMore(false);
          }
          
        } catch (err) {
          console.error("Error fetching Popular data:", err);
        }
      };
    
      const refreshHandler = ()=>{
        if(Popular.length==0){
          GetPopular();
        }
        else{
          setpage(1);
          setPopular([]);
          GetPopular();
        }
      }
      useEffect(()=>{
        refreshHandler();
      },[category])
      return Popular.length > 0 ?
      (
        <div className='text-white w-screen px-[5%]'>
          <div className='w-full flex items-center justify-between'>
           <h1 className='text-2xl font-semibold text-zinc-400'>
           <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#dd4343]"></i>
            Popular
           </h1>
          
           <div className='flex items-center w-[80%]'>
           <Topnav/>
           <DropDown title="category" options={["movie","tv","all"]} func={(e)=>setcategory(e.target.value)} />
           </div>
          </div>
        <InfiniteScroll
        dataLength={Popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
        >
        <Cards data={Popular} title="category" />
          </InfiniteScroll>     
        </div>
      ) : <Loading/>
}

export default Popular