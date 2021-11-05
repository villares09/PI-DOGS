import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"
import styles from "./styles/LandingPage.module.css"

export default function LandingPage (){
    return (
        
           <div className = "stylesLandingPage">
               
               <div className = {styles.Text}> 
               <h1>Welcome to HouseOfDogs</h1>
               </div>
               
               <Link className="stylesEntrada" to = "/home">
                      <div id = "logo"> 
                        <img className={styles.image} src={logo} alt="Logo not found" width= "175"/>
                    </div>
               </Link>
           </div>
    )
}