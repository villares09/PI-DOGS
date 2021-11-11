import {GET_DOGS, GET_TEMPERAMENTS,FILTER_BY_TEMP, FILTER_CREATED,ORDER_BY_NAME,ORDER_BY_WEIGHT, SEARCHBAR , GET_DETAILS } from "../actions";

const initialState = {
    dogs : [],
    temperaments : [],
    everyDogs : [],
    detail : [],


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
                };
            case FILTER_CREATED:
                const everyDogs2 = state.everyDogs
                const filterCreated =action.payload === "created"? everyDogs2.filter(el => el.createinDataBase) : everyDogs2.filter(el => !el.createinDataBase)
                return {...state,
                dogs: action.payload === "dogs"? state.everyDogs : filterCreated
            }
            case ORDER_BY_NAME:
                   let sortedArr = action.payload === "Asc"? state.dogs.sort (function (a,b){
                       if (a.name.toLowerCase() > b.name.toLowerCase()){
                           return 1;
                       }
                       if (b.name.toLowerCase() > a.name.toLowerCase()){
                           return -1;
                       } return 0;
                   }):
                   state.dogs.sort(function (a,b){
                       if (a.name.toLowerCase() > b.name.toLowerCase()){
                           return -1;
                       }
                       if (b.name.toLowerCase() > a.name.toLowerCase()){
                           return 1;
                       } return 0;
                   })      
                   return {
                       ...state,
                       dogs: sortedArr

                   }
            case ORDER_BY_WEIGHT:
                const Nan= state.dogs.filter(e=> !isNaN(e.weight? e.weight[0]:e.weightMin))
                let sortedArr2 = action.payload === "asc"? Nan.sort (function (a,b){
                    if(parseInt(a.weight? a.weight[0] : a.weighMin) > parseInt(b.weight? b.weight[0] : b.weightMin)){
                        return 1;
                    }

                    if(parseInt(b.weight? b.weight[0] : b.weightMin) > parseInt(a.weight? a.weight[0] : a.weightMin)){
                        return -1
                    }return 0;
                }):
                state.dogs.sort(function (a,b){
                    if(parseInt(a.weight? a.weight[0] : a.weightMin) > parseInt(b.weight? b.weight[0] : b.weightMin)){
                        return -1
                    }
                    if(parseInt(b.weight? b.weight[0] : b.weightMin) > parseInt(a.weight? a.weight[0] : a.weightMin)){
                        return 1
                    } return 0;
                }) 
                return {
                    ...state,
                    dogs: sortedArr2

                }
            case SEARCHBAR:
                    return{
                     ...state,
                     dogs: action.payload
                    }
            case GET_DETAILS:
                return{
                     ...state,
                     detail: action.payload
                        }
            case "CREATE_DOG":
                return{
                    ...state,
                 }            
                    default:
                    return state;
    }

}



export default rootReducer;