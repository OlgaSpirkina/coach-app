import React, {useState} from 'react'
import findWeeksInYear from '../functions/Calendar'
import { monthObject } from '../functions/MonthObject'
//
const today = `${parseInt(new Date().getDate())}_${new Date().getMonth()}`;
function CurrentMonthInCalendar({...props}){
    let currentMonthObject = findWeeksInYear(props.year).filter(item => item.monthOfYear === props.month);
    let missingDays = [];
    if(currentMonthObject[0].dayweek !== 1){
        if(currentMonthObject[0].dayweek === 0){
            for(let i=1; i<7; i++){
                missingDays.push({});
            }
        }else{
            for(let i=1; i<currentMonthObject[0].dayweek; i++){
                missingDays.push({});
            }
        }
    }
    return(
        <>
            {missingDays.map((day, index) => (
                <div key={index}></div>
            ))}
            {currentMonthObject.map(day => (
                <div key={day.monthOfYear+''+day.dayInMonth} 
                className={`calendar-day ${(`${day.dayInMonth}_${day.monthOfYear}` === today) ? 'today' : ''} ${(props.planning.includes(day.dayInMonth)) ? 'has-classes' : ''}`}
    
                
                >
                    <b>{day.dayInMonth}</b>
                </div>
            ))}
        </>
    )
    
}


export default function Calendar({...props}){
    const {currentYear, currentMonth, generalorspecific} = props;
    const [month, setMonth] = useState(currentMonth);
    let generalorspecificmonth;
    (generalorspecific === 0)
        ?
        generalorspecificmonth = month+1
        :
        generalorspecificmonth = month;
    const [fetchMonth, setFetchMonth] = useState(generalorspecificmonth);
    const [year, setYear] = useState(currentYear);
    const [data, setData] = useState([]);
    let planning = [];
    let disclaimer;
    const handleBackClick = () => {
        (month === 0) ? setMonth(11) : setMonth(month-1);
        (month === 0) ? setFetchMonth(12) : setFetchMonth(fetchMonth-1);
        if(month === 0)setYear(year-1);
    }
    const handleForwardClick = () => {
        (month === 11) ? setMonth(0) : setMonth(month+1);
        (month === 11) ? setFetchMonth(1) : setFetchMonth(fetchMonth+1);
        if(month === 11)setYear(year+1);
    }
    React.useEffect(()=>{
        fetch(`/user/${fetchMonth}`)
            .then(res => res.json())
            .then(datafrombackend => setData(datafrombackend))
    }, [fetchMonth]);   
    //
    if((data.month !== undefined)){
        ((data.month.length > 0))
            ?
        (
            planning = [...new Set(data.month.map(day => (parseInt(day.date.split("-")[2].slice(0,2),10))))]
        )
            :
        (
            disclaimer = `Aucun cours n'est programmé en ${monthObject[fetchMonth]} ${year}`
        );
    }
    return(
        <>
            <p className="disclaimer-month">{disclaimer}</p>
            <div className="calendar">
                <div className="calendar-header">
                    <button className="prev-button" onClick={handleBackClick}>&lt;</button>
                    <h2 className="month-title">{monthObject[fetchMonth]} {year}</h2>
                    <button className="next-button" onClick={handleForwardClick}>&gt;</button>
                </div>
                <div className="calendar-grid">
                    <div className="weekday">Lun</div>
                    <div className="weekday">Mar</div>
                    <div className="weekday">Mer</div>
                    <div className="weekday">Jeu</div>
                    <div className="weekday">Ven</div>
                    <div className="weekday">Sam</div>
                    <div className="weekday">Dim</div>
                    <CurrentMonthInCalendar month={month} year={year} planning={planning}/>
                </div>
            </div>
        </>
        

    )
}
