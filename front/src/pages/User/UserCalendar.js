import React from 'react'
import UserCalendarHeader from '../../components/UserCalendarHeader';
import { monthObject } from '../../functions/MonthObject';
import Calendar from '../../components/Calendar';
import UserMonths from './UserMonths';

const currentMonth = new Date().getMonth()+1;
export default function UserCalendar(){
    const [month, setMonth] = React.useState([]);
    React.useEffect(()=>{
        fetch("/user")
            .then(result => result.json())
            .then(data => setMonth(data.timetable))
    },[])
    
    let monthList = [...new Set(month.map(eachmonth => eachmonth.choose_month))];
    return (
        <>
        <h2>Calendar Page</h2>
        <nav>
            {
                monthList.includes(currentMonth)
                    ?
                (
                    <UserCalendarHeader props={monthList} />
                )
                    :
                    <>
                    <a href="" className="active-link">{monthObject[currentMonth]}</a>
                    {<UserCalendarHeader props={monthList}/>}
                    </>
            }
        </nav>
        <div>
        {
                monthList.includes(currentMonth)
                    ?
                (
                <>
                    <UserMonths />
                </>
                )
                    :
                    <p>
                        Aucun cours n'est planifié pour le mois de {monthObject[currentMonth]}
                    </p>
            }
        </div>
        </>
    )
}
