import {GET_DOGS, GET_TEMPERAMENTS,FILTER_BY_TEMP } from "../actions";

const initialState = {
    dogs : [],
    temperaments : [],
    everyDogs : []


}


function rootReducer (state = initialState , action){
    switch (action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload,
                everyDogs:action.payload
            };
            case GET_TEMPERAMENTS: 
                    return{
                        ...state,
                        temperaments:action.payload 
                    };
            case FILTER_BY_TEMP:
            const everyDogs = state.everyDogs
            const tempFilter = action.payload === 'Temperaments'? everyDogs:everyDogs.filter(dog => {
             if(dog.temp && dog.temp.includes(action.payload)) return dog});
             

                    return {...state, 
                    dogs: tempFilter
                }
                    default:
                        return state;
    }

}



export default rootReducer;