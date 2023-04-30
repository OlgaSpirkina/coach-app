import React from 'react'
import { useParams } from 'react-router-dom'
import { monthObject } from '../../functions/MonthObject'

export default function UserMonths(){
    const params = useParams()
    let monthPlanning;
    const [themonth, setMonth] = React.useState(null)
    React.useEffect(()=>{
        fetch(`/user/${params.monthid}`)
            .then(res => res.json())
            .then(data => setMonth(data.month))
    }, [params.monthid]);
    
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
        (params.monthid)
            ?
        (
            <div id="month-container">
                <h1>Planning du mois {monthObject[params.monthid]}</h1>
                <div id="month-list-parent">
                    {monthPlanning}
                </div>
            </div>
        )
            :
        (
            <h3>Naviguez votre souris sur le mois afin de voir vos cours</h3>
        )
    )
    
}