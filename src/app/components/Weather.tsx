"use client";
import { useState } from "react";

interface WeatherData {
  name: string;
  sys: { country: string };
  weather: { description: string }[];
  main: { temp: number };
}

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch {
      setError("City not found. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <input
        type="text"
        placeholder="Enter city name"
        className="border p-2 rounded-md"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={getWeather}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
      >
        Get Weather
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p>{weather.weather[0].description}</p>
          <p className="text-lg">{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
