import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect} from "react";


export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()
    
    useEffect (()=>{
        dispatch (getDetail(props.match.params.id))
    },[dispatch])

    const myDogs = useSelector ((state)=> state.detail)

    return (
        <div>
            {
                myDogs?.length > 0 ?
                <div>
                    <h1>Hi my name is :{myDogs[0].name} </h1>
                    <img src= {myDogs[0].img? myDogs[0].img : myDogs[0].image} alt="Not Found" width="200px" height="200px"/>
                    <h2>Temperaments :{myDogs.temp} </h2>
                    <label>Weight Min :{myDogs[0].weightMin} Weight Max :{myDogs[0].weightMax} </label>
                    <label>Height Min :{myDogs[0].heightMin} Height Max :{myDogs[0].heightMax} </label>
                    <h2>Life span :{myDogs[0].life_span} </h2>
                </div> : <p>Loading...</p>
            }
            <Link to ='/home'>
                <button>Back</button>
            </Link>
        </div>
    )

}