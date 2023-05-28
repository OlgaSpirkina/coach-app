import React from 'react';
import { MdOutlineDoneOutline } from 'react-icons/md'
import { CiNoWaitingSign } from 'react-icons/ci'
import { GrCaretNext } from 'react-icons/gr'
import { GrCaretPrevious } from 'react-icons/gr'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { daynames } from '../../functions/Calendar';
import { generateTimeOptions } from '../../functions/timeOptions'
//
const Carousel = ({ details, ifCarouselChanged }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [id, setId] = React.useState(details[currentIndex].id);
  const [updateSlotVar, setUpdateSlotVar] = React.useState(false)
  const [displayCarousel, setDisplayCarousel] = React.useState(true);
  const [slotClasses, setSlotClasses] = React.useState(details[currentIndex].classes);
  const [date, setDate] = React.useState(details[currentIndex].date);
  const [weekdayVariable, setWeekdayVariable] = React.useState(details[currentIndex].weekday);
  const [startTime, setStartTime] = React.useState(details[currentIndex].from_time.slice(0,5));
  const [endTime, setEndTime] = React.useState(details[currentIndex].to_time.slice(0,5));
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? details.length - 1 : prevIndex - 1));
};
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === details.length - 1 ? 0 : prevIndex + 1));
};
React.useEffect(()=>{
    setId(details[currentIndex].id);
    setSlotClasses(details[currentIndex].classes);
    setDate(details[currentIndex].date);
    setWeekdayVariable(details[currentIndex].weekday);
    setStartTime(details[currentIndex].from_time.slice(0,5));
    setEndTime(details[currentIndex].to_time.slice(0,5));
}, [currentIndex]);
  const updateSlot = () => {
      setUpdateSlotVar(true)
      setDisplayCarousel(false)
  }
  const deleteSlot = () => {
      return (
          <></>
      )
  }
  const discardChangesUpdate = () => {
      setDisplayCarousel(true);
      setUpdateSlotVar(false);
  }
  async function submitUpdate(e) {
    e.preventDefault(); 
    const updateSlotData = {
        classes: slotClasses, 
        date: date, 
        weekday: weekdayVariable, 
        from_time: startTime, 
        to_time: endTime
    };
    fetch(`/slot/1/${id}`, {
      method: 'POST',
      body: JSON.stringify(updateSlotData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(response => response.json())
        .then(data => {
            setUpdateSlotVar(false);
            setDisplayCarousel(true);
            ifCarouselChanged(true);
            console.log(weekdayVariable)
        })
        .catch(error => {
            console.log("Err: " +error)
        });
}
  
    return(
        <>
        {displayCarousel && 
        <div className="carousel">
            <GrCaretPrevious onClick={handlePrev} className="nex-prev-carousel" />

            <div className="card-container">
                <div className="card-update-delete" >
                    <HiOutlinePencilAlt 
                        className={"update update_"+details[currentIndex].id}
                        onClick={updateSlot}
                    />
                    <RiDeleteBinLine 
                        className={"delete delete_"+details[currentIndex].id}
                        onClick={deleteSlot}
                    />
                </div>
                <div className="card">
                    {
                        details[currentIndex].status 
                            ? 
                        <span className="card__value">{<MdOutlineDoneOutline className="icon-calendar-validated"/>}</span> 
                            : 
                        <span className="card__value">{<CiNoWaitingSign className="icon-calendar-waiting"/>}</span>
                    }
                    <span className="card__value">{slotClasses}</span>
                    {date !== null && <span className="card__value">{date.slice(0,10)}</span>}
                    {weekdayVariable !== null && <span className="card__value card_value_weekname">{daynames[weekdayVariable]}s</span>}
                    <span className="card__value">entre {startTime.slice(0,5)} et {endTime.slice(0,5)}</span>
                </div>
            
            </div>

            <GrCaretNext onClick={handleNext} className="nex-prev-carousel"/>
        </div>
        }
        {
            updateSlotVar && 
            <div className="card">
                <form 
                    className="update-slot-form"
                    onSubmit={submitUpdate}
                >
                {
                    details[currentIndex].status 
                        ? 
                    <p className="card__value">{<MdOutlineDoneOutline className="icon-calendar-validated"/>}</p> 
                        : 
                    <p className="card__value">{<CiNoWaitingSign className="icon-calendar-waiting"/>}</p>
                }
                     <input 
                        className="card__value" 
                        type="text"
                        defaultValue={slotClasses}
                        onChange={(event)=>{setSlotClasses(event.target.value)}}
                        required
                    />
                    {details[currentIndex].date && 
                        <input 
                            type="date" 
                            defaultValue={date.slice(0,10)} 
                            className="card__value" 
                            onChange={(event) => setDate(event.target.value)}
                        />
                    }
                    {weekdayVariable !== null && 
                        <select 
                            className="card__value card_value_weekname" 
                            onChange={(event) => setWeekdayVariable(daynames.indexOf(event.target.value))}
                        >
                            <option value={daynames[weekdayVariable]} defaultValue>
                                {daynames[weekdayVariable]}
                            </option>
                            {daynames.map((day)=>{
                            return <option key={day}>{day}</option>
                            })}
                        </select>
                    }
                    <p className="card__value">
                        entre 
                        <select  onChange={(event) => setStartTime(event.target.value)}>
                            <option value={details[currentIndex].from_time.slice(0,5)} defaultValue>
                                {startTime.slice(0,5)}
                            </option>
                            {generateTimeOptions()}
                        </select>
                        et 
                        <select  onChange={(event) => setEndTime(event.target.value)}>
                            <option value={details[currentIndex].to_time.slice(0,5)} defaultValue>
                                {endTime.slice(0,5)}
                            </option>
                            {generateTimeOptions()}
                        </select>
                    </p>
                    <p className="update-slot-button-container">
                        <button 
                            type="submit"
                        >Modifier
                        </button>
                        <button 
                            type="button"
                            onClick={discardChangesUpdate}
                        >Annuler
                        </button>
                    </p>
                </form>
                
               
            </div>
        }
        </>
    )
};

export default Carousel;

/*
 <div className="card">
                    {
                        details[currentIndex].status 
                            ? 
                        <span className="card__value">{<MdOutlineDoneOutline className="icon-calendar-validated"/>}</span> 
                            : 
                        <span className="card__value">{<CiNoWaitingSign className="icon-calendar-waiting"/>}</span>
                    }
                    <span className="card__value">{details[currentIndex].classes}</span>
                    {details[currentIndex].date && <span className="card__value">{details[currentIndex].date.slice(0,10)}</span>}
                    {details[currentIndex].weekday && <span className="card__value card_value_weekname">{daynames[details[currentIndex].weekday]}s</span>}
                    <span className="card__value">entre {details[currentIndex].from_time.slice(0,5)} et {details[currentIndex].to_time.slice(0,5)}</span>
                </div>
*/