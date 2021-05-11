import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");

  function showWeather(response) {
    setWeather(
      <ul className="Weather">
        <li>City: {response.data.name}</li>
        <li>Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Humidity: {Math.round(response.data.main.humidity)}%</li>
        <li>Wind: {Math.round(response.data.wind.speed)} km/h</li>
        <li>
          {" "}
          <img
            src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            className="weatherIcon"
            alt="current weather icon"
          />
        </li>
      </ul>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd8290157d5eeba71b9dabe5d7447fd1&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div className="SearchEngine">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter City Here"
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>
      {weather}
    </div>
    
  );
}
