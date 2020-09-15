import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CountryInfo from './CountryInfo';

function App() {
  const [countries, setCountries] = useState([]);
  const [matchedCountries, setMatchedCountries] = useState([]);
  const [bestMatch, setBestMatch] = useState([]);
  const [selectedCountryInfo, setSelectedCountryInfo] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

 const handleEvent = (event) => {
    if(countries.length){
      findMatches(event.target.value)
    };
  }

  const findMatches = (query) => {
    setBestMatch('');
    const matchedCountries = countries.filter(country => 
                            country.name.toLowerCase()
                            .match(query))
    setMatchedCountries(matchedCountries);
    if(matchedCountries.length === 1){
      setBestMatch(matchedCountries);
    }
  }

  const findSelectedCountry = (selectedCountry) => {
    const selectedCountryInformation = countries.filter(country => 
                            country.name.match(selectedCountry));
    setSelectedCountryInfo(selectedCountryInformation)
  }

  return (
    <div>
      <label>Find Countries</label>
      <input type="text" onInput={handleEvent} />
      { 
        bestMatch.length === 1 
        ? <CountryInfo 
            name={bestMatch.[0].name} 
            capital={bestMatch.[0].capital} 
            population={bestMatch.[0].population} 
            languages={bestMatch.[0].languages}
            imgSrc={bestMatch.[0].flag}
          />
        : matchedCountries.length > 10
          ? <p>Please specifiy the country by typing letters</p> 
          : matchedCountries.map(country => 
            <li key={Math.random()}>
              {country.name}
              <button onClick={() => findSelectedCountry(country.name)}>show</button>
            </li>
            )
      }
      {selectedCountryInfo.length === 1 && <CountryInfo 
                  name={selectedCountryInfo.[0].name} 
                  capital={selectedCountryInfo.[0].capital} 
                  population={selectedCountryInfo.[0].population} 
                  languages={selectedCountryInfo.[0].languages}
                  imgSrc={selectedCountryInfo.[0].flag}
      />}
      
    </div>
  )
}

export default App;
