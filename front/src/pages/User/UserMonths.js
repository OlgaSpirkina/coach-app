import React from 'react'
import { useParams } from 'react-router-dom'
import { monthObject } from '../../functions/MonthObject'
import NewCalendar from '../../components/Calendar/NewCalendar'
import DetailsCalendar from '../../components/Calendar/DetailsCalendar'
import Invoice from '../../components/Invoice/Invoice'
//
export default function UserMonths() {
    const params = useParams();
    const [selectedData, setSelectedData] = React.useState(null);
    let calendar;
    const [themonth, setMonth] = React.useState(null);
    React.useEffect(() => {
        fetch(`/user/${params.monthid}`)
            .then(res => res.json())
            .then(data => setMonth(data.month))
    }, [params.monthid]);
    const handleDataSelection = (data) => {
        setSelectedData(data);
    };
    calendar = themonth && themonth.map((day, index) =>
        index === 0 ? (
          <NewCalendar
            key={index}
            currentYear={day.choose_years}
            currentMonth={day.choose_month - 1}
            onDataSelect={handleDataSelection}
          />
        ) : null
    );
    return (
        (params.monthid && themonth !== null)
            ?
            (
                <>
                    {calendar}
                    {selectedData && (
                        <DetailsCalendar data={selectedData} />
                    )}
                    
                    <Invoice classes={themonth} monthIndex={params.monthid}/>
                 
                </>
            )
            :
            (
                null
            )
    )
}
//{selectedData && <DetailsCalendar data={selectedData} />}