import React from 'react';
import { weekDays, months, getNumberOfDay, formatMonthDay } from './utils';
import chevronLeft from './assets/chevron_left.svg';
import chevronRight from './assets/chevron_right.svg';
import { CSSProperties } from 'react'; 
import './styles.css';

interface ReactCalendarProps {
  value?: Date,
  lang?: 'en' | 'pt',
  onChange?: (date: Date) => any,
  style?: {
    container: CSSProperties,
  }
};

const className = 'react-super-calendar';

const ReactCalendar = ({ value, lang, onChange, style }: ReactCalendarProps) => {
  const [currentDay, setCurrentDay] = React.useState(value ? value?.getDate() : new Date().getDate());
  const [currentMonth, setCurrentMonth] = React.useState(value ? value?.getMonth() : new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(value ? value?.getFullYear() : new Date().getFullYear());
  const [prevMonthDays, setPrevMonthDays] = React.useState<any>([]);
  const [currentMonthDays, setCurrentMonthDays] = React.useState<any>([]);
  const [nextMonthDays, setNextMonthDays] = React.useState<any>([]);
  const [showMonths, setShowMonths] = React.useState<boolean>(false);
  const [showYears, setShowYears] = React.useState<boolean>(false);
  const [yearsToShow, setYearsToShow] = React.useState<any>();
  
  const selectedLang = React.useMemo(() => lang || 'en', [lang]);

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
    for(let i = currentYear - 50; i <= currentYear + 51; i += 1) {
      years.push(i);
    }
    setYearsToShow(years);
    
  }, [currentMonth, currentYear]);

  React.useEffect(() => {
    const lastDay = getNumberOfDay(currentMonth, currentYear);
    if(lastDay < currentDay) setCurrentDay(lastDay);
    if(onChange) {
      onChange(new Date(`${currentYear} ${months.en[currentMonth]} ${currentDay}`));
    }
  }, [currentDay, currentMonth, currentYear, onChange]);

  return (
    <div className={`${className}-container`} style={style?.container}>
      <div className={`${className}-header`}>
        <div className={`${className}-month-year-header`}>
          <button disabled={showMonths || showYears} onClick={goToPrevYear} className={`${className}-arrow-button`} type="button">
            <img src={chevronLeft} alt="Go to prev year" />
          </button>
          <button onClick={() => showMonthOrYear('year')} className={`${className}-month-year-button`} type="button">{currentYear}</button>
          <button disabled={showMonths || showYears} onClick={goToNextYear} className={`${className}-arrow-button`} type="button">
            <img src={chevronRight} alt="Go to next year" />
          </button>
        </div>
        <div className={`${className}-month-year-header`}>
          <button disabled={showMonths || showYears} onClick={goToPrevMonth} className={`${className}-arrow-button`} type="button">
            <img src={chevronLeft} alt="Go to prev month" />
          </button>
          <button onClick={() => showMonthOrYear('month')} className={`${className}-month-year-button`} type="button">{months[`${selectedLang}`][currentMonth]}</button>
          <button disabled={showMonths || showYears} onClick={goToNextMonth} className={`${className}-arrow-button`} type="button">
          <img src={chevronRight} alt="Go to next month" />
          </button>
        </div>
      </div>
      <div className={`${className}-content`}>
        {showMonths && !showYears && (
          <div className={`${className}-month-year-grid`}>
            {
              months[`${selectedLang}`].map((month, index) => (
                <button onClick={() => selectDate('month', index)} key={month} className={`${className}-month-year-grid-button`}>{month.substring(0, 3)}</button>
              ))
            }
          </div>
        )}
        {showYears && !showMonths && (
          <div className={`${className}-month-year-grid`}>
            {
              yearsToShow.map((year: number) => (
                <button onClick={() => selectDate('year', year)} key={year} className={`${className}-month-year-grid-button`}>{year}</button>
              ))
            }
          </div>
        )}
        {!showMonths && !showYears && (
          <>
            <div className={`${className}-week-days-grid`}>
              {weekDays[`${selectedLang}`].map((day: string, index: number) => (
                <div key={index} className={`${className}-week-day`}>{day}</div>
              ))}
            </div>
            <div className={`${className}-month-days-grid`}>
              {prevMonthDays.map((day: number, index: number) => (
                <button onClick={() => handleChangeDay('prev', day)} key={index} className={`${className}-month-day`} type="button">{formatMonthDay(day)}</button>
              ))}
              {currentMonthDays.map((day: number, index: number) => {
                if(day === currentDay) {
                  return (
                    <button onClick={() => handleChangeDay('current', day)} key={index} className={`${className}-month-day ${className}-current-day`} type="button">{formatMonthDay(day)}</button>
                  );
                }
                return (
                  <button onClick={() => handleChangeDay('current', day)} key={index} className={`${className}-month-day ${className}-current-month-days`} type="button">{formatMonthDay(day)}</button>
                );
              })}
              {nextMonthDays.map((day: number, index: number) => (
                <button onClick={() => handleChangeDay('next', day)} key={index} className={`${className}-month-day`} type="button">{formatMonthDay(day)}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReactCalendar;
