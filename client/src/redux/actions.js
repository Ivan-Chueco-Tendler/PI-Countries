import axios from "axios";
import { GET_COUNTRIES, POST_ACTIVITY, PAGINATION, SEARCH_BY_CODE, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, SORT_ALPHABETICALLY, SORT_BY_POPULATION, GET_ACTIVITIES, RESET_FILTERS, COUNTRIES_BY_NAME } from "./actionTypes";

export function getCountries(){
    return (dispatch)=>{
    try{
        axios.get("http://localhost:3001/countries")
        .then((res)=>{
            return dispatch({
                type: GET_COUNTRIES,
                payload: res.data,
            })
        })
    }catch(e){
        console.log(e)
    }
    }
}

export function countriesByName(name){
    return (dispatch)=>{
    try{
        axios.get(`http://localhost:3001/countries?name=${name}`)
        .then((res)=>{
            return dispatch({
                type: COUNTRIES_BY_NAME,
                payload: res,
            })
        })
    }catch(e){
        console.log(e)
    }
    }
}

export function getActivities(){
    return (dispatch)=>{
    try{
        axios.get("http://localhost:3001/activity")
        .then((res)=>{
            return dispatch({
                type: GET_ACTIVITIES,
                payload: res.data,
            })
        })
    }catch(e){
        console.log(e)
    }
    }
}
 
export function searchByCode(code){
    return (dispatch) =>{
        try{
            axios.get(`http://localhost:3001/countries/${code}`)
            .then((res)=>{
                return dispatch({
                    type: SEARCH_BY_CODE,
                    payload: res.data,
                })
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function postActivity(payload) {
    return (dispatch)=> {
        try{
            axios.post("http://localhost:3001/activity", payload)
            .then((res)=>{
                return dispatch({
                    type: POST_ACTIVITY,
                    payload: res.data,
                })
            })
        }catch(e){
            console.log(e)
        }
        }
    }

export function pagination(pageNumber){
    return {
        type: PAGINATION,
        payload: pageNumber,
    };
};

export function filterByActivity(activity){
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activity,
    };
};

export function filterByContinent(continent){
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent,
    };
};

export function sortAlphabetically(sort){
    return {
        type: SORT_ALPHABETICALLY,
        payload: sort,
    };
};

export function sortByPopulation(sort){
    return {
        type: SORT_BY_POPULATION,
        payload: sort,
    };
};

export function resetFilters(){
    return {
        type: RESET_FILTERS,
    };
};


