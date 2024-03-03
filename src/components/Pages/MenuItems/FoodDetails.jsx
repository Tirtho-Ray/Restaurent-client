import{ useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const FoodDetails = () => {
  const foods = useLoaderData();
  const { _id, Picture, Name, Category, Made, Price, Description, Rating, Pieces } = foods;

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mt-8 ">
      <div className="w-[340px] md:w-[650px] lg:w-[900px] mx-auto px-4 md:px-6 lg:px-6 lg:py-7 py-8 rounded-lg shadow-2xl">
        <div className="grid md:grid-cols-2 gap-3 lg:gap-6">
          <div>
            <img className="h-40 md:mt-2 w-full md:h-48 lg:h-52 rounded-md" src={Picture} alt="" />
          </div>
          <div>
            <div>
              <h1 className="font-Rowdies text-xl lg:text-3xl">{Name}</h1>
            </div>
            <div className="flex flex-1 justify-between">
              <div className="font-Bebas lg:text-xl mt-2">
                <h1>{Category}, {Made}</h1>
              </div>
              <div>
                <p className="font-Bebas">{Rating}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[12px]">{Description}</p>
            </div>
          </div>
          <div>
            <h1>
              <span className="text-xl font-Rowdies">${Price} </span>/ <span className="md:text-xl">{Pieces} pieces</span>
            </h1>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-[230px] lg:gap-[470px]">
          <div className="h-9 w-44 md:w-40 lg:w-60 rounded-3xl mt-6">
            <div className="flex justify-between px-2 plus rounded-xl">
              <div className="">
                <button
                  className="px-5 py-1 rounded-lg hover:bg-slate-300"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  -
                </button>
              </div>
              <div className="mt-1">
                <p>{quantity}</p>
              </div>
              <div className="">
                <button className="px-5 py-1 rounded-lg hover:bg-slate-400" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-7 md:gap-10 mt-6 md:mt-0">
            <div className='text-3xl h-10 w-10 hover:bg-white flex items-center justify-center rounded-full '>
              <MdOutlineFavoriteBorder />
            </div>
            <div>
              <Link to={`/update/${_id}`}>
                <button className='px-4 py-2 rounded-md bg-white border-red-500 hover:bg-red-200 text-[13px] font-bold border'>Add to cart</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div>
            <button className="py-2 px-[130px] md:px-[279px] lg:px-[400px] mt-1 bg-red-400 rounded-lg font-Bebas hover:bg-yellow-400">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
