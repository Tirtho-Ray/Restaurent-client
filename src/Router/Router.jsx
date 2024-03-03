
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../components/Pages/Home/Home";
import About from "../components/Pages/About/About";
import AddProducts from "../components/Pages/Admin/AddProducts";
import FoodsMenu from "../components/Pages/MenuItems/FoodsMenu";
import Loader from "./Loader";
import FoodDetails from "../components/Pages/MenuItems/FoodDetails";
// import UpdateProduct from "../components/Pages/Admin/UpdateProduct";
import FoodCart from "../components/Pages/MenuItems/FoodCart";
import Login from "../components/User/Login";

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
          path:"cart/:id",
          element:<FoodCart></FoodCart>,
          loader:({params})=> fetch(`http://localhost:5000/food/${params.id}`)
        },
        {
          path:"/login",
          element:<Login></Login>
        }
        // {
        //   path:'update/:id',
        //   element:<UpdateProduct></UpdateProduct>,
        //   loader: ({params}) => fetch(`http://localhost:5000/foods/${params.id}`)
        // }
      ]
    },
  ]);
export default router;