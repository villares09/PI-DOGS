import axios from "axios";
export const GET_DOGS = 'GET_DOG'
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const FILTER_BY_TEMP = "FILTER_BY_TEMP"
export const FILTER_CREATED = "FILTER_CREATED"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const SEARCHBAR = "SEARCHBAR"
export const GET_DETAILS = "GET_DETAILS"

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
export function filterCreated (payload){
    return {
        type : FILTER_CREATED,
        payload

    }
}
export function orderByName (payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}
export function orderByWeight (payload){
    return{
        type: ORDER_BY_WEIGHT,
        payload
    }
}
export function getName(name){
 return async function (dispatch){
     const query= await axios.get ("http://localhost:3001/dogs?name=" +name)
     dispatch ({
         type:SEARCHBAR,
         payload: query.data
     })
 }
}
export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs/"+id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
 }
 export function createDog (payload){
     return async function (dispatch){
         const response = await axios.post ("http://localhost:3001/dogs/dog",payload)
         console.log (response)
         return response;
     }
 }