import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom"
import { searchByCode } from '../redux/actions';
import style from "./styles/cardDetail.module.css"


function CountryDetail() {
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetail);
    const name = useSelector(state => state.searchName);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        if (country.id === id) {
            setLoading(false);
        } else {
            setLoading(true); 
            dispatch(searchByCode(id));
        }
    }, [country.id, name]);
    
  return (
    <div>
        {loading ? 
        <div className={style.loadContainer}>
          <h1>Loading...</h1>
        </div>
        :(
          <div className={style.container}>
            <div className={style.imageContainer}>
              <img src={country.flag} alt={country.name} className={style.detailImage}/>
            </div>
            <div className={style.detailsContainer}>
              <h1>{country.name}</h1>
              <h3>Code: {country.id}</h3>
              <h3>Continent: {country.continent}</h3>
              <h3>Capital: {country.capital}</h3>
              <h3>Subregion: {country.subregion}</h3>
              <h3>Area: {country.area} km2</h3>
              <h3>Population: {country.population}</h3>
              <div><h3>Activities:</h3> {country.activities.length > 0 ? country.activities.map((act, i)=>{return (
              <div key={i}>
                Name: {act.name} <br/>
                Difficulty: {act.difficulty} <br/>
                Duration: {act.duration} <br/>
                Seasons: {act.seasons.join(", ")}
              </div>
                  )})
                  : <h3>No activities in this country</h3>}
              </div>
              <div>
              <NavLink to={`/countries/`}><button className={style.homeButton}>Return to Home</button></NavLink>
            </div>
            </div>
          </div>
        )}  
    </div>
  )
}

export default CountryDetail;