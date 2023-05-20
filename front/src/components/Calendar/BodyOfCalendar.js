import findWeeksInYear from '../../functions/Calendar'
import React from 'react'
const today = `${parseInt(new Date().getDate())}_${new Date().getMonth()}`;

export default function BodyOfCalendar({ ...props }) {
    const { onDataSelect } = props;
    let currentMonthObject = findWeeksInYear(props.year).filter(
      item => item.monthOfYear === props.month
    );
    let missingDays = [];
    const [dailyClasses, setDailyClasses] = React.useState(0);
    const [monthOfDay, setMonthOfDate] = React.useState(0);
    const [yearOfDay, setYearOfDay] = React.useState(0);
    const [fetchedData, setFetchedData] = React.useState([]);
    const firstUpdate = React.useRef(true);
  
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
    const handleClick = ({ ...params }) => {
      const { day, month, year } = params;
      setDailyClasses(day);
      setMonthOfDate(month + 1);
      setYearOfDay(year);
    };
    //
    React.useEffect(() => {
      if (!firstUpdate.current) {
        fetch(`/user/planning?year=${yearOfDay}&month=${monthOfDay}&day=${dailyClasses}`)
          .then(res => res.json())
          .then(data => {
            setFetchedData(data.daily_planning);
            onDataSelect(data.daily_planning);
          });
      } else {
        firstUpdate.current = false;
      }
    }, [dailyClasses, monthOfDay, yearOfDay]);
    //
    React.useEffect(() => {
      //console.log(fetchedData);
    }, [fetchedData]);
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
  
  
/*
export default function BodyOfCalendar({...props}){
    let currentMonthObject = findWeeksInYear(props.year).filter(item => item.monthOfYear === props.month);
    let missingDays = [];
    const [dailyClasses, setDailyClasses] = React.useState(0);
    const [monthOfDay, setMonthOfDate] = React.useState(0);
    const [yearOfDay, setYearOfDay] = React.useState(0);
    const [fetchedData, setFetchedData] = React.useState([]);
    const firstUpdate = React.useRef(true); 
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
    const handleClick = ({...params}) => {
        const {day, month, year} = params;
        setDailyClasses(day);
        setMonthOfDate(month+1);
        setYearOfDay(year); 
    }
    React.useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false; // Skip the first execution
            return;
        }
        if (dailyClasses && monthOfDay && yearOfDay) {
          fetch(`/user/planning?year=${yearOfDay}&month=${monthOfDay}&day=${dailyClasses}`)
            .then(res => res.json())
            .then(data => {
              setFetchedData(data.daily_planning);
              console.log(fetchedData);
            });
        }
    }, [dailyClasses, monthOfDay, yearOfDay]);
    return(
        <>
            {missingDays.map((day, index) => (
                <div key={index}></div>
            ))}
            {currentMonthObject.map(day => (
                <div key={day.monthOfYear+''+day.dayInMonth} 
                className={
                    `calendar-day 
                    ${(`${day.dayInMonth}_${day.monthOfYear}` === today) ? 'today' : ''} 
                    ${(props.planning.includes(day.dayInMonth)) ? 'has-classes' : ''}
                    `
                }
                onClick={() => {
                    if (props.planning && props.planning.includes(day.dayInMonth)) {
                      handleClick({ day: day.dayInMonth, month: day.monthOfYear, year: day.year });
                    }
                  }
                }
                >
                    <b>{day.dayInMonth}</b>
                </div>
            ))}
        </>
    )
    
}
*/