
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../components/Pages/Home/Home";
import About from "../components/Pages/About/About";
import AddProducts from "../components/Pages/Admin/AddProducts";
import FoodsMenu from "../components/Pages/MenuItems/FoodsMenu";
import Loader from "./Loader";
import FoodDetails from "../components/Pages/MenuItems/FoodDetails";
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import Favorite from "../components/Pages/Favorite/Favorite";
import Addcart from "../components/Pages/Addcart/Addcart";
import BuyNow from "../components/Pages/BuyNow/BuyNow";
import UpdateProduct from "../components/Pages/Admin/UpdateProduct";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Loader></Loader>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"about",
            element:<About></About>
        },
        {
          path:"addProducts",
          element:<AddProducts></AddProducts>
        },
        {
          path:"updatesProducts",
          element:<UpdateProduct />,
          loader:()=> fetch('http://localhost:5000/foods')
        },
        
        {
          path:"foodsMenu",
          element:<FoodsMenu></FoodsMenu>,
          // loader:()=> fetch('http://localhost:5000/foods')
        },
        {
          path:"details/:id",
          element:<FoodDetails></FoodDetails>,
          loader:({params})=> fetch(`http://localhost:5000/foods/${params.id}`)
        },
        {
          path:"cart",
          element:<Addcart />,
          // loader:({params})=> fetch(`http://localhost:5000/food/${params.id}`)
        },

        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/sign-up",
          element:<Register />
        },
        {
          path:"/favorite",
          element:<Favorite />,
          // loader:()=>fetch('http://localhost:5000/favorites')
        },
        {
          path:"buy/:id",
          element:<BuyNow />,
          loader:({params})=> fetch(`http://localhost:5000/foods/${params.id}`)
        },
        
        
      ]
    },
  ]);
export default router;