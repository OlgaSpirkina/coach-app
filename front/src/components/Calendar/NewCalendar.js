import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import BodyOfCalendar from './BodyOfCalendar';
import { monthObject } from '../../functions/MonthObject'
import DetailsCalendar from './DetailsCalendar';
//
export default function NewCalendar({...props}) {
    const params = useParams()
    const {currentYear, onDataSelect} = props;
    const [data, setData] = useState([]);
    let planning = [];
    let disclaimer;
    //
    React.useEffect(() => {
      fetch(`/user/${params.monthid}`)
        .then(res => res.json())
        .then(datafrombackend => setData(datafrombackend));
    }, [params.monthid]);
  
    if (data.month !== undefined) {
      data.month.length > 0
        ? (planning = [...new Set(data.month.map(day => parseInt(day.date.split("-")[2].slice(0, 2), 10)))])
        : (disclaimer = `Aucun cours n'est programmé en ${monthObject[params.monthid]} ${currentYear}`);
    }
  
    return (
      <>
        <p className="disclaimer-month">{disclaimer}</p>
        <div className="calendar">
            <div className="calendar-header">
                <h2 className="month-title">{monthObject[params.monthid]} {currentYear}</h2>
            </div>
            <div className="calendar-grid">
                <div className="weekday">Lun</div>
                <div className="weekday">Mar</div>
                <div className="weekday">Mer</div>
                <div className="weekday">Jeu</div>
                <div className="weekday">Ven</div>
                <div className="weekday">Sam</div>
                <div className="weekday">Dim</div>
                <BodyOfCalendar onDataSelect={onDataSelect} month={params.monthid-1} year={currentYear} planning={planning} />
            </div>
        </div>
      </>
    );
  }

