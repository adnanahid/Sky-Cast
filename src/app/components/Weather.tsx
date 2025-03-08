"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  weather: { description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number };
  visibility: number;
}

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWeather = async (url: string) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(url);
      setWeather(data);
    } catch {
      setError("Could not fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          handleWeather(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
          );
        },
        () => setError("Geolocation not supported.")
      );
    }
  }, []);

  const getWeather = () => {
    if (city.trim()) {
      handleWeather(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
    }
  };

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString();

  return (
    <div className="max-w-lg mx-auto text-gray-800">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter city"
          className="bg-gray-100 py-1.5 px-2 rounded-l-md w-full text-center text-lg outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="bg-gray-800 text-white rounded-r-md px-4 py-2 w-36"
        >
          {loading ? "Loading" : "Search"}
        </button>
      </div>
      {error && (
        <p className="text-red-500 mt-2 text-center bg-white rounded-md">
          {error}
        </p>
      )}
      {weather && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-[380px] mx-auto">
          <h2 className="text-4xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="flex items-center justify-between mt-3">
            <p className="text-3xl font-bold">{weather.main.temp}°C</p>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather"
              width={100}
              height={100}
              priority
            />
          </div>
          <p className="capitalize text-lg text-gray-600">
            {weather.weather[0].description}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
            <p className="text-sm">
              Feels Like:{" "}
              <span className="font-semibold">{weather.main.feels_like}°C</span>
            </p>
            <p className="text-sm">
              Humidity:{" "}
              <span className="font-semibold">{weather.main.humidity}%</span>
            </p>
            <p className="text-sm">
              Wind Speed:{" "}
              <span className="font-semibold">{weather.wind.speed} m/s</span>
            </p>
            <p className="text-sm">
              Pressure:{" "}
              <span className="font-semibold">{weather.main.pressure} hPa</span>
            </p>
            <p className="text-sm">
              Visibility:{" "}
              <span className="font-semibold">
                {weather.visibility / 1000} km
              </span>
            </p>
            <p className="text-sm">
              Sunrise:{" "}
              <span className="font-semibold">
                {formatTime(weather.sys.sunrise)}
              </span>
            </p>
            <p className="text-sm">
              Sunset:{" "}
              <span className="font-semibold">
                {formatTime(weather.sys.sunset)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
