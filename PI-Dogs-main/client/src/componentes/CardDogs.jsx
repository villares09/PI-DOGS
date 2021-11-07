import React from "react";
import styles from "./styles/CardDogs.module.css"
import {Link} from "react-router-dom"

export default  function Card ({ name , image, weightMin , weightMax, temp, id}){
    return(
        <div className = {styles.conteiner}>
            <div className = {styles.card}> 
            <figure>
            <img src={image} alt="Not Found" width="150px" height="150px"/>
            </figure>
            <div className = {styles.contenido}>
            <h3 className = {styles.h3}>{name}</h3>
            <label className = {styles.label}>WeightMin:{weightMin} WeightMax:{weightMax}</label>
            <h3 className = {styles.h3}>{!Array.isArray(temp)? temp :temp.map(el => el.name).join(',')}</h3>
            <Link to= {"/home/"+id}> <button className={styles.more}>More info</button> </Link>
            </div>
            </div>
        </div>
    );
}