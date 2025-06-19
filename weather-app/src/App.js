import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "d54314c612026eb57994fbb38a9c493c";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (data.cod !== 200) {
        throw new Error(data.message || "Failed to fetch weather");
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setWeatherData(null); // Optional: Clear data if error occurs
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.png";
      case "Rain":
        return "/rain_with_cloud.png";
      case "Mist":
        return "/Tornado.png";
      case "Haze":
        return "/sun.png";
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData?.weather?.[0] ? (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>

              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                width="180px"
                alt="Weather Icon"
              />
              <h2 className="container_degree">{weatherData.main?.temp}°C</h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>

              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Loading or unable to fetch weather. Try a different city.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
