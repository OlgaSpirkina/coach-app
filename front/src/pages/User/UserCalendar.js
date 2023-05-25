import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import UserCalendarHeader from '../../components/UserCalendarHeader';
import UserMonths from './UserMonths';
import Calendar from '../../components/Calendar/Calendar';

export default function UserCalendar() {
  const [month, setMonth] = React.useState([]);
  const [showParent, setShowParent] = React.useState(true);
  React.useEffect(() => {
    fetch('/user')
      .then(result => result.json())
      .then(data => setMonth(data.timetable));
  }, []);

  let monthList = [...new Set(month.map(eachmonth => eachmonth.choose_month))];

  return (
    <>
      <h2>Calendar Page</h2>
      <nav>
        <UserCalendarHeader props={monthList} />
      </nav>
      <div>
        {showParent ? (
          <Routes>
            <Route path="/*" element={
              <Calendar 
                currentYear={new Date().getFullYear()} 
                currentMonth={new Date().getMonth()} 
                generalorspecific={0} 
                arebuttons={true} 
              />
              } 
            />
            <Route path="/:monthid" element={
              <UserMonths />
              } 
            />
          </Routes>
        ) : null}
      </div>
    </>
  );
}
