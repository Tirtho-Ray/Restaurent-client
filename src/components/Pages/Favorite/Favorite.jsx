import React, { useState, useEffect } from 'react';
import { LuUtensilsCrossed } from "react-icons/lu";
import './Favourit.css';
import FavoriteShow from './FavoriteShow';

// Loader component to display while data is being fetched
// const Loader = () => (
//   <div className="flex items-center justify-center h-screen">
//   <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
// </div>
// );

const Favorite = () => {
  return(
    <div>
        <div>
             <h1 className='mt-5 text-center text-3xl font-Rowdies'>Your Favorite foods</h1>
        </div>
        <div className='mt-3'>
          <FavoriteShow />
        </div>
    </div>
  )
};

export default Favorite;
