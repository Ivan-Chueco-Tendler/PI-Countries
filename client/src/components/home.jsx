import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom"
import { getCountries, resetFilters } from '../redux/actions.js';
import Cards from "./cards";
import Filters from './filters.jsx';
import SearchBar from './searchBar.jsx';
import Pagination from './pagination';
import style from "./styles/home.module.css";

function Home() {
  const dispatch = useDispatch();
  const countriesFiltered = useSelector(state => state.countriesFiltered);
  let countriesToShow = useSelector(state => state.countries);
  const [loading, setLoading] = useState(true);
  const state = useSelector(state => state);
  const statePage = useSelector(state => state.pagination)
  
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesShown] = useState(10);
  const lastCountry = currentPage * countriesShown;
  const firstCountry = lastCountry - countriesShown;
  const paginate = function (num) {
    setCurrentPage(num);
  };
  let countries;
  countriesFiltered.length ? countries = countriesFiltered : countries = countriesToShow;
  const currentCountries = countries.slice(firstCountry, lastCountry);
  
  useEffect(() => {
    if (statePage) setCurrentPage(statePage);
    if (countriesToShow.length === 0) {
        dispatch(getCountries());
    }
    if (countriesToShow.length !== 0) {
      setLoading(false);
    }
}, [state, currentCountries]);

  return (
    <div>
    {loading === false ?
      (typeof currentCountries[0] === "object" ? (
        <div id='top' className={style.mainContainer}>
            <div>
            <Filters/>
            <SearchBar/> <br />
            <NavLink to={`/create/`}><button className={style.createButton}>Create your own Activity!</button></NavLink>
            </div>
            <div className={style.countriesContainer}>
            {currentCountries ? currentCountries.map(c =>{
              return(
                <Cards
                key={c.id}
                id={c.id}
                name={c.name}
                img={c.flag}
                continent={c.continent}
                />
                )
              }) : "Not Working"}
        </div>
        <Pagination
          className={style.pagination}
          countriesPage={countriesShown}
          allCountries={countries.length}
          paginate={paginate}
        />
      </div>
    ) : (
      <div className={style.noCountries}>
      <h1> No countries found...</h1>
      <button className={style.homeButton} onClick={(e)=>{dispatch(resetFilters())}}>Return to Home</button>
    </div>)
        ) : (
        <div className={style.loadContainer}>
        <h1 className={style.loading}>Loading...</h1>
      </div>
      )}
    </div>
  )
}

export default Home