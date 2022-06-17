import React from 'react';
import { weekDays, months, getNumberOfDay, formatMonthDay } from './utils';
import './styles.css';

const ReactCalendar = () => {
  const [currentDay, setCurrentDay] = React.useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const [prevMonthDays, setPrevMonthDays] = React.useState<any>([]);
  const [currentMonthDays, setCurrentMonthDays] = React.useState<any>([]);
  const [nextMonthDays, setNextMonthDays] = React.useState<any>([]);

  const goToPrevMonth = () => {
    if(currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
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

  const goToPrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const goToNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  React.useEffect(() => {
    const days = [];
    let firstDay = new Date(`1 ${months.en[currentMonth]}, ${currentYear}`).getDay();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const yearOfPrevMonth = prevMonth === 11 ? currentYear - 1 : currentYear;

    if(firstDay === 0) {
      firstDay = 7;
    }

    const prevDays = [];
    for(let i = firstDay - 1; i >= 0; i -= 1) {
      prevDays.push(getNumberOfDay(prevMonth, yearOfPrevMonth) - i);
    }
    setPrevMonthDays(prevDays);

    const currentDays = [];
    for(let i = 1; i <= getNumberOfDay(currentMonth, currentYear); i += 1) {
      currentDays.push(i);
    }
    setCurrentMonthDays(currentDays);

    const nextDays = [];
    for(let i = 1; i <= 42 - (getNumberOfDay(currentMonth, currentYear) + firstDay); i += 1) {
      nextDays.push(i);
    }
    setNextMonthDays(nextDays);
    
  }, [currentMonth, currentYear]);

  return (
    <div className="calendarContainer">
      <div className="calendarHeader">
        <div className="calendarDateDiv">
          <button onClick={goToPrevMonth} className="arrowButton" type="button">&#8249;</button>
          <div>
            <button className="dateButton" type="button">{months.pt[currentMonth]}</button>
          </div>
          <button onClick={goToNextMonth} className="arrowButton" type="button">&#8250;</button>
        </div>
        <div className="calendarDateDiv">
          <button onClick={goToPrevYear} className="arrowButton" type="button">&#8249;</button>
          <div>
            <button className="dateButton" type="button">{currentYear}</button>
          </div>
          <button onClick={goToNextYear} className="arrowButton" type="button">&#8250;</button>
        </div>
      </div>
      <div className="calendarContent">
        <div className="grid">
          {weekDays.pt.map((day: string, index: number) => (
            <div key={index} className="weekDay">{day}</div>
          ))}
        </div>
        <div className="grid">
          {prevMonthDays.map((day: number, index: number) => (
            <button onClick={goToPrevMonth} key={index} className="monthDay" type="button">{formatMonthDay(day)}</button>
          ))}
          {currentMonthDays.map((day: number, index: number) => (
            <button key={index} className="monthDay currentMonthDay" type="button">{formatMonthDay(day)}</button>
          ))}
          {nextMonthDays.map((day: number, index: number) => (
            <button onClick={goToNextMonth} key={index} className="monthDay" type="button">{formatMonthDay(day)}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactCalendar;
