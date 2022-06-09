import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByActivity, filterByContinent, sortAlphabetically, sortByPopulation, getActivities, pagination, resetFilters, getCountries } from "../redux/actions";
import style from "./styles/filters.module.css"
function Filters() {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    const activeSorts = useSelector(state => state.activeSorts)
    let continents = ["Africa", "South America", "North America", "Asia", "Europe", "Oceania", "Antarctica"]

    useEffect(() => {
        if (activities.length === 0) {
            dispatch(getActivities());
        }
    }, []);

    const handleActivityChange = function (e) {
        dispatch(pagination(1));
        dispatch(filterByActivity(e.target.value));
    };

    const handleContinentChange = function (e) {
        dispatch(pagination(1));
        dispatch(filterByContinent(e.target.value));
    };

    const handleAlphabetical = function (e) {
        dispatch(pagination(1));
        dispatch(sortAlphabetically(e.target.value));
    };

    const handlePopulation = function (e) {
        dispatch(pagination(1));
        dispatch(sortByPopulation(e.target.value));
    };
    
    const handleReset = function (e){
        if(activeSorts !== ""){
            dispatch(getCountries())
        }
        dispatch(pagination(1));
        dispatch(resetFilters())
        document.getElementById('continentSelect').value = true
        document.getElementById('activitySelect').value = true
        document.getElementById('alphabeticalSelect').value = true
        document.getElementById('populationSelect').value = true
    }

    return (
        <nav className={style.container}>
            <select
                name='filterByActivity'
                defaultValue={true}
                onChange={handleActivityChange}
                className={style.select}
                id="activitySelect"
            >
                <option value={true} disabled='disabled'>Filter by Activity</option>
                {activities ? activities.map((a, i) => {
                    return (
                        <option key={i} value={a.name}>{a.name}</option>
                    )
                }) : 'Not Working'};
            </select>

            <select
                name='filterByContinent'
                defaultValue={true}
                onChange={handleContinentChange}
                className={style.select}
                id="continentSelect"
            >
                <option value={true} disabled='disabled'>Filter by Continent</option>
                {continents ? continents.map((cont, i) => {
                    return (
                        <option key={i} value={cont}>{cont}</option>
                    )
                }) : 'Not Working'};
            </select>

            <select
                name='sortAlphabetically'
                defaultValue={true}
                onChange={handleAlphabetical}
                className={style.select}
                id="alphabeticalSelect"
            >
                <option value={true} disabled='disabled'>Sort Alphabetically</option>
                <option value={'A-Z'}>A-Z</option>
                <option value={'Z-A'}>Z-A</option>
            </select>
            <select
            name='sortPopulation'
            defaultValue={true}
            onChange={handlePopulation}
            className={style.select}
            id="populationSelect"
            >
                <option value={true} disabled='disabled'>Sort by Population</option>
                <option value={'HIG'}>Highest Population</option>
                <option value={'LOW'}>Lowest Population</option>
            </select>
            <button name="resetButton" onClick={handleReset} className={style.resetButton}>Reset Filters</button>   
        </nav>
    );
};

export default Filters