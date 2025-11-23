"use client";

import { useEffect, useState } from "react";

interface Event {
  startTime: string;
  endTime: string;
  color: string;
  title: string;
  date: string;
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/config.json");
        const eventsData = await res.json();

        setEvents(eventsData);
      } catch (error) {
        console.error("faield to load events", error);
      }
    };
    loadEvents();
  }, []);

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

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventsForDate = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateString);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4 px-2">
          <h1 className="text-3xl font-bold text-center text-gray-600">
            {monthNames[month]} {year}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
            >
              Prev
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </div>

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
            {days.map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              return (
                <div
                  key={index}
                  className={`h-24 border border-gray-200 p-2 hover:bg-gray-50 ${
                    day && isToday(day) ? "bg-gray-300 border-gray-400" : ""
                  }`}
                >
                  {day && (
                    <>
                      <span
                        className={`text-sm font-medium ${
                          isToday(day)
                            ? "text-gray-600 font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {dayEvents.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="text-xs p-1 rounded text-white truncate"
                            style={{ backgroundColor: event.color }}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
