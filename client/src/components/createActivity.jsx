import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom"
import { getCountries, postActivity, pagination, getActivities} from "../redux/actions"
import style from "./styles/createActivity.module.css"

function CreateActivity() {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries)
    let seasonList = ["Summer", "Winter", "Spring", "Autumn"];

    const [input, setInput] = React.useState({
        name: "",
        difficulty: 0,
        duration: "",
        hours: "",
        minutes: "",
        seasons: [],
        countries: [],
    });

    const [errors, setErrors] = React.useState({
        name: "",
        difficulty: "",
        duration: "",
        seasons: "",
        countries: "",
    });

    useEffect(() => {
        dispatch(pagination(1));
        dispatch(getCountries());
    }, [dispatch]);

    const handleInputChange = (e) => {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelect = (e) => {
        if (input.countries.includes(e.target.value)) return;
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        });
        setErrors(validate({
            ...input,
            countries: [...input.countries, e.target.value]
        }));
    };
    

    const handleCheckboxChange = (e) => {
        if (input.seasons.includes(e.target.value)) {
            setInput({
                ...input,
                seasons: input.seasons.filter(s => s !== e.target.value)
            });
        } else {
            setInput({
                ...input,
                seasons: [...input.seasons, e.target.value]
            });
            setErrors(validate({
                ...input,
                seasons: [...input.seasons, e.target.value]
            }));
        };
    }

    const handleListDelete = (e) => {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e.currentTarget.textContent)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                dispatch(postActivity(input));
                dispatch(getActivities());
                alert("Videogame added successfully to the data base ¡Let's go see it!");
                e.target.reset();
                window.location.href = '/countries';
            } catch (err) {
                console.log(err);
            }
        } else {
            alert('All the mandatory fields are not filled');
        };
    };
    
  return (
    <div className={style.mainContainer}>
        <h2 className={style.title}>Create your own activity!</h2>
        <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
                    <div className={style.nameToSeasons}>
                        <label>Name: </label>
                        <input 
                        name="name" 
                        onChange={handleInputChange} 
                        placeholder="Name of activity"/>
                        <span>{errors.name}</span><br />
                        <label>Duration: </label>
                        <div>
                        <input 
                        name="hours" 
                        onChange={handleInputChange} 
                        placeholder="Duration of activity"/>
                        <label> hour(s) </label>
                        </div>
                        <div>
                        <input 
                        name="minutes" 
                        onChange={handleInputChange}
                        placeholder="Duration of activity"/>
                        <label> minute(s)  </label>
                        </div>
                        <span>{errors.duration}</span> <br />
                        <label>Difficulty: </label>
                        <input 
                        type="number" 
                        name="difficulty" 
                        min="1" max="5"
                        onChange={handleInputChange} 
                        step="0.1"></input>
                        <span>{errors.difficulty}</span> <br />
                        </div>
                        <div className={style.seasons}>
                        <label>Seasons: </label>
                        <span>
                        {seasonList ? seasonList.map((season, i) => {
                            return (
                                <div className={style.seasonsItems} key={i}>
                                    <label>{season}</label>
                                    <input
                                        type='checkbox'
                                        key={i}
                                        name='seasons'
                                        onChange={handleCheckboxChange}
                                        value={season}>
                                    </input>
                                </div>
                            )
                        }) : 'Not Working'}
                    </span>
                        <span className={style.seasonE}>{errors.seasons}</span> <br />
                    </div>
                    <div className={style.countries}>
                        <label>Countries: </label>
                        <select 
                        name="countries" 
                        defaultValue={true}
                        id="countrySelect"
                        onChange={handleSelect}>
                            <option value={true} disabled='disabled'>Select a country!</option>
                            {countries ? countries.map((c, i)=>{
                                return (
                                    <option key={i} value={c.name}>{c.name}</option>
                                )
                                }) : "Not Working"}
                        </select>
                        <span>{errors.countries}</span> <br />
                        <label>Selected Countries (Click to delete):</label>
                        <div className={style.selected}>{input.countries.map((c, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <span onClick={handleListDelete}>
                                        {c}
                                    </span> <br/>
                                </React.Fragment>
                            );
                        })}
                        </div>
                    </div>
                        <button className={style.button} type="submit">Create Activity!</button>                    
        </form>
        <NavLink to={`/countries/`}><button className={style.button}>Return to Home</button></NavLink>
        </div>
    </div>
  )
}

export const validate = function (input) {
    let errors = {};
    if (!input.name || input.name.length < 2 || typeof input.name !== 'string') {
        errors.name = "The activity's name must be at least 2 characters";
    } else if (/["`'#%&,:;<>=@{}~$()*+/?[\]^|]+/.test(input.name)) {
        errors.name = "The activity's name cannot contain special characters";
    };
    if (!input.hours && !input.minutes) {
        errors.duration = "A duration is needed for the activity";
    } else if(/[^0-9]+/.test(input.hours) || /[^0-9]+/.test(input.minutes)){
        errors.duration = "The duration for the activity only accepts numbers!"
    };
    if (input.difficulty === 0 ||(input.difficulty > 5) || (input.rating < 1)) {
        errors.difficulty = 'The difficulty must be a number greater than 1 and smaller than 5';
    };
    if (input.seasons.length < 1) {
        errors.seasons = 'At least one season must be selected';
    };
    if (input.countries.length < 1) {
        errors.countries = 'At least one country must be selected';
    };

    return errors;
};

export default CreateActivity