"use client";

import { useState } from "react";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-600">
          {monthNames[month]} {year}
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-3 text-center font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className="h-24 border border-gray-200 p-2 hover:bg-gray-50"
              >
                {day && (
                  <span className="text-sm font-medium text-gray-600">
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
