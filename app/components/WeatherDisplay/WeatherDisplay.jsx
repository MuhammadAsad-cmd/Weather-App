import React from "react";

const WeatherDisplay = ({ weather, forecast, unit }) => {
  if (!weather) return <div>No weather data available</div>;

  const unitSymbol = unit === "metric" ? "°C" : "°F";
  return (
    <>
      <div>
        <h2>Current Weather for {weather.name}</h2>
        <p>
          {weather.main.temp} {unitSymbol}
        </p>
        <p>{weather.weather[0].description}</p>

        <h3>5-Day Forecast</h3>
        <div>
          {forecast.slice(0, 5).map((item, index) => (
            <div key={index}>
              <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
              <p>
                {item.main.temp} {unitSymbol}
              </p>
              <p>{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
