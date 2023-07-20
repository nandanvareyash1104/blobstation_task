import React, { useState, useEffect } from "react";
import axios from "axios";
import ScheduleList from "./ScheduleList";

const Task = () => {
  const timeslots = ["Morning", "Afternoon", "Evening", "Night"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [scheduleType, setScheduleType] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDayTime, setSelectedDayTime] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeslot, setSelectedTimeslot] = useState("");
  const [apiData, setApiData] = useState([]);

  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        "https://631945908e51a64d2be10770.mockapi.io/api/v1/products"
      );
      setApiData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (
      !scheduleType ||
      (scheduleType === "recurring" &&
        (!selectedTime ||
          !selectedInterval ||
          !selectedDate ||
          selectedDays.length === 0 ||
          !selectedDayTime)) ||
      (scheduleType === "one-time" && (!selectedHours || !startDate)) ||
      (scheduleType === "flexible" &&
        (!selectedTime ||
          !selectedInterval ||
          !selectedDate ||
          selectedDays.length === 0 ||
          !selectedDayTime))
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      id: "96",
      schedule: scheduleType,
      time: selectedHours,
      date: selectedDate,
      days: selectedInterval,
      userinfo: selectedTimeslot,
    };

    try {
      const response = await axios.post(
        "https://631945908e51a64d2be10770.mockapi.io/api/v1/products",
        data
      );
      console.log(response.data);
      alert("Data posted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error posting data to the server. Please try again later.");
    }
  };

  const handleTimeslotChange = (event) => {
    setSelectedTimeslot(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-2 text-start fs-3">
        <label htmlFor="scheduleType">Set your schedule:</label>
      </div>

      <div className="btn-group">
        <label
          className={`btn btn-outline-primary fs-4 ${
            scheduleType === "recurring" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="scheduleType"
            value="recurring"
            checked={scheduleType === "recurring"}
            onChange={(e) => setScheduleType(e.target.value)}
          />
          &nbsp; Recurring
        </label>
        <label
          className={`btn btn-outline-primary fs-4 ${
            scheduleType === "one-time" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="scheduleType"
            value="one-time"
            checked={scheduleType === "one-time"}
            onChange={(e) => setScheduleType(e.target.value)}
          />
          &nbsp; One Time
        </label>
        <label
          className={`btn btn-outline-primary fs-4 ${
            scheduleType === "flexible" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="scheduleType"
            value="flexible"
            checked={scheduleType === "flexible"}
            onChange={(e) => setScheduleType(e.target.value)}
          />
          &nbsp; Flexible
        </label>
      </div>

      {scheduleType === "recurring" && (
        <div className="d-flex flex-column m-auto justify-content-center align-items-center">
          <div className="form-group w-100 ">
            <select
              className="form-control mt-3"
              value={selectedHours}
              onChange={(e) => setSelectedHours(e.target.value)}
              required
            >
              <option value="">Select hours</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
            </select>
          </div>

          <div className="form-group w-100">
            <select
              className="form-control my-3"
              value={selectedInterval}
              onChange={(e) => setSelectedInterval(e.target.value)}
              required
            >
              <option value="">Select interval</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="form-group w-100">
            <label htmlFor="selectedDate">Start date:</label>
            <input
              type="datetime-local"
              id="selectedDate"
              className="form-control "
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>
          <div className="container mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Timeslots</th>
                  {days.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeslots.map((timeslot) => (
                  <tr key={timeslot}>
                    <td>{timeslot}</td>
                    {days.map((day) => (
                      <td key={day}>
                        <input
                          type="radio"
                          name={`timeslot_${timeslot}`} // Unique name for each timeslot
                          value={`${day} ${timeslot}`}
                          onChange={handleTimeslotChange}
                          checked={selectedTimeslot === `${day} ${timeslot}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {scheduleType === "one-time" && (
        <div>
          <div className="form-group">
            <select
              className="form-control mt-3"
              value={selectedHours}
              onChange={(e) => setSelectedHours(e.target.value)}
              required
            >
              <option value="">Select hours</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
            </select>
          </div>

          <div className="form-group my-3 w-100">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      {scheduleType === "flexible" && (
        <div>
          <div className="form-group">
            <select
              className="form-control mt-3"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            >
              <option value="">Select hours</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="datetime-local"
              id="selectedInterval"
              className="form-control my-3"
              value={selectedInterval}
              onChange={(e) => setSelectedInterval(e.target.value)}
              required
            />
          </div>
          <div className="container mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Timeslots</th>
                  {days.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeslots.map((timeslot) => (
                  <tr key={timeslot}>
                    <td>{timeslot}</td>
                    {days.map((day) => (
                      <td key={day}>
                        <input
                          type="radio"
                          name={`timeslot_${timeslot}`}
                          value={`${day} ${timeslot}`}
                          onChange={handleTimeslotChange}
                          checked={selectedTimeslot === `${day} ${timeslot}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

<div className="d-flex justify-content-center align-items-center mt-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      {/* <ScheduleList scheduleData={apiData} /> */}
    </form>
  );
};

export default Task;
