export const generateTimeOptions = () => {
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