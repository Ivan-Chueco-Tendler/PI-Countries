import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pagination, countriesByName } from "../redux/actions";
import style from "./styles/searchBar.module.css"

function SearchBar() {
    const dispatch = useDispatch();
    const countriesSearched = useSelector(state => state.countriesByName);
    const [clicked, setClicked] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(pagination(1));
        if(clicked){
            if(countriesSearched.length > 0) {
                if(countriesSearched[0].name ? (countriesSearched[0].name.toLowerCase()).includes(name.toLowerCase()) : true) {
                    setClicked(false);
                }
            }
        }
    }, [countriesSearched, clicked]);

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSearch = (e) => {
        setClicked(true)
        dispatch(countriesByName(name))
        document.getElementById('searchName').value = ''
    }

  return (
    <div>
        <input 
        name='countryName' 
        onChange={handleChange} 
        placeholder="Search for a country!"
        className={style.searchbar}
        id="searchName">
        </input>
        <button
        name='searchButton'
        onClick={handleSearch}
        className={style.searchButton}
        >Search</button>
        {clicked ? <h4 className={style.searching}>Searching for countries...</h4> : ""}
    </div>
  )
}

export default SearchBar