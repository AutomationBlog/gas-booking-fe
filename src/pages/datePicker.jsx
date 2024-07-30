import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";

export const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      name="date"
      value={startDate}
      filterDate={isWeekday}
      showTimeSelect
      timeIntervals={120}
      timeFormat="hh:mm aa"
      placeholderText="Select date and time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};
