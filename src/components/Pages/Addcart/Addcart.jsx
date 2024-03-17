import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthProvider';
import { RxCrossCircled } from 'react-icons/rx';
import axios from 'axios';

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
  </div>
);

const Addcart = () => {
  const { user } = useContext(AuthContext);
  // console.log(user.email);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemQuantities, setItemQuantities] = useState({});

  const increaseQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 1) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://restaurent-server-three.vercel.app/cart?userEmail=${user.email}`,{withCredentials:true});
        if (response.status === 200) {
          // Filter cart items based on user's email
          const filteredCart = response.data.filter(item => item.userEmail === user.email);
          setCart(filteredCart);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleDelete = async (itemId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await fetch(`https://restaurent-server-three.vercel.app/cart/${itemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          console.error('Failed to delete favorite item on the server');
          return;
        }

        setCart((prevItems) => prevItems.filter((item) => item._id !== itemId));
        setItemQuantities((prevQuantities) => {
          const { [itemId]: deletedItem, ...newQuantities } = prevQuantities;
          return newQuantities;
        });

        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your item is safe :)', 'info');
      }
    } catch (error) {
      console.error('Error deleting favorite item:', error);
    }
  };

  const calculateItemTotal = (item) => {
    return (item.foodPrice || 0) * (itemQuantities[item._id] || 1);
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  };
  const handleOrder = async () => {
    try {
      if (!user) {
        // If not logged in, redirect to the sign-up page
        navigate("/sign-up")
        return;}
      await Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: 'Your order has been successfully placed. Thank you!',
        confirmButtonText: 'OK',
      });

      // Optionally, you can redirect the user to a confirmation page or perform other actions
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle errors, if any
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again!',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="md:px-4 ">
      <div>
        <div className="py-6 md:py-8 bg-red-400">
          <h1 className="text-center text-xl md:text-3xl lg:text-5xl md:mt-4 font-BBlack text-white">
            Your cart item
          </h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 px-2">
        {cart.length === 0 ? (
          <div className="text-center mt-8">
            <p className='md:text-3xl text-center font-bold mt-20'>No items in your cart.</p>
            <Link to="/foodsMenu">
              <button className="py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg md:mt-20 mb-20">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div>
              <div className="flex justify-between py-6 ">
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Your cart</h1>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Item: {cart.length}</h1>
                </div>
              </div>

              {cart.map((item, index) => (
                <div
                  key={index}
                  className="favorite-box h-[160px] md:h-[190px] lg:h-[160px] mt-1 mx-auto py-2 px-2  md:py-4"
                >
                  <div className="flex gap-x-2 ">
                    <div>
                      <img
                        className="w-20 h-[85px] md:h-[100px] lg:h-[118px] md:w-32 lg:w-40 rounded-md"
                        src={item.foodPictures}
                        alt={item.FoodName}
                      />
                    </div>
                    <div className="flex-1 px-3">
                      <div className="flex justify-between ">
                        <div>
                          <h1 className="md:text-xl font-bold">{item.foodName}</h1>
                          <h1 className="font-bold text-[12px] md:text-[16px]">{item.foodMade}</h1>
                        </div>
                        <div className="text-xl" onClick={() => handleDelete(item._id)}>
                          {' '}
                          <RxCrossCircled />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-xl font-bold mt-2">${item.foodPrice}</h1>
                        <div className="mt-3">
                          <div className="flex justify-between px-2 w-40 bg-slate-300 py-[1px] rounded-xl">
                            <div className="">
                              <button
                                className="px-5 py-1 rounded-lg hover:bg-slate-300"
                                onClick={() => decreaseQuantity(item._id)}
                                disabled={itemQuantities[item._id] === 1}
                              >
                                -
                              </button>
                            </div>
                            <div className="mt-1">
                              <p>{itemQuantities[item._id] || 1}</p>
                            </div>
                            <div className="">
                              <button
                                className="px-5 py-1 rounded-lg hover:bg-slate-400"
                                onClick={() => increaseQuantity(item._id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-2 mt-[3px] md:mt-[9px] lg:mt-[12px]">
              <div>
                <h1 className="text-center text-xl font-bold py-6">Order summary</h1>
              </div>
              <div className="px-3 py-2 bg-slate-50 rounded-md">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <div>
                      <h1 className='font-bold text-red-300'>{item.foodName}</h1>
                      <p className='font-bold 
                      '>${item.foodPrice} x {itemQuantities[item._id] || 1}</p>
                    </div>
                    <div>
                      <h1 className='font-bold'>${calculateItemTotal(item)}</h1>
                    </div>
                  </div>
                ))}
                <div>
                  <h1 className="line"></h1>
                </div>
                <div className="flex justify-between py-2">
                  <div>
                    <h1 className="text-xl font-bold">Total</h1>
                  </div>
                  <div>
                    <h1 className='font-bold'>${calculateGrandTotal()}</h1>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button onClick={handleOrder} className="py-2 px-[67.5px] md:px-[95px] lg:px-[100px] xl:px-[170px]  mb-2 bg-red-400 rounded-lg font-Bebas hover:bg-yellow-400 ">
                    Processed to check out
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Addcart;
