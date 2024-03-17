import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoFilterOutline } from "react-icons/io5";
import ShowFoodItems from './ShowFoodItems';
import './FoodMenu.css';

const FoodsMenu = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API or use your data loading mechanism
        const fetchData = async () => {
            try {
                const response = await fetch('https://restaurent-s.vercel.app/foods'); // Replace with your actual API endpoint
                const data = await response.json();
                setAllFoods(data);
                setFilteredFoods(data); // Initially, set filteredFoods to allFoods
                setLoading(false); // Set loading to false when data is loaded
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        // Update filteredFoods based on the search term
        const filteredResults = allFoods.filter(food =>
            food.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            food.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            food.Name.toUpperCase().includes(searchTerm.toUpperCase()) ||
            food.Category.toUpperCase().includes(searchTerm.toUpperCase())
        );

        setFilteredFoods(filteredResults);
    };

    return (
        <div>
            <div className='flex justify-around items-center mt-8'>
                <div>
                    <h2 className='text-xl font-Bebas'>Food items: {searchTerm ? filteredFoods.length : allFoods.length}</h2>
                </div>
                <div className='bg-gray-200 rounded-full flex items-center px-2 w-[100px] sm:w-[300px] lg:w-[500px]'>
                    <AiOutlineSearch size={25} />
                    {/* SEARCH */}
                    <input
                        className='bg-transparent p-2 w-full focus:outline-none'
                        type='text'
                        placeholder='Search foods'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>
                    {/* Add your filter dropdown here */}
                </div>
            </div>

            {/* Conditional rendering for loader */}
            {loading ? (
                <div className='flex justify-center items-center mt-8'>
                    {/* Add your spinner or loader component here */}
                    <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mt-28 mb-40"></div>
                    </div>
                </div>
            ) : (
                <div className='flex justify-center'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 gap-8'>
                        {searchTerm ? (
                            filteredFoods.map(food => <ShowFoodItems key={food._id} food={food}></ShowFoodItems>)
                        ) : (
                            allFoods.map(food => <ShowFoodItems key={food._id} food={food}></ShowFoodItems>)
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodsMenu;
