import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage (){
    return (
           <div>
               <h1>Welcome to HouseOfDogs</h1>
               <Link to = "/home">
                   <button>Click here for continue</button>
               </Link>
           </div>
    )
}