import React from 'react';
import { monthsEn, monthsPt } from './months';
import './styles.css';

const ReactCalendar = () => {
  const [currentDay, setCurrentDay] = React.useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const [monthDays, setMonthDays] = React.useState([]);

  React.useEffect(() => {
    const days = [];
    const firstDay = new Date(`1 ${monthsEn[currentMonth]}, ${currentYear}`).getDay();

    for(let i = 0; i < firstDay; i += 1) {
      days.push();
    }
  }, []);

  return (
    <div className="calendarContainer">
      <div className="calendarHeader">
        <button>&#8249;</button>
        <div>
          <button>{currentMonth}</button>
          <button>{currentYear}</button>
        </div>
        <button>&#8250;</button>
      </div>
      <div className="calendarContent">
        <div className="calendarContentHeader">
          <p>D</p>
          <p>S</p>
          <p>T</p>
          <p>Q</p>
          <p>Q</p>
          <p>S</p>
          <p>S</p>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default ReactCalendar;
