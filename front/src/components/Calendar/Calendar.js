import React, {useState} from 'react'
import BodyOfCalendar from './BodyOfCalendar';
import { monthObject } from '../../functions/MonthObject'
//
export default function Calendar({...props}) {
    const {currentYear, currentMonth, generalorspecific, arebuttons} = props;
    const [month, setMonth] = useState(currentMonth);
    const [fetchMonth, setFetchMonth] = useState(generalorspecific === 0 ? month + 1 : month);
    const [year, setYear] = useState(currentYear);
    const [data, setData] = useState([]);
    let planning = [];
    let disclaimer = 'Choisissez le mois dans la barre de navigation afin de consulter votre planning';
  
    const handleBackClick = () => {
      setMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
      setFetchMonth(prevFetchMonth => (prevFetchMonth === 1 ? 12 : prevFetchMonth - 1));
      if (month === 0) setYear(prevYear => prevYear - 1);
    };
  
    const handleForwardClick = () => {
      setMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
      setFetchMonth(prevFetchMonth => (prevFetchMonth === 12 ? 1 : prevFetchMonth + 1));
      if (month === 11) setYear(prevYear => prevYear + 1);
    };
  
    React.useEffect(() => {
      fetch(`/user/${fetchMonth}`)
        .then(res => res.json())
        .then(datafrombackend => setData(datafrombackend));
    }, [fetchMonth]);
  
    if (data.month !== undefined) {
      data.month.length > 0
        ? (planning = [...new Set(data.month.map(day => parseInt(day.date.split("-")[2].slice(0, 2), 10)))])
        : (disclaimer = `Aucun cours n'est programmé en ${monthObject[fetchMonth]} ${year}`);
    }
  
    return (
      <>
        <p className="disclaimer-month">{disclaimer}</p>
        <div className="calendar">
          {arebuttons === true ? (
            <div className="calendar-header">
              <button className="prev-button" onClick={handleBackClick}>&lt;</button>
              <h2 className="month-title">{monthObject[fetchMonth]} {year}</h2>
              <button className="next-button" onClick={handleForwardClick}>&gt;</button>
            </div>
          ) : (
            <div>
              <h2 className="month-title">{monthObject[fetchMonth]} {year}</h2>
            </div>
          )}
          <div className="calendar-grid">
            <div className="weekday">Lun</div>
            <div className="weekday">Mar</div>
            <div className="weekday">Mer</div>
            <div className="weekday">Jeu</div>
            <div className="weekday">Ven</div>
            <div className="weekday">Sam</div>
            <div className="weekday">Dim</div>
            <BodyOfCalendar month={month} year={year} planning={planning} />
          </div>
        </div>
      </>
    );
  }
  