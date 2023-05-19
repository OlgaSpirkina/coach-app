import findWeeksInYear from '../../functions/Calendar'
import React from 'react'
const today = `${parseInt(new Date().getDate())}_${new Date().getMonth()}`;

export default function BodyOfCalendar({...props}){
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