import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError("City not found or network error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Real-Time Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} />
    </div>
  );
};

export default App;
