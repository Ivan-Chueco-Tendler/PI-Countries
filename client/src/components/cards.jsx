import React from 'react'
import { NavLink } from 'react-router-dom';
import style from "./styles/cards.module.css"

function Cards(props) {
  return (
    <NavLink to={`/countries/${props.id}`}>
      <div className={style.cardContainer}>
          <div className={style.imgContainer}>
             <img className={style.image} src={props.img} alt={props.name}/>
          </div>
          <div className={style.info}>
              <h1>{props.name}</h1>
              <h3>{props.continent}</h3>
          </div>
      </div> 
    </NavLink>
    
  )
}

export default Cards