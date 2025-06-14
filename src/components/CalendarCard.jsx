import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCard.css'; // Custom styling

function CalendarCard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-wrapper">
      {/* <h1 className="calendar-title">
        <span className="highlight">Todo App 📚</span>
      </h1>
      <p className="calendar-subtitle">Be Productive with your Time!!!</p> */}

      <div className="calendar-box">
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* <button className="create-button">+ Create New List</button> */}
    </div>
  );
}

export default CalendarCard;
