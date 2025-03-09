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

  const [time, amPm] = currentTime.split(" ");

  return (
    <div>
      <h1 className="text-4xl sm:text-6xl tracking-widest text-gray-800">
        {time}
        <span className="text-xl">{amPm}</span>
      </h1>
      <p className="text-lg sm:text-xl sm:mt-2 text-gray-700">{currentDate}</p>
    </div>
  );
}
