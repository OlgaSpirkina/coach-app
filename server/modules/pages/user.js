const express = require('express')
const conn = require('../../database.js')

const userRouter = express.Router();
//, isAuthenticatedFunction
userRouter.get('/', (req,res,next) => {
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 ORDER BY choose_month DESC;';
  conn.query(sql, function(err, result){
    res.send({"timetable": result})
  })
});
userRouter.get('/:monthid', (req,res,next) => {
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 AND choose_month = ? ORDER BY date;';
  conn.query(sql, [req.params.monthid], function(err, result){
    res.send({"month": result})
  })
});
module.exports = userRouter;