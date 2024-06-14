"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import FavoritesList from "../FavoritesList/FavoritesList";

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get("http://localhost:5000/favorites");
      setFavorites(response.data);
    };

    fetchFavorites();
  }, []);

  const handleSearch = async (city) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
      console.log("API Key:", apiKey); // Debugging line to ensure API key is being read
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`,
      );
      setCurrentWeather(weatherResponse.data);
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`,
      );
      setForecast(forecastResponse.data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const addFavorite = async (city) => {
    const response = await axios.post("http://localhost:5000/favorites", {
      city,
    });
    setFavorites([...favorites, response.data]);
  };

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:5000/favorites/${id}`);
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay
        weather={currentWeather}
        forecast={forecast}
        unit={unit}
      />
      <FavoritesList favorites={favorites} onRemove={removeFavorite} />
      <button onClick={toggleUnit}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
};

export default WeatherDashboard;
