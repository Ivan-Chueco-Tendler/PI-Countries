import React from "react";
import axios from "axios";

export function getCountries(){
    return (dispatch)=>{
            axios.get("http://localhost:3001/countries")
            .then((res)=>{
                return dispatch({
                    type: "GET_COUNTRIES",
                    payload: res.data,
                })
            })
    }
}

export function postActivity(payload) {
    return async (dispatch)=> {
      const data = await axios.post("http://localhost:3001/activity", payload);
      return dispatch({
        type: "POST_ACTIVITY",
        payload: data,
      });
    };
  }