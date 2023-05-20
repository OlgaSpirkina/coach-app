import React from 'react'
import { useParams } from 'react-router-dom'
import { monthObject } from '../../functions/MonthObject'
import NewCalendar from '../../components/Calendar/NewCalendar'
import Invoice from '../../components/Invoice/Invoice'
//
export default function UserMonths() {
    const params = useParams()
  
    let calendar;
    const [themonth, setMonth] = React.useState(null);
    React.useEffect(() => {
        fetch(`/user/${params.monthid}`)
            .then(res => res.json())
            .then(data => setMonth(data.month))
    }, [params.monthid]);
   
    
      
    calendar = themonth && themonth.map((day, index) =>
        index === 0 ? (
          <NewCalendar
            key={index}
            currentYear={day.choose_years}
            currentMonth={day.choose_month - 1}
          />
        ) : null
    );
    console.log("Planning")
    console.log(themonth)
    return (
        (params.monthid && themonth !== null)
            ?
            (
                <>
                    {calendar}
                    <Invoice classes={themonth} monthIndex={params.monthid}/>
                    
                </>
            )
            :
            (
                null
            )
    )

}
//
// CHAT GPT version
// export default function UserMonths() {
//   const params = useParams();
//   let monthPlanning;
//   let calendar;
//   const [themonth, setMonth] = useState(null);
//   const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

//   useEffect(() => {
//     fetch(`/user/${params.monthid}`)
//       .then(res => res.json())
//       .then(data => {
//         setMonth(data.month);
//         setCurrentMonthIndex(data.month.findIndex(day => day.choose_month === data.month[0].choose_month));
//       });
//   }, [params.monthid]);

//   themonth !== null
//     ? (monthPlanning = themonth.map(day => (
//         <div key={day.id} className="day-planning-list">
//           <h2>{day.company} {day.company_site}</h2>
//           <p>{day.date}</p>
//         </div>
//       )))
//     : (monthPlanning = "");

//   themonth !== null
//     ? (calendar = themonth.map((day, index) =>
//         index === 0 ? (
//           <Calendar
//             key={index}
//             currentYear={day.choose_years}
//             currentMonth={currentMonthIndex}
//           />
//         ) : null
//       ))
//     : (calendar = "");

//   return (
//     params.monthid && themonth !== null ? (
//       <>
//         {calendar}
//         <div id="month-container">
//           <h1>Planning du mois {monthObject[params.monthid]}</h1>
//           <div id="month-list-parent">{monthPlanning}</div>
//         </div>
//       </>
//     ) : (
//       <div>Loading...</div>
//     )
//   );
// }

/*
let monthPlanning;
monthPlanning = themonth && themonth.map(day => (
        <div key={day.id} className="day-planning-list">
          <h2>{day.company} {day.company_site}</h2>
          <p>{day.date}</p>
        </div>
    ));
<div id="month-container">
    <h1>Planning du mois {monthObject[params.monthid]}</h1>
    <div id="month-list-parent">
        {monthPlanning}
    </div>
</div>
*/


