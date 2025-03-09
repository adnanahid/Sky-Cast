"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { FaSearchengin } from "react-icons/fa";

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
  clouds: { all: number };
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
}

interface ForecastData {
  list: ForecastItem[];
}

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState("");

  const handleWeather = async (url: string) => {
    setError("");
    try {
      const { data } = await axios.get(url);
      setWeather(data);
    } catch {
      setError("Could not fetch weather data. Please try again.");
    }
  };

  const handleForecast = async (url: string) => {
    setError("");
    try {
      const { data } = await axios.get(url);
      setForecast(data);
    } catch {
      setError("Could not fetch forecast data. Please try again.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          handleWeather(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
          );
          handleForecast(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
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
      handleForecast(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString();

  const groupByDay = (data: ForecastItem[]) => {
    const uniqueDays = new Map();

    data.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!uniqueDays.has(date)) {
        uniqueDays.set(date, item);
      }
    });

    return Array.from(uniqueDays.values());
  };

  const fiveDayForecast = forecast ? groupByDay(forecast.list).slice(0, 5) : [];

  return (
    <div className="w-full text-gray-800">
      <div className="flex items-center max-w-[750px] mx-auto">
        <input
          type="text"
          placeholder="Enter city name"
          className="bg-[#161616] text-white py-1 md:py-2.5 px-2 rounded-l-md w-full text-center text-lg outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={getWeather}
          className="btn bg-white hover:bg-gray-600 text-black rounded-r-md px-4 py-1.5 md:py-3 text-2xl"
        >
          <FaSearchengin />
        </button>
      </div>
      {error && (
        <p className="text-red-500 mt-2 text-center rounded-md max-w-sm mx-auto">
          {error}
        </p>
      )}
      <div className="max-w-[800px] flex flex-col md:flex-row mx-auto gap-6">
        <div className="w-full md:w-1/2 mx-auto">
          {weather && (
            <div className="mt-6 bg-[#161616] text-white p-6 rounded-lg shadow-lg max-w-[380px] mx-auto">
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
              <p className="capitalize text-lg">
                {weather.weather[0].description}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <p className="text-sm">
                  Feels Like:{" "}
                  <span className="font-semibold">
                    {weather.main.feels_like}°C
                  </span>
                </p>
                <p className="text-sm">
                  Humidity:{" "}
                  <span className="font-semibold">
                    {weather.main.humidity}%
                  </span>
                </p>
                <p className="text-sm">
                  Wind Speed:{" "}
                  <span className="font-semibold">
                    {weather.wind.speed} m/s
                  </span>
                </p>
                <p className="text-sm">
                  Pressure:{" "}
                  <span className="font-semibold">
                    {weather.main.pressure} hPa
                  </span>
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
                <p className="text-sm">
                  Cloud Cover:{" "}
                  <span className="font-semibold">{weather.clouds.all}%</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3 mx-auto mb-6">
          {forecast && (
            <div className="mt-6 bg-[#161616] text-white p-6 rounded-lg max-w-[250px] shadow-lg mx-auto">
              <h2 className="text-2xl font-bold flex mb-5">
                Today{"'"}s Forecast
              </h2>
              {forecast.list.slice(0, 7).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2.5"
                >
                  <div>
                    <p className="text-sm font-light">
                      {format(new Date(item.dt * 1000), "hh a")}{" "}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">{item.main.temp}°C</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {fiveDayForecast.length > 0 && (
        <div className="sm:max-w-10/12 lg:max-w-8/12 mt-6 bg-[#161616] text-white p-6 rounded-lg shadow-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">5-Day Forecast</h2>
          <div className="grid overflow-auto grid-cols-5 gap-20 md:gap-10 mx-auto">
            {fiveDayForecast.map((item, index) => {
              const date = new Date(item.dt * 1000);
              const formattedDate = format(date, "EEEE, dd");
              const day = formattedDate.split(" ")[0].slice(0, 3);
              const date2 = formattedDate.split(" ")[1];
              return (
                <div
                  key={index}
                  className="mt-4 flex flex-col items-center justify-between w-[100px] mx-auto space-x-3"
                >
                  <p className="text-sm font-semibold">
                    {day}
                    {", "}
                    {date2}
                  </p>
                  <p className="text-lg font-semibold">{item.main.temp}°C</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
