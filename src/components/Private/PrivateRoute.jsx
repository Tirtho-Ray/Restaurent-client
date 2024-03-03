import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading}=useContext(AuthContext)
    if(loading){
        return <span className="loading loading-spinner text-neutral h-screen w-10 mx-auto ml-4 md:ml-20 lg:ml-32"></span>
    }
    if (user){
        return children;
    }
    return <Navigate to="/login"></Navigate>
        
};

export default PrivateRoute;
