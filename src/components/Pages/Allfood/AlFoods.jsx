import { useLoaderData } from "react-router-dom";


const AlFoods = () => {
    const foods = useLoaderData();

 
    return (
        <div>
            <h1>{foods.length}</h1>
        </div>
    );
};

export default AlFoods;