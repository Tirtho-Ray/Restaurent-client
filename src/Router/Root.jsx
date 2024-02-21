// import React from 'react';

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
    return (
        <div className="max-w-[1640px] mx-auto ">
         <Navbar></Navbar> 
         <Outlet></Outlet>  
        </div>
    );
};

export default Root;