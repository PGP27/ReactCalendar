import React from 'react';
import { monthsEn, monthsPt } from './months';
import { getNumberOfDay } from './utils';
import './styles.css';

const ReactCalendar = () => {
  const [currentDay, setCurrentDay] = React.useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const [monthDays, setMonthDays] = React.useState([]);

  React.useEffect(() => {
    const days = [];
    const firstDay = new Date(`1 ${monthsEn[currentMonth]}, ${currentYear}`).getDay();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const yearOfPrevMonth = prevMonth === 11 ? currentYear - 1 : currentYear;

    for(let i = firstDay - 1; i >= 0; i -= 1) {
      days.push(getNumberOfDay(prevMonth, yearOfPrevMonth) - i);
    }

    for(let i = 1; i <= getNumberOfDay(currentMonth, currentYear); i += 1) {
      days.push(i);
    }
    
    console.log(days);
    
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
