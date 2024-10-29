import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import Movies from "./components/Movies";
import WatchList from "./components/watchlist";
import Banner from "./components/Banner";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  let [watchlist, setWatchlist] = useState([]);

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("movieApp", JSON.stringify(newWatchList));
    setWatchlist(newWatchList);
    console.log(newWatchList);
  };

  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    localStorage.setItem("movieApp", JSON.stringify(filteredWatchlist));
    setWatchlist(filteredWatchlist);
  };

  useEffect(() => {
    let movieFromLocalStorage = localStorage.getItem("movieApp");
    if (!movieFromLocalStorage) {
      return;
    }
    setWatchlist(JSON.parse(movieFromLocalStorage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movies
                  watchlist={watchlist}
                  handleAddtoWatchList={handleAddtoWatchList}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
