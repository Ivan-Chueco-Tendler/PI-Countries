import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from '../redux/actions';
import Image from "../images/image.png"
import { NavLink } from 'react-router-dom';
import style from "./styles/landing.module.css"

function LandingPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return (
        <div className={style.landingContainer}>
            <div className={style.start}>
            <img src={Image} alt="Earth"></img>
            <NavLink to="/countries" className={style.link}>Comenzar! </NavLink>
            </div>
        </div>
    )
};

export default LandingPage;