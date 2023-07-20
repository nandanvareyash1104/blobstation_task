import React from "react";

const ScheduleEntry = ({
  id,
  scheduleType,
  selectedTime,
  selectedInterval,
  selectedDate,
  selectedDays,
  selectedDayTime,
  selectedHours,
  startDate,
}) => {
  return (
    <div>
      <h2>Schedule Entry ID: {id}</h2>
      <p>Schedule Type: {scheduleType}</p>
      <p>Selected Time: {selectedTime}</p>
      <p>Selected Interval: {selectedInterval}</p>
      <p>Selected Date: {selectedDate}</p>
      <p>Selected Days: {selectedDays?.join(", ")}</p>{" "}
      {/* Add the optional chaining operator */}
      <p>Selected Day Time: {selectedDayTime}</p>
      <p>Selected Hours: {selectedHours}</p>
      <p>Start Date: {startDate}</p>
      <hr />
    </div>
  );
};

export default ScheduleEntry;
