import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { IoMdStarOutline } from "react-icons/io";
import { Link } from 'react-router-dom';


const ShowFoodItems = ({food}) => {
    const {_id,Picture,Name,Category,Made,Price,Origin, description ,Rating,Top,Type,Pieces,Discount} = food;
    return (
        <div className='mt-6 '>
            
            <div className='h-[412px] w-[280px] bg-slate-50 rounded-xl border shadow-xl'>
            <div >
                <img className='w-full h-[163px] img' src={Picture} alt="" />
            </div>
            <div className='px-3 mt-2'>
                <h1 className='text-xl font-Rowdies'>{Name}</h1>
                <h1 className='font-Rowdies text-[16px] text '>{Category}</h1>
                <h1 className='font-Rowdies text  '>{Made}</h1>
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
                        {/* <h1 className='font-Bebas text-xl'>{Rating}<IoMdStarOutline></IoMdStarOutline></h1> */}
                        <div>
                            <IoMdStarOutline />
                        </div>
                        <div>
                                {Rating}
                        </div>
                    </div>
                </div>
                {/* lust section */}
                <div className='flex justify-between items-center '>
                    <div className='text-2xl h-10 w-10 hover:bg-white flex items-center justify-center rounded-full '>
                        <MdOutlineFavoriteBorder />
                    </div>
                    {/* show details */}
                    <div>
                       <Link to={`/details/${_id}`}>
                        <button className='px-2 py-1 rounded-md font-bold  bg-white text-[13px] border border-red-500'>Details</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/cart/${_id}`}> 
                        <button className='px-2 py-1 rounded-md  bg-white border-red-500 hover:bg-red-200 text-[13px] font-bold border'>Add to cart</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className=' py-2 px-[110px] mt-1  bg-red-400 rounded-lg  font-Bebas hover:bg-yellow-400 '> Buy Now</button>
            </div>
        </div>

        </div>
    );
};

export default ShowFoodItems;