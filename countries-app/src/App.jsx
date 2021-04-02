import React, { useState, useEffect } from "react";
import axios from "axios";

// data endpoint
const dataUrl = "https://restcountries.eu/rest/v2/all";

// components

const Input = ({ value, setter, type = "text", id = null }) => {
  const handleChange = (e) => {
    setter(e.target.value);
  };
  return <input type={type} id={id} value={value} onChange={handleChange} />;
};

const SearchField = ({ searchTerm, setSearchTerm }) => {
  const searchFieldLabel = "Find Countries: ";
  const searchFieldId = "input-searchfield";
  return (
    <div>
      <label htmlFor={searchFieldId}>{searchFieldLabel}</label>
      <Input value={searchTerm} setter={setSearchTerm} id={searchFieldId} />
    </div>
  );
};

const CountryListItem = ({ country }) => <li>{country.name}</li>;

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryListItem key={country.alpha3Code} country={country} />
      ))}
    </ul>
  );
};

const CountryDisplay = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img width="150px" src={country.flag} alt="National Flag" />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(dataUrl);
        setCountries(response.data);
      } catch (error) {
        // TODO -- error handling
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const countriesToDisplay = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let countryDisplay;

  if (searchTerm.length === 0) {
    countryDisplay = <p>Enter search term above</p>;
  } else if (countriesToDisplay.length <= 0) {
    countryDisplay = <p>No countries match query</p>;
  } else if (countriesToDisplay.length === 1) {
    countryDisplay = <CountryDisplay country={countriesToDisplay[0]} />;
  } else if (countriesToDisplay.length <= 10) {
    countryDisplay = <CountryList countries={countriesToDisplay} />;
  } else {
    countryDisplay = <p>Too many results</p>;
  }

  return (
    <div>
      <h1>Countries</h1>
      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {countryDisplay}
    </div>
  );
};

export default App;
