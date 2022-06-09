import { COUNTRIES_BY_NAME, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES, PAGINATION, POST_ACTIVITY, RESET_FILTERS, SEARCH_BY_CODE, SORT_ALPHABETICALLY, SORT_BY_POPULATION } from "./actionTypes";

const initialState ={
    countries: [],
    activities: [],
    countryDetail:[],
    countriesFiltered: [],
    countriesByName: [],
    continentSelected: "",
    activitySelected: "",
    activeSorts:"",
    pagination: 1,
}

export default function rootReducer(state = initialState, {type, payload}) {
    switch (type) {
        case GET_COUNTRIES:
            return{
                ...state,
                countries: payload,
            };
        case COUNTRIES_BY_NAME:
                return{
                    ...state,
                    countriesFiltered: payload.data,
                    countriesByName: payload.data,
                    activeSorts: "search"
                }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: payload,
            }
        case SEARCH_BY_CODE:
            return{
                ...state,
                countryDetail: payload,
            }
        case POST_ACTIVITY:
            return{
                ...state
            };
        case PAGINATION:
            return{
                ...state,
                pagination: payload
            }
        case FILTER_BY_ACTIVITY:
            let countriesActivity = [];
            let activity = payload
            if(state.activitySelected === ""){
                if(typeof state.countriesFiltered[1] === "object"){
                    countriesActivity = state.countriesFiltered.filter(c=>{
                        for(let i = 0; i < c.activities.length; i++){
                            if(c.activities[i].name === activity) return true;
                            else return false;
                        }
                    })
                    countriesActivity.length === 0 ? countriesActivity = ["No countries found"] : countriesActivity = countriesActivity;
                    return {
                        ...state,
                        countriesFiltered: countriesActivity,
                        activitySelected: activity,
                    }
                }
                else if(typeof state.countriesFiltered[0] === "string"){
                    return {
                        ...state,
                    }
                }
                else{
                    countriesActivity = state.countries.filter(c=>{
                        for(let i = 0; i < c.activities.length; i++){
                            if(c.activities[i].name === activity) return true;
                            else return false;
                        }
                    })
                    countriesActivity.length === 0 ? countriesActivity = ["No countries found"] : countriesActivity = countriesActivity; 
                }
                return {
                    ...state,
                    countriesFiltered: countriesActivity,
                    activitySelected: activity,
                };
            } else {
                countriesActivity = state.countries.filter(c=>{
                    for(let i = 0; i < c.activities.length; i++){
                        if(c.activities[i].name === activity) return true;
                        else return false;
                    }
                })
                countriesActivity.length === 0 ? countriesActivity = ["No countries found"] : countriesActivity = countriesActivity; 
            }
            return {
                ...state,
                countriesFiltered: countriesActivity,
                activitySelected: activity,
            };
        case FILTER_BY_CONTINENT:
            let countriesContinent = [];
            let continent = payload;
            if (state.continentSelected === "") {
                if(typeof state.countriesFiltered[1] === "object"){
                    countriesContinent = state.countriesFiltered.filter(c=>{return (c.continent === continent)})
                    countriesContinent.length === 0 ? countriesContinent = ["No countries found"] : countriesContinent = countriesContinent;
                    return {
                        ...state,
                        countriesFiltered: countriesContinent,
                        continentSelected: continent,
                    }
                }
                else if(typeof state.countriesFiltered[0] === "string"){
                    return {
                        ...state,
                    }
                }
                else{
                    countriesContinent = state.countries.filter(c=>{return (c.continent === continent)})
                    countriesContinent.length === 0 ? countriesContinent = ["No countries found"] : countriesContinent = countriesContinent; 
                    return {
                        ...state,
                        countriesFiltered: countriesContinent,
                        continentSelected: continent,
                    };
                }
            } else {
                countriesContinent = state.countries.filter(c=>{return (c.continent === continent)})
                    countriesContinent.length === 0 ? countriesContinent = ["No countries found"] : countriesContinent = countriesContinent; 
                    return {
                        ...state,
                        countriesFiltered: countriesContinent,
                        continentSelected: continent,
                    };
            }
        case SORT_ALPHABETICALLY:
            let countriesAlphabetical = state.countries;
            let filter = payload;
            if(typeof state.countriesFiltered[1] === "object"){
                if (filter === "A-Z"){
                    countriesAlphabetical = state.countriesFiltered.sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    });
                    return {
                        ...state,
                        countriesFiltered: countriesAlphabetical,
                        activeSorts: filter,
                    }
                } if(filter === "Z-A"){
                    countriesAlphabetical = state.countriesFiltered.sort((a, b) => {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                    });
                };
                    return {
                        ...state,
                        countriesFiltered: countriesAlphabetical,
                        activeSorts: filter,
                    }
                }
            else if(typeof state.countriesFiltered[0] === "string"){
                return {
                    ...state,
                }
            }
            else{
                if (filter === "A-Z"){
                    countriesAlphabetical = countriesAlphabetical.sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    });
                    return {
                        ...state,
                        countriesFiltered: countriesAlphabetical,
                        activeSorts: filter,
                    }
                } if(filter === "Z-A"){
                    countriesAlphabetical = countriesAlphabetical.sort((a, b) => {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                    });
                };
                    return {
                        ...state,
                        countriesFiltered: countriesAlphabetical,
                        activeSorts: filter,
                    }
                }
        case SORT_BY_POPULATION:
            let countriesPopulation = [];
            let highLow = payload;
            if(state.countriesFiltered.length > 0){
                if (highLow === 'HIG') {
                    countriesPopulation = state.countriesFiltered.sort((a, b) => {
                        return b.population - a.population;
                    });
                    return {
                        ...state,
                        countriesFiltered: countriesPopulation,
                        activeSorts: highLow,
                    }
                };
                if (highLow === 'LOW') {
                    countriesPopulation = state.countriesFiltered.sort((a, b) => {
                        return a.population - b.population;
                    });
                    return {
                        ...state,
                        countriesFiltered: countriesPopulation,
                        activeSorts: highLow,
                    }
                };
            }
            else if(typeof state.countriesFiltered[0] === "string"){
                return {
                    ...state,
                }
            }
            else{
                if (highLow === 'HIG') {
                    countriesPopulation = state.countries.sort((a, b) => {
                    return b.population - a.population;
                    });
                    return {
                        ...state,
                        countriesFiltered: countriesPopulation,
                        activeSorts: highLow,
                    }
                };
                if (highLow === 'LOW') {
                    countriesPopulation = state.countries.sort((a, b) => {
                        return a.population - b.population;
                    });
                    return {
                        ...state,
                        countriesFiltered: countriesPopulation,
                        activeSorts: highLow,
                    }
                };
            };
            case RESET_FILTERS:
                    return{
                        ...state,
                        countriesFiltered: [],
                        activeSorts: "",
                        countriesByName: [],
                        continentSelected: "",
                        activitySelected: "",
                    };
        default:
            return state;
  }
}