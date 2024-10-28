// Code: Navbar component

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>

      <div className='text-3xl'> <i class="fa-solid fa-clapperboard" ></i>  </div> 

      <Link to="/" className='text-blue-400 text-3xl font-bold'>Movies</Link>

      <Link to="/watchlist"  className='text-blue-400 text-3xl font-bold'>
        Watchlist
      </Link>


    </div>
  )
}

export default Navbar
