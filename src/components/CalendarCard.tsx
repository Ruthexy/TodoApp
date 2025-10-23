import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarCard.css"; // Custom styling

const CalendarCard: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="calendar-wrapper">
      <div className="calendar-box">
        <Calendar onChange={(value) => setDate(value as Date)} value={date} />
      </div>
    </div>
  );
}

export default CalendarCard;
