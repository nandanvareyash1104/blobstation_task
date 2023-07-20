import React from "react";
import ScheduleEntry from "./ScheduleEntry";

const ScheduleList = ({ scheduleData }) => {
  return (
    <div>
      <h1>Schedule List</h1>
      {scheduleData.map((entry) => (
        <ScheduleEntry
          key={entry.id}
          id={entry.id}
          scheduleType={entry.scheduleType}
          selectedTime={entry.selectedTime}
          selectedInterval={entry.selectedInterval}
          selectedDate={entry.selectedDate}
          selectedDays={entry.selectedDays}
          selectedDayTime={entry.selectedDayTime}
          selectedHours={entry.selectedHours}
          startDate={entry.startDate}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
