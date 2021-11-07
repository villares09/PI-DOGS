import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect} from "react";
import styles from "./styles/Detail.module.css"


export default function Detail(props){
    // console.log(props)
    const dispatch = useDispatch()
    
    useEffect (()=>{
        dispatch (getDetail(props.match.params.id))
    },[dispatch])

    const myDogs = useSelector ((state)=> state.detail)
    // console.log("que onda esto",myDogs[0])
    return (
        <div>
            {
                myDogs?.length > 0 ?
                <div className={styles.background}>
                    <div className={styles.contenedor}>
            <Link  to ='/home'>
                <button className={styles.button}>Back</button>
            </Link>
                    <h1 className={styles.text}>Hi my breed is: {myDogs[0].name} </h1>
                    <img src= {myDogs[0].img? myDogs[0].img : myDogs[0].image} className={styles.image} alt="Not Found" width="200px" height="200px"/>
                    <h3 className={styles.text2}>Temperaments :{!myDogs[0].createinDataBase? myDogs[0].temp :myDogs[0].Temperaments.map(el => el.name).join(" ,") } </h3>
                    {/* {console.log("hola",myDogs[0].Temperaments.map(el=> el.name + (" ")))} */}
                    <label className={styles.text2}>Weight Min :{myDogs[0].weightMin} Weight Max :{myDogs[0].weightMax} </label>
                    <label className={styles.text2}>Height Min :{myDogs[0].heightMin} Height Max :{myDogs[0].heightMax} </label>
                    <h2 className={styles.text2}>Life span :{myDogs[0].life_span} </h2>
                    </div>
                </div> : <p>Loading...</p>
            }
        </div>
    )

}