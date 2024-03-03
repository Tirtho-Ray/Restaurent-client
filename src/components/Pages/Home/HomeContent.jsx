import { useContext, useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../Auth/AuthProvider";

const HomeContent = () => {
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const{user}=useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/foods');
                const data = await response.json();
                setFoods(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div data-aos="fade-left">
                        <h1 className="text-center mt-5 text-xl md:text-4xl font-Rowdies">Our Popular Foods</h1>
                        <p className="text-center">----------------------------------</p>
             </div>
             {/* show all popular foods */}
            <div className="md:px-4">

            {/* Skeleton Loading ..... */}
            {isLoading ? (
                <div>
                    <Skeleton height={40} width={200} style={{ marginBottom: "10px" }} />
                    <Skeleton height={15} count={3} style={{ marginBottom: "15px" }} />
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-2 mt-6">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="mx-auto">
                                <div className="h-[170px] w-[105px] md:h-[300px] md:w-[240px] bg-slate-50 mb-3 md:mb-5 rounded-sm border shadow-xl">
                                    <Skeleton height={163} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : error ? (
                <p>Error fetching data: {error.message}</p>
            ) : (
                <>
                   
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-2 mt-6">
                        {foods
                        // filter food data 
                            .filter(foodItem => foodItem.Rating === 5)
                            // slice food data 10
                            .slice(0, 10)
                            // map data to food Api
                            .map((foodItem) => (
                                <div key={foodItem._id} className="mx-auto">
                                    <div className="h-[170px] w-[105px] md:h-[300px] md:w-[240px] bg-slate-50 mb-3 md:mb-5 rounded-sm border shadow-xl hover:bg-yellow-300 hover:rounded-2xl" data-aos="fade-left">
                                        <div>
                                            <img className="w-full h-24 md:h-[163px] rounded-sm" src={foodItem.Picture} alt={foodItem.Name} />
                                        </div>
                                        <div className="px-3 mt-2 md:mt-4">
                                            <h1 className="text-[10px] md:text-xl font-Rowdies">{foodItem.Name}</h1>
                                            <h1 className="font-Rowdies text-[10px] md:text-sm md:mt-4">Made: {foodItem.Made}</h1>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h1 className="font-Rowdies text-[10px] md:text-sm">{foodItem.Origin}</h1>
                                                </div>
                                                <div className="font-bold">
                                                    <div className="flex items-center gap-1">
                                                        <div>
                                                            <IoIosStar />
                                                        </div>
                                                        <div>
                                                            {foodItem.Rating}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* button go to foodMenu */}
                    <div className="flex justify-end">
                    <Link to={user ? "/foodsMenu" : "sign-up"}>
                    <button className="md:px-4 md:py-2 px-2 py-1 rounded-lg bg-yellow-300 font-Bebas ml-4">
                        Show more
                    </button>
                </Link>
                    </div>
                </>
            )}
        </div>
        </div>
    );
};

export default HomeContent;
