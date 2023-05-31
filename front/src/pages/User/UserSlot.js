import React from 'react'
import { daynames } from '../../functions/Calendar.js'
import { MdExpandMore } from 'react-icons/md'
import Carousel from '../../components/Slot/Carousel.js';
import { generateTimeOptions } from '../../functions/timeOptions.js';
//
export default function UserSlot() {
  const [slotClasses, setSlotClasses] = React.useState('');
  const [date, setDate] = React.useState('');
  const [weekday, setWeekday] = React.useState(null);
  const [startTime, setStartTime] = React.useState('9:00');
  const [endTime, setEndTime] = React.useState('20:00');
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [afterSubmit, setAfterSubmit] = React.useState(null);
  const [isListVisible, setIsListVisible] = React.useState(false);
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [trainersSlot, setTrainersSlot] = React.useState([]);
  const [carouselChanged, setCarouselChanged] = React.useState(false);
  const [deletedSlot, setDeletedSlot] = React.useState(false)
  React.useEffect(()=>{
    fetch("/slot/1")
      .then(res => res.json())
      .then(data => {
        setTrainersSlot(data.slot);
        setDeletedSlot(false);
      })
  }, [afterSubmit, carouselChanged, deletedSlot]);
  const ifCarouselChanged = () =>{
    setCarouselChanged(true);
  }
  const ifSlotDeleted = () => {
    setDeletedSlot(true);
  }
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  }
  const handleFormFocus = () => {
    setAfterSubmit(null);
  };
  async function handleSubmit(e) {
    e.preventDefault(); 
    const index = weekday !== null ? daynames.indexOf(weekday): null;
    const dateplaceholder = date === '' ? null : date;
    const slotData = ["1", slotClasses, index, dateplaceholder, startTime, endTime]
    fetch('/slot', {
      method: 'POST',
      body: JSON.stringify(slotData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setAfterSubmit(data.message);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSlotClasses('');
        setDate('');
        setWeekday(null);
        setStartTime('9:00');
        setEndTime('20:00');
        setSelectedOption(null);

      })
      .catch(error => {
        console.log("Err: " +error)
      });
  }
  const radioButtonChoice = (param) => {
    setSelectedOption(param);
  };
  return (
    <section id="userslot-container">
      <div className="slot-display-hide-parent">
        <p className="slot-display-hide" onClick={toggleFormVisibility}>
          <span>
            {isFormVisible ? 'Cacher le formulaire' : 'Afficher le formulaire'}
          </span>
          <MdExpandMore className={
              isFormVisible ? 'close-icon' : null
            }
          />
        </p>
        {isFormVisible &&
        <>
          <div>
          {afterSubmit && <h1>{afterSubmit}</h1>}
          <h2>Vos disponibilités</h2>
          <p>Indiquez des créneaux et cours que vous souhaitez donner</p>
        </div>
        <form onSubmit={handleSubmit} onFocus={handleFormFocus} id="userslot-form">
          <p>
            <label>
              Cours souhaités: 
              <input
                type="text"
                value={slotClasses}
                onChange={(event) => setSlotClasses(event.target.value)}
                required
              />
            </label>
          </p>
          <div>
            <p>
              <span>
                <label htmlFor="specific-date">Je donne une date précise
                  <input
                    type="radio"
                    id="specific-date"
                    value={''}
                    name="specific-option"
                    checked={selectedOption === true}
                    onChange={() => radioButtonChoice(true)}
                  />
                </label>
              </span>
              <span>
                <label htmlFor="specific-weekdays">Je donne un jour de la semaine
                  <input
                    type="radio"
                    id="specific-weekdays"
                    name="specific-option"
                    value={''}
                    checked={selectedOption === false}
                    onChange={() => radioButtonChoice(false)}
                  />
                </label>
              </span>
            </p>
            { 
              selectedOption === true && 
              <label>Jour souhaité:  
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
            </label>
            }
            {
              selectedOption === false &&
              <label>
                <select onChange={(event) => setWeekday(event.target.value)} value={weekday ? weekday : ''}>
                  <option defaultValue=''>Choisissez le jour de la semaine</option>
                  {daynames.map((day)=>{
                    return <option key={day}>{day}</option>
                  })}
                </select>
              </label>
            }
          </div>
          <p>
          </p>
          <p>Je suis disponible</p>
          <p>
            <label>
              à partir de :
              <select value={startTime} onChange={(event) => setStartTime(event.target.value)}>
              {generateTimeOptions()}
              </select>
            </label>
            <label>
              jusqu à :
              <select value={endTime} onChange={(event) => setEndTime(event.target.value)}>
              {generateTimeOptions()}
              </select>
            </label>
          </p>
          <button type="submit">Envoyer</button>
        </form>
        </>
      }
      </div>
      <div className="slot-display-hide-parent">
        <p className="slot-display-hide" onClick={toggleListVisibility}>
          <span>
            {isListVisible ? 'Cacher la liste des demandes' : 'Afficher la liste des demandes'}
          </span>
          <MdExpandMore className={
              isListVisible ? 'close-icon' : null
            }
          />
        </p>
        <>
          {
            isListVisible && 
              <Carousel  details={trainersSlot} ifCarouselChanged={ifCarouselChanged} ifSlotDeleted={ifSlotDeleted}/>
          }
        </>
      </div>  
      
    </section>
  );


}

   