import React from 'react';
import { weekDays, months, getNumberOfDay, formatMonthDay } from './utils';
import chevronLeft from "./assets/chevron_left.svg";
import chevronRight from "./assets/chevron_right.svg";
import './styles.css';

const ReactCalendar = ({ onChange }: any) => {
  const [currentDay, setCurrentDay] = React.useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const [prevMonthDays, setPrevMonthDays] = React.useState<any>([]);
  const [currentMonthDays, setCurrentMonthDays] = React.useState<any>([]);
  const [nextMonthDays, setNextMonthDays] = React.useState<any>([]);
  const [showMonths, setShowMonths] = React.useState<boolean>(false);
  const [showYears, setShowYears] = React.useState<boolean>(false);
  const [yearsToShow, setYearsToShow] = React.useState<any>();

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
    if(currentYear > 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const goToNextYear = () => {
    if(currentYear < 9999) {
      setCurrentYear(currentYear + 1);
    }
  };

  const handleChangeDay = (month: 'prev' | 'current' | 'next', day: number) => {
    if(month === 'prev') goToPrevMonth();
    if (month === 'next') goToNextMonth();
    setCurrentDay(day);
  };

  const showMonthOrYear = (type: 'month' | 'year') => {
    if(type === 'month') {
      setShowYears(false);
      setShowMonths(!showMonths);
    } else {
      setShowMonths(false);
      setShowYears(!showYears);
    }
  };

  const selectDate = (type: 'month' | 'year', value: number) => {
    if(type === 'month') {
      setCurrentMonth(value);
    } else {
      setCurrentYear(value);
    }
    showMonthOrYear(type);
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

    const years = [];
    for(let i = currentYear - 99; i <= currentYear + 100; i += 1) {
      years.push(i);
    }
    setYearsToShow(years);
    
  }, [currentMonth, currentYear]);

  React.useEffect(() => {
    const lastDay = getNumberOfDay(currentMonth, currentYear);
    if(lastDay < currentDay) setCurrentDay(lastDay);
    onChange({
      day: currentDay,
      month: months.pt[currentMonth],
      year: currentYear,
    });
  }, [currentDay, currentMonth, currentYear]);

  return (
    <div className="calendarContainer">
      <div className="calendarHeader">
        <div className="calendarDateDiv">
          <button onClick={goToPrevYear} className="arrowButton" type="button">
            <img src={chevronLeft} alt="Go to prev year" />
          </button>
          <button onClick={() => showMonthOrYear('year')} className="dateButton" type="button">{currentYear}</button>
          <button onClick={goToNextYear} className="arrowButton" type="button">
            <img src={chevronRight} alt="Go to next year" />
          </button>
        </div>
        <div className="calendarDateDiv">
          <button onClick={goToPrevMonth} className="arrowButton" type="button">
            <img src={chevronLeft} alt="Go to prev month" />
          </button>
          <button onClick={() => showMonthOrYear('month')} className="dateButton" type="button">{months.pt[currentMonth]}</button>
          <button onClick={goToNextMonth} className="arrowButton" type="button">
          <img src={chevronRight} alt="Go to next month" />
          </button>
        </div>
      </div>
      <div className="calendarContent">
        {showMonths && !showYears && (
          <div className="grid4">
            {
              months.pt.map((month, index) => (
                <button onClick={() => selectDate('month', index)} key={month} className="dateOption">{month.substring(0, 3)}</button>
              ))
            }
          </div>
        )}
        {showYears && !showMonths && (
          <div className="grid4">
            {
              yearsToShow.map((year: number) => (
                <button onClick={() => selectDate('year', year)} key={year} className="dateOption">{year}</button>
              ))
            }
          </div>
        )}
        {!showMonths && !showYears && (
          <>
            <div className="grid7">
              {weekDays.pt.map((day: string, index: number) => (
                <div key={index} className="weekDay">{day}</div>
              ))}
            </div>
            <div className="grid7">
              {prevMonthDays.map((day: number, index: number) => (
                <button onClick={() => handleChangeDay('prev', day)} key={index} className="monthDay" type="button">{formatMonthDay(day)}</button>
              ))}
              {currentMonthDays.map((day: number, index: number) => {
                if(day === currentDay) {
                  return (
                    <button onClick={() => handleChangeDay('current', day)} key={index} className="monthDay currentDay" type="button">{formatMonthDay(day)}</button>
                  );
                }
                return (
                  <button onClick={() => handleChangeDay('current', day)} key={index} className="monthDay currentMonthDay" type="button">{formatMonthDay(day)}</button>
                );
              })}
              {nextMonthDays.map((day: number, index: number) => (
                <button onClick={() => handleChangeDay('next', day)} key={index} className="monthDay" type="button">{formatMonthDay(day)}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReactCalendar;