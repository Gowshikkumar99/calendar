import React, { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("week");

  return (
    <CalendarContext.Provider value={{ date, setDate, view, setView }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
