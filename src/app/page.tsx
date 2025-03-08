"use client";
import { useEffect, useState } from "react";
import Weather from "./components/Weather";
import { format } from "date-fns";

export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(format(now, "EEEE, d MMMM"));
      setCurrentTime(format(now, "hh:mm a"));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 container mx-auto">
      <nav className="flex items-start justify-between text-center md:text-left mb-10">
        <h2 className="text-2xl tracking-widest font-semibold text-gray-800">
          SkyCast
        </h2>
        <section>
          <h1 className="text-3xl sm:text-6xl tracking-widest text-gray-800">
            {currentTime}
          </h1>
          <p className="text-lg sm:text-xl mt-2 text-gray-600">{currentDate}</p>
        </section>
      </nav>
      <Weather />
    </div>
  );
}
