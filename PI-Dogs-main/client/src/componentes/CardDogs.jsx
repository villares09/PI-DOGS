import React from "react";

export default  function Card ({ name , image, weightMin , weightMax, temp}){
    return(
        <div>
            <img src={image} alt="Not Found" width="150px" height="150px"/>
            <h3>{name}</h3>
            <label>WeightMin:{weightMin} WeightMax:{weightMax}</label>
            
            <h3>{temp}</h3>
        </div>
    );
}