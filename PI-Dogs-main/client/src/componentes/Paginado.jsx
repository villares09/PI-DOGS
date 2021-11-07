import React from "react";
import styles from "./styles/Paginado.module.css"
export default function Paginado ({dogsPerPage,allDogs,paginado}){
    const pageNumbers =[]

    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className ={styles.crumb}>
                {pageNumbers &&
                pageNumbers.map(number=>( 
                    <li className = "number" key ={number} > 
                    <a href onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}