import  { useContext, useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import { BsFillSaveFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaUserFriends, FaWallet,FaHome } from 'react-icons/fa';
import { FcAbout } from "react-icons/fc";
import { MdFavorite, MdHelp,MdAdminPanelSettings,MdOutlineFoodBank } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import User from '../User/User';
import { AuthContext } from '../Auth/AuthProvider';
import Swal from 'sweetalert2';
// import FoodCart from '../Pages/MenuItems/FoodCart';


const Navbar = () => {

  const{user,logOut}=useContext(AuthContext);
  const [nav, setNav] = useState(false);
  const [cart, setCart]=useState([]);
  // const {user}= useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(user);
  useEffect(() => {
    // Fetch cart data from http://localhost:5000/cart
    fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(data => setCart(data))
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);
  // console.log(cart);
  const cartItemCount = cart.length;
  // const cart = 1;


  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };
  const handelLogout = () => {
    // Display SweetAlert confirmation
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicks "Yes, logout", perform the logout and navigate to home page
        logOut()
          .then(() => {
            window.location.href = '/'; // Change '/home' to your home page URL
          })
          .catch((error) => {
            console.error('Logout error:', error);
          });
      }
    });
  };

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center py-6 px-3 md:px-  '>
      {/* Left side */}
      <div className='flex items-center'>
        <div onClick={toggleNav} className='cursor-pointer'>
          <AiOutlineMenu size={30} />
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
          Best <span className='font-bold'>Eats</span>
        </h1>
        <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
          <p className='bg-black text-white rounded-full p-2'>Delivery</p>
          <p className='p-2'>Pickup</p>
        </div>
      </div>

      {/* Search Input */}
      <div>
      
      </div>
      {/* user and cart menu */}
          <div className='flex items-center gap-8 mr-3'>
            <div className='text-xl'>
               
                <div className="dropdown dropdown-left">
                  <div tabIndex={0} role="button" className=""> <User /></div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                  </ul>
                </div>
               
            </div>
            {/* cart */}
            <Link to={`/cart`}>
              <div className='flex items-center gap-1 mr-3'>
                  <div className='font-Rowdies'>
                      Cart
                  </div>
                  <div className='text-2xl'>
                   
                    <div className='relative'>
                      <AiOutlineShoppingCart />
                    </div>
                    <div className='absolute top-4 px-3 rounded-full'>
                    <div className='text-[14px] bg-red-400 text-center rounded-full h- w-[32px] font-Bebas'>
                  {cartItemCount}
                </div>
                      </div>

                  </div>
              </div>
            </Link>
          </div>

      {/* Mobile Menu Overlay */}
      {nav && <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div>}


{/* ************************************ Left SIDE MENU ****************************************************** */}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 overflow-scroll'
            : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
        }
      >
        <AiOutlineClose
          onClick={toggleNav}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          Best <span className='font-bold'>Eats</span>
        </h2>
        <nav className=''>
          <ul className='flex flex-col p-4 text-gray-800'>
          <li className='text-xl py-4 flex'>
              <FaHome size={25} className='mr-4' />
              <NavLink to="/" onClick={closeNav}>
                Home
              </NavLink>
            </li>
            <li className='text-xl py-4 flex'>
              <FcAbout size={25} className='mr-4' />
              <NavLink to="/about" onClick={closeNav}>
               About
              </NavLink>
            </li>
            <li className='text-xl py-4 flex'>
              <TbTruckDelivery size={25} className='mr-4' />
              <NavLink to="/login" onClick={closeNav}>
                Order
              </NavLink>
            </li>
            {user && (
              <li className='text-xl py-4 flex'>
                <MdOutlineFoodBank size={25} className='mr-4' />
                <NavLink to="/foodsMenu" onClick={closeNav}>
                  FoodsMenu
                </NavLink>
              </li>
            )}
                  
            <li className='text-xl py-4 flex'>
              <MdFavorite size={25} className='mr-4' />
              <NavLink to="/favorite" onClick={closeNav}>
              Favorite
              </NavLink>
            </li>
            <li className='text-xl py-4 flex'>
              <MdHelp size={25} className='mr-4' /> Help
            </li>
            <li className='text-xl py-4 flex'>
              <AiFillTag size={25} className='mr-4' /> Promotions
            </li>
            <li className='text-xl py-4 flex'>
              <MdOutlineFoodBank size={25} className='mr-4' />
              <NavLink to="/sign-up" onClick={closeNav}>
              Sign Up
              </NavLink>
            </li>
            <li className='text-xl py-4 flex'>
              <MdOutlineFoodBank size={25} className='mr-4' />
              {
                user?<button className='text-xl  flex' onClick={handelLogout}>Logout</button>:
                <NavLink to="/login" onClick={closeNav}>
                Login
                </NavLink>
              }
            </li>
            {/* Admin panel DropDown */}
            {user&&(
              <div className="dropdown  dropdown-top">
              <div tabIndex={0}  className=" text-xl m-1 flex cursor-pointer ">
                <MdAdminPanelSettings size={25} className='mr-4' onClick={closeNav}/>
                Admin Panel
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl border bg-base-100 rounded-box w-52">
                <li className='text-xl flex'>
                <TbTruckDelivery size={25} className='mr-4' />
                <NavLink to="/addProducts" onClick={closeNav}>
                 AddProducts
                </NavLink>
              </li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
            )

            }
            {/* End admin panel */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
