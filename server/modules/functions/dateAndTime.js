const modifyDateAndTime = (array) => {
    if(array){
      array = array.map((planning) => {
        if (planning.date) planning.date = planning.date.toISOString().slice(0, 10);
        if (planning.time) planning.time = planning.time.toISOString().slice(11, 16);
        return planning;
      });
      return array;
    }
}
module.exports = modifyDateAndTime;