import findWeeksInYear from '../../functions/Calendar'
import React from 'react'
const today = `${parseInt(new Date().getDate())}_${new Date().getMonth()}`;

export default function BodyOfCalendar({ ...props }) {
    const { onDataSelect } = props;
    let currentMonthObject = findWeeksInYear(props.year).filter(
      item => item.monthOfYear === props.month
    );
    let missingDays = [];
    const [fetchedData, setFetchedData] = React.useState([]);
  
    if (currentMonthObject[0].dayweek !== 1) {
      if (currentMonthObject[0].dayweek === 0) {
        for (let i = 1; i < 7; i++) {
          missingDays.push({});
        }
      } else {
        for (let i = 1; i < currentMonthObject[0].dayweek; i++) {
          missingDays.push({});
        }
      }
    }
    const handleClick = async ({ day, month, year }) => {
      const selectedDay = day;
      const selectedMonth = month + 1;
      const selectedYear = year;
    
      try {
        const response = await fetch(`/user/planning?year=${selectedYear}&month=${selectedMonth}&day=${selectedDay}`);
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data.daily_planning);
          if (onDataSelect) onDataSelect(data.daily_planning);
        } else {
          // Handle error response
          console.log('Error:', response.status);
        }
      } catch (error) {
        // Handle fetch error
        console.log('Fetch error:', error);
      }
    };
    return (
      <>
          {missingDays.map((day, index) => (
            <div key={index}></div>
          ))}
          {currentMonthObject.map(day => (
            <div
              key={day.monthOfYear + "" + day.dayInMonth}
              className={`calendar-day ${
                `${day.dayInMonth}_${day.monthOfYear}` === today ? "today" : ""
              } ${props.planning && props.planning.includes(day.dayInMonth) ? "has-classes" : ""}`}
              onClick={() => {
                if (props.planning && props.planning.includes(day.dayInMonth)) {
                  handleClick({ day: day.dayInMonth, month: day.monthOfYear, year: day.year });
                  
                }
              }}
            >
              <b>{day.dayInMonth}</b>
            </div>
          ))}
        
         
      </>
    );
}
