const express = require('express')
const conn = require('../../database.js')

const slotRouter = express.Router();
//, isAuthenticatedFunction
slotRouter.get('/:trainer_id', (req,res) => {
  let sql = 'SELECT * FROM free_slot WHERE trainer_id = ?;';
  conn.query(sql, [req.params.trainer_id], function(err, result){
    if (err) {
      console.error(err);
      return;
    }
    res.send({"slot": result})
  })
});
slotRouter.post('/', (req,res) => {
  const freeslot = req.body;
  let sql = 'INSERT into free_slot (trainer_id, classes, weekday, date, from_time, to_time) VALUES (?);';
  conn.query(sql, [freeslot], function(err, result){
    if (err) {
      console.error(err);
      console.error(err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    return res.status(200).json({ message: 'Votre demande est bien transmise' });
  })
});


module.exports = slotRouter;