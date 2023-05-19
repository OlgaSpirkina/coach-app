const express = require('express')
const conn = require('../../database.js')

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

const userRouter = express.Router();
//, isAuthenticatedFunction
userRouter.get('/', (req,res,next) => {
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 ORDER BY choose_month DESC;';
  conn.query(sql, function(err, result){
    res.send({"timetable": result})
  })
});
// Daily planning is get using query parameters: YYYY-MM-DD 
userRouter.get('/planning', (req,res,next) => {
  const day = (req.query.day <= 9) ? `0${req.query.day}` : req.query.day;
  const month = (req.query.month <= 9) ? `0${req.query.month}` : req.query.month;
  //
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 AND date = ? ORDER BY date;';
  conn.query(sql, [`${req.query.year}-${month}-${day}`], function(err, result){
    res.send({"daily_planning": modifyDateAndTime(result)})
  })
});
// Monthly planning is get using month index, this is not the new Date().getMonth() index but an index where January is a 1st month
userRouter.get('/:monthid', (req,res,next) => {
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 AND choose_month = ? ORDER BY date;';
  conn.query(sql, [req.params.monthid], function(err, result){
    res.send({"month": modifyDateAndTime(result)})
  })
});

module.exports = userRouter;