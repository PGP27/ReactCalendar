import React from 'react';
import { weekDays, months, getNumberOfDay, formatMonthDay } from './utils';
import './styles.css';

const ReactCalendar = () => {
  const [currentDay, setCurrentDay] = React.useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const [monthDays, setMonthDays] = React.useState<any>([]);

  const goToPrevMonth = () => {
    if(currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  };

  const goToNextMonth = () => {
    if(currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  };

  React.useEffect(() => {
    const days = [];
    let firstDay = new Date(`1 ${months.en[currentMonth]}, ${currentYear}`).getDay();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const yearOfPrevMonth = prevMonth === 11 ? currentYear - 1 : currentYear;

    if(firstDay === 0) {
      firstDay = 7;
    }
    for(let i = firstDay - 1; i >= 0; i -= 1) {
      days.push(getNumberOfDay(prevMonth, yearOfPrevMonth) - i);
    }

    for(let i = 1; i <= getNumberOfDay(currentMonth, currentYear); i += 1) {
      days.push(i);
    }

    for(let i = 1; i <= 42 - (getNumberOfDay(currentMonth, currentYear) + firstDay); i += 1) {
      days.push(i);
    }
    
    setMonthDays(days);
    
  }, [currentMonth]);

  return (
    <div className="calendarContainer">
      <div className="calendarHeader">
        <button onClick={goToPrevMonth}>&#8249;</button>
        <div>
          <button>{months.pt[currentMonth]}</button>
          <button>{currentYear}</button>
        </div>
        <button onClick={goToNextMonth}>&#8250;</button>
      </div>
      <div className="calendarContent">
        <div className="grid">
          {weekDays.pt.map((day: string, index: number) => (
            <p key={index}>{day}</p>
          ))}
        </div>
        <div className="grid">
          {monthDays.map((day: number, index: number) => (
            <p key={index}>{formatMonthDay(day)}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactCalendar;
