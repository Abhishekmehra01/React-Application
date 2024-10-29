import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import genreids from "../Utility/genre";

function WatchList({ watchlist, setWatchlist,handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let sortIncreasing = () => {
    let SortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...SortedIncreasing]);
  };

  let sortDecreasing = () => {
    let SortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });

    setWatchlist([...SortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);

    setGenreList(["All Genres", ...temp]);
  }, [watchlist]);

  return (
    <>
      {/* <div className="text-2xl m-5 font-bold text-center">Watchlist</div> */}
      <div className="flex justify-center my-4">
        {genreList.map((genre) => {
          return (
            <button
              onClick={() => {
                handleFilter(genre);
              }}
              className={
                currGenre === genre
                  ? "bg-blue-500 text-white px-4 py-2 rounded-xl mx-2 hover:bg-sky-600"
                  : "bg-gray-400 text-white px-4 py-2 rounded-xl mx-2"
              }
            >
              {genre}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          className="border bg-gray-200 text-center text-xl rounded outline-none px-4"
          type="text"
          placeholder="search"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2">
                  <button>
                    <i class="fa-solid fa-arrow-up"></i>
                  </button>
                </div>
                <div className="p-2">Rating</div>
                <div onClick={sortDecreasing} className="p-2">
                  <button>
                    <i class="fa-solid fa-arrow-down"></i>
                  </button>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieObj) => {
              if (currGenre === "All Genres") {
                return true;
              } else {
                return genreids[movieObj.genre_ids[0]] === currGenre;
              }
            })
              .filter((movieObj) => {
                return movieObj.original_title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                      ></img>
                      <div className="mx-10">{movieObj.original_title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    <td className="text-red-700">
                      <button>
                        
                        <i class="fa-solid fa-trash-can" onClick={() => handleRemoveFromWatchlist(movieObj)}></i>
                        
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
