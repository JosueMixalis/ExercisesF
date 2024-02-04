import { useState } from "react";
import Country from "./Country";
import axios from "axios";

const CountriesToShow = ({ allCountries, country }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const api_key = import.meta.env.VITE_SOME_KEY 

  const handleShow = (countryData) => {
    setSelectedCountry(countryData);
  };

  const resetSelectedCountry = () => {
    setSelectedCountry(null);
  };

  const show = (countryData) => {
    const city = countryData.capital[0]


    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    axios
      .get(url)
      .then(response => {
        const tempetureFirst =  response.data.main.temp - 273.15;
        const tempetureCelsius = tempetureFirst.toFixed(2);
        const windSpeed = response.data.wind.speed;
        const iconCode = response.data.weather[0].icon;

        setTemperature(tempetureCelsius)
        setWind(windSpeed)
        setWeatherIcon(iconCode)
      })
      .catch(error => {
        console.error("Error: ",error);
      })

    return (
        <div>
            <h2>{countryData.name.common}</h2>
            <p>capital {countryData.capital}</p>
            <p>area {countryData.area}</p>
            <h4>languages:</h4>
            <ul>
              {Object.values(countryData.languages).map(language => <li key={language}> {language}</li>)}
            </ul>
            <img src={countryData.flags.png} alt={countryData.name.common} />
            <p>tempeture {temperature} Celsius</p>
            <img src={`https://openweathermap.org/img/w/${weatherIcon}.png`} alt="weatherIcon" />
            <p>wind {wind} m/s</p>
        </div>
    )
  }

  const data = allCountries.filter((d) =>
    d.name.common.toLowerCase().includes(country)
  );

  if (data.length > 10) {
    return <p>Too many matches. Specify another filter</p>;
  }

  if (data.length === 1) {
    const countryData = data[0];
    return show(countryData)
  }

  return (
    <div>
      {data.map((country) => (
        <Country
          key={country.name.common}
          name={country.name.common}
          country={country}
          handleShow={handleShow}
        />
      ))}
      {selectedCountry && (
        <div>
          <button onClick={resetSelectedCountry}>Back</button>
          {show(selectedCountry)}
        </div>
      )}
    </div>
  );
};

export default CountriesToShow;


