import React, { useContext, useState } from 'react';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { IoMdStarOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthProvider';
import sweetalert from 'sweetalert';

const ShowFoodItems = ({ food ,onDelete}) => {
  const {
    _id,
    Picture,
    Name,
    Category,
    Made,
    Price,
    Origin,
    description,
    Rating,
    Top,
    Type,
    Pieces,
    Discount,
  } = food;

  const { user } = useContext(AuthContext);
  const isAdmin = user && user.email === "admin@gmail.com";
    // const isAdmin = user.email === "admin@gmail.com";


  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:5000/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user.email,
          foodPictures: Picture,
          foodName: Name,
          foodRating: Rating,
          foodPrice: Price,
          foodMade: Made,
        }),
      });
  
      if (response.ok) {
        setIsFavorite(true);
        sweetalert('Added to Favorites!', { icon: 'success' }); // Pass a string message here
      } else {
        console.error('Failed to add item to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

// add to cart value
  const addCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user.email,
          foodPictures: Picture,
          foodName: Name,
          foodRating: Rating,
          foodPrice: Price,
          foodMade: Made,
        }),
      });

      if (response.ok) {
        sweetalert('Added to Cart!' );
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteFoodItem = async () => {
    try {
      const response = await fetch(`http://localhost:5000/foods/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        sweetalert('Deleted successfully!', { icon: 'success' });
        // You can also perform additional actions, such as refreshing the page or updating the state.
        onDelete(_id);
      } else {
        console.error('Failed to delete food item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='mt-6'>
      <div className='h-[412px] w-[280px] bg-slate-50 rounded-xl border shadow-xl'>
        <div>
          <img className='w-full h-[163px] img' src={Picture} alt='' />
        </div>
        <div className='px-3 mt-2'>
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl font-Rowdies'>{Name}</h1>
            </div>
            <div className='text-xl font-bold'>
            {isAdmin && (
              <div className='text-xl font-bold'>
                <button
                  className='font-bold  px-2 bg-red-300  rounded-lg'
                 onClick={deleteFoodItem}
                >
                 x
                </button>
              </div>
            )}
               
            </div>
          </div>
          <div className='flex justify-between'>
            <div>
              <h1 className='font-Rowdies text-[16px] text '>{Category}</h1>
            </div>
            <div >
            {isAdmin && (
              <div>
               <Link to="/">
               <button
                  className='font-bold px-1 bg-yellow-300 rounded-lg mt-1'
                  
                >
                 update
                </button>
               </Link>
              </div>
            )}
            </div>
          </div>
          <h1 className='font-Rowdies text '>{Made}</h1>
          <h1 className='font-Rowdies text '>{Origin}</h1>
          <div className='flex justify-between'>
            <div className='flex gap-3 text-xl font-Bebas mt-2 '>
              <div>
                <h1 className='text-xl'>$ {Price}</h1>
              </div>
              <div>
                <h1 className='text-[10px] font-Rowdies '>/ {Pieces}pieces</h1>
              </div>
            </div>
            <div className='flex justify-center items-center gap-1 font-Bebas text-xl'>
              <div>
                <IoMdStarOutline />
              </div>
              <div>{Rating}</div>
            </div>
          </div>
          <div className='flex justify-between items-center '>
            <div>
              <div
                className={`text-2xl h-10 w-10 hover:bg-white flex items-center justify-center rounded-full ${
                  isFavorite ? 'text-red-500' : ''
                }`}
                onClick={addToFavorites}
              >
                <MdOutlineFavoriteBorder />
              </div>
            </div>
            <div>
              <Link to={`/details/${_id}`}>
                <button className='px-2 py-1 rounded-md font-bold  bg-white text-[13px] border border-red-500'>
                  Details
                </button>
              </Link>
            </div>
            <div>
              <button
                onClick={addCart}
                className='px-2 py-1 rounded-md  bg-white border-red-500 hover:bg-red-200 text-[13px] font-bold border'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <Link to={`/cart`}>
            <button className='py-2 px-[110px] mt-1  bg-red-400 rounded-lg  font-Bebas hover:bg-yellow-400 '>
              {' '}
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowFoodItems;

