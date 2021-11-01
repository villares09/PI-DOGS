import React from "react";
import { useState, useEffect } from "react";
import {useDispatch , useSelector} from "react-redux";
import {getDogs , getTemperaments, filterDogsByTemp ,filterCreated,orderByName, orderByWeight} from "../actions";
import {Link} from "react-router-dom"
import CardDogs from "./CardDogs"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";


export default function Home (){
    const dispatch = useDispatch()
    const allDogs = useSelector((state) =>state.dogs)
    const allTemperaments = useSelector ((state)=> state.temperaments)
    const [currentPage,setCurrentPage] = useState(1)
    const [dogsPerPage,setDogsPerPage] = useState(8)
    const indexLastDog = currentPage * dogsPerPage
    const indexFirstDog = indexLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexFirstDog,indexLastDog)
    const [orden, setOrden] = useState('')

    const paginado =(pageNumber)=>{
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
           },[dispatch])
    //  useEffect(()=>{
    //     dispatch(getTemperaments());
    //         },[])

    function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
    dispatch(getTemperaments());
    }
    function handleFilterTemp(e){
        dispatch(filterDogsByTemp(e.target.value))
    }
    function handlefilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        
    }
    function handleSortWeight (e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
        <Link to = "/dog">Create a new Dog</Link>
        <h1>Here we can appreciate all the Dog breeds</h1>
        <button onClick ={e => {handleClick(e)}}>
             Reload back the dogs
        </button>
        <SearchBar/>
          <select onChange={(e)=>handleSort(e)}>
              <option value = "Asc">Sort Ascending</option>
              <option value = "Des">Sort Descending</option>
          </select>
          <select onChange= {e => handleSortWeight(e)}>
                   <option value= 'asc'>WEIGHT LIGHT</option>
                   <option value= 'des'>WEIGHT HEAVY</option>
          </select>
         <select onChange={(e)=>handleFilterTemp(e)}>
                    <option name='temp' key={'a'}>Temperaments</option>
                    {allTemperaments.map((tem,i)=>(
                        <option name='temperaments'key={i} value={tem.name}>{tem.name}</option>
                        ))}
         </select>
         <select onChange= {e => handlefilterCreated(e)}>
                   <option value= 'Dogs'>AllDogs</option>
                   <option value= 'created'>Created</option>
                   <option value= 'api'>Breeds</option>
        </select>
        <Paginado
        dogsPerPage = {dogsPerPage}
        allDogs = {allDogs.length}
        paginado = {paginado}
        />   
          {currentDogs?.map((c)=>{
              return (
                  <div>
                      <Link to= {"/home/" + c.id}>
                     <CardDogs
                      key = {c.id}
                      name={c.name} 
                      image= {c.image}
                      weightMin= {c.weightMin} 
                      weightMax = {c.weightMax}
                      temp= {c.temp}
                       />
                      </Link>
                  </div>
              )
          })
              
          }
        </div>
        
    )
}


