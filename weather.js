const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("City requested:", city);
  console.log("API Key:", process.env.WEATHER_API_KEY);
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    const data = response.data;

    const weatherInfo = {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    res.json(weatherInfo);
  } catch (err) {
    res.status(404).json({ error: "City not found or API error" });
  }
});

module.exports = router;
