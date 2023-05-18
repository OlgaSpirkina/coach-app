import React from 'react'
import { useParams } from 'react-router-dom'
import { monthObject } from '../../functions/MonthObject'
import Calendar from '../../components/Calendar'
//
export default function UserMonths() {
    const params = useParams()
    let monthPlanning;
    let datesOfClasses = [];
    let year;
    let thismonth;
    const [themonth, setMonth] = React.useState(null)
    React.useEffect(() => {
        fetch(`/user/${params.monthid}`)
            .then(res => res.json())
            .then(data => setMonth(data.month))
    }, [params.monthid]);
    //datesOfClasses = [...new Set(themonth.map(day => (parseInt(day.date.split("-")[2].slice(0,2),10))))]
    (themonth !== null)
        ?
        (
            monthPlanning = themonth.map(day => (
                <div key={day.id} className="day-planning-list">
                    <h2>{day.company} {day.company_site}</h2>
                    <p>{day.date}</p>
                </div>)
            )
           
        )
        :
        (
            monthPlanning = "Consultez votre planning ici"
        )

    return (
        (params.monthid && themonth !== null)
            ?
            (
                <>
                    
                    <div id="month-container">
                        <h1>Planning du mois {monthObject[params.monthid]}</h1>
                        <div id="month-list-parent">
                            {monthPlanning}
                        </div>
                    </div>
                    </>
                    )
                    :
                    (
                       null
                    )
    )

}
//<Calendar currentYear={themonth[0].choose_years} currentMonth={themonth[0].choose_month} generalorspecific={1}/>
/*

*/