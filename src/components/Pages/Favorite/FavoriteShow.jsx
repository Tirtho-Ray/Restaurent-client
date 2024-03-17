import React, { useState, useEffect, useContext } from 'react';
import { LuUtensilsCrossed } from "react-icons/lu";
import './Favourit.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthProvider';

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
  </div>
);

const FavoriteShow = () => {
  const { user } = useContext(AuthContext);

  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const response = await fetch(`https://restaurent-server-three.vercel.app/favorites?userEmail=${user.email}`, { withCredentials: true });
        if (response.ok) {
          const data = await response.json();
          setFavoriteItems(data);
        } else {
          console.error('Failed to fetch favorite items');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        // Delete on the server
        const response = await fetch(`https://restaurent-server-three.vercel.app/favorites/${itemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          console.error('Failed to delete favorite item on the server');
          return;
        }

        // Delete on the client
        setFavoriteItems((prevItems) => prevItems.filter(item => item._id !== itemId));

        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your item is safe :)',
          'info'
        );
      }
    } catch (error) {
      console.error('Error deleting favorite item:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='px-4'>
      {favoriteItems.length === 0 ? (
        <div className="text-center mt-4">
         <div>
          <div className='line'>

          </div>
          <div>
          <p className='mt-10 mb-32 text-3xl font-bold'>No favorite items found ?</p>
         
          </div>
         </div>
        </div>
      ) : (
        favoriteItems.map((item) => (
          <div key={item._id} className="mx-auto max-w-[600px]">
            <div>
              <h2>{item.length}</h2>
              <div className='favorite-box h-[75px] md:h-24 lg:h-36 mt-1 mx-auto '>
                <div className='flex justify-between items-center md:px-2 py-[7px] md:py-1 px-1 lg:py-0 lg:mt-3'>
                  <div>
                    <img className='w-20 h-[60px] md:h-[85px] lg:h-[118px] md:w-32 lg:w-40 rounded-md' src={item.foodPictures} alt="image" />
                  </div>
                  <div className=''>
                    <h1 className='text-[10px] md:text-[12px] lg:text-[14px] font-Bebas'>{item.foodName}</h1>
                  </div>
                  <div>
                    <h1 className='text-[8px] md:text-[12px] lg:text-[14px] font-Bebas'>
                      <span className='invisible md:visible'> Price: </span>
                      {item.foodPrice}
                    </h1>
                  </div>
                  <div className='text-[8px] md:text-[12px] lg:text-[14px] font-Bebas'>
                    <span className='invisible md:visible '> made: </span>{item.foodMade}
                  </div>
                  <div>
                    <Link to={`/details/${item._id}`}>
                      <button className='text-[8px] md:text-[12px] lg:text-[14px] px-2 py-2 md:bg-slate-400 rounded-[6px] font-Bebas'>
                        Details
                      </button>
                    </Link>
                  </div>
                  <div>
                    <button className=' ' onClick={() => handleDelete(item._id)}><LuUtensilsCrossed /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoriteShow;
