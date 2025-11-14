import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';
import DropDown from './partials/DropDown';
import Topnav from './partials/Topnav';
import axios from '/src/utils/Axios.jsx';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function People() {
    const [people , setpeople] = useState([])
          const [category, setcategory] = useState("popular")
          const [duration, setduration] = useState("day")
          const [page, setpage] = useState(1)
          const [hasMore, sethasMore] = useState(true)
          document.title = "nitflix | people";
          const Navigate = useNavigate() 
          const Getpeople = async () => {
            try {
              const { data } = await axios.get(`/person/${category}?page=${page}`);
              if(data.results.length > 0){
                setpeople((prev)=>[...prev,...data.results]);
                setpage((prev)=>prev + 1);
              }
              else{
                sethasMore(false);
              }
              
            } catch (err) {
              console.error("Error fetching people data:", err);
            }
          };
        
          const refreshHandler = ()=>{
            if(people.length==0){
              Getpeople();
            }
            else{
              setpage(1);
              setpeople([]);
              Getpeople();
            }
          }
          useEffect(()=>{
            refreshHandler();
          },[category])
          return people.length > 0 ?
          (
            <div className='text-white w-screen px-[5%]'>
              <div className='w-full flex items-center justify-between'>
               <h1 className='text-2xl font-semibold text-zinc-400'>
               <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#dd4343]"></i>
                peoples <small className='ml-1 text-sm text-zinc-500'>({category})</small>
               </h1>
              
               <div className='flex items-center w-[80%]'>
               <Topnav/>
               <DropDown title="category" options={["now_playing","popular","top_rated","upcoming"]} func={(e)=>setcategory(e.target.value)} />
               </div>
              </div>
            <InfiniteScroll
            dataLength={people.length}
            next={Getpeople}
            hasMore={hasMore}
            loader={<h1>loading...</h1>}
            >
            <Cards data={people} title="people" />
              </InfiniteScroll>     
            </div>
          ) : <Loading/>
}

export default People