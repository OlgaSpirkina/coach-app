import React from 'react';
import UserCalendarHeader from '../../components/UserCalendarHeader';
import UserMonths from './UserMonths';
import Calendar from '../../components/Calendar/Calendar';

export default function UserCalendar({ show }) {
  const [month, setMonth] = React.useState([]);
  const [showParent, setShowParent] = React.useState(show);
  const [themonth, setThemonth] = React.useState(null);

  const handleRemoveParent = () => {
    setShowParent(false);
  };

  const getBackCalendar = () => {
    setShowParent(true);
  };

  React.useEffect(() => {
    fetch("/user")
      .then(result => result.json())
      .then(data => {
        setMonth(data.timetable);
        setThemonth(data.timetable);
      });
  }, []);

  let monthList = [...new Set(month.map(eachmonth => eachmonth.choose_month))];

  return (
    <>
      <h2>Calendar Page</h2>
      <nav>
        <UserCalendarHeader props={monthList} onRemoveParent={handleRemoveParent} />
      </nav>
      <div>
        <>
          {showParent ? (
            <Calendar
              currentYear={new Date().getFullYear()}
              currentMonth={new Date().getMonth()}
              generalorspecific={0}
              arebuttons={true}
              themonth={themonth}
            />
          ) : null}
          <UserMonths setThemonth={setThemonth} />
        </>
      </div>
    </>
  );
}


// import React from 'react'
// import UserCalendarHeader from '../../components/UserCalendarHeader'
// import UserMonths from './UserMonths';
// import Calendar from '../../components/Calendar/Calendar'
// //

// export default function UserCalendar({show}){
//     const [month, setMonth] = React.useState([]);
//     const [showParent, setShowParent] = React.useState(show);

//     const handleRemoveParent = () => {
//         setShowParent(false);
//     };
//     const getBackCalendar = () => {
//         setShowParent(true);
//     }
//     React.useEffect(()=>{
//         fetch("/user")
//             .then(result => result.json())
//             .then(data => setMonth(data.timetable))
//     },[])
    
//     let monthList = [...new Set(month.map(eachmonth => eachmonth.choose_month))];
//     return (
//         <>
//         <h2>Calendar Page</h2>
//         <nav>
//             {
//               <UserCalendarHeader props={monthList} onRemoveParent={handleRemoveParent} />
//             }
//         </nav>
//         <div>
//             {
//                 <>  
//                     {(showParent === true) ? <Calendar currentYear={new Date().getFullYear()} currentMonth={new Date().getMonth()} generalorspecific={0} arebuttons={true}/> : <div></div>}
//                     <UserMonths />
//                 </>   
//             }
//         </div>
//         </>
//     )
// }
