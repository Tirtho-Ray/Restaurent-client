import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";


const PrivateRoute = ({children}) => {
    const {user, loading}=useContext(AuthContext)
    const location = useLocation();
    // console.log(location);
    if(loading){
        return <span className="loading loading-spinner text-neutral h-screen w-10 mx-auto ml-4 md:ml-20 lg:ml-32"></span>
    }
    if (user){
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
        
};

export default PrivateRoute;
