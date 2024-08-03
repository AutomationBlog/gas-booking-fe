import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";
import { GasBokingContext } from "../App";

export default function DateTimePicker() {
  const { dateTime, setDateTime } = React.useContext(GasBokingContext);
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  return (
    <DatePicker
      selected={dateTime}
      onChange={(date) => setDateTime(date)}
      name="date"
      value={dateTime}
      filterDate={isWeekday}
      showTimeSelect
      timeIntervals={120}
      timeFormat="hh:mm aa"
      placeholderText="Select date and time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
}
