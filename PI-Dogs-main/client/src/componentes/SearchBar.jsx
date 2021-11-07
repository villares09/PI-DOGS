import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getName } from "../actions";
import styles from "./styles/SearchBar.module.css"

export default function SearchBar(){
    const [search, setSearch] = useState(``)
    const dispatch = useDispatch();

    function onSubmit(e){
        e.preventDefault();
        dispatch(getName(search))
    }

    function onImputChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }

    return(
        <div>
            <form  onSubmit = {onSubmit}>
                <input className = {styles.search} type="text" value= {search} onChange = {onImputChange} />
                <input className = {styles.looking} type="submit" value= "Search" onSubmit = {onSubmit} />
            </form>
        </div>
    )
}