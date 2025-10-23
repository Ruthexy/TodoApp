"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarCard = () => {
  const [date, setDate] = useState<Value>(new Date());

  const handleChange = (value: Value) => {
    setDate(value);
  };

  return (
    <div className="flex flex-col items-center p-8 font-sans">
      <div className="shadow-lg rounded-xl overflow-hidden bg-white p-4">
        <Calendar onChange={handleChange} value={date} />
      </div>
    </div>
  );
};

export default CalendarCard;
