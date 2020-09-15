import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const CountryInfo = ({ name, capital, population, languages, imgSrc }) => {
    useEffect(()=> {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
            .then(response => console.log(response))
    }, [])
    
    return(
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital} </p>
            <p>Population: {population} </p>
            <h2>Spoken Languages</h2>
            {languages.map(lang => <p key={Math.random()}>{lang.name}</p>)}
            <img src={imgSrc} height="100px" />
        </div>
    )
}

export default CountryInfo;
