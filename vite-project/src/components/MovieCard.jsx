import React from "react";
import watchList from "./watchList";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchList,
  handleRemoveFromWatchlist,
  watchlist,
}) {


  function doesContain(movieObj){
    for(let i=0;i<watchlist.length;i++){
      if(watchlist[i].id===movieObj.id){
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="h-[43vh] w-[150px] bg-center bg-cover rounded-xl hover:scale-105 duration-300 hover:cursor-pointer flex flex-col justify-between items-end relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (<div onClick={() => handleRemoveFromWatchlist(movieObj)} className="m-2 rounded-lg bg-gray-900/60"> &#10060;</div>) :
      ( 
       <div
        onClick={() => handleAddtoWatchList(movieObj)}
        className="m-2 rounded-lg bg-gray-900/60"
      >
        &#128525;
      </div> )} 
     
      <div className="text-white text-center w-full bg-gray-700/60 antialiased p-1 rounded-xl backdrop-blur-md absolute inset-x-0 bottom-0">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
