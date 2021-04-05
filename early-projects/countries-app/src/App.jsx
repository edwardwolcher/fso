import React, { useState, useEffect } from "react";
import axios from "axios";

// data endpoints
const countryDataUrl = "https://restcountries.eu/rest/v2/all";

const weatherAPIKey = process.env.REACT_APP_API_KEY;
const weatherDataUrl =
  "http://api.weatherstack.com/current?access_key=" + weatherAPIKey + "&query=";

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

const CountryListItem = ({ country, countrySelect }) => (
  <li>
    {country.name}{" "}
    <button onClick={() => countrySelect(country)}>select</button>
  </li>
);

const CountryList = ({ countries, countrySelect }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryListItem
          key={country.alpha3Code}
          country={country}
          countrySelect={countrySelect}
        />
      ))}
    </ul>
  );
};

const CountryDisplay = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  // fetch weatherData
  useEffect(() => {
    const getWeatherData = async (country) => {
      try {
        const endpoint = weatherDataUrl + country.capital;
        const response = await axios.get(endpoint);
        setWeatherData(response.data);
      } catch (error) {
        // TODO -- error handling
        console.log(error);
      }
    };
    getWeatherData(country);
  }, [country]);

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
      <div>
        {weatherData && (
          <div>
            <h3>Weather in {country.capital}</h3>
            <p>
              <b>Temperature:</b> {weatherData.current.temperature}°C
            </p>
            <img
              src={weatherData.current.weather_icons[0]}
              alt={weatherData.current.weather_descriptions[0]}
            />
            <p>
              <b>wind:</b> {weatherData.current.wind_speed}mph{" "}
              {weatherData.current.wind_dir}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryDisplay, setCountryDisplay] = useState(null);

  // Populate countries array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(countryDataUrl);
        setCountries(response.data);
      } catch (error) {
        // TODO -- error handling
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Manage Country Display Setting on Search Term Change or Button Input
  useEffect(() => {
    const countriesToDisplay = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const countrySelect = (selectedCountry) => {
      const selection = countries.find(
        (country) => country.alpha3Code === selectedCountry.alpha3Code
      );
      if (!selection) return;
      setCountryDisplay(<CountryDisplay country={selection} />);
    };

    if (searchTerm.length === 0) {
      setCountryDisplay(<p>Enter search term above</p>);
    } else if (countriesToDisplay.length <= 0) {
      setCountryDisplay(<p>No countries match query</p>);
    } else if (countriesToDisplay.length === 1) {
      const newCountry = countriesToDisplay[0];
      setCountryDisplay(<CountryDisplay country={newCountry} />);
    } else if (countriesToDisplay.length <= 10) {
      setCountryDisplay(
        <CountryList
          countries={countriesToDisplay}
          countrySelect={countrySelect}
        />
      );
    } else {
      setCountryDisplay(<p>Too many results</p>);
    }
  }, [searchTerm, countries]);

  return (
    <div>
      <h1>Countries</h1>
      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {countryDisplay}
    </div>
  );
};

export default App;
