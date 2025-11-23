"use client";

import { useEffect, useState, useMemo } from "react";

interface Event {
  startTime: string;
  endTime: string;
  color: string;
  title: string;
  date: string;
}

interface EventWithConflict extends Event {
  hasConflict: boolean;
  conflictLevel: number;
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(() => {
    if (typeof window === "undefined") {
      return new Date(2024, 0, 1);
    }
    return new Date();
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);

  const today = useMemo(() => {
    if (typeof window === "undefined") return null;
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

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
        console.error("Failed to load events", error);
      }
    };
    loadEvents();
  }, []);

  const timeRangesOverlap = (
    start1: string,
    end1: string,
    start2: string,
    end2: string,
  ): boolean => {
    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const start1Minutes = parseTime(start1);
    const end1Minutes = parseTime(end1);
    const start2Minutes = parseTime(start2);
    const end2Minutes = parseTime(end2);

    return start1Minutes < end2Minutes && start2Minutes < end1Minutes;
  };

  const getEventsWithConflicts = (dayEvents: Event[]): EventWithConflict[] => {
    return dayEvents.map((event, index) => {
      const conflicts = dayEvents.filter(
        (otherEvent, otherIndex) =>
          index !== otherIndex &&
          timeRangesOverlap(
            event.startTime,
            event.endTime,
            otherEvent.startTime,
            otherEvent.endTime,
          ),
      );

      return {
        ...event,
        hasConflict: conflicts.length > 0,
        conflictLevel: conflicts.length,
      };
    });
  };

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
    if (!today) return false;
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return d.toDateString() === today.toDateString();
  };

  const getEventsForDate = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateString);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };
  const handleDayViewClick = (day: number) => {
    setSelectedDay(day);
    setShowDayModal(true);
  };

  const closeDayModal = () => {
    setShowDayModal(false);
    setSelectedDay(null);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors"
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
              const eventsWithConflicts = getEventsWithConflicts(dayEvents);
              const maxDisplayEvents = 2;
              const hasMoreEvents =
                eventsWithConflicts.length > maxDisplayEvents;
              const displayEvents = eventsWithConflicts.slice(
                0,
                maxDisplayEvents,
              );

              return (
                <div
                  key={index}
                  onClick={() => {
                    handleDayViewClick(day ? day : 0);
                  }}
                  className={`h-25 border border-gray-200 p-1 hover:bg-gray-50 transition-colors ${
                    day && isToday(day) ? "bg-gray-300 border-gray-400" : ""
                  }`}
                >
                  {day && (
                    <>
                      <span
                        className={`text-xs font-medium ${
                          isToday(day)
                            ? "text-gray-600 font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="mt-0.5 space-y-0.5">
                        {displayEvents.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`text-[10px] px-1 py-0.5 rounded text-white truncate cursor-pointer hover:opacity-80 transition-opacity relative ${
                              event.hasConflict
                                ? "ring-2 ring-red-400 ring-opacity-70"
                                : ""
                            }`}
                            style={{ backgroundColor: event.color }}
                            title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})${event.hasConflict ? " - Time conflict detected!" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{event.title}</span>
                              {event.hasConflict && (
                                <span className="ml-0.5 text-red-200 text-[8px] animate-pulse">
                                  ⚠
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                        {hasMoreEvents && (
                          <div
                            className="text-[10px] text-gray-600 bg-gray-100 px-1 py-0.5 rounded cursor-pointer hover:bg-gray-200 transition-colors text-center font-bold"
                            onClick={() => handleDayViewClick(day)}
                            title={`View all ${eventsWithConflicts.length} events`}
                          >
                            ...
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {showDayModal && selectedDay && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={closeDayModal}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    All Events
                  </h2>
                  <p className="text-sm text-gray-600">
                    {formatDate(selectedDay)}
                  </p>
                </div>
                <button
                  onClick={closeDayModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                {getEventsWithConflicts(getEventsForDate(selectedDay))
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((event, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 relative ${
                        event.hasConflict
                          ? "border-red-300 bg-red-50 shadow-red-100 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={`font-semibold ${event.hasConflict ? "text-red-800" : "text-gray-800"}`}
                        >
                          {event.title}
                        </h3>
                        {event.hasConflict && (
                          <div className="flex items-center gap-1 text-red-600 text-sm">
                            <span className="animate-pulse">⚠</span>
                            <span className="text-xs font-medium">
                              Time Conflict
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span
                          className={
                            event.hasConflict ? "font-medium text-red-700" : ""
                          }
                        >
                          {formatTime(event.startTime)} -{" "}
                          {formatTime(event.endTime)}
                        </span>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: event.color }}
                          ></div>
                          <span>{event.color}</span>
                        </div>
                      </div>

                      {event.hasConflict && (
                        <div className="mt-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded flex items-center gap-1">
                          <span>⚠</span>
                          <span>
                            This event overlaps with other events at the same
                            time
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeDayModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
