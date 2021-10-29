import axios from "axios";
export const GET_DOGS = 'GET_DOG'
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const FILTER_BY_TEMP = "FILTER_BY_TEMP"

export function getDogs(){
    return async function (dispatch){
        var json = await axios.get ("http://localhost:3001/dogs")
        return dispatch({
            type:GET_DOGS,
            payload: json.data,
        })
    }
      
}
export function getTemperaments(){
    return async function (dispatch){
        var json = await axios.get ("http://localhost:3001/Temperaments")
        return dispatch({
            type:GET_TEMPERAMENTS,
            payload: json.data,
        })
    }
      
}
export function filterDogsByTemp(payload){
    console.log(payload)
    return {
        type: FILTER_BY_TEMP,
        payload
    }
}
