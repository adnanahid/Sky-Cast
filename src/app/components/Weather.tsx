"use client";

import Image from "next/image";
import { useState } from "react";

interface WeatherData {
  name: string;
  sys: { country: string };
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data: WeatherData = await res.json();
      setWeather(data);
      console.log(data);
    } catch {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        className="border p-2 rounded-md w-64 text-center"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={getWeather}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
      >
        {loading ? "Loading..." : "Get Weather"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {weather && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            width={100}
            height={100}
            priority
          />

          <p>{weather.weather[0].description}</p>
          <p className="text-lg font-bold">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
