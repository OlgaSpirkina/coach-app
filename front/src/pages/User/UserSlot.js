import React from 'react'


export default function UserSlot() {
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [startTime, setStartTime] = React.useState('9:00');
  const [endTime, setEndTime] = React.useState('20:00');

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further actions here, such as making an API request
  };

  const generateTimeOptions = () => {
    const options = [];
    let hour = 9;
    let minute = 0;
  
    while (!(hour === 20 && minute === 0)) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(
        <option key={timeString} value={timeString}>
          {timeString}
        </option>
      );
  
      minute += 15;
      if (minute === 60) {
        hour++;
        minute = 0;
      }
    }
  
    return options;
  };

  return (
    <>
      <h2>Créneaux disponible</h2>
      <p>Indiquez des créneaux et cours que vous souhaitez donner</p>

      <form onSubmit={handleSubmit}>
        <label>
          Cours souhaités: 
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Jours souhaités:  
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <br />
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
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );


}