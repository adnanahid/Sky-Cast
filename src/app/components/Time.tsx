"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Time() {
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
    <div>
      <h1 className="text-3xl sm:text-6xl tracking-widest text-gray-800">
        {currentTime}
      </h1>
      <p className="text-lg sm:text-xl mt-2 text-gray-600">{currentDate}</p>
    </div>
  );
}
