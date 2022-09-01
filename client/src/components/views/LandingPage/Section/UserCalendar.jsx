import React, { useState } from "react";
import Calendar from "react-calendar";
import "./UserCalendar.css";

function UserCalendar() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="bg-white px-6 pt-2 mx-10 w-80 h-full rounded-3xl border-2 border-zinc-300">
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
      />
    </div>
  );
}

export default UserCalendar;
